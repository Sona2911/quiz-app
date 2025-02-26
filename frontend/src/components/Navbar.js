import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Quiz Game</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/quiz">Start Quiz</Link>
      </div>
    </nav>
  );
};

export default Navbar;