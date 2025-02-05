export default function TabButton({children, onSelect, isSelected}) {
    //every custom component is sent a props object, children is a built-in prop that react sets always,
    //it has the content between the component tags
    //this is: "component composition"

    //this is an event handler defined inside the component (a function within a function)
    //defining the handler like this give it access to the props object and the component state
    //function handleClick(){
    //    console.log('hello world!');
    //}
    //The onClick is a built-in 'prop' that is used to define event handlers in JSX
    //you can pass a function pointer that was stored as a prop in the component
    return <li><button className={isSelected?'active':undefined} onClick={onSelect}>{children}</button></li>;
    //className is a built-in react prop similar to the class html property
}