//Example of comparison operators

//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}

//return one of the available classes to set the attribute
function setClass(){
	switch(randNumber(0,5)){
		case 0: return 'hot';
				break;
		case 1: return 'cold';
				break;
		case 2: return 'light';
				break;
		case 3: return 'heavy';
				break;
		case 4: return 'mike';
				break;
	}
}

//get the list elements
var elist=document.getElementsByTagName('li');

//we are going to assign a class element at random
for(var i=0;i<elist.length;i++){
	//assign a random 
	elist[i].setAttribute("class",setClass());
}
