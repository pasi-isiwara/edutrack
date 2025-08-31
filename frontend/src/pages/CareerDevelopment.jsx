import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, GraduationCapIcon, CalendarIcon, 
  MapPinIcon, ClockIcon, UsersIcon, CheckIcon, FilterIcon
} from 'lucide-react';
import '../styles/CareerDevelopment.css';
import SidebarNav from '../components/SidebarNav';
const CareerDevelopment = () => {
  const [selectedCareer, setSelectedCareer] = useState('software-developer');
  const [filterType, setFilterType] = useState('all');
  const careers = [
    { id: 'software-developer', name: 'Software Developer' },
    { id: 'data-scientist', name: 'Data Scientist' },
    { id: 'cybersecurity-specialist', name: 'Cybersecurity Specialist' },
    { id: 'network-engineer', name: 'Network Engineer' },
    { id: 'ui-ux-designer', name: 'UI/UX Designer' }
  ];
  const careerModules = {
    'software-developer': [
      { id: 1, code: 'CS101', name: 'Introduction to Computer Science', level: 'Beginner' },
      { id: 2, code: 'CS201', name: 'Data Structures and Algorithms', level: 'Intermediate' },
      { id: 3, code: 'WD101', name: 'Web Development Fundamentals', level: 'Beginner' },
      { id: 4, code: 'DB101', name: 'Database Management Systems', level: 'Intermediate' },
      { id: 5, code: 'SE301', name: 'Software Engineering Principles', level: 'Advanced' }
    ],
    'data-scientist': [
      { id: 6, code: 'CS101', name: 'Introduction to Computer Science', level: 'Beginner' },
      { id: 7, code: 'STAT201', name: 'Statistics for Data Science', level: 'Intermediate' },
      { id: 8, code: 'ML301', name: 'Machine Learning Fundamentals', level: 'Advanced' },
      { id: 9, code: 'DB101', name: 'Database Management Systems', level: 'Intermediate' },
      { id: 10, code: 'DS401', name: 'Advanced Data Analysis', level: 'Advanced' }
    ],
    'cybersecurity-specialist': [
      { id: 11, code: 'CS101', name: 'Introduction to Computer Science', level: 'Beginner' },
      { id: 12, code: 'NET201', name: 'Computer Networks', level: 'Intermediate' },
      { id: 13, code: 'SEC301', name: 'Information Security Fundamentals', level: 'Advanced' },
      { id: 14, code: 'SEC302', name: 'Ethical Hacking', level: 'Advanced' },
      { id: 15, code: 'SEC401', name: 'Cryptography and Network Security', level: 'Advanced' }
    ],
    'network-engineer': [
      { id: 16, code: 'CS101', name: 'Introduction to Computer Science', level: 'Beginner' },
      { id: 17, code: 'NET201', name: 'Computer Networks', level: 'Intermediate' },
      { id: 18, code: 'NET301', name: 'Network Administration', level: 'Advanced' },
      { id: 19, code: 'NET302', name: 'Cloud Infrastructure', level: 'Advanced' },
      { id: 20, code: 'SEC301', name: 'Information Security Fundamentals', level: 'Advanced' }
    ],
    'ui-ux-designer': [
      { id: 21, code: 'DES101', name: 'Design Principles', level: 'Beginner' },
      { id: 22, code: 'UX201', name: 'User Experience Design', level: 'Intermediate' },
      { id: 23, code: 'UI301', name: 'User Interface Design', level: 'Advanced' },
      { id: 24, code: 'WD101', name: 'Web Development Fundamentals', level: 'Beginner' },
      { id: 25, code: 'DES401', name: 'Design Systems', level: 'Advanced' }
    ]
  };
  const workshops = [
    {
      id: 1,
      title: 'Introduction to React.js',
      type: 'workshop',
      date: '2023-09-15',
      time: '10:00 AM - 2:00 PM',
      location: 'Tech Hub, Room 302',
      instructor: 'Dr. Jane Smith',
      capacity: 30,
      registered: 18,
      skills: ['Frontend Development', 'JavaScript', 'React']
    },
    {
      id: 2,
      title: 'Data Science Career Fair',
      type: 'event',
      date: '2023-09-20',
      time: '9:00 AM - 4:00 PM',
      location: 'University Main Hall',
      companies: 15,
      skills: ['Networking', 'Career Development', 'Data Science']
    },
    {
      id: 3,
      title: 'Cybersecurity Bootcamp',
      type: 'workshop',
      date: '2023-10-05',
      time: '9:00 AM - 5:00 PM',
      location: 'Security Lab, Building B',
      instructor: 'Prof. Michael Chen',
      capacity: 25,
      registered: 25,
      skills: ['Cybersecurity', 'Ethical Hacking', 'Network Security']
    },
    {
      id: 4,
      title: 'UI/UX Design Sprint',
      type: 'workshop',
      date: '2023-10-12',
      time: '1:00 PM - 5:00 PM',
      location: 'Design Studio, Room 105',
      instructor: 'Sarah Johnson',
      capacity: 20,
      registered: 12,
      skills: ['UI Design', 'UX Design', 'Prototyping']
    },
    {
      id: 5,
      title: 'Tech Industry Networking Night',
      type: 'event',
      date: '2023-10-18',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Center',
      companies: 25,
      skills: ['Networking', 'Career Development', 'Professional Skills']
    }
  ];
  const filteredWorkshops = filterType === 'all' 
    ? workshops 
    : workshops.filter(item => item.type === filterType);
  useEffect(() => {
    // Animation for modules
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 100 * index);
    });
    // Animation for workshops
    const workshopItems = document.querySelectorAll('.workshop-item');
    workshopItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('visible');
      }, 150 * index);
    });
  }, [selectedCareer, filteredWorkshops]);
  return (
    <div className="career-container">
      <SidebarNav />
      <div className="career-content">
        <h1 className="career-title">Career Development</h1>
        <div className="career-path-section">
          <h2>Choose Your Career Path</h2>
          <div className="career-selector">
            {careers.map(career => (
              <button
                key={career.id}
                className={`career-option ${selectedCareer === career.id ? 'selected' : ''}`}
                onClick={() => setSelectedCareer(career.id)}
              >
                <BriefcaseIcon size={20} />
                <span>{career.name}</span>
                {selectedCareer === career.id && <CheckIcon size={16} className="check-icon" />}
              </button>
            ))}
          </div>
          <div className="selected-career-info">
            <h3>
              <BriefcaseIcon size={20} />
              {careers.find(c => c.id === selectedCareer)?.name} Career Path
            </h3>
            <p>Recommended modules to help you build skills for this career path.</p>
          </div>
        </div>
        <div className="modules-section">
          <h2>Recommended Modules</h2>
          <div className="modules-list">
            {careerModules[selectedCareer].map(module => (
              <div key={module.id} className="module-item">
                <div className="module-header">
                  <div className="module-icon">
                    <GraduationCapIcon size={20} />
                  </div>
                  <span className={`module-level ${module.level.toLowerCase()}`}>
                    {module.level}
                  </span>
                </div>
                <div className="module-body">
                  <h3 className="module-name">{module.name}</h3>
                  <p className="module-code">{module.code}</p>
                </div>
                <Link to={`/course/${module.code}`} className="module-button">
                  View Module
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="workshops-section">
          <div className="section-header">
            <h2>Upcoming Workshops & Events</h2>
            <div className="filter-buttons">
              <button 
                className={`filter-button ${filterType === 'all' ? 'active' : ''}`} 
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${filterType === 'workshop' ? 'active' : ''}`} 
                onClick={() => setFilterType('workshop')}
              >
                Workshops
              </button>
              <button 
                className={`filter-button ${filterType === 'event' ? 'active' : ''}`} 
                onClick={() => setFilterType('event')}
              >
                Events
              </button>
            </div>
          </div>
          <div className="workshops-list">
            {filteredWorkshops.map(item => (
              <div key={item.id} className={`workshop-item ${item.type}`}>
                <div className="workshop-date">
                  <CalendarIcon size={18} />
                  <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <h3 className="workshop-title">{item.title}</h3>
                <div className="workshop-details">
                  <div className="detail">
                    <ClockIcon size={16} />
                    <span>{item.time}</span>
                  </div>
                  <div className="detail">
                    <MapPinIcon size={16} />
                    <span>{item.location}</span>
                  </div>
                  {item.type === 'workshop' && (
                    <>
                      <div className="detail">
                        <UsersIcon size={16} />
                        <span>{item.registered} / {item.capacity} registered</span>
                      </div>
                    </>
                  )}
                  {item.type === 'event' && (
                    <div className="detail">
                      <BriefcaseIcon size={16} />
                      <span>{item.companies} companies</span>
                    </div>
                  )}
                </div>
                <div className="skills-tags">
                  {item.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                <button className="register-button">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CareerDevelopment;