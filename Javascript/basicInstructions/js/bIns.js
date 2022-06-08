//create variables for the welcome message
var greeting='howdy ';
var name='Molly';
var message=', please check your order:';
//concatenate the three variables to create the welcome message
var welcome=greeting+name+message;

//create variables to hold details about the sign
var sign='Las aguilas house';
var tiles=sign.length;
var subTotal=tiles*5;
var shipping=7;
var grandTotal=subTotal+shipping;

//Get the element that has an id of greeting
var el=document.getElementById('greeting');
//Replace the content of that element with the welcome message
el.textContent=welcome;

//get the element that has an id of userSign and update contents
var elSign=document.getElementById('userSign');
elSign.textContent=name;

//get the element that has an id of tiles and update contents
var elTiles=document.getElementById('tiles');
elTiles.textContent=tiles;

//get the element that has an id of subTotal and update contents
var elSubTotal=document.getElementById('subTotal');
elSubTotal.textContent='$'+subTotal;

//get the element that has an id of shipping and update contents
var elShipping=document.getElementById('shipping');
elShipping.textContent='$'+shipping;

//get the element that has an id of grandTotal and update contents
var elGrandTotal=document.getElementById('grandTotal');
elGrandTotal.textContent='$'+grandTotal;
