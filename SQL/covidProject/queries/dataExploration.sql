--type less with this
use covidInfo;

----QUERY
--NAME: percetnage of global population with covid
--DESCRIPTION: This query returns the percentage of global population infected with covid (at the time the data was gathered)
--NOTES:

select concat(str((max(total_cases)/max(population))*100,10,4),'%') as 'Global Population with Covid'
from covidDeath
where location='World';

----QUERY
--NAME: Deaths due to covid
--DESCRIPTION: percentage of global population lost because of covid (at the time the data was gathered)
--NOTES:

select concat(str(max(cast(total_deaths as int))/max(population),10,4),'%') as 'Global Population Death by Covid'
from covidDeath
where location='World';

----QUERY
--NAME: percentage of total cases per country with respect to the global total
--DESCRIPTION: This query returns the density, in the form of a percentece, of covid cases that reside in every country
--NOTES:
--In this specific query, I have to use a subquery to obtain the global total of covid cases, since it returns a one column, one row result it can be used as a constant
--all of this is because I just can find a way to do the running sum of the world population, the results are not what they suppose to be, and I have verified that I am  
--omiting places where continent is null, such as Africa, Oceania etc. But'll take the value in the World register as the true values.

select location, round(max(total_cases)/(select max(total_cases) 
from covidDeath 
where location='World')*100,6) as 'CasesShare(%)' 
from covidDeath
where continent is not NULL
group by location
order by 'CasesShare(%)' desc;

----QUERY
--NAME: maximum percentage of country population with covid 
--DESCRIPTION: the current percentage of country population with covid every day (at the time the data was gathered)
--NOTES:

select location, population, max(total_cases) as 'current cases',
	case 
		when (max(total_cases) is null or population is null) then 'N/A'
		else concat(str(round((max(total_cases)/population)*100,1),10,1),'%') 
	end as 'population infected'
from covidinfo.dbo.covidDeath 
where continent is not null
group by location, population
order by 4 desc;

----QUERY
--NAME: Maximum population lost 
--DESCRIPTION: current percentage of population lost because of covid (at the time the data was gathered) by country 
--NOTES:

select location, population, max(cast(total_deaths as int)) as 'current deaths',
	case 
		when (max(cast(total_deaths as int)) is null or population is null) then 'N/A'
		else concat(str(round((max(cast(total_deaths as int))/population)*100,6),10,6),'%') 
	end as 'current population lost'
from covidinfo.dbo.covidDeath 
where continent is not null
group by location, population
order by 'current population lost' desc, 'current deaths', population;

----QUERY
--NAME: percentage of country population with covid by day
--DESCRIPTION: percentage of country population with covid each day (at the time the data was gathered)
--NOTES:

select location,date,population, total_cases, 
	case 
		when (total_cases is null or population is null) then 'N/A'
		else concat(str(round((total_cases/population)*100,1),10,1),'%') 
	end as 'population infected'
from covidinfo.dbo.covidDeath 
where continent is not NULL
order by 1,2;

----QUERY
--NAME: country population with covid #2
--DESCRIPTION: percentage of country population with covid (at the time the data was gathered)
--NOTES: this query has been done, this is to leverage the use of views and joins, but the data is the same
select cp.location as 'country', cp.population, mcp.current_cases as 'current cases', 
case 
		when (cp.population is null or mcp.current_cases is null) then 'N/A'
		else concat(str(round(mcp.current_cases/cp.population,4)*100 ,10,1),'%') 
end as 'population with covid'
from country_population cp 
inner join max_cases_country mcp 
on cp.location=mcp.location
order by 4 desc;

----QUERY
--NAME: percentage of population lost for covid each day
--DESCRIPTION: percentage of country population lost each day for covid (at the time the data was gathered)
--NOTES:

select location,date,population, total_deaths, 
	case 
		when (total_deaths is null or population is null) then 'N/A'
		else concat(str(round((cast(total_deaths as int)/population)*100,4),10,4),'%') 
	end as 'population lost'
from covidinfo.dbo.covidDeath 
where continent is not NULL
order by 1,2;

----QUERY
--NAME: percentage of deaths in the infected population per day
--DESCRIPTION: percentage of infected population lost every day (at the time the data was gathered)
--NOTES:

select location,date,total_cases, total_deaths, 
	case 
		when (total_deaths is null or total_cases is null) then 'N/A'
		else concat(str(round((cast(total_deaths as int)/total_cases)*100,1),10,1),'%') 
	end as 'mortality'
from covidDeath 
where continent is not NULL
order by 1,2;

----QUERY
--NAME: average total deaths
--DESCRIPTION: the results of this query will present a smoothed version of the total_deaths curve (at the time the data was gathered)
--			   by taking the rolling average of a 3 days window
--NOTES:	I'll put this note to remember to use this to compare the veolicity of deaths with respect to the vaccination velocity

select location, date, total_deaths, 
avg(cast(total_deaths as int)) over(partition by location
					order by location, date
					rows between 1 preceding and 1 following) as 'smooth death curve'
from covidDeath
where continent is not NULL;

----QUERY
--NAME: average new cases
--DESCRIPTION: the results of this query will present a smoothed version of the new_cases curve (at the time the data was gathered)
--			   by taking the rolling average of a 3 days window
--NOTES:	I'll put this note to remember to use this to compare the veolicity of new cases with the vaccination

select location, date, new_cases, 
avg(new_cases) over(partition by location
					order by location, date
					rows between 1 preceding and 1 following) as 'smooth new cases'
from covidDeath
where continent is not NULL;

----QUERY
--NAME: velocity of new cases
--DESCRIPTION: This is a derivative approximation of the appearance of 
--             new cases per country using the newton difference quotient
--NOTES:	the step size is 1, meaning every measurement is done every day

select location, date, new_cases, 
(lead(new_cases,1) over (partition by location
					order by location, date)-
lag(new_cases,0) over (partition by location
					order by location, date)) as 'instant rate of increment'

from covidDeath
where continent is not NULL
order by 1,2;

----QUERY
--NAME: velocity of new cases #2
--DESCRIPTION: This is a derivative approximation of the appearance of 
--             new cases per country using the symmetric difference quotient
--NOTES:	this is one is here just to compare how good it looks the curve with this method

select location, date, new_cases, 
(lead(new_cases,1) over (partition by location
					order by location, date)-
lag(new_cases,1) over (partition by location
					order by location, date))/2 as 'instant rate of increment'

from covidDeath
where continent is not NULL
order by 1,2;

----QUERY
--NAME: vaccinated people by country
--DESCRIPTION: This query returns the current number of vaccinations per country (at the time the data was gathered)
--NOTES: The join is necessary because the population information is in another table. The try_cast is here because cast cannot convert nulls into numbers

select cv.location, cd.population, max(cast(cv.total_vaccinations as bigint)) as 'total vaccinations'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location
where cv.continent is not null
group by cv.location, cd.population
order by 'total vaccinations' desc

----QUERY
--NAME: convoluted explorations
--DESCRIPTION: This query was architected to answer the question that it looks like the total_vaccinations field have bigger numbers than the population of each country, this looks wrong
--			   and shouldn't be the case, need to research how this field was populated
--NOTES:

select cv.location, cd.population, max(cast(cv.total_vaccinations as bigint)) as 'total vaccinations',
case 
		when (cd.population is null or 'total vaccinations' is null) then 'N/A'
		else case 
				when(max(cast(cv.total_vaccinations as bigint))>cd.population) then 'Yes'
				else 'No'
				end
end as 'percentage vaccinated'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location
where cv.continent is not null
group by cv.location, cd.population
order by 'total vaccinations' desc

----QUERY
--NAME: percetnage of vaccinated people by country
--DESCRIPTION: This query returns the percentage of the population vaccinated by country (at the time the data was gathered)
--NOTES: The join is necessary because the population information is in another table. The try_cast is here because cast cannot convert nulls into numbers

--------FOR THIS ONE THE DATA LOOKS WRONG, EITHER THAT OR THE FIELD total_vaccinations HAS other data than the number of people vaccinated, may be they are counting the boosters but don't know for sure

----QUERY
--NAME: people fully vaccinated
--DESCRIPTION: This query returns the number of people fully vaccinated by country and day (at the time the data was gathered)
--NOTES: 

select cv.location, cv.date, cd.population, max(cast(cv.people_fully_vaccinated as bigint)) as 'people vaccinated'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location and cv.date=cd.date
where cv.continent is not null 
group by cv.location, cd.population, cv.date
order by 2 

----QUERY
--NAME: max people fully vaccinated
--DESCRIPTION: This query returns the maximum number of people fully vaccinated by country (at the time the data was gathered)
--NOTES: 

select cv.location, cd.population, max(cast(cv.people_fully_vaccinated as bigint)) as 'people vaccinated'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location and cv.date=cd.date
where cv.continent is not null
group by cv.location, cd.population
order by 1 

----QUERY
--NAME: percentage of people fully vaccinated
--DESCRIPTION: This query returns percentage of the population vaccinated by country (at the time the data was gathered)
--NOTES: looks like the data from Gibraltar has a mistake, because it has 122% por people vaccinated XD

select cv.location, cd.population, max(cast(cv.people_fully_vaccinated as bigint)) as 'people vaccinated',
concat(str((max(cast(cv.people_fully_vaccinated as bigint))/cd.population)*100,10,4),'%') as 'percentage vaccination (%)'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location and cv.date=cd.date
where cv.continent is not null
group by cv.location, cd.population
order by 4

----QUERY
--NAME: percentage of people fully vaccinated globaly
--DESCRIPTION: This query returns percentage of the population vaccinated of the world (at the time the data was gathered)
--NOTES: I have my doubts about this number

select cv.location, cd.population, max(cast(cv.people_fully_vaccinated as bigint)) as 'people vaccinated',
concat(str((max(cast(cv.people_fully_vaccinated as bigint))/cd.population)*100,10,4),'%') as 'percentage vaccination (%)'
from covidVacc cv inner join covidDeath cd
on cv.location=cd.location and cv.date=cd.date
where cv.location='World'
group by cv.location, cd.population
order by 4

----QUERY
--NAME: velocity of vaccinations
--DESCRIPTION: This is a derivative approximation of the appearance of 
--             vaccinations per country using the newton difference quotient
--NOTES:	the step size is 1, meaning every measurement is done every day

select location, date, cast(people_vaccinated as int) as 'people vaccinated', 
(lead(cast(people_vaccinated as int),1) over (partition by location
					order by location, date)-
lag(cast(people_vaccinated as int),0) over (partition by location
					order by location, date)) as 'instant rate of increment'

from covidVacc
where continent is not NULL
order by 1,2;

----QUERY
--NAME: velocity of new cases #2
--DESCRIPTION: This is a derivative approximation of the appearance of 
--             new cases per country using the symmetric difference quotient
--NOTES:	this is one is here just to compare how good it looks the curve with this method

select location, date, cast(people_vaccinated as int) as 'people vaccinated', 
(lead(cast(people_vaccinated as int),1) over (partition by location
					order by location, date)-
lag(cast(people_vaccinated as int),1) over (partition by location
					order by location, date))/2 as 'instant rate of increment'

from covidVacc
where continent is not NULL
order by 1,2;

----QUERY
--NAME: How Vaccination Slows Down New Cases Appearence
--DESCRIPTION: How does the speed of vaccination reduce the speed of new covid cases appearence? In this case we'll consider the speed rate of vaccination as a friction factor to the new cases appearance
--			   speed, so first we'll estimate the velocity of each event, then we'll suubtract the vaccination speed to the cases appearance speed. The general idea is to know if the rate of covid cases
--			   apperance slows down as the vaccination speed goes up
--NOTES:	the velocities are calculated as a first derivative approximation

select x.location, x.date, y.[Cases Speed], x.[Vaccination Speed], y.[Cases Speed]-x.[Vaccination Speed] as 'Cases Speed (with friction)'
from
(select location, date, cast(people_vaccinated as int) as 'people vaccinated', 
(lead(cast(people_vaccinated as int),1) over (partition by location
					order by location, date)-
lag(cast(people_vaccinated as int),1) over (partition by location
					order by location, date))/2 as 'Vaccination Speed'

from covidVacc
where continent is not NULL) x
inner join 
(select location, date, new_cases, 
(lead(new_cases,1) over (partition by location
					order by location, date)-
lag(new_cases,1) over (partition by location
					order by location, date))/2 as 'Cases Speed'

from covidDeath
where continent is not NULL) y
on 
x.location=y.location and x.date=y.date
order by 1,2

----QUERY
--NAME: Death toll by continent
--DESCRIPTION: This returns the death count by continent (at the time the data was gathered)
--NOTES:	
select location as 'Continent', sum(cast(total_deaths as int)) as 'Death Count'
from covidDeath
where location in ('Europe','South America','North America','Asia','Africa','Oceania')
group by location;

--select distinct location from covidDeath where continent is null
