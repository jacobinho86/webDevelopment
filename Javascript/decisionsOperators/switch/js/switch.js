//Example of comparison operators
//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}
//draw a random counter 
var choice=randNumber(6,1);

//message to print in the page
var msg='';

//write the values on the page
var elchoice=document.getElementById('choice'); //get the element
//get the choice
switch(choice){
	case 1: msg+="Soup";
			break;
	case 2: msg+="Stake";
			break;
	case 3: msg+="Pasta";
			break;
	case 4: msg+="Salad";
			break;
	case 5: msg+="Cake";
			break;
	default: msg+="Something unknown...";
			break;			
}
elchoice.textContent=msg;
