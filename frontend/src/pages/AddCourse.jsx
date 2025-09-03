import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, PlusIcon, TrashIcon, AlertCircleIcon, SaveIcon, ArrowLeftIcon
} from 'lucide-react';
import '../styles/AddCourse.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';

const AddCourse = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    code: '',
    enrollmentKey: '',
    topics: [
      { id: 1, name: '', hours: '' }
    ],
    assessments: [
      { id: 1, name: '', date: '', marks: '', contentCovered: '', structure: '' }
    ],
    eligibilityCriteria: '',
    specialNotes: ''
  });

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

    setTimeout(() => {
      const newTopic = document.getElementById(`topic-${newId}`);
      if (newTopic) {
        newTopic.classList.add('ac-visible');
      }
    }, 10);
  };

  const removeTopic = (id) => {
    if (courseData.topics.length === 1) {
      return; 
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

    setTimeout(() => {
      const newAssessment = document.getElementById(`assessment-${newId}`);
      if (newAssessment) {
        newAssessment.classList.add('ac-visible');
      }
    }, 10);
  };

  const removeAssessment = (id) => {
    if (courseData.assessments.length === 1) {
      return; 
    }
    setCourseData({
      ...courseData,
      assessments: courseData.assessments.filter(assessment => assessment.id !== id)
    });
  };

  const validateForm = () => {
    if (!courseData.name || !courseData.code || !courseData.enrollmentKey) {
      return false;
    }
    const validTopics = courseData.topics.every(topic => topic.name && topic.hours);
    if (!validTopics) return false;

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
      const firstError = document.querySelector('.ac-error-message');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    console.log('Form submitted:', courseData);

    const successMessage = document.querySelector('.ac-success-message');
    successMessage.style.display = 'flex';
    setTimeout(() => {
      navigate('/teacher/dashboard');
    }, 2000);
  };

  return (
    <div className="ac-add-course-container">
      <TeacherSidebarNav />
      <div className="ac-add-course-content">
        <div className="ac-add-course-header">
          <button 
            className="ac-back-button" 
            onClick={() => navigate('/teacher/dashboard')}
          >
            <ArrowLeftIcon size={16} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="ac-add-course-title">Add New Course</h1>
        </div>

        <div className="ac-success-message">
          <div className="ac-success-content">
            <div className="ac-success-icon">
              <SaveIcon size={24} />
            </div>
            <p>Course created successfully!</p>
          </div>
        </div>

        <form className="ac-course-form" onSubmit={handleSubmit}>
          <div className="ac-form-section">
            <h2 className="ac-section-title">
              <BookOpenIcon size={20} />
              <span>Course Information</span>
            </h2>
            <div className="ac-form-grid">
              <div className="ac-form-group">
                <label htmlFor="name">Module Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.name ? 'ac-error' : ''}
                />
                {formSubmitted && !courseData.name && (
                  <div className="ac-error-message">
                    <AlertCircleIcon size={14} />
                    <span>Module name is required</span>
                  </div>
                )}
              </div>

              <div className="ac-form-group">
                <label htmlFor="code">Module Code *</label>
                <input 
                  type="text" 
                  id="code" 
                  name="code"
                  value={courseData.code}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.code ? 'ac-error' : ''}
                />
                {formSubmitted && !courseData.code && (
                  <div className="ac-error-message">
                    <AlertCircleIcon size={14} />
                    <span>Module code is required</span>
                  </div>
                )}
              </div>

              <div className="ac-form-group">
                <label htmlFor="enrollmentKey">Enrollment Key *</label>
                <input 
                  type="text" 
                  id="enrollmentKey" 
                  name="enrollmentKey"
                  value={courseData.enrollmentKey}
                  onChange={handleInputChange}
                  className={formSubmitted && !courseData.enrollmentKey ? 'ac-error' : ''}
                />
                {formSubmitted && !courseData.enrollmentKey && (
                  <div className="ac-error-message">
                    <AlertCircleIcon size={14} />
                    <span>Enrollment key is required</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Topics Section */}
          <div className="ac-form-section">
            <div className="ac-section-header">
              <h2 className="ac-section-title">
                <BookOpenIcon size={20} />
                <span>Topics / Learning Outcomes</span>
              </h2>
              <button 
                type="button" 
                className="ac-add-item-button"
                onClick={addTopic}
              >
                <PlusIcon size={16} />
                <span>Add Topic</span>
              </button>
            </div>

            <div className="ac-topics-container">
              {courseData.topics.map((topic) => (
                <div 
                  key={topic.id} 
                  className="ac-topic-item"
                  id={`topic-${topic.id}`}
                >
                  <div className="ac-topic-header">
                    <h3> </h3>
                    <button 
                      type="button"
                      className="ac-remove-button"
                      onClick={() => removeTopic(topic.id)}
                      disabled={courseData.topics.length === 1}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                  <div className="ac-topic-form">
                    <div className="ac-form-group">
                      <label htmlFor={`topic-name-${topic.id}`}>Topic Name *</label>
                      <input 
                        type="text" 
                        id={`topic-name-${topic.id}`}
                        value={topic.name}
                        onChange={(e) => handleTopicChange(topic.id, 'name', e.target.value)}
                        className={formSubmitted && !topic.name ? 'ac-error' : ''}
                      />
                      {formSubmitted && !topic.name && (
                        <div className="ac-error-message">
                          <AlertCircleIcon size={14} />
                          <span>Topic name is required</span>
                        </div>
                      )}
                    </div>

                    <div className="ac-form-group">
                      <label htmlFor={`topic-hours-${topic.id}`}>Hours Required *</label>
                      <input 
                        type="number" 
                        id={`topic-hours-${topic.id}`}
                        value={topic.hours}
                        onChange={(e) => handleTopicChange(topic.id, 'hours', e.target.value)}
                        min="1"
                        className={formSubmitted && !topic.hours ? 'ac-error' : ''}
                      />
                      {formSubmitted && !topic.hours && (
                        <div className="ac-error-message">
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

          {/* Assessments Section */}
          <div className="ac-form-section">
            <div className="ac-section-header">
              <h2 className="ac-section-title">
                <BookOpenIcon size={20} />
                <span>Continuous Assessments</span>
              </h2>
              <button 
                type="button" 
                className="ac-add-item-button"
                onClick={addAssessment}
              >
                <PlusIcon size={16} />
                <span>Add Assessment</span>
              </button>
            </div>

            <div className="ac-assessments-container">
              {courseData.assessments.map((assessment) => (
                <div 
                  key={assessment.id} 
                  className="ac-assessment-item"
                  id={`assessment-${assessment.id}`}
                >
                  <div className="ac-assessment-header">
                    <h3> </h3>
                    <button 
                      type="button"
                      className="ac-remove-button"
                      onClick={() => removeAssessment(assessment.id)}
                      disabled={courseData.assessments.length === 1}
                    >
                      <TrashIcon size={16} />
                    </button>
                  </div>
                  <div className="ac-assessment-form">
                    <div className="ac-form-grid">
                      <div className="ac-form-group">
                        <label htmlFor={`assessment-name-${assessment.id}`}>Assessment Name *</label>
                        <input 
                          type="text" 
                          id={`assessment-name-${assessment.id}`}
                          value={assessment.name}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'name', e.target.value)}
                          className={formSubmitted && !assessment.name ? 'ac-error' : ''}
                        />
                        {formSubmitted && !assessment.name && (
                          <div className="ac-error-message">
                            <AlertCircleIcon size={14} />
                            <span>Assessment name is required</span>
                          </div>
                        )}
                      </div>

                      <div className="ac-form-group">
                        <label htmlFor={`assessment-date-${assessment.id}`}>Date *</label>
                        <input 
                          type="date" 
                          id={`assessment-date-${assessment.id}`}
                          value={assessment.date}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'date', e.target.value)}
                          className={formSubmitted && !assessment.date ? 'ac-error' : ''}
                        />
                        {formSubmitted && !assessment.date && (
                          <div className="ac-error-message">
                            <AlertCircleIcon size={14} />
                            <span>Date is required</span>
                          </div>
                        )}
                      </div>

                      <div className="ac-form-group">
                        <label htmlFor={`assessment-marks-${assessment.id}`}>Marks Allocated *</label>
                        <input 
                          type="number" 
                          id={`assessment-marks-${assessment.id}`}
                          value={assessment.marks}
                          onChange={(e) => handleAssessmentChange(assessment.id, 'marks', e.target.value)}
                          min="1"
                          className={formSubmitted && !assessment.marks ? 'ac-error' : ''}
                        />
                        {formSubmitted && !assessment.marks && (
                          <div className="ac-error-message">
                            <AlertCircleIcon size={14} />
                            <span>Marks are required</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ac-form-group">
                      <label htmlFor={`assessment-content-${assessment.id}`}>Content Covered</label>
                      <textarea 
                        id={`assessment-content-${assessment.id}`}
                        value={assessment.contentCovered}
                        onChange={(e) => handleAssessmentChange(assessment.id, 'contentCovered', e.target.value)}
                        rows="2"
                      ></textarea>
                    </div>

                    <div className="ac-form-group">
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

          {/* Additional Info */}
          <div className="ac-form-section">
            <h2 className="ac-section-title">
              <BookOpenIcon size={20} />
              <span>Additional Information</span>
            </h2>
            <div className="ac-form-group">
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
            <div className="ac-form-group">
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

          {/* Actions */}
          <div className="ac-form-actions">
            <button 
              type="button" 
              className="ac-cancel-button"
              onClick={() => navigate('/teacher/dashboard')}
            >
              Cancel
            </button>
            <button type="submit" className="ac-submit-button">
              <SaveIcon size={16} />
              <span>Create Course</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
