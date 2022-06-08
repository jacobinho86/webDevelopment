//Example of comparison operators

//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}

//set the number of elements to remove from the list
var count=randNumber(11,1);

//get the list element 
var elist=document.getElementById('list');

//we are going to remove random <li> elements 
for(var i=1;i<=count;i++){
	//remove a random li element from the list
	elist.removeChild(document.getElementsByTagName('li')[randNumber(elist.childElementCount+1,0)]);
}
