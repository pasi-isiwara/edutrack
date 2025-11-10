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
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/courses/${courseId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course details');
        }
        
        const data = await response.json();
        
        // Transform the data to match the expected format
        const formattedCourse = {
          id: data.id,
          code: data.code,
          name: data.name,
          enrollmentKey: data.enrollmentKey,
          enrolledStudents: data.enrolledStudents || [],
          topics: data.topics.map(topic => ({
            id: topic.id,
            name: topic.name,
            hours: topic.hours,
            completed: topic.completed || false
          })),
          assessments: data.assessments.map(assessment => ({
            id: assessment.id,
            name: assessment.name,
            date: assessment.date,
            marks: assessment.marks,
            contentCovered: assessment.content_covered || '',
            structure: assessment.structure || '',
            completed: assessment.completed || false
          })),
          eligibilityCriteria: data.eligibilityCriteria || '',
          specialNotes: data.specialNotes || ''
        };
        
        setCourse(formattedCourse);
        setSpecialNotes(formattedCourse.specialNotes);
        setLoading(false);
        
        // Animate elements
        setTimeout(() => {
          const elements = document.querySelectorAll('.vc-animate-in');
          elements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('visible');
            }, 100 * index);
          });
        }, 100);
        
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
        alert('Failed to load course details. Please try again.');
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const toggleStudentsList = () => {
    setShowStudents(!showStudents);
  };

  const handleTopicCompletion = async (topicId, completed) => {
    try {
      // Update in state first
      setCourse({
        ...course,
        topics: course.topics.map(topic => 
          topic.id === topicId ? { ...topic, completed } : topic
        )
      });

      // Update in database
      const response = await fetch(`http://localhost:5000/api/courses/topics/${topicId}/completion`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        throw new Error('Failed to update topic completion');
      }

    } catch (error) {
      console.error('Error updating topic completion:', error);
      alert('Failed to update topic completion. Please try again.');
    }
  };

  const handleAssessmentCompletion = async (assessmentId, completed) => {
    try {
      // Update in state first
      setCourse({
        ...course,
        assessments: course.assessments.map(assessment => 
          assessment.id === assessmentId ? { ...assessment, completed } : assessment
        )
      });

      // Update in database
      const response = await fetch(`http://localhost:5000/api/courses/assessments/${assessmentId}/completion`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed })
      });

      if (!response.ok) {
        throw new Error('Failed to update assessment completion');
      }

    } catch (error) {
      console.error('Error updating assessment completion:', error);
      alert('Failed to update assessment completion. Please try again.');
    }
  };

  const handleNotesChange = (e) => {
    setSpecialNotes(e.target.value);
  };

  const saveNotes = async () => {
    try {
      // Update in database
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}/notes`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ specialNotes })
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      // Update in state
      setCourse({
        ...course,
        specialNotes
      });
      setEditingNotes(false);
      
      // Show success message
      const saveConfirmation = document.querySelector('.vc-save-confirmation');
      saveConfirmation.classList.add('show');
      setTimeout(() => {
        saveConfirmation.classList.remove('show');
      }, 3000);

    } catch (error) {
      console.error('Error updating notes:', error);
      alert('Failed to save notes. Please try again.');
    }
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
                    <button 
                      className={`vc-completion-button ${topic.completed ? 'completed' : 'pending'}`}
                      onClick={() => handleTopicCompletion(topic.id, !topic.completed)}
                      title={topic.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {topic.completed ? (
                        <>
                          <CheckCircleIcon size={20} />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <ClockIcon size={20} />
                          <span>Pending</span>
                        </>
                      )}
                    </button>
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
                      <br />
                      <span className="vc-assessment-marks">
                        Marks: {assessment.marks}
                      </span>
                    </div>
                  </div>
                  <div className="vc-assessment-details">
                    <div className="vc-detail-item">
                      <span className="vc-detail-label">Content Covered : </span>
                      <span>{assessment.contentCovered}</span>
                    </div>
                    <div className="vc-detail-item">
                      <span className="vc-detail-label">Structure : </span>
                      <span>{assessment.structure}</span>
                      <br />
                      <br />

                    </div>
                  </div>
                  <div className="vc-completion-toggle">
                    <button 
                      className={`vc-completion-button ${assessment.completed ? 'completed' : 'pending'}`}
                      onClick={() => handleAssessmentCompletion(assessment.id, !assessment.completed)}
                      title={assessment.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {assessment.completed ? (
                        <>
                          <CheckCircleIcon size={20} />
                          <span>Completed</span>
                        </>
                      ) : (
                        <>
                          <ClockIcon size={20} />
                          <span>Pending</span>
                        </>
                      )}
                    </button>
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
