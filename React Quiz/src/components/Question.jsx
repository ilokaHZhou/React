import { useState } from 'react';
import QuestionTimer from './QuestionTimer';
import Answers from './Answers.jsx';
import QUESTIONS from '../questions.js';

export default function Question({
  questionIndex,
  onSelectAnswer,
  onSkipAnswer,
}) {
  const [answer, setAnswer] = useState({
    selectedAnswer: '',
    isCorrect: null
  });

  let timer = 10000;
  if (answer.selectedAnswer) {
    timer = 1000; // 用户选择答案后缩短定时器时间
  }

  if (answer.isCorrect !== null) {
    timer = 2000; // 显示正确与否状态时停止定时器
  }

  // 这里在Answers组件和Quiz组件中间加了一层处理逻辑，用于设定当前Question组件的answer状态
  // 包括用户选择答案后的状态变化，以及定时器结束跳过问题的处理
  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null
    });

    // 一秒后再设定正确与否状态，给用户一个视觉反馈
    setTimeout(() => {
      // 先设定当前Question组件的answer状态，让用户看到选择正确与否
      setAnswer({
        selectedAnswer: answer,
        isCorrect: answer === QUESTIONS[questionIndex].answers[0]
      });

      // 再过一秒后调用Quiz组件传下来的onSelectAnswer跳到下一个问题
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 1000);
    }, 1000);
  }

  let answerState = '';
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}  // 用户选择answer后timer会变成一个两秒钟的timer，此时需要重新渲染QuestionTimer组件以显示一个新的倒计时
        timeOut={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>

  );
}