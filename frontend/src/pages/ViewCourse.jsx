import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  BookOpenIcon, UsersIcon, CheckCircleIcon, XCircleIcon, 
  EditIcon, ClipboardListIcon, AlertCircleIcon, SaveIcon,ClockIcon
} from 'lucide-react';
import '../styles/ViewCourse.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showStudents, setShowStudents] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');
  const [course, setCourse] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockCourse = {
        id: courseId,
        code: 'CS101',
        name: 'Introduction to Computer Science',
        enrollmentKey: 'cs101key',
        enrolledStudents: [
          { id: 1, name: 'John Doe', regNumber: 'ST12345' },
          { id: 2, name: 'Jane Smith', regNumber: 'ST12346' },
          { id: 3, name: 'Bob Johnson', regNumber: 'ST12347' },
          { id: 4, name: 'Alice Williams', regNumber: 'ST12348' },
          { id: 5, name: 'Charlie Brown', regNumber: 'ST12349' }
        ],
        topics: [
          { id: 1, name: 'Introduction to Programming', hours: 8, completed: true },
          { id: 2, name: 'Data Types and Variables', hours: 6, completed: true },
          { id: 3, name: 'Control Structures', hours: 7, completed: false },
          { id: 4, name: 'Functions and Procedures', hours: 8, completed: false },
          { id: 5, name: 'Arrays and Lists', hours: 6, completed: false },
          { id: 6, name: 'Object-Oriented Programming', hours: 10, completed: false }
        ],
        assessments: [
          { 
            id: 1, 
            name: 'Quiz 1', 
            date: '2023-09-10', 
            marks: 20,
            contentCovered: 'Introduction to Programming, Data Types and Variables',
            structure: 'Multiple choice questions and short answers',
            completed: true
          },
          { 
            id: 2, 
            name: 'Assignment 1', 
            date: '2023-09-20', 
            marks: 30,
            contentCovered: 'Control Structures, Functions and Procedures',
            structure: 'Programming exercises and problem solving',
            completed: false
          },
          { 
            id: 3, 
            name: 'Mid-term Exam', 
            date: '2023-10-15', 
            marks: 50,
            contentCovered: 'All topics covered up to Functions and Procedures',
            structure: 'Multiple choice, short answers, and programming problems',
            completed: false
          }
        ],
        eligibilityCriteria: 'Need more than 80% attendance and at least 40% for all continuous assessments combined.',
        specialNotes: 'Students are encouraged to practice programming exercises regularly. Office hours are available on Tuesdays and Thursdays from 2-4 PM.'
      };
      setCourse(mockCourse);
      setSpecialNotes(mockCourse.specialNotes);
      setLoading(false);
      setTimeout(() => {
        const elements = document.querySelectorAll('.vc-animate-in');
        elements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, 100 * index);
        });
      }, 100);
    }, 800);
  }, [courseId]);

  const toggleStudentsList = () => {
    setShowStudents(!showStudents);
  };

  const handleTopicCompletion = (topicId, completed) => {
    setCourse({
      ...course,
      topics: course.topics.map(topic => 
        topic.id === topicId ? { ...topic, completed } : topic
      )
    });
  };

  const handleAssessmentCompletion = (assessmentId, completed) => {
    setCourse({
      ...course,
      assessments: course.assessments.map(assessment => 
        assessment.id === assessmentId ? { ...assessment, completed } : assessment
      )
    });
  };

  const handleNotesChange = (e) => {
    setSpecialNotes(e.target.value);
  };

  const saveNotes = () => {
    setCourse({
      ...course,
      specialNotes
    });
    setEditingNotes(false);
    const saveConfirmation = document.querySelector('.vc-save-confirmation');
    saveConfirmation.classList.add('show');
    setTimeout(() => {
      saveConfirmation.classList.remove('show');
    }, 3000);
  };

  if (loading) {
    return (
      <div className="vc-view-course-container">
        <TeacherSidebarNav />
        <div className="vc-view-course-content">
          <div className="vc-loading-spinner">
            <div className="vc-spinner"></div>
            <p>Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }

  const completedTopics = course.topics.filter(topic => topic.completed).length;
  const completedAssessments = course.assessments.filter(assessment => assessment.completed).length;

  return (
    <div className="vc-view-course-container">
      <TeacherSidebarNav />
      <div className="vc-view-course-content">
        <div className="vc-view-course-header">
          <div className="vc-course-info">
            <h1 className="vc-course-title">{course.name}</h1>
            <div className="vc-course-meta">
              <span className="vc-course-code">{course.code}</span>
              <span className="vc-enrollment-key">
                Enrollment Key: <strong>{course.enrollmentKey}</strong>
              </span>
            </div>
          </div>
          <Link 
            to={`/teacher/update-course/${course.id}`} 
            className="vc-update-course-button"
          >
            <EditIcon size={16} />
            <span>Update Course</span>
          </Link>
        </div>
        <div className="vc-save-confirmation">
          <SaveIcon size={16} />
          <span>Changes saved successfully!</span>
        </div>
        <div className="vc-course-overview vc-animate-in">
          <div className="vc-overview-card">
            <div className="vc-overview-icon students">
              <UsersIcon size={24} />
            </div>
            <div className="vc-overview-details">
              <h3>{course.enrolledStudents.length}</h3>
              <p>Enrolled Students</p>
            </div>
            <button 
              className="vc-view-details-button"
              onClick={toggleStudentsList}
            >
              {showStudents ? 'Hide' : 'View'}
            </button>
          </div>
          <div className="vc-overview-card">
            <div className="vc-overview-icon topics">
              <ClipboardListIcon size={24} />
            </div>
            <div className="vc-overview-details">
              <h3>{completedTopics}/{course.topics.length}</h3>
              <p>Completed Topics</p>
            </div>
          </div>
          <div className="vc-overview-card">
            <div className="vc-overview-icon assessments">
              <AlertCircleIcon size={24} />
            </div>
            <div className="vc-overview-details">
              <h3>{completedAssessments}/{course.assessments.length}</h3>
              <p>Completed Assessments</p>
            </div>
          </div>
        </div>

        {showStudents && (
          <div className="vc-students-list vc-animate-in">
            <h2 className="vc-section-title">Enrolled Students</h2>
            <div className="vc-table-container">
              <table className="vc-students-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Registration Number</th>
                  </tr>
                </thead>
                <tbody>
                  {course.enrolledStudents.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.regNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="vc-course-sections">
          <div className="vc-topics-section vc-animate-in">
            <h2 className="vc-section-title">Topics</h2>
            <div className="vc-topics-list">
              {course.topics.map(topic => (
                <div key={topic.id} className="vc-topic-item">
                  <div className="vc-topic-content">
                    <h3 className="vc-topic-name">{topic.name}</h3>
                    <span className="vc-topic-hours">{topic.hours} hours</span>
                  </div>
                  <div className="vc-completion-toggle">
                    <label className="vc-toggle-label">
                      <input 
                        type="checkbox"
                        checked={topic.completed}
                        onChange={(e) => handleTopicCompletion(topic.id, e.target.checked)}
                      />
                        <span className="vc-icon">
    {topic.completed ? (
      <CheckCircleIcon size={20} color="#4CAF50" /> // green check
    ) : (
      <ClockIcon size={20} color="#FFC107" /> // pending mark (yellow clock)
    )}
  </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="vc-assessments-section vc-animate-in">
            <h2 className="vc-section-title">Assessments</h2>
            <div className="vc-assessments-list">
              {course.assessments.map(assessment => (
                <div key={assessment.id} className="vc-assessment-item">
                  <div className="vc-assessment-header">
                    <h3 className="vc-assessment-name">{assessment.name}</h3>
                    <div className="vc-assessment-meta">
                      <span className="vc-assessment-date">
                        Date: {new Date(assessment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="vc-assessment-marks">
                        Marks: {assessment.marks}
                      </span>
                    </div>
                  </div>
                  <div className="vc-assessment-details">
                    <div className="vc-detail-item">
                      <span className="vc-detail-label">Content Covered:</span>
                      <p>{assessment.contentCovered}</p>
                    </div>
                    <div className="vc-detail-item">
                      <span className="vc-detail-label">Structure:</span>
                      <p>{assessment.structure}</p>
                    </div>
                  </div>
                  <div className="vc-completion-toggle">
                    <label className="vc-toggle-label">
                      <input 
                        type="checkbox"
                        checked={assessment.completed}
                        onChange={(e) => handleAssessmentCompletion(assessment.id, e.target.checked)}
                      />
                      <span className="vc-toggle-text">
                        {assessment.completed ? (
      <CheckCircleIcon size={20} color="#4CAF50" /> // green check
    ) : (
      <ClockIcon size={20} color="#FFC107" /> // pending mark (yellow clock)
    )}
  </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="vc-additional-info vc-animate-in">
          <div className="vc-eligibility-section">
            <h2 className="vc-section-title">Eligibility Criteria</h2>
            <div className="vc-eligibility-content">
              <p>{course.eligibilityCriteria}</p>
            </div>
          </div>
          <div className="vc-notes-section">
            <div className="vc-notes-header">
              <h2 className="vc-section-title">Special Notes</h2>
              {!editingNotes && (
                <button 
                  className="vc-edit-notes-button"
                  onClick={() => setEditingNotes(true)}
                >
                  <EditIcon size={16} />
                  <span>Edit Notes</span>
                </button>
              )}
            </div>
            {editingNotes ? (
              <div className="vc-notes-editor">
                <textarea 
                  value={specialNotes}
                  onChange={handleNotesChange}
                  rows="4"
                ></textarea>
                <div className="vc-notes-actions">
                  <button 
                    className="vc-cancel-button"
                    onClick={() => {
                      setSpecialNotes(course.specialNotes);
                      setEditingNotes(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    className="vc-save-button"
                    onClick={saveNotes}
                  >
                    <SaveIcon size={16} />
                    <span>Save Notes</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="vc-notes-content">
                <p>{course.specialNotes}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewCourse;
