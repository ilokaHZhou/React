import { use } from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import QUESTIONS from '../questions.js';

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter(answer => answer === null).length;
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  ).length;
  const incorrectAnswers = userAnswers.length - skippedAnswers - correctAnswers;

  const skippedAnsersShare = ((skippedAnswers / userAnswers.length) * 100).toFixed(0);
  const correctAnswersShare = ((correctAnswers / userAnswers.length) * 100).toFixed(0);
  const incorrectAnswersShare = ((incorrectAnswers / userAnswers.length) * 100).toFixed(0);
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Quiz Complete" />
      <h2>Quiz Complete!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnsersShare}%</span>
          <span className="text">Questions Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}%</span>
          <span className="text">Answered Correctly</span>
        </p>
        <p>
          <span className="number">{incorrectAnswersShare}%</span>
          <span className="text">Answered Incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';
          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === QUESTIONS[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ? answer : 'Skipped' }</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}