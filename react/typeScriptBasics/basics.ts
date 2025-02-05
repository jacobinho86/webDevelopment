//*****Primitives: number, string, boolean

//type anotations
let age: number;
age = 12;
//valid to declare & initialize
let userName: string = 'pobo';
let isValid: boolean;
isValid = true;

//null and undefined also exist but:
let hobbie: null;
//is not that useful because every asigment returns an error
//hobbie = '12'; also  hobbie = 12; are errors!

//*****Complex: arrays, objects

//array of strings
let hobbies: string[];
hobbies = ['sports', 'cooking', 'movies'];

//create an object
//anything is allowed, this is a fallback type, should not be used
//let person: any;

//better tell typescript about the object structure

//this is a type definition
type Person = {
    name: string; 
    age: number;
};

let person: {
    name: string; 
    age: number;
};

person = {
    name: 'Max',
    age: 32
};

//this will be an error
//person = {isPerson: true};

//this will be an array of objects of class people

//use the type alias, when transformed to javascript, it will be discarted
let people: Person[];

//type inference is a thing in typescript, there is no need to specify the type
//let course = 'math';
//course=12; this is an error string was inferred

//if a variable can house two types of data, use an union type
let course: string | number = 'math';
//now this is not an error
course=1234;

//*****Functions, parameters

//define the type of the return value like so
function add(a:number, b:number): number{
    return a+b;
}

//infere the return type by omitting it
function add2(a:number, b:number) {
    return a+b;
}

//this one returns void
function show(value: any) {
    console.log(value);
}

//*****Generics

function insertThingsInFront(array: any[], value:any) {
    const newArray = [value, ...array];
    return newArray;
}

const demo = [1, 2, 3]; 

//due to type inference, newDemo is of type 'any' this is not good
const newDemo = insertThingsInFront(demo, 0); //[0, 1, 2, 3]

//better use generics to resulve this problem
function insertThingsInFront2<T>(array: T[], value:T) {
    const newArray = [value, ...array];
    return newArray;
}

//now T will be inferred to by a number, and the array will by of that type
const newDemo2 = insertThingsInFront2(demo, 0); //[0, 1, 2, 3]

//but wait! this also works
const newDemo3 = insertThingsInFront2(['a','b','c'],'d'); //['a','b','c','d']

//summary: type safe but flexible, generics looks awsome!

