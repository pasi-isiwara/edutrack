import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, PlusIcon, TrashIcon, AlertCircleIcon, SaveIcon, ArrowLeftIcon
} from 'lucide-react';
import '../styles/UpdateCourse.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    // Simulate API call to fetch course data
    setTimeout(() => {
      const mockCourse = {
        id: courseId,
        name: 'Introduction to Computer Science',
        code: 'CS101',
        enrollmentKey: 'cs101key',
        topics: [
          { id: 1, name: 'Introduction to Programming', hours: 8 },
          { id: 2, name: 'Data Types and Variables', hours: 6 },
          { id: 3, name: 'Control Structures', hours: 7 },
          { id: 4, name: 'Functions and Procedures', hours: 8 },
          { id: 5, name: 'Arrays and Lists', hours: 6 },
          { id: 6, name: 'Object-Oriented Programming', hours: 10 }
        ],
        assessments: [
          { 
            id: 1, 
            name: 'Quiz 1', 
            date: '2023-09-10', 
            marks: 20,
            contentCovered: 'Introduction to Programming, Data Types and Variables',
            structure: 'Multiple choice questions and short answers'
          },
          { 
            id: 2, 
            name: 'Assignment 1', 
            date: '2023-09-20', 
            marks: 30,
            contentCovered: 'Control Structures, Functions and Procedures',
            structure: 'Programming exercises and problem solving'
          },
          { 
            id: 3, 
            name: 'Mid-term Exam', 
            date: '2023-10-15', 
            marks: 50,
            contentCovered: 'All topics covered up to Functions and Procedures',
            structure: 'Multiple choice, short answers, and programming problems'
          }
        ],
        eligibilityCriteria: 'Need more than 80% attendance and at least 40% for all continuous assessments combined.',
        specialNotes: 'Students are encouraged to practice programming exercises regularly. Office hours are available on Tuesdays and Thursdays from 2-4 PM.'
      };
      setCourseData(mockCourse);
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
    }, 800);
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
  const handleSubmit = (e) => {
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
    // Submit form logic would go here
    console.log('Form submitted:', courseData);
    // Show success message and redirect
    const successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'flex';
    setTimeout(() => {
      navigate(`/teacher/view-course/${courseId}`);
    }, 2000);
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
              {courseData.topics.map((topic) => (
                <div 
                  key={topic.id} 
                  className="topic-item visible"
                  id={`topic-${topic.id}`}
                >
                  <div className="topic-header">
                    <h3>Topic {topic.id}</h3>
                    <button 
                      type="button"
                      className="remove-button"
                      onClick={() => removeTopic(topic.id)}
                      disabled={courseData.topics.length === 1}
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
              {courseData.assessments.map((assessment) => (
                <div 
                  key={assessment.id} 
                  className="assessment-item visible"
                  id={`assessment-${assessment.id}`}
                >
                  <div className="assessment-header">
                    <h3>Assessment {assessment.id}</h3>
                    <button 
                      type="button"
                      className="remove-button"
                      onClick={() => removeAssessment(assessment.id)}
                      disabled={courseData.assessments.length === 1}
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