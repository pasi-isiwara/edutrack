import React from 'react';
import { BookOpenIcon, PlusIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';

const TopicsForm = ({ courseData, setCourseData, formSubmitted }) => {
  const handleTopicChange = (id, field, value) => {
    setCourseData({
      ...courseData,
      topics: courseData.topics.map(t =>
        t.id === id ? { ...t, [field]: value } : t
      )
    });
  };

  const addTopic = () => {
    const newId = courseData.topics.length > 0 
      ? Math.max(...courseData.topics.map(t => t.id)) + 1 
      : 1;

    setCourseData({
      ...courseData,
      topics: [...courseData.topics, { id: newId, name: '', hours: '' }]
    });

    setTimeout(() => {
      const newTopic = document.getElementById(`topic-${newId}`);
      if (newTopic) newTopic.classList.add('visible');
    }, 10);
  };

  const removeTopic = (id) => {
    if (courseData.topics.length === 1) return;
    setCourseData({
      ...courseData,
      topics: courseData.topics.filter(t => t.id !== id)
    });
  };

  return (
    <div className="form-section">
      <div className="section-header">
        <h2 className="section-title">
          <BookOpenIcon size={20} />
          <span>Topics / Learning Outcomes</span>
        </h2>
        <button type="button" className="add-item-button" onClick={addTopic}>
          <PlusIcon size={16} />
          <span>Add Topic</span>
        </button>
      </div>

      <div className="topics-container">
        {courseData.topics.map(topic => (
          <div key={topic.id} className="topic-item" id={`topic-${topic.id}`}>
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
                  min="1"
                  onChange={(e) => handleTopicChange(topic.id, 'hours', e.target.value)}
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
  );
};

export default TopicsForm;
