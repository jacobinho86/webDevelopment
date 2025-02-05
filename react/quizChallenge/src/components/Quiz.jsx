import { useState } from "react";
import { useCallback } from "react";    
import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {

    const [userAnswers,setUserAnswers] = useState([]);
    
    /*when working in react, try to manage as little state as possible and derive as much state as possible */
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });
    },[]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null),[handleSelectAnswer]);

    if(quizIsComplete) {
        return (
            <Summary userAnswers={userAnswers}/>
        );
    }
   

    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}    
                onSkipAnwser={handleSkipAnswer}/>
        </div>
        
        
    );
}