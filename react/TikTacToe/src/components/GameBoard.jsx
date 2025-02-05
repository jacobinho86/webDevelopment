

export default function GameBoard({ onSelectSquare, board }) {
/*     const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleSelectSquare(rowIndex, colIndex) {
        setGameBoard((prevGameBoard) => {
            //change the state immutably, have to do a copy before changing, because arrays and objects are
            //pointers, if we change it directly right here we'll change the value stored in memory
            //so we'll be messing with react update schedule and introduce bugs in the process
            const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
            return updatedBoard;
        });
        onSelectSquare();
    } */


    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => 
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} 
                            disabled={playerSymbol !== null}>
                                {playerSymbol}
                            </button>
                            </li>)}
                </ol>
            </li>)}
        </ol>
    );
}