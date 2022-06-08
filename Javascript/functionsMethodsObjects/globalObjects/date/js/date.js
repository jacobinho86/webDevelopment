//Use the global object Date to work with time figues
var today = new Date(); //get the current date
var year = today.getFullYear();
var beginning=new Date('Jan 01, 1833 11:00:00'); //this is where all started
var diff=today.getTime()-beginning.getTime(); //get the difference
diff=(diff/31556900000); //divide this number by the number of milliseconds in a day/week/year
var msg=document.getElementById("date");
msg.innerText=Math.floor(diff)+' since the invention of the analytical engine';
