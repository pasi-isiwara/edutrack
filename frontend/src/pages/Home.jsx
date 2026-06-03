import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const features = [
    {
      title: 'Smart Course Paths',
      description:
        'Discover recommended learning paths based on your goals, performance, and interests.',
      icon: 'CP',
    },
    {
      title: 'Progress Analytics',
      description:
        'Track completion rates, quiz trends, and weekly momentum with clear visual insights.',
      icon: 'AN',
    },
    {
      title: 'Career Compass',
      description:
        'Connect your skills to real career tracks and identify your next growth milestones.',
      icon: 'CC',
    },
  ];

  const milestones = [
    'Enroll and set your learning goals',
    'Complete guided modules and assessments',
    'Monitor progress with data-driven feedback',
    'Build confidence and move toward your career target',
  ];

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-inner">
          <p className="hero-kicker reveal reveal-1">Learn with clarity</p>
          <h1 className="hero-title reveal reveal-2">
            Build momentum with
            <span className="hero-title-highlight"> EduTrack</span>
          </h1>
          <p className="hero-subtitle reveal reveal-3">
            A focused learning platform that blends courses, progress intelligence,
            and career guidance in one seamless experience.
          </p>

          <div className="hero-actions reveal reveal-4">
            <a href="/signup" className="hero-btn hero-btn-primary">
              Start Learning
            </a>
            <a href="/login" className="hero-btn hero-btn-ghost">
              Continue Journey
            </a>
          </div>

          <div className="hero-stats reveal reveal-5">
            <article className="stat-card">
              <h3>120+</h3>
              <p>Guided Modules</p>
            </article>
            <article className="stat-card">
              <h3>92%</h3>
              <p>Completion Confidence</p>
            </article>
            <article className="stat-card">
              <h3>24/7</h3>
              <p>Learning Access</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-features">
        <header className="section-head reveal reveal-1">
          <p className="section-kicker">Why EduTrack</p>
          <h2>Everything you need to keep moving forward</h2>
        </header>

        <div className="feature-grid">
          {features.map((feature, index) => (
            <article
              className="feature-card"
              key={feature.title}
              style={{ animationDelay: `${0.15 * (index + 1)}s` }}
            >
              <div className="feature-badge">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-journey">
        <header className="section-head reveal reveal-1">
          <p className="section-kicker">Your Journey</p>
          <h2>From first login to confident career growth</h2>
        </header>

        <div className="journey-timeline">
          {milestones.map((item, index) => (
            <div className="timeline-item" key={item}>
              <span className="timeline-index">{index + 1}</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-cta reveal reveal-2">
        <h2>Ready to turn effort into results?</h2>
        <p>
          Join EduTrack and transform your study routine into measurable
          progress.
        </p>
        <a href="/signup" className="hero-btn hero-btn-primary">
          Create Free Account
        </a>
      </section>
    </div>
  );
};

export default Home;
