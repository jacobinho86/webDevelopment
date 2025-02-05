import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 1000,
    annualInvestment: 12000,
    expectedReturn: 6,
    duration: 10
});

const inputIsValid = userInput.duration >= 1;

function handleUserInput(inputID, newValue){
  setUserInput(oldValue => {
      return {
          ...oldValue,
          [inputID]: +newValue,
      };
  });
}

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onInputChange={handleUserInput}/>
      {!inputIsValid && <p className="center">Please enter a duration greater than 0...</p>}
      {inputIsValid && <Results input={userInput} />}
    </>
  )
}

export default App
