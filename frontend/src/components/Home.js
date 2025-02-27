import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Welcome to the Quiz Game!</h2>
      <button onClick={() => navigate('/quiz')}>Start Quiz</button>
    </div>
  );
};

export default Home;