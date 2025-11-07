import { useState } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = userAnswers.length === QUESTIONS.length;
  function handleAnswerSelection(answer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, answer]);
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Quiz Complete" />
        <h2>Quiz Complete!</h2>
      </div>
    );
  }

  const shuffleAnswers = [...QUESTIONS[activeQuestionIndex].answers].sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <p>Currently active Question</p>
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffleAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleAnswerSelection(answer)}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}