//Example of comparison operators
//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}
//random numbers in range
var num1=randNumber(101,0);
var num2=randNumber(101,0);
var num3=randNumber(101,0);

//write the values on the page
var elnumbers=document.getElementById('numbers');
elnumbers.textContent='First Number: '+num1+', Second Number: '+num2;

//what ir the order?
var elorder=document.getElementById('order');
//find how are these numbers ordered and print it in the page
if(num1<num2){
   elorder.textContent='The first number is smaller that the second number';	
}else if(num1>num2){
   elorder.textContent='The first number is bigger that the second number';	
}else{
   elorder.textContent='The numbers are equal';
}

//Is the average of the first to numbers bigger than the third
var elav=document.getElementById('av');
elav.textContent='Is ('+num1+'+'+num2+')/2 >'+num3+': '+(((num1+num2)/2)>num3);
