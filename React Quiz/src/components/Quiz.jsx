import { useState, useCallback } from 'react';

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';
import Summary from './Summary.jsx';

export default function Quiz() {
  // 存储整个quiz用户所有选择的回答
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = userAnswers.length === QUESTIONS.length;

  // 使用useCallback避免不必要的重新渲染
  const handleSelectAnswer = useCallback(function handleAnswerSelection(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }, []);

  // 倒计时结束未能选择则跳到下一个问题，并且当前问题的用户回答设定为null
  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  // quiz结束的画面
  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    );
  }

  // key用于react动态重新渲染Question组件，questionIndex作为prop传给Question组件使用
  // 由于React不让直接使用react内定的key属性作为prop传递，所以这里用questionIndex替代
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}