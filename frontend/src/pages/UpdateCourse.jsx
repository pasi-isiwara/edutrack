import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, PlusIcon, TrashIcon, AlertCircleIcon, SaveIcon, ArrowLeftIcon, GripVerticalIcon
} from 'lucide-react';
import '../styles/UpdateCourse.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [draggedTopicIndex, setDraggedTopicIndex] = useState(null);
  const [draggedAssessmentIndex, setDraggedAssessmentIndex] = useState(null);
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const fetchCourseData = async () => {
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
          name: data.name,
          code: data.code,
          enrollmentKey: data.enrollmentKey,
          topics: data.topics.map(topic => ({
            id: topic.id,
            name: topic.name,
            hours: topic.hours
          })),
          assessments: data.assessments.map(assessment => ({
            id: assessment.id,
            name: assessment.name,
            date: assessment.date,
            marks: assessment.marks,
            contentCovered: assessment.content_covered || '',
            structure: assessment.structure || ''
          })),
          eligibilityCriteria: data.eligibilityCriteria || '',
          specialNotes: data.specialNotes || ''
        };
        
        setCourseData(formattedCourse);
        setLoading(false);
        
        // Animation for form sections
        setTimeout(() => {
          const sections = document.querySelectorAll('.form-section');
          sections.forEach((section, index) => {
            setTimeout(() => {
              section.classList.add('visible');
            }, 100 * index);
          });
        }, 100);
        
      } catch (error) {
        console.error('Error fetching course data:', error);
        setLoading(false);
        alert('Failed to load course details. Please try again.');
      }
    };

    fetchCourseData();
  }, [courseId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };
  const handleTopicChange = (id, field, value) => {
    setCourseData({
      ...courseData,
      topics: courseData.topics.map(topic => 
        topic.id === id ? { ...topic, [field]: value } : topic
      )
    });
  };
  const handleAssessmentChange = (id, field, value) => {
    setCourseData({
      ...courseData,
      assessments: courseData.assessments.map(assessment => 
        assessment.id === id ? { ...assessment, [field]: value } : assessment
      )
    });
  };
  const addTopic = () => {
    const newId = courseData.topics.length > 0 
      ? Math.max(...courseData.topics.map(topic => topic.id)) + 1 
      : 1;
    setCourseData({
      ...courseData,
      topics: [...courseData.topics, { id: newId, name: '', hours: '' }]
    });
    // Animation for the new topic
    setTimeout(() => {
      const newTopic = document.getElementById(`topic-${newId}`);
      if (newTopic) {
        newTopic.classList.add('visible');
      }
    }, 10);
  };
  const removeTopic = (id) => {
    if (courseData.topics.length === 1) {
      return; // Prevent removing the last topic
    }
    setCourseData({
      ...courseData,
      topics: courseData.topics.filter(topic => topic.id !== id)
    });
  };
  const addAssessment = () => {
    const newId = courseData.assessments.length > 0 
      ? Math.max(...courseData.assessments.map(assessment => assessment.id)) + 1 
      : 1;
    setCourseData({
      ...courseData,
      assessments: [...courseData.assessments, { 
        id: newId, 
        name: '', 
        date: '', 
        marks: '', 
        contentCovered: '', 
        structure: '' 
      }]
    });
    // Animation for the new assessment
    setTimeout(() => {
      const newAssessment = document.getElementById(`assessment-${newId}`);
      if (newAssessment) {
        newAssessment.classList.add('visible');
      }
    }, 10);
  };
  const removeAssessment = (id) => {
    if (courseData.assessments.length === 1) {
      return; // Prevent removing the last assessment
    }
    setCourseData({
      ...courseData,
      assessments: courseData.assessments.filter(assessment => assessment.id !== id)
    });
  };

  // Drag and drop handlers for topics
  const handleTopicDragStart = (index) => {
    setDraggedTopicIndex(index);
  };

  const handleTopicDragOver = (e, index) => {
    e.preventDefault();
    if (draggedTopicIndex === null || draggedTopicIndex === index) return;

    const newTopics = [...courseData.topics];
    const draggedTopic = newTopics[draggedTopicIndex];
    newTopics.splice(draggedTopicIndex, 1);
    newTopics.splice(index, 0, draggedTopic);

    setCourseData({
      ...courseData,
      topics: newTopics
    });
    setDraggedTopicIndex(index);
  };

  const handleTopicDragEnd = () => {
    setDraggedTopicIndex(null);
  };

  // Drag and drop handlers for assessments
  const handleAssessmentDragStart = (index) => {
    setDraggedAssessmentIndex(index);
  };

  const handleAssessmentDragOver = (e, index) => {
    e.preventDefault();
    if (draggedAssessmentIndex === null || draggedAssessmentIndex === index) return;

    const newAssessments = [...courseData.assessments];
    const draggedAssessment = newAssessments[draggedAssessmentIndex];
    newAssessments.splice(draggedAssessmentIndex, 1);
    newAssessments.splice(index, 0, draggedAssessment);

    setCourseData({
      ...courseData,
      assessments: newAssessments
    });
    setDraggedAssessmentIndex(index);
  };

  const handleAssessmentDragEnd = () => {
    setDraggedAssessmentIndex(null);
  };

  const validateForm = () => {
    // Basic validation
    if (!courseData.name || !courseData.code || !courseData.enrollmentKey) {
      return false;
    }
    // Check if all topics have name and hours
    const validTopics = courseData.topics.every(topic => topic.name && topic.hours);
    if (!validTopics) return false;
    // Check if all assessments have at least name, date and marks
    const validAssessments = courseData.assessments.every(
      assessment => assessment.name && assessment.date && assessment.marks
    );
    if (!validAssessments) return false;
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      // Send update request to backend
      const response = await fetch(`http://localhost:5000/api/courses/update/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      const result = await response.json();
      console.log('Course updated successfully:', result);

      // Show success message and redirect
      const successMessage = document.querySelector('.success-message');
      successMessage.style.display = 'flex';
      setTimeout(() => {
        navigate(`/teacher/view-course/${courseId}`);
      }, 2000);

    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    }
  };
  if (loading) {
    return (
      <div className="update-course-container">
        <TeacherSidebarNav />
        <div className="update-course-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading course details...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="update-course-container">
      <TeacherSidebarNav />
      <div className="update-course-content">
        <div className="update-course-header">
          <button 
            className="back-button" 
            onClick={() => navigate(`/teacher/view-course/${courseId}`)}
          >
            <ArrowLeftIcon size={16} />
            <span>Back to Course</span>
          </button>
          <h1 className="update-course-title">Update Course</h1>
        </div>
        <div className="success-message">
          <div className="success-content">
            <div className="success-icon">
              <SaveIcon size={24} />
            </div>
            <p>Course updated successfully!</p>
          </div>
        </div>
        <form className="course-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2 className="section-title">
              <BookOpenIcon size={20} />
              <span>Course Information</span>
            </h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Module Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.name ? 'error' : ''}
                />
                {formSubmitted && !courseData.name && (
                  <div className="error-message">
                    <AlertCircleIcon size={14} />
                    <span>Module name is required</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="code">Module Code *</label>
                <input 
                  type="text" 
                  id="code" 
                  name="code"
                  value={courseData.code}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.code ? 'error' : ''}
                />
                {formSubmitted && !courseData.code && (
                  <div className="error-message">
                    <AlertCircleIcon size={14} />
                    <span>Module code is required</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="enrollmentKey">Enrollment Key *</label>
                <input 
                  type="text" 
                  id="enrollmentKey" 
                  name="enrollmentKey"
                  value={courseData.enrollmentKey}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.enrollmentKey ? 'error' : ''}
                />
                {formSubmitted && !courseData.enrollmentKey && (
                  <div className="error-message">
                    <AlertCircleIcon size={14} />
                    <span>Enrollment key is required</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="form-section">
            <div className="section-header">
              <h2 className="section-title">
                <BookOpenIcon size={20} />
                <span>Topics / Learning Outcomes</span>
              </h2>
              <button 
                type="button" 
                className="add-item-button"
                onClick={addTopic}
              >
                <PlusIcon size={16} />
                <span>Add Topic</span>
              </button>
            </div>
            <div className="topics-container">
              {courseData.topics.map((topic, index) => (
                <div 
                  key={topic.id} 
                  className="topic-item visible"
                  id={`topic-${topic.id}`}
                  draggable
                  onDragStart={() => handleTopicDragStart(index)}
                  onDragOver={(e) => handleTopicDragOver(e, index)}
                  onDragEnd={handleTopicDragEnd}
                  style={{ cursor: 'move', position: 'relative' }}
                >
                  <div className="topic-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <GripVerticalIcon size={20} style={{ color: '#666', cursor: 'grab' }} />
                      <h3>Topic {index + 1}</h3>
                    </div>
                    <button 
                      type="button"
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTopic(topic.id);
                      }}
                      disabled={courseData.topics.length === 1}
                      style={{ position: 'absolute', top: '10px', right: '10px' }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                  <div className="topic-form">
                    <div className="form-group">
                      <label htmlFor={`topic-name-${topic.id}`}>Topic Name *</label>
                      <input 
                        type="text" 
                        id={`topic-name-${topic.id}`}
                        value={topic.name}
                        onChange={(e) => handleTopicChange(topic.id, 'name', e.target.value)}
                        className={formSubmitted && !topic.name ? 'error' : ''}
                      />
                      {formSubmitted && !topic.name && (
                        <div className="error-message">
                          <AlertCircleIcon size={14} />
                          <span>Topic name is required</span>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor={`topic-hours-${topic.id}`}>Hours Required *</label>
                      <input 
                        type="number" 
                        id={`topic-hours-${topic.id}`}
                        value={topic.hours}
                        onChange={(e) => handleTopicChange(topic.id, 'hours', e.target.value)}
                        min="1"
                        className={formSubmitted && !topic.hours ? 'error' : ''}
                      />
                      {formSubmitted && !topic.hours && (
                        <div className="error-message">
                          <AlertCircleIcon size={14} />
                          <span>Hours are required</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="section-header">
              <h2 className="section-title">
                <BookOpenIcon size={20} />
                <span>Continuous Assessments</span>
              </h2>
              <button 
                type="button" 
                className="add-item-button"
                onClick={addAssessment}
              >
                <PlusIcon size={16} />
                <span>Add Assessment</span>
              </button>
            </div>
            <div className="assessments-container">
              {courseData.assessments.map((assessment, index) => (
                <div 
                  key={assessment.id} 
                  className="assessment-item visible"
                  id={`assessment-${assessment.id}`}
                  draggable
                  onDragStart={() => handleAssessmentDragStart(index)}
                  onDragOver={(e) => handleAssessmentDragOver(e, index)}
                  onDragEnd={handleAssessmentDragEnd}
                  style={{ cursor: 'move', position: 'relative' }}
                >
                  <div className="assessment-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <GripVerticalIcon size={20} style={{ color: '#666', cursor: 'grab' }} />
                      <h3>Assessment {index + 1}</h3>
                    </div>
                    <button 
                      type="button"
                      className="remove-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeAssessment(assessment.id);
                      }}
                      disabled={courseData.assessments.length === 1}
                      style={{ position: 'absolute', top: '10px', right: '10px' }}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                  <div className="assessment-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor={`assessment-name-${assessment.id}`}>Assessment Name *</label>
                        <input 
                          type="text" 
                          id={`assessment-name-${assessment.id}`}
                          value={assessment.name}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'name', e.target.value)}
                          className={formSubmitted && !assessment.name ? 'error' : ''}
                        />
                        {formSubmitted && !assessment.name && (
                          <div className="error-message">
                            <AlertCircleIcon size={14} />
                            <span>Assessment name is required</span>
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor={`assessment-date-${assessment.id}`}>Date *</label>
                        <input 
                          type="date" 
                          id={`assessment-date-${assessment.id}`}
                          value={assessment.date}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'date', e.target.value)}
                          className={formSubmitted && !assessment.date ? 'error' : ''}
                        />
                        {formSubmitted && !assessment.date && (
                          <div className="error-message">
                            <AlertCircleIcon size={14} />
                            <span>Date is required</span>
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor={`assessment-marks-${assessment.id}`}>Marks Allocated *</label>
                        <input 
                          type="number" 
                          id={`assessment-marks-${assessment.id}`}
                          value={assessment.marks}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'marks', e.target.value)}
                          min="1"
                          className={formSubmitted && !assessment.marks ? 'error' : ''}
                        />
                        {formSubmitted && !assessment.marks && (
                          <div className="error-message">
                            <AlertCircleIcon size={14} />
                            <span>Marks are required</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor={`assessment-content-${assessment.id}`}>Content Covered</label>
                      <textarea 
                        id={`assessment-content-${assessment.id}`}
                        value={assessment.contentCovered}
                        onChange={(e) => handleAssessmentChange(assessment.id, 'contentCovered', e.target.value)}
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor={`assessment-structure-${assessment.id}`}>Assessment Structure</label>
                      <textarea 
                        id={`assessment-structure-${assessment.id}`}
                        value={assessment.structure}
                        onChange={(e) => handleAssessmentChange(assessment.id, 'structure', e.target.value)}
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-section">
            <h2 className="section-title">
              <BookOpenIcon size={20} />
              <span>Additional Information</span>
            </h2>
            <div className="form-group">
              <label htmlFor="eligibilityCriteria">Eligibility Criteria for Final Exam</label>
              <textarea 
                id="eligibilityCriteria" 
                name="eligibilityCriteria"
                value={courseData.eligibilityCriteria}
                onChange={handleInputChange}
                rows="3"
                placeholder="E.g., Need more than 80% attendance, need more than 40% for all CA total"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="specialNotes">Special Notes</label>
              <textarea 
                id="specialNotes" 
                name="specialNotes"
                value={courseData.specialNotes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Any additional information or special instructions for students"
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate(`/teacher/view-course/${courseId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-button">
              <SaveIcon size={16} />
              <span>Update Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateCourse;