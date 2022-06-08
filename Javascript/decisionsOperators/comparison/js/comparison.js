//Example of comparison operators
//passing grade
var pgr=60;
//your result
var score=80;

//check if the user passed the exam
var passed=score>=pgr;

//Write the score of the user in the page
var elresult=document.getElementById('result');
elresult.textContent='Your Score: '+score+'%';

//Write if the user passed in the page`
var elpass=document.getElementById('pass');
elpass.textContent='Exam passed: '+passed;
