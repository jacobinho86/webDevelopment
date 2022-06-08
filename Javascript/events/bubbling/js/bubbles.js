//Example of event bubbling

//event Function
function clicky(e){
	//it is necessary to use e.currentTarget instead of e.target, because the latter will never change
	//in the bubbling chain, because it is the element that caused the event. The former will target
	//the current element that is serving the handler
	
	switch(e.currentTarget.id)
	{
		case 'body':e.currentTarget.className='bubble4';
					window.alert('body in red #4 served');
					break;
		case 'main':e.currentTarget.className='bubble3';
					window.alert('div in yellow #3 served');
					break;
		case 'form':e.currentTarget.className='bubble2';
					window.alert('form in green #2 served');
					break;
		case 'button':e.currentTarget.className='bubble1';
					  window.alert('button in blue #1 served');
					  break;
	}
}

//get all the elements involve
var elBody=document.getElementsByTagName('body')[0];
var elparent=document.getElementById('main');
var elform=document.getElementById('form');
var elstart=document.getElementById('button');


//add the event listeners
elBody.addEventListener('click',clicky,false);
elparent.addEventListener('click',clicky,false);
elform.addEventListener('click',clicky,false);
elstart.addEventListener('click',clicky,false);