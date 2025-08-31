import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookIcon, BarChart2Icon, TrendingUpIcon } from 'lucide-react';
import '../styles/Home.css';
const Home = () => {
  const featuresRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((el) => observer.observe(el));
    return () => {
      featureElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content fade-in">
          <h1 className="hero-title">
            Track Your Academic Journey with 
            <span className="brand-highlight"> EduTrack</span>
          </h1>
          <p className="hero-description">
            A comprehensive platform for students and teachers to 
            manage courses, track progress, and achieve academic goals.
          </p>
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>
        </div>
      </section>
      <section className="features-section" ref={featuresRef}>
        <h2 className="features-title">Everything you need for academic success</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon course-icon">
              <BookIcon />
            </div>
            <h3 className="feature-title">Course Management</h3>
            <p className="feature-description">
              Easily enroll in courses, track lectures, and manage your academic 
              modules all in one place.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon progress-icon">
              <BarChart2Icon />
            </div>
            <h3 className="feature-title">Progress Tracking</h3>
            <p className="feature-description">
              Monitor your academic progress with visual indicators and see what 
              you need to achieve your desired grades.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon career-icon">
              <TrendingUpIcon />
            </div>
            <h3 className="feature-title">Career Development</h3>
            <p className="feature-description">
              Set career goals, receive personalized recommendations, and build 
              skills for your future profession.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;