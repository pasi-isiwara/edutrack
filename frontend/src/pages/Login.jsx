import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, LockIcon } from 'lucide-react';
import '../styles/Login.css';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    // Handle login logic here
    console.log('Login data:', formData);
  };
  return (
    <div className="auth-page fade-in">
      <div className="auth-container">
        <h1 className="auth-title">Log In to EduTrack</h1>
        <p className="auth-description">
          Welcome back! Please enter your details to access your account.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <UserIcon className="input-icon" />
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
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" name="remember" />
              <span className="checkbox-label">Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;