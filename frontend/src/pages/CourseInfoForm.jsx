import React from 'react';
import { BookOpenIcon, AlertCircleIcon } from 'lucide-react';

const CourseInfoForm = ({ courseData, setCourseData, formSubmitted }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  return (
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
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
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
  );
};

export default CourseInfoForm;
