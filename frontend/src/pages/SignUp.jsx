import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, MailIcon, LockIcon } from 'lucide-react';
import '../styles/Signup.css';
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup data:', formData);
  };
  return (
    <div className="auth-page fade-in">
      <div className="auth-container">
        <h1 className="auth-title">Create an Account</h1>
        <p className="auth-description">
          Join EduTrack to start tracking your academic progress and achieve your goals.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-container">
              <UserIcon className="input-icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <MailIcon className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <LockIcon className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-container">
              <LockIcon className="input-icon" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" name="terms" required />
              <span className="checkbox-label">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </span>
            </label>
          </div>
          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;