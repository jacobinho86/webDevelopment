//Example of comparison operators
//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}
//draw two random numbers
var num1=randNumber(2,0);
var num2=randNumber(2,0);

//message to print in the page
var msg='';

//and test
var eland=document.getElementById('and'); //get the element
msg=num1+' && '+num2+' is '+(num1&&num2);
eland.textContent=msg;
msg=''

//or test
var elor=document.getElementById('or'); //get the element
msg=num1+' || '+num2+' is '+(num1||num2);
elor.textContent=msg;
msg=''

//not #1 test
var elnot1=document.getElementById('not1'); //get the element
msg=num1+' is '+(num1==num1)+' but !'+num1+' is '+(num1==!num1);
elnot1.textContent=msg;
msg=''

//not #2 test
var elnot2=document.getElementById('not2'); //get the element
msg=num2+' is '+(num2==num2)+' but !'+num2+' is '+(num2==!num2);
elnot2.textContent=msg;


