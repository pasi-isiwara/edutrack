import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BookOpenIcon, ClockIcon, CheckCircleIcon, 
  XCircleIcon, AlertCircleIcon, CalendarIcon
} from 'lucide-react';
import '../styles/Coursepage.css';
import SidebarNav from '../components/SidebarNav';
const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      // This would normally be an API call
      const courseData = {
        id: 1,
        code: 'CS101',
        name: 'Introduction to Computer Science',
        totalHours: 45,
        completedHours: 29,
        topics: [
          { 
            id: 1, 
            name: 'Introduction to Programming', 
            hours: 8, 
            completed: true 
          },
          { 
            id: 2, 
            name: 'Data Types and Variables', 
            hours: 6, 
            completed: true 
          },
          { 
            id: 3, 
            name: 'Control Structures', 
            hours: 7, 
            completed: true 
          },
          { 
            id: 4, 
            name: 'Functions and Procedures', 
            hours: 8, 
            completed: true 
          },
          { 
            id: 5, 
            name: 'Arrays and Lists', 
            hours: 6, 
            completed: false 
          },
          { 
            id: 6, 
            name: 'Object-Oriented Programming', 
            hours: 10, 
            completed: false 
          }
        ],
        assessments: [
          { 
            id: 1, 
            title: 'Quiz 1', 
            type: 'quiz',
            date: '2023-09-10', 
            maxMarks: 100, 
            marks: 85, 
            completed: true 
          },
          { 
            id: 2, 
            title: 'Assignment 1', 
            type: 'assignment',
            date: '2023-09-20', 
            maxMarks: 100, 
            marks: 78, 
            completed: true 
          },
          { 
            id: 3, 
            title: 'Mid-term Exam', 
            type: 'exam',
            date: '2023-10-15', 
            maxMarks: 100, 
            marks: null, 
            completed: false 
          },
          { 
            id: 4, 
            title: 'Assignment 2', 
            type: 'assignment',
            date: '2023-11-05', 
            maxMarks: 100, 
            marks: null, 
            completed: false 
          },
          { 
            id: 5, 
            title: 'Final Exam', 
            type: 'exam',
            date: '2023-12-10', 
            maxMarks: 100, 
            marks: null, 
            completed: false 
          }
        ]
      };
      setCourse(courseData);
      setLoading(false);
      // Animation for topics and assessments
      setTimeout(() => {
        const topics = document.querySelectorAll('.topic-item');
        topics.forEach((topic, index) => {
          setTimeout(() => {
            topic.classList.add('visible');
          }, 100 * index);
        });
        const assessments = document.querySelectorAll('.assessment-item');
        assessments.forEach((assessment, index) => {
          setTimeout(() => {
            assessment.classList.add('visible');
          }, 100 * index);
        });
      }, 100);
    }, 800);
  }, [courseId]);
  if (loading) {
    return (
      <div className="course-container">
        <SidebarNav />
        <div className="course-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }
  const remainingHours = course.totalHours - course.completedHours;
  const completionPercentage = (course.completedHours / course.totalHours) * 100;
  // Sort assessments by date
  const sortedAssessments = [...course.assessments].sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <div className="course-container">
      <SidebarNav />
      <div className="course-content">
        <div className="course-header">
          <div className="course-title-section">
            <h1 className="course-title">
              {course.name} - {course.code}
            </h1>
            <div className="course-hours">
              <ClockIcon size={20} />
              <span>{remainingHours} hours remaining</span>
            </div>
          </div>
          <div className="progress-overview">
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <div className="progress-stats">
              <span className="completed-hours">{course.completedHours} hrs completed</span>
              <span className="total-hours">{course.totalHours} hrs total</span>
            </div>
          </div>
        </div>
        <div className="course-sections">
          <div className="topics-section">
            <h2 className="section-title">Course Topics</h2>
            <div className="topics-list">
              {course.topics.map(topic => (
                <div key={topic.id} className="topic-item">
                  <div className="topic-status">
                    {topic.completed ? (
                      <div className="status-icon completed">
                        <CheckCircleIcon size={20} />
                      </div>
                    ) : (
                      <div className="status-icon pending">
                        <AlertCircleIcon size={20} />
                      </div>
                    )}
                    <div className="status-line"></div>
                  </div>
                  <div className="topic-content">
                    <h3 className="topic-name">{topic.name}</h3>
                    <div className="topic-hours">
                      <ClockIcon size={16} />
                      <span>{topic.hours} hours</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="assessments-section">
            <h2 className="section-title">Continuous Assessments</h2>
            <div className="assessments-list">
              {sortedAssessments.map(assessment => (
                <div key={assessment.id} className="assessment-item">
                  <div className="assessment-date">
                    <CalendarIcon size={16} />
                    <span>{new Date(assessment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="assessment-content">
                    <div className="assessment-info">
                      <h3 className="assessment-title">
                        {assessment.title}
                      </h3>
                      <span className={`assessment-type ${assessment.type}`}>
                        {assessment.type}
                      </span>
                    </div>
                    <div className="assessment-marks">
                      <div className="marks-allocated">
                        <span>Marks: </span>
                        {assessment.completed ? (
                          <span className="marks-value">{assessment.marks}/{assessment.maxMarks}</span>
                        ) : (
                          <span className="marks-value pending">{assessment.maxMarks}</span>
                        )}
                      </div>
                      <div className="assessment-status">
                        {assessment.completed ? (
                          <div className="status completed">
                            <CheckCircleIcon size={16} />
                            <span>Completed</span>
                          </div>
                        ) : (
                          <div className="status pending">
                            <XCircleIcon size={16} />
                            <span>Pending</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CoursePage;