/*

Cleaning Data Queries

*/

--type less with this
use nashville;

----------------------------------------------
--task #1 Change the Sale Date Field Data Type
----------------------------------------------

--the current data type of the field is datetime, as you can see
select SaleDate 
from housing;

--the task is to change the data type to Date, so it looks like this
select SaleDate, CONVERT(Date,SaleDate) as 'SaleDate' 
from housing;

--first we'll add a new column with the right format
alter table housing 
add SaleDateConverted Date;

--let's fill the data now
update housing 
set SaleDateConverted=CONVERT(Date,SaleDate);

--this is just to check the result
select SaleDateConverted 
from housing;

-----------------------------------------------------------
--task #2 Populate NULL values of the PropertyAddress field
-----------------------------------------------------------

--We'll use a refrence point, from the data looks like equal PropertyAddress values relate to equal ParcelID values
--to show this, let's use an inner join
select x.ParcelID, x.PropertyAddress, y.ParcelID, y.PropertyAddress
from housing x
join housing y
	on x.ParcelID=y.ParcelID
	and x.[UniqueID ]<>y.[UniqueID ]
where x.PropertyAddress is null
order by 1;

--now let's populate the fields with the ISNULL function
update x
set PropertyAddress=ISNULL(x.PropertyAddress, y.PropertyAddress)
from housing x
join housing y
	on x.ParcelID=y.ParcelID
	and x.[UniqueID ]<>y.[UniqueID ]
where x.PropertyAddress is null

--this is just to check if it worked
select x.ParcelID, x.PropertyAddress, y.ParcelID, y.PropertyAddress
from housing x
join housing y
	on x.ParcelID=y.ParcelID
	and x.[UniqueID ]<>y.[UniqueID ]

----------------------------------------------------------------------
--task #3 Break the PropertyAddress field into columns (Address, City)
----------------------------------------------------------------------

--the fild separates the address from the city with a comma, here is how one could split that field
--in two parts: the address and the city
select PropertyAddress,
SUBSTRING(PropertyAddress,1,CHARINDEX(',',PropertyAddress,1)-1) as 'address',
SUBSTRING(PropertyAddress,CHARINDEX(',',PropertyAddress,1)+2,100) as 'city'
from housing;

--we can't split a field withuot allocating space for that, a couple of columns should be added
alter table housing
add PropertySPlitAddress Nvarchar(255);

alter table housing
add PropertySPlitCity Nvarchar(255);

--now we can leverage the last query to populate these columns
update housing
set PropertySplitAddress=SUBSTRING(PropertyAddress,1,CHARINDEX(',',PropertyAddress,1)-1);

update housing
set PropertySplitCity=SUBSTRING(PropertyAddress,CHARINDEX(',',PropertyAddress,1)+2,100);

--this query is here just to see if this works
select PropertyAddress, PropertySplitAddress, PropertySplitCity 
from housing;

--------------------------------------------------------------------------
--task #4 Break the OwnerAddress field into columns (Address, City, State)
--------------------------------------------------------------------------

--For this one we'll PARSENAME, just compare how much work is spared with it
--The function looks for periods to separate the fileds, for that the REPLACE function will change the commas for periods
--An important note is that PARSENAME returns the fields in reverse that is why the first field that we collect is the third one
select PARSENAME(REPLACE(OwnerAddress,',','.'),1),
PARSENAME(REPLACE(OwnerAddress,',','.'),2),
PARSENAME(REPLACE(OwnerAddress,',','.'),3)
from housing;

--like before, columns to house the broken fields should be allocated
alter table housing
add OwnerSplitAddress Nvarchar(255);

alter table housing
add OwnerSplitCity Nvarchar(255);

alter table housing
add OwnerSplitState Nvarchar(255);

--now fill them with the data
update housing
set OwnerSplitAddress=PARSENAME(REPLACE(OwnerAddress,',','.'),3);

update housing
set OwnerSplitCity=PARSENAME(REPLACE(OwnerAddress,',','.'),2);

update housing
set OwnerSplitState=PARSENAME(REPLACE(OwnerAddress,',','.'),1);

--this query is here just to see if this works
select OwnerAddress, OwnerSplitAddress, OwnerSplitCity, OwnerSplitState
from housing;

-----------------------------------------------------------------------------------
--task #5 change the 'Y' and 'N' values in the field SoldAsVacant to 'Yes' and 'No'
-----------------------------------------------------------------------------------

--why do this? Lets throw some numbers
select distinct SoldAsVacant, count(SoldAsVacant) as 'count'
from housing
group by SoldAsVacant
order by 'count';

--'Y' and 'N' values are scarse in the column, let's change them
Select SoldAsVacant,
	case when SoldAsVacant='Y' then 'Yes'
		when  SoldAsVacant='N' then 'No'
		else SoldAsVacant
	end
from housing;

--Leverage this query to do an update statement
update housing
set SoldAsVacant=case when SoldAsVacant='Y' then 'Yes'
		when  SoldAsVacant='N' then 'No'
		else SoldAsVacant
	end;

--rerun the first query of this task and confirm that there are no more 'Y' and 'N' values

---------------------------
--task #6 delete duplicates
---------------------------

--for all intents and purposes if a row has the same SaleDate, SalePrice, LegalReference, PropertyAddress and ParcelID
--values, is a repeated record, here is a way to count such records
select x.[UniqueID ],y.[UniqueID ]
from housing x
inner join housing y
on x.ParcelID=y.ParcelID and x.SalePrice=y.SalePrice and 
   x.SaleDate=y.SaleDate and x.LegalReference=y.LegalReference and 
   x.PropertyAddress=y.PropertyAddress and x.[UniqueID ]<>y.[UniqueID ]

--because of the cartesian product (id_1,id_2) is not equal to (id_2,id_1), so this query returns the same result twice
--hence, it reports two times the duplicate records. 
--This is just a proof of existence not a detail report. BUT WAIT! Why just count them XD

select ParcelID, PropertyAddress, SaleDate,  SalePrice, LegalReference,count([UniqueID ]) as '#repetitions'
from housing
group by ParcelID, PropertyAddress, SaleDate, SalePrice, LegalReference;

--we can use this result as a CTE to filter this result, just to show only duplicate rows

with duplicates as (
select ParcelID, PropertyAddress, SaleDate,  SalePrice, LegalReference,count([UniqueID ]) as '#repetitions'
from housing
group by ParcelID, PropertyAddress, SaleDate, SalePrice, LegalReference)
select * from duplicates where #repetitions>1

--the last thing to do is to delete the last rows, leveraging the cte again. News update! Can use delete on my cte because
--it uses aggregate functions, need to find a new way to do it. News Update! Let's try recreating the result with 
--analytic functions partitioning the result set after the query has been executed

select *, ROW_NUMBER() over (
			partition by ParcelID,
						 PropertyAddress,
						 SalePrice,
						 SaleDate,
						 LegalReference
			order by UniqueID) row_num
from housing;

--looks good, let's filter that out

with duplicates as (
	select *, ROW_NUMBER() over (
				partition by ParcelID,
							 PropertyAddress,
							 SalePrice,
							 SaleDate,
							 LegalReference
				order by UniqueID) row_num
	from housing
)
select * from duplicates where row_num>1;

--same number of rows returned, let's see if we can now delete them

with duplicates as (
	select *, ROW_NUMBER() over (
				partition by ParcelID,
							 PropertyAddress,
							 SalePrice,
							 SaleDate,
							 LegalReference
				order by UniqueID) row_num
	from housing
)
delete from duplicates where row_num>1;

--executed the query before last and it did not returned any record, it worked, sigh of relief 

-----------------------------
--task #6 drop unused columns
-----------------------------

--lastly, we have splitted a couple of columns that now have redundant information, need to drop them
--DISCLAIMER: never do this in raw data! Always use a copy
alter table housing
drop column PropertyAddress, OwnerAddress;
