import React from 'react';
import { Link } from 'react-router-dom';
import './Quiz.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/quiz">Start Again</Link>
    </nav>
  );
};

export default Navbar;
