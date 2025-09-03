import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookIcon, PlusIcon, UsersIcon, ClipboardListIcon, AwardIcon } from 'lucide-react';
import '../styles/TeacherDashboard.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate API call to fetch teacher's courses
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          code: 'CS101',
          name: 'Introduction to Computer Science',
          enrolledStudents: 32,
          topics: 6,
          completedTopics: 4,
          assessments: 5,
          completedAssessments: 2
        },
        {
          id: 2,
          code: 'CS201',
          name: 'Data Structures and Algorithms',
          enrolledStudents: 24,
          topics: 8,
          completedTopics: 3,
          assessments: 6,
          completedAssessments: 1
        },
        {
          id: 3,
          code: 'WD101',
          name: 'Web Development Fundamentals',
          enrolledStudents: 45,
          topics: 10,
          completedTopics: 6,
          assessments: 4,
          completedAssessments: 3
        }
      ];
      setCourses(mockCourses);
      setLoading(false);
      // Animation for course cards
      setTimeout(() => {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, 100 * index);
        });
      }, 100);
    }, 800);
  }, []);
  const getCompletionPercentage = (completed, total) => {
    return Math.round((completed / total) * 100);
  };
  if (loading) {
    return (
      <div className="teacher-dashboard-container">
        <TeacherSidebarNav />
        <div className="teacher-dashboard-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="teacher-dashboard-container">
      <TeacherSidebarNav />
      <div className="teacher-dashboard-content">
        <h1 className="dashboard-title">Teacher Dashboard</h1>
        <div className="courses-overview">
          <div className="overview-card">
            <div className="overview-icon">
              <BookIcon size={24} />
            </div>
            <div className="overview-details">
              <h3>{courses.length}</h3>
              <p>Total Courses</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon">
              <UsersIcon size={24} />
            </div>
            <div className="overview-details">
              <h3>{courses.reduce((sum, course) => sum + course.enrolledStudents, 0)}</h3>
              <p>Total Students</p>
            </div>
          </div>
          <div className="overview-card">
            <div className="overview-icon">
              <ClipboardListIcon size={24} />
            </div>
            <div className="overview-details">
              <h3>{courses.reduce((sum, course) => sum + course.assessments, 0)}</h3>
              <p>Total Assessments</p>
            </div>
          </div>
        </div>
        <div className="courses-section">
          <div className="section-header">
            <h2>My Courses</h2>
            <Link to="/teacher/add-course" className="add-course-button">
              <PlusIcon size={16} />
              <span>Add New Course</span>
            </Link>
          </div>
          <div className="courses-grid">
            {courses.map((course) => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <div className="course-icon">
                    <BookIcon size={24} />
                  </div>
                  <div className="course-meta">
                    <span className="course-code">{course.code}</span>
                    <div className="students-count">
                      <UsersIcon size={14} />
                      <span>{course.enrolledStudents} students</span>
                    </div>
                  </div>
                </div>
                <h3 className="course-title">{course.name}</h3>
                <div className="course-progress">
                  <div className="progress-item">
                    <div className="progress-label">
                      <span>Topics</span>
                      <span>{course.completedTopics}/{course.topics}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${getCompletionPercentage(course.completedTopics, course.topics)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-label">
                      <span>Assessments</span>
                      <span>{course.completedAssessments}/{course.assessments}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ width: `${getCompletionPercentage(course.completedAssessments, course.assessments)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="course-actions">
                  <Link to={`/teacher/view-course/${course.id}`} className="view-course-button">
                    View Course
                  </Link>
                  <Link to={`/teacher/update-course/${course.id}`} className="update-course-button">
                    Update
                  </Link>
                </div>
              </div>
            ))}
            <Link to="/teacher/add-course" className="add-course-card">
              <div className="add-course-content">
                <div className="add-icon">
                  <PlusIcon size={32} />
                </div>
                <h3>Add New Course</h3>
                <p>Create a new module for your students</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TeacherDashboard;