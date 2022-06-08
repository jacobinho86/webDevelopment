//alert the location of the pageX
alert('Current page:'+window.location);
//use the window object to report its properties in the page
var browserh=document.getElementById("heightw");
browserh.innerText=window.innerHeight;
var browserw=document.getElementById("widthw");
browserw.innerText=window.innerWidth;
//use the window object to report the number of history items
var hist=document.getElementById("history");
hist.innerText=window.history.length;
//use the window object to report the screen properties
var screenh=document.getElementById("heights");
screenh.innerText=window.screen.heights;
var screenw=document.getElementById("widths");
screenw.innerText=window.screen.width;
