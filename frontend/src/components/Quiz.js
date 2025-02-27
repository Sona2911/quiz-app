import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz')
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (question, option) => {
    setAnswers({ ...answers, [question]: option });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      if (answers[q.question] === q.correctAnswer) newScore++;
    });
    setScore(newScore);
  };

  const handleRestart = () => {
    setAnswers({});
    setScore(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="quiz-container">
      {score === null ? (
        <div className="question-card">
          <h3>{questions[currentQuestionIndex]?.question}</h3>
          {questions[currentQuestionIndex]?.options.map(option => (
            <label key={option}>
              <input
                type="radio"
                name={questions[currentQuestionIndex].question}
                value={option}
                onChange={() => handleChange(questions[currentQuestionIndex].question, option)}
              />
              {option}
            </label>
          ))}
          <div className="buttons-container">
            <button onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNext}>Next</button>
            ) : (
              <button onClick={handleSubmit}>Submit Quiz</button>
            )}
          </div>
        </div>
      ) : (
        <div className="score-container">
          <h2>Your Score: {score}/{questions.length}</h2>
          <button onClick={handleRestart}>Start Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
