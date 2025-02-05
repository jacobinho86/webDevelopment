import { useState } from "react";

export default function Player({name, symbol, isActive, onChangeName}) {

  const [playerNameState, setPlayerNameState] = useState(name);      
  const [ isEditing, setIsEditing] = useState(false);

  function handleClick() {
    //when updating state based on old state, best practice is to pass a function
    //such function will get the guarantee of using the latest value of the state
    //that is because this function is not executed immediatly, it is scheduled
    //by the react environment
    setIsEditing((editing) => !editing);
    if (isEditing){
      onChangeName(symbol, playerName);
    }
  }

  //the function expects an event to be sent by the react environment
  //it will have the value of the input of the user, this is called
  //two way binding, we are updating the state and reflecting it back
  function handleChange(event) {
    setPlayerNameState(event.target.value);
  }

  let playerName = (isEditing)?<input type="text" required value={playerNameState} onChange={handleChange}/>:<span className="player-name">{playerNameState}</span>;


    return (
        <li className={isActive? 'active' : undefined}>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{(isEditing)?"Save":"Edit"}</button>
          </li>
    );
}