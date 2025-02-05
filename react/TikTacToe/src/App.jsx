import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [[null,null,null],[null,null,null],[null,null,null]];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({X: 'Player 1', O: 'Player 2'});
  const[gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  //do not change the original array! This was a bug...
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner = null;
  //this is a "derived state", it is a computed value derived from the state, no state management is
  //done here
  for(const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;
      gameBoard[row][col]=player;
  }

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = players[firstSquare];
    }
  }

  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((currentActivePlayer) => currentActivePlayer==='X'? 'O':'X');
    setGameTurns(prevTurns => {
      //this variable is here to avoid mergeing the management of 2 different pieces of state in one function
      //because it is not a good practice, and there is no guarantee that the information gathered by the other
      //state function will be the latest within this function
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        {square: {row:rowIndex, col: colIndex}, player:currentPlayer}, ...prevTurns];
      
      return updateTurns;

    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>          
          <Player name="Player 2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || draw) && <GameOver winner = {winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
