import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
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
  };

  return (
    <div className="quiz-container">
      {questions.map((q, index) => (
        <div className="question-card" key={index}>
          <h3>{q.question}</h3>
          {q.options.map(option => (
            <label key={option}>
              <input
                type="radio"
                name={q.question}
                value={option}
                onChange={() => handleChange(q.question, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      {score !== null && (
        <div className="score-container">
          <h2>Your Score: {score}/{questions.length}</h2>
          <button onClick={handleRestart}>Start Again</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
