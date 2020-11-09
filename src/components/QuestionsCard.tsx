import React from 'react';

import { AnswerObject } from '../App';
// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';


type props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}
const QuestionsCard: React.FC<props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }) => (
  <Wrapper>
    <div>
      <p className='number'>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(answer => (
          <ButtonWrapper
          key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
            <span dangerouslySetInnerHTML={{ __html: answer }} />
          </button>
        </ButtonWrapper>
        ))}
      </div>
    </div>
  </Wrapper>
);

export default QuestionsCard;
