#import into the covidinfo database
use covidinfo;
#this is to enable local in file loading
show global variables like 'local_infile';
set global local_infile=true;
show global variables like 'local_infile';

#for this script to work, one has to enable the file loading at the client
#here is how to configure the client in the command line or workbench:
#https://stackoverflow.com/questions/31450389/connect-with-local-infile-option-in-mysql-workbench

#load first the covid deaths information
load data local infile './covidDeath.csv'
into table deaths
fields terminated by ','
enclosed by '"'
lines terminated by '/n'
ignore 1 rows;

#same as before but now load the vaccine info
load data local infile './covidVacc.csv'
into table deaths
fields terminated by ','
enclosed by '"'
lines terminated by '/n'
ignore 1 rows;