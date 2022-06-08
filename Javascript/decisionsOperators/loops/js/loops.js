//Example of comparison operators

//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}
//random counter of loops
var count=randNumber(11,0);

//message to print in the page
var msg='Let\'s Count!<br />';

//let's do a count with a pause
var elnumbers=document.getElementById('numbers'); //get the element
if(count){
	for(var i=1;i<=count;i++){
		msg+='and '+i+'...<br />';
	}
}else{
	msg+='No counting this time!<br/>';
}

//let's give credit to the count 
msg+='muajajajaja...';

elnumbers.innerHTML=msg;
