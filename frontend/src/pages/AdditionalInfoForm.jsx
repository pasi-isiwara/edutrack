import React from 'react';
import { BookOpenIcon } from 'lucide-react';

const AdditionalInfoForm = ({ courseData, setCourseData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  return (
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
          onChange={handleChange}
          rows="3"
          placeholder="E.g., Need more than 80% attendance, need more than 40% for all CA total"
        />
      </div>

      <div className="form-group">
        <label htmlFor="specialNotes">Special Notes</label>
        <textarea
          id="specialNotes"
          name="specialNotes"
          value={courseData.specialNotes}
          onChange={handleChange}
          rows="3"
          placeholder="Any additional information or special instructions for students"
        />
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
