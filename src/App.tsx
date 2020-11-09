import React, { useState } from 'react';
import { fetchQuizQuestions, Difficulty, QuestionsState } from './API';
// C
import QuestionsCard from './components/QuestionsCard';
import { GlobalStyle } from './App.styles';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}
const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


  console.log(questions);

  // Functions
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestion = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);


  };
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);
      const answerObject = {
        question: questions[number].question, answer, correct, correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }

  };
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };


  return (
    <>
      <GlobalStyle />
      <div className='APP'>
        <div className='text-center'>
          <h1>React Quiz</h1>
          {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
            (
              <button className='start' onClick={startQuiz}>Start</button>
            ) : null}
        </div>

        {!gameOver ? <p className='score text-white'>Score: {score}</p> : null}
        {loading && <p>Loading Questions....</p>}

        {!loading && !gameOver && (
          <QuestionsCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>Next</button>
        ) : null}

      </div>
    </>
  );
}

export default App;
