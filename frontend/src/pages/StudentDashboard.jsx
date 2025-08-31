import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookIcon, BarChart2Icon, CheckCircleIcon, PlusIcon } from 'lucide-react';
import '../styles/StudentDashboard.css';
import SidebarNav from '../components/SidebarNav';
const StudentDashboard = () => {
  const [enrollmentData, setEnrollmentData] = useState({
    moduleCode: '',
    enrollmentKey: ''
  });
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Computer Science',
      code: 'CS101',
      progress: 64.4,
      hoursCompleted: 29,
      totalHours: 45,
      assessments: [
        { id: 1, title: 'Quiz 1', score: 85, maxScore: 100, completed: true },
        { id: 2, title: 'Assignment 1', score: 78, maxScore: 100, completed: true }
      ],
      eligible: true
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      code: 'CS201',
      progress: 32,
      hoursCompleted: 12,
      totalHours: 38,
      assessments: [
        { id: 3, title: 'Assignment 1', score: 92, maxScore: 100, completed: true },
        { id: 4, title: 'Mid-term', score: null, maxScore: 100, completed: false }
      ],
      eligible: false
    }
  ]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnrollmentData({
      ...enrollmentData,
      [name]: value
    });
  };
  const handleEnroll = (e) => {
    e.preventDefault();
    // Enrollment logic would go here
    console.log('Enrolling with data:', enrollmentData);
    // Reset form
    setEnrollmentData({
      moduleCode: '',
      enrollmentKey: ''
    });
    // Show success message or feedback
  };
  useEffect(() => {
    // Animation for cards
    const cards = document.querySelectorAll('.course-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, 100 * index);
    });
  }, []);
  return (
    <div className="dashboard-container">
      <SidebarNav />
      <div className="dashboard-content">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <div className="enrollment-section">
          <h2>Enroll to New Module</h2>
          <form className="enrollment-form" onSubmit={handleEnroll}>
            <div className="form-group">
              <label htmlFor="moduleCode">Module Code:</label>
              <input 
                type="text" 
                id="moduleCode" 
                name="moduleCode"
                value={enrollmentData.moduleCode}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="enrollmentKey">Enrollment key:</label>
              <input 
                type="text" 
                id="enrollmentKey" 
                name="enrollmentKey"
                value={enrollmentData.enrollmentKey}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="enroll-button">Enroll</button>
          </form>
        </div>
        <div className="modules-section">
          <div className="section-header">
            <h2>My Modules</h2>
            <Link to="/courses" className="view-all-link">View All</Link>
          </div>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-icon">
                  <BookIcon />
                </div>
                <div className="course-details">
                  <Link to={`/course/${course.code}`} className="course-title">
                    {course.title}
                  </Link>
                  <p className="course-code">{course.code}</p>
                  <div className="hours-section">
                    <span>Hours</span>
                    <div className="progress-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{course.hoursCompleted}/{course.totalHours}</span>
                  </div>
                  <div className="assessments-section">
                    <h4>Recent Assessments</h4>
                    {course.assessments.map((assessment) => (
                      <div key={assessment.id} className="assessment-item">
                        <span>{assessment.title}</span>
                        <span className="assessment-score">
                          {assessment.completed ? 
                            `${assessment.score}/${assessment.maxScore}` : 
                            'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="eligibility-section">
                    <span>Exam Eligibility</span>
                    <span className={`eligibility-status ${course.eligible ? 'eligible' : 'not-eligible'}`}>
                      {course.eligible ? 
                        <><CheckCircleIcon size={16} /> Eligible</> : 
                        'Not Eligible'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/courses" className="enroll-more-card">
              <div className="enroll-more-content">
                <PlusIcon size={32} />
                <p>Enroll in More Modules</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;