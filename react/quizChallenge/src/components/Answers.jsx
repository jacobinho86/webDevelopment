import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}){

    console.log(answers);
    
    /*use refs to manage values that are stored and managed independently from the component lifecylce */
    const shuffledAnswers = useRef();

    /*this logic goes here in order to prevent an app break */
    if(!shuffledAnswers.current){
        shuffledAnswers.current = [... answers];
        shuffledAnswers.current.sort(() => Math.random()-0.5);
    }
        
    return (
        <ul id='answers'>
        {shuffledAnswers.current.map(answer => {
            const isSelected = selectedAnswer === answer;

            let cssClasse = '';

            if (answerState === 'answered' && isSelected){
                cssClasse = 'selected';
            }

            if ((answerState==='correct' || answerState==='wrong') && isSelected){
                cssClasse = answerState;
            }

            return(
                <li key={answer} className="answer">
                <button onClick={() => onSelect(answer)} className={cssClasse} disabled={answerState !== ''}>
                    {answer}
                </button>
            </li>
            );
        }
            
        )}
        </ul>
    );
}