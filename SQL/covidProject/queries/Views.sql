
-------------------------------------------------------Helping Views------------------------------------------------------------

--In this section I'll just define some helper views that'll serve as a pre-aggregate step to help in some of the 
--calculations with in the project. I'll use these views some times and in oder I'll use subqueries. The main objective
--is to excercise different sql features

----VIEW
--NAME: max_cases_country
--FIELDS:
---------location, this'll have the country names filtering out other locations in the dataset like continents and income divisions.
---------current_cases, this'll contain the current number of covid cases of the country

create view max_cases_country
(location,
 current_cases)
as
(select location, max(total_cases) as current_cases
from covidInfo.dbo.covidDeath
where continent is not null
group by location
)

----VIEW
--NAME: country_population
--FIELDS:
---------location, this'll have the country names filtering out other locations in the dataset like continents and income divisions.
---------population, this is the magnitud of the population for a given country
create view country_population
(location,
 population)
as
(select distinct location, population
from covidInfo.dbo.covidDeath
where continent is not null
)