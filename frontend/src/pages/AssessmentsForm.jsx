import React from 'react';
import { BookOpenIcon, PlusIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';

const AssessmentsForm = ({ courseData, setCourseData, formSubmitted }) => {
  const handleAssessmentChange = (id, field, value) => {
    setCourseData({
      ...courseData,
      assessments: courseData.assessments.map(a =>
        a.id === id ? { ...a, [field]: value } : a
      )
    });
  };

  const addAssessment = () => {
    const newId = courseData.assessments.length > 0
      ? Math.max(...courseData.assessments.map(a => a.id)) + 1
      : 1;

    setCourseData({
      ...courseData,
      assessments: [
        ...courseData.assessments,
        { id: newId, name: '', date: '', marks: '', contentCovered: '', structure: '' }
      ]
    });

    setTimeout(() => {
      const newAssessment = document.getElementById(`assessment-${newId}`);
      if (newAssessment) newAssessment.classList.add('visible');
    }, 10);
  };

  const removeAssessment = (id) => {
    if (courseData.assessments.length === 1) return;
    setCourseData({
      ...courseData,
      assessments: courseData.assessments.filter(a => a.id !== id)
    });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="section-title">
          <BookOpenIcon size={20} />
          <span>Continuous Assessments</span>
        </h2>
        <button type="button" className="add-item-button" onClick={addAssessment}>
          <PlusIcon size={16} />
          <span>Add Assessment</span>
        </button>
      </div>

      <div className="assessments-container">
        {courseData.assessments.map(assessment => (
          <div key={assessment.id} className="assessment-item" id={`assessment-${assessment.id}`}>
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
                    min="1"
                    onChange={(e) => handleAssessmentChange(assessment.id, 'marks', e.target.value)}
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
                />
              </div>

              <div className="form-group">
                <label htmlFor={`assessment-structure-${assessment.id}`}>Assessment Structure</label>
                <textarea
                  id={`assessment-structure-${assessment.id}`}
                  value={assessment.structure}
                  onChange={(e) => handleAssessmentChange(assessment.id, 'structure', e.target.value)}
                  rows="2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssessmentsForm;
