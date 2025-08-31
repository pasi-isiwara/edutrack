import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { BookOpenIcon } from 'lucide-react';
const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <BookOpenIcon className="logo-icon" />
          <span className="logo-text">EduTrack</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          {location.pathname !== '/login' && (
            <Link to="/login" className="nav-button">
              Log In
            </Link>
          )}
          {location.pathname === '/login' && (
            <Link to="/signup" className="nav-button">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;