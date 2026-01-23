import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookIcon, PlusIcon, UsersIcon, ClipboardListIcon, AwardIcon } from 'lucide-react';
import '../styles/TeacherDashboard.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        // Get logged-in user's ID from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          console.error('No user found in localStorage');
          setLoading(false);
          return;
        }

        // Fetch courses only for this teacher
        const response = await fetch(`http://localhost:5000/api/courses/teacher/${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data);
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

      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
        alert('Failed to load courses. Please try again.');
      }
    };

    fetchCourses();
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