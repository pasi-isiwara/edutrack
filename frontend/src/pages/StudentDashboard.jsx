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
    console.log('Enrolling with data:', enrollmentData);
    setEnrollmentData({
      moduleCode: '',
      enrollmentKey: ''
    });
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.sd-course-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('sd-visible');
      }, 100 * index);
    });
  }, []);

  return (
    <div className="sd-dashboard-container">
      <SidebarNav />
      <div className="sd-dashboard-content">
        <h1 className="sd-dashboard-title">Student Dashboard</h1>
        <div className="sd-enrollment-section">
          <h2>Enroll to New Module</h2>
          <form className="sd-enrollment-form" onSubmit={handleEnroll}>
            <div className="sd-form-group">
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
            <div className="sd-form-group">
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
            <button type="submit" className="sd-enroll-button">Enroll</button>
          </form>
        </div>

        <div className="sd-modules-section">
          <div className="sd-section-header">
            <h2>My Modules</h2>
            <Link to="/courses" className="sd-view-all-link">View All</Link>
          </div>
          <div className="sd-courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="sd-course-card">
                <div className="sd-course-icon">
                  <BookIcon />
                </div>
                <div className="sd-course-details">
                  <Link to={`/course/${course.code}`} className="sd-course-title">
                    {course.title}
                  </Link>
                  <p className="sd-course-code">{course.code}</p>

                  <div className="sd-hours-section">
                    <span>Hours</span>
                    <div className="sd-progress-container">
                      <div 
                        className="sd-progress-bar" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="sd-progress-text">{course.hoursCompleted}/{course.totalHours}</span>
                  </div>

                  <div className="sd-assessments-section">
                    <h4>Recent Assessments</h4>
                    {course.assessments.map((assessment) => (
                      <div key={assessment.id} className="sd-assessment-item">
                        <span>{assessment.title}</span>
                        <span className="sd-assessment-score">
                          {assessment.completed ? 
                            `${assessment.score}/${assessment.maxScore}` : 
                            'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="sd-eligibility-section">
                    <span>Exam Eligibility</span>
                    <span className={`sd-eligibility-status ${course.eligible ? 'sd-eligible' : 'sd-not-eligible'}`}>
                      {course.eligible ? 
                        <><CheckCircleIcon size={16} /> Eligible</> : 
                        'Not Eligible'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/courses" className="sd-enroll-more-card">
              <div className="sd-enroll-more-content">
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
