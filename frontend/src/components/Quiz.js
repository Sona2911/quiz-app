import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/quiz`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  }, [API_URL]);

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true); // Show results after the last question
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result-card">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={handleRestart}>Start Again</button>
        </div>
      ) : (
        questions.length > 0 && (
          <div className="question-card">
            <h2>Question {currentQuestion + 1} / {questions.length}</h2>
            <p>{questions[currentQuestion]?.question}</p>
            <ul>
              {questions[currentQuestion]?.options.map((option, index) => (
                <li
                  key={index}
                  className={selectedAnswer === option ? 'selected' : ''}
                  onClick={() => setSelectedAnswer(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="nav-buttons">
              <button onClick={handleBack} disabled={currentQuestion === 0}>Back</button>
              <button onClick={handleNext}>
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
