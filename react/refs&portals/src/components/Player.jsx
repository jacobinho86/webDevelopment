import { useState, useRef } from "react";
/*Changing a ref value will not force the component to re-render, we need to manage state, that is a constant of life.
Ref values are just a way to access components properties directly, it is an alternative for the two way binding */
export default function Player() {
  
  //this is a hook from react to create ref values
  const playerName = useRef();

  const [enteredPlayerName, setPlayerName] = useState('');

  function handleClick(){
    //a ref exposes all the properties of the element that is connected to
    //always use the current property to change values
    //here we are changing directly the state of the component
    console.log('antes: ' + enteredPlayerName);
    setPlayerName(playerName.current.value);
    console.log('despues: ' + enteredPlayerName);
    //clear the input text box
    //react should be about declarative code, try to not manipulate the DOM directly
    //here we are corssing the line
    playerName.current.value='';
  }

  return (
    <section id="player">
      {/*this is a shortcut for expression?expression:other */}
      <h2>Welcome {enteredPlayerName !==''?enteredPlayerName:'unknown entity'}</h2>
      <p>
        {/*this is how one connects an element to a ref value, use the ref prop and pass a ref value */}
        <input type="text" ref={playerName}/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
