//Example of comparison operators

//return a random integer between min-max
function randNumber(max,min){
	return Math.round(Math.random()*(max-min)+min);
}

//this function will return one of the messages in the pool
function newText(){
	switch(randNumber(11,1)){
			case 1: return 'This is the one...';
					break;
			case 2: return 'Cream of the crop...';
					break;
			case 3: return 'God willing...';
					break;
			case 4: return 'Bye Felicia...';
					break;
			case 5: return 'Wheeling dealing...';
					break;
			case 6: return 'Turn down fo what!';
					break;
			case 7: return 'Pretty fly...';
					break;
			case 8: return 'Heaven only knows...';
					break;
			case 9: return 'Are you not entertained!';
					break;
			case 10: return 'Let me entertain you!';
	}
}

//set the number of elements to put in the list
var count=randNumber(21,1);

//get the list element 
var elist=document.getElementById('list');

//we are going to create random <li> elements 
for(var i=1;i<=count;i++){
	//create a new <li> element
	var newEl=document.createElement('li');
	//now create its Text
	var texto=document.createTextNode(newText());
	//attachthem
	newEl.appendChild(texto);
	//put it in the list
	elist.appendChild(newEl); 
}
