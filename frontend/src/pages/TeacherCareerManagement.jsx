import React, { useState, useEffect } from 'react';
import { 
  BriefcaseIcon, CalendarIcon, 
  MapPinIcon, ClockIcon, UsersIcon, PlusIcon, 
  TrashIcon, EditIcon, SaveIcon, XIcon, TrophyIcon
} from 'lucide-react';
import API_URL from '../config';
import '../styles/TeacherCareerManagement.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const TeacherCareerManagement = () => {
  const [activeTab, setActiveTab] = useState('careers');
  const [careers, setCareers] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // All available courses
  const [workshops, setWorkshops] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Edit states
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [editingCompetition, setEditingCompetition] = useState(null);
  // New item states
  const [newCareer, setNewCareer] = useState({ id: '', name: '', recommendedCourses: [] });
  const [newWorkshop, setNewWorkshop] = useState({ 
    id: null, 
    title: '', 
    type: 'workshop',
    date: '', 
    time: '', 
    location: '', 
    instructor: '', 
    capacity: '', 
    registered: '0',
    skills: [''],
    companies: ''
  });
  const [newCompetition, setNewCompetition] = useState({
    id: null,
    title: '',
    date: '',
    registrationDeadline: '',
    organizer: '',
    description: '',
    prizes: '',
    skills: [''],
    eligibility: ''
  });
  // Success message state
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  useEffect(() => {
    // Fetch career paths from API
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch careers from API
        const careersResponse = await fetch(`${API_URL}/career/careers`);
        const careersData = await careersResponse.json();
        setCareers(careersData);

        // Fetch all available courses
        const coursesResponse = await fetch(`${API_URL}/career/courses`);
        const coursesData = await coursesResponse.json();
        setAllCourses(coursesData);

        // Fetch workshops and events from API
        const workshopsResponse = await fetch(`${API_URL}/career/workshops`);
        const workshopsData = await workshopsResponse.json();
        setWorkshops(workshopsData);

        // Fetch competitions from API
        const competitionsResponse = await fetch(`${API_URL}/career/competitions`);
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        
        setLoading(false);
        
        // Animation for elements
        setTimeout(() => {
          const elements = document.querySelectorAll('.animate-in');
          elements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('visible');
            }, 100 * index);
          });
        }, 100);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset all editing states when changing tabs
    setEditingCareer(null);
    setEditingWorkshop(null);
    setEditingCompetition(null);
    // Animation for elements in the new tab
    setTimeout(() => {
      const elements = document.querySelectorAll('.animate-in');
      elements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add('visible');
        }, 50 * index);
      });
    }, 50);
  };
  // Career path management functions
  const handleAddCareer = async () => {
    if (!newCareer.id || !newCareer.name) return;
    
    try {
      const response = await fetch(`${API_URL}/career/careers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCareer)
      });

      if (response.ok) {
        await response.json();
        // Fetch updated careers list to get the complete data with recommended courses
        const careersResponse = await fetch(`${API_URL}/career/careers`);
        const careersData = await careersResponse.json();
        setCareers(careersData);
        setNewCareer({ id: '', name: '', recommendedCourses: [] });
        showSuccessMessage('Career path added successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add career path');
      }
    } catch (error) {
      console.error('Error adding career:', error);
      alert('Failed to add career path. Please try again.');
    }
  };
  const handleUpdateCareer = async () => {
    if (!editingCareer || !editingCareer.id || !editingCareer.name) return;
    
    try {
      const response = await fetch(`${API_URL}/career/careers/${editingCareer.originalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: editingCareer.id, 
          name: editingCareer.name, 
          recommendedCourses: editingCareer.recommendedCourses || [] 
        })
      });

      if (response.ok) {
        await response.json();
        // Fetch updated careers list
        const careersResponse = await fetch(`${API_URL}/career/careers`);
        const careersData = await careersResponse.json();
        setCareers(careersData);
        
        setEditingCareer(null);
        showSuccessMessage('Career path updated successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update career path');
      }
    } catch (error) {
      console.error('Error updating career:', error);
      alert('Failed to update career path. Please try again.');
    }
  };
  const handleDeleteCareer = async (careerId) => {
    if (!window.confirm('Are you sure you want to delete this career path?')) return;
    
    try {
      const response = await fetch(`${API_URL}/career/careers/${careerId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedCareers = careers.filter(career => career.id !== careerId);
        setCareers(updatedCareers);
        showSuccessMessage('Career path deleted successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete career path');
      }
    } catch (error) {
      console.error('Error deleting career:', error);
      alert('Failed to delete career path. Please try again.');
    }
  };
  const startEditingCareer = (career) => {
    setEditingCareer({
      ...career,
      recommendedCourses: career.recommendedCourses || [],
      originalId: career.id // Keep track of original ID for updating references
    });
  };
  
  // Workshop/Event management functions
  const handleAddWorkshop = async () => {
    if (!newWorkshop.title || !newWorkshop.date || !newWorkshop.time || !newWorkshop.location) return;
    
    try {
      // Clean up skills (remove empty ones)
      const cleanedSkills = newWorkshop.skills.filter(skill => skill.trim() !== '');
      if (cleanedSkills.length === 0) cleanedSkills.push('General');

      const workshopData = {
        title: newWorkshop.title,
        type: newWorkshop.type,
        date: newWorkshop.date,
        time: newWorkshop.time,
        location: newWorkshop.location,
        instructor: newWorkshop.instructor || null,
        capacity: newWorkshop.type === 'workshop' ? parseInt(newWorkshop.capacity || 0) : null,
        registered: newWorkshop.type === 'workshop' ? parseInt(newWorkshop.registered || 0) : null,
        companies: newWorkshop.type === 'event' ? parseInt(newWorkshop.companies || 0) : null,
        skills: cleanedSkills
      };

      const response = await fetch(`${API_URL}/career/workshops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workshopData)
      });

      if (response.ok) {
        // Fetch updated workshops list
        const workshopsResponse = await fetch(`${API_URL}/career/workshops`);
        const workshopsData = await workshopsResponse.json();
        setWorkshops(workshopsData);
        
        setNewWorkshop({ 
          id: null, 
          title: '', 
          type: 'workshop',
          date: '', 
          time: '', 
          location: '', 
          instructor: '', 
          capacity: '', 
          registered: '0',
          skills: [''],
          companies: ''
        });
        showSuccessMessage(`${newWorkshop.type === 'workshop' ? 'Workshop' : 'Event'} added successfully`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add workshop/event');
      }
    } catch (error) {
      console.error('Error adding workshop:', error);
      alert('Failed to add workshop/event. Please try again.');
    }
  };
  const handleUpdateWorkshop = async () => {
    if (!editingWorkshop || !editingWorkshop.title || !editingWorkshop.date) return;
    
    try {
      // Clean up skills (remove empty ones)
      const cleanedSkills = editingWorkshop.skills.filter(skill => skill.trim() !== '');
      if (cleanedSkills.length === 0) cleanedSkills.push('General');

      const workshopData = {
        title: editingWorkshop.title,
        type: editingWorkshop.type,
        date: editingWorkshop.date,
        time: editingWorkshop.time,
        location: editingWorkshop.location,
        instructor: editingWorkshop.instructor || null,
        capacity: editingWorkshop.type === 'workshop' ? parseInt(editingWorkshop.capacity || 0) : null,
        registered: editingWorkshop.type === 'workshop' ? parseInt(editingWorkshop.registered || 0) : null,
        companies: editingWorkshop.type === 'event' ? parseInt(editingWorkshop.companies || 0) : null,
        skills: cleanedSkills
      };

      const response = await fetch(`${API_URL}/career/workshops/${editingWorkshop.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workshopData)
      });

      if (response.ok) {
        // Fetch updated workshops list
        const workshopsResponse = await fetch(`${API_URL}/career/workshops`);
        const workshopsData = await workshopsResponse.json();
        setWorkshops(workshopsData);
        
        setEditingWorkshop(null);
        showSuccessMessage(`${editingWorkshop.type === 'workshop' ? 'Workshop' : 'Event'} updated successfully`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update workshop/event');
      }
    } catch (error) {
      console.error('Error updating workshop:', error);
      alert('Failed to update workshop/event. Please try again.');
    }
  };
  const handleDeleteWorkshop = async (workshopId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const workshopToDelete = workshops.find(w => w.id === workshopId);
      
      const response = await fetch(`${API_URL}/career/workshops/${workshopId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Fetch updated workshops list
        const workshopsResponse = await fetch(`${API_URL}/career/workshops`);
        const workshopsData = await workshopsResponse.json();
        setWorkshops(workshopsData);
        
        showSuccessMessage(`${workshopToDelete.type === 'workshop' ? 'Workshop' : 'Event'} deleted successfully`);
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete workshop/event');
      }
    } catch (error) {
      console.error('Error deleting workshop:', error);
      alert('Failed to delete workshop/event. Please try again.');
    }
  };
  const startEditingWorkshop = (workshop) => {
    setEditingWorkshop({ ...workshop });
  };
  const handleAddWorkshopSkill = (isForNewWorkshop = false) => {
    if (isForNewWorkshop) {
      setNewWorkshop({
        ...newWorkshop,
        skills: [...newWorkshop.skills, '']
      });
    } else {
      setEditingWorkshop({
        ...editingWorkshop,
        skills: [...editingWorkshop.skills, '']
      });
    }
  };
  const handleWorkshopSkillChange = (index, value, isForNewWorkshop = false) => {
    if (isForNewWorkshop) {
      const updatedSkills = [...newWorkshop.skills];
      updatedSkills[index] = value;
      setNewWorkshop({
        ...newWorkshop,
        skills: updatedSkills
      });
    } else {
      const updatedSkills = [...editingWorkshop.skills];
      updatedSkills[index] = value;
      setEditingWorkshop({
        ...editingWorkshop,
        skills: updatedSkills
      });
    }
  };
  const handleRemoveWorkshopSkill = (index, isForNewWorkshop = false) => {
    if (isForNewWorkshop) {
      if (newWorkshop.skills.length <= 1) return;
      const updatedSkills = newWorkshop.skills.filter((_, i) => i !== index);
      setNewWorkshop({
        ...newWorkshop,
        skills: updatedSkills
      });
    } else {
      if (editingWorkshop.skills.length <= 1) return;
      const updatedSkills = editingWorkshop.skills.filter((_, i) => i !== index);
      setEditingWorkshop({
        ...editingWorkshop,
        skills: updatedSkills
      });
    }
  };
  // Competition management functions
  const handleAddCompetition = async () => {
    if (!newCompetition.title || !newCompetition.date || !newCompetition.registrationDeadline) return;
    
    try {
      // Clean up skills (remove empty ones)
      const cleanedSkills = newCompetition.skills.filter(skill => skill.trim() !== '');
      if (cleanedSkills.length === 0) cleanedSkills.push('General');

      const competitionData = {
        title: newCompetition.title,
        date: newCompetition.date,
        registrationDeadline: newCompetition.registrationDeadline,
        organizer: newCompetition.organizer || null,
        description: newCompetition.description || null,
        prizes: newCompetition.prizes || null,
        skills: cleanedSkills,
        eligibility: newCompetition.eligibility || null
      };

      const response = await fetch(`${API_URL}/career/competitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitionData)
      });

      if (response.ok) {
        // Fetch updated competitions list
        const competitionsResponse = await fetch(`${API_URL}/career/competitions`);
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        
        setNewCompetition({
          id: null,
          title: '',
          date: '',
          registrationDeadline: '',
          organizer: '',
          description: '',
          prizes: '',
          skills: [''],
          eligibility: ''
        });
        showSuccessMessage('Competition added successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add competition');
      }
    } catch (error) {
      console.error('Error adding competition:', error);
      alert('Failed to add competition. Please try again.');
    }
  };
  const handleUpdateCompetition = async () => {
    if (!editingCompetition || !editingCompetition.title || !editingCompetition.date) return;
    
    try {
      // Clean up skills (remove empty ones)
      const cleanedSkills = editingCompetition.skills.filter(skill => skill.trim() !== '');
      if (cleanedSkills.length === 0) cleanedSkills.push('General');

      const competitionData = {
        title: editingCompetition.title,
        date: editingCompetition.date,
        registrationDeadline: editingCompetition.registrationDeadline,
        organizer: editingCompetition.organizer || null,
        description: editingCompetition.description || null,
        prizes: editingCompetition.prizes || null,
        skills: cleanedSkills,
        eligibility: editingCompetition.eligibility || null
      };

      const response = await fetch(`${API_URL}/career/competitions/${editingCompetition.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(competitionData)
      });

      if (response.ok) {
        // Fetch updated competitions list
        const competitionsResponse = await fetch(`${API_URL}/career/competitions`);
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        
        setEditingCompetition(null);
        showSuccessMessage('Competition updated successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update competition');
      }
    } catch (error) {
      console.error('Error updating competition:', error);
      alert('Failed to update competition. Please try again.');
    }
  };
  const handleDeleteCompetition = async (competitionId) => {
    if (!window.confirm('Are you sure you want to delete this competition?')) return;
    
    try {
      const response = await fetch(`${API_URL}/career/competitions/${competitionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Fetch updated competitions list
        const competitionsResponse = await fetch(`${API_URL}/career/competitions`);
        const competitionsData = await competitionsResponse.json();
        setCompetitions(competitionsData);
        
        showSuccessMessage('Competition deleted successfully');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to delete competition');
      }
    } catch (error) {
      console.error('Error deleting competition:', error);
      alert('Failed to delete competition. Please try again.');
    }
  };
  const startEditingCompetition = (competition) => {
    setEditingCompetition({ ...competition });
  };
  const handleAddCompetitionSkill = (isForNewCompetition = false) => {
    if (isForNewCompetition) {
      setNewCompetition({
        ...newCompetition,
        skills: [...newCompetition.skills, '']
      });
    } else {
      setEditingCompetition({
        ...editingCompetition,
        skills: [...editingCompetition.skills, '']
      });
    }
  };
  const handleCompetitionSkillChange = (index, value, isForNewCompetition = false) => {
    if (isForNewCompetition) {
      const updatedSkills = [...newCompetition.skills];
      updatedSkills[index] = value;
      setNewCompetition({
        ...newCompetition,
        skills: updatedSkills
      });
    } else {
      const updatedSkills = [...editingCompetition.skills];
      updatedSkills[index] = value;
      setEditingCompetition({
        ...editingCompetition,
        skills: updatedSkills
      });
    }
  };
  const handleRemoveCompetitionSkill = (index, isForNewCompetition = false) => {
    if (isForNewCompetition) {
      if (newCompetition.skills.length <= 1) return;
      const updatedSkills = newCompetition.skills.filter((_, i) => i !== index);
      setNewCompetition({
        ...newCompetition,
        skills: updatedSkills
      });
    } else {
      if (editingCompetition.skills.length <= 1) return;
      const updatedSkills = editingCompetition.skills.filter((_, i) => i !== index);
      setEditingCompetition({
        ...editingCompetition,
        skills: updatedSkills
      });
    }
  };
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  if (loading) {
    return (
      <div className="teacher-career-container">
        <TeacherSidebarNav />
        <div className="teacher-career-content">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading career development data...</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="teacher-career-container">
      <TeacherSidebarNav />
      <div className="teacher-career-content">
        <h1 className="career-management-title">Career Development Management</h1>
        <div className={`success-message ${showSuccess ? 'show' : ''}`}>
          <SaveIcon size={16} />
          <span>{successMessage}</span>
        </div>
        <div className="management-tabs">
          <button 
            className={`tab-button ${activeTab === 'careers' ? 'active' : ''}`}
            onClick={() => handleTabChange('careers')}
          >
            <BriefcaseIcon size={18} />
            <span>Career Paths</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'workshops' ? 'active' : ''}`}
            onClick={() => handleTabChange('workshops')}
          >
            <CalendarIcon size={18} />
            <span>Workshops & Events</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'competitions' ? 'active' : ''}`}
            onClick={() => handleTabChange('competitions')}
          >
            <TrophyIcon size={18} />
            <span>Competitions</span>
          </button>
        </div>
        {activeTab === 'careers' && (
          <div className="careers-management-section">
            <div className="section-header">
              <h2 className="section-title">Career Paths</h2>
              <p className="section-description">
                Add and manage career paths that students can explore. These will be displayed in the Career Development section.
              </p>
            </div>
            <div className="add-career-form">
              <h3 className="form-title">Add New Career Path</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="career-id">Career ID (unique identifier, no spaces)</label>
                  <input 
                    type="text" 
                    id="career-id" 
                    value={newCareer.id}
                    onChange={(e) => setNewCareer({ ...newCareer, id: e.target.value.replace(/\s+/g, '-').toLowerCase() })}
                    placeholder="e.g., software-developer"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="career-name">Career Name</label>
                  <input 
                    type="text" 
                    id="career-name" 
                    value={newCareer.name}
                    onChange={(e) => setNewCareer({ ...newCareer, name: e.target.value })}
                    placeholder="e.g., Software Developer"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="recommended-courses">Recommended Courses (Optional)</label>
                <select 
                  id="recommended-courses" 
                  multiple 
                  value={newCareer.recommendedCourses}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                    setNewCareer({ ...newCareer, recommendedCourses: selected });
                  }}
                  style={{ height: '150px' }}
                >
                  {allCourses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </option>
                  ))}
                </select>
                <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                  Hold Ctrl (Windows) or Cmd (Mac) to select multiple courses
                </small>
              </div>
              <button 
                className="add-button"
                onClick={handleAddCareer}
                disabled={!newCareer.id || !newCareer.name}
              >
                <PlusIcon size={16} />
                <span>Add Career Path</span>
              </button>
            </div>
            <div className="careers-list animate-in">
              <h3 className="list-title">Existing Career Paths</h3>
              {careers.length === 0 ? (
                <div className="empty-state">
                  <p>No career paths added yet. Add your first career path above.</p>
                </div>
              ) : (
                <div className="careers-grid">
                  {careers.map(career => (
                    <div key={career.id} className="career-card">
                      <div className="career-card-content">
                        <div className="career-icon">
                          <BriefcaseIcon size={20} />
                        </div>
                        <div className="career-details">
                          <h4 className="career-name">{career.name}</h4>
                          <p className="career-id">ID: {career.id}</p>
                          <p className="career-modules">
                            {career.recommendedCourses?.length || 0} recommended courses
                          </p>
                        </div>
                      </div>
                      <div className="career-actions">
                        <button 
                          className="edit-button"
                          onClick={() => startEditingCareer(career)}
                        >
                          <EditIcon size={16} />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteCareer(career.id)}
                        >
                          <TrashIcon size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {editingCareer && (
              <div className="edit-overlay">
                <div className="edit-panel">
                  <div className="edit-panel-header">
                    <h3>Edit Career Path</h3>
                    <button className="close-button" onClick={() => setEditingCareer(null)}>
                      <XIcon size={20} />
                    </button>
                  </div>
                  <div className="edit-panel-content">
                    <div className="form-group">
                      <label htmlFor="edit-career-id">Career ID (unique identifier)</label>
                      <input 
                        type="text" 
                        id="edit-career-id" 
                        value={editingCareer.id}
                        onChange={(e) => setEditingCareer({ ...editingCareer, id: e.target.value.replace(/\s+/g, '-').toLowerCase() })}
                      />
                      <p className="form-note">
                        Note: Changing the ID will update all module associations.
                      </p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-career-name">Career Name</label>
                      <input 
                        type="text" 
                        id="edit-career-name" 
                        value={editingCareer.name}
                        onChange={(e) => setEditingCareer({ ...editingCareer, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-recommended-courses">Recommended Courses (Optional)</label>
                      <select 
                        id="edit-recommended-courses" 
                        multiple 
                        value={editingCareer.recommendedCourses || []}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                          setEditingCareer({ ...editingCareer, recommendedCourses: selected });
                        }}
                        style={{ height: '150px' }}
                      >
                        {allCourses.map(course => (
                          <option key={course.id} value={course.id}>
                            {course.code} - {course.name}
                          </option>
                        ))}
                      </select>
                      <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                        Hold Ctrl (Windows) or Cmd (Mac) to select multiple courses
                      </small>
                    </div>
                    <div className="form-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => setEditingCareer(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={handleUpdateCareer}
                        disabled={!editingCareer.id || !editingCareer.name}
                      >
                        <SaveIcon size={16} />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'workshops' && (
          <div className="workshops-management-section">
            <div className="section-header">
              <h2 className="section-title">Workshops & Events</h2>
              <p className="section-description">
                Manage workshops and events for students' career development.
              </p>
            </div>
            <div className="add-workshop-form">
              <h3 className="form-title">Add New Workshop or Event</h3>
              <div className="form-group">
                <label htmlFor="workshop-type">Type</label>
                <div className="type-selector">
                  <label className={`type-option ${newWorkshop.type === 'workshop' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="workshop-type" 
                      value="workshop"
                      checked={newWorkshop.type === 'workshop'}
                      onChange={() => setNewWorkshop({ ...newWorkshop, type: 'workshop' })}
                    />
                    <span>Workshop</span>
                  </label>
                  <label className={`type-option ${newWorkshop.type === 'event' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="workshop-type" 
                      value="event"
                      checked={newWorkshop.type === 'event'}
                      onChange={() => setNewWorkshop({ ...newWorkshop, type: 'event' })}
                    />
                    <span>Event</span>
                  </label>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="workshop-title">Title*</label>
                  <input 
                    type="text" 
                    id="workshop-title" 
                    value={newWorkshop.title}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, title: e.target.value })}
                    placeholder={`e.g., ${newWorkshop.type === 'workshop' ? 'React.js Workshop' : 'Career Fair'}`}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workshop-date">Date*</label>
                  <input 
                    type="date" 
                    id="workshop-date" 
                    value={newWorkshop.date}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workshop-time">Time*</label>
                  <input 
                    type="text" 
                    id="workshop-time" 
                    value={newWorkshop.time}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, time: e.target.value })}
                    placeholder="e.g., 10:00 AM - 2:00 PM"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workshop-location">Location*</label>
                  <input 
                    type="text" 
                    id="workshop-location" 
                    value={newWorkshop.location}
                    onChange={(e) => setNewWorkshop({ ...newWorkshop, location: e.target.value })}
                    placeholder="e.g., Tech Hub, Room 302"
                  />
                </div>
                {newWorkshop.type === 'workshop' && (
                  <>
                    <div className="form-group">
                      <label htmlFor="workshop-instructor">Instructor</label>
                      <input 
                        type="text" 
                        id="workshop-instructor" 
                        value={newWorkshop.instructor}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, instructor: e.target.value })}
                        placeholder="e.g., Dr. Jane Smith"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="workshop-capacity">Capacity</label>
                      <input 
                        type="number" 
                        id="workshop-capacity" 
                        value={newWorkshop.capacity}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, capacity: e.target.value })}
                        placeholder="e.g., 30"
                        min="1"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="workshop-registered">Currently Registered</label>
                      <input 
                        type="number" 
                        id="workshop-registered" 
                        value={newWorkshop.registered}
                        onChange={(e) => setNewWorkshop({ ...newWorkshop, registered: e.target.value })}
                        placeholder="e.g., 0"
                        min="0"
                      />
                    </div>
                  </>
                )}
                {newWorkshop.type === 'event' && (
                  <div className="form-group">
                    <label htmlFor="event-companies">Number of Companies/Organizations</label>
                    <input 
                      type="number" 
                      id="event-companies" 
                      value={newWorkshop.companies}
                      onChange={(e) => setNewWorkshop({ ...newWorkshop, companies: e.target.value })}
                      placeholder="e.g., 15"
                      min="0"
                    />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Skills</label>
                <div className="skills-inputs">
                  {newWorkshop.skills.map((skill, index) => (
                    <div key={index} className="skill-input-group">
                      <input 
                        type="text" 
                        value={skill}
                        onChange={(e) => handleWorkshopSkillChange(index, e.target.value, true)}
                        placeholder="e.g., Programming"
                      />
                      <button 
                        type="button" 
                        className="remove-skill-button"
                        onClick={() => handleRemoveWorkshopSkill(index, true)}
                        disabled={newWorkshop.skills.length <= 1}
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-skill-button"
                    onClick={() => handleAddWorkshopSkill(true)}
                  >
                    <PlusIcon size={16} />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>
              <button 
                className="add-button"
                onClick={handleAddWorkshop}
                disabled={!newWorkshop.title || !newWorkshop.date || !newWorkshop.time || !newWorkshop.location}
              >
                <PlusIcon size={16} />
                <span>Add {newWorkshop.type === 'workshop' ? 'Workshop' : 'Event'}</span>
              </button>
            </div>
            <div className="workshops-list animate-in">
              <h3 className="list-title">Existing Workshops & Events</h3>
              {workshops.length === 0 ? (
                <div className="empty-state">
                  <p>No workshops or events added yet. Add your first one above.</p>
                </div>
              ) : (
                <div className="workshops-grid">
                  {workshops.map(item => (
                    <div key={item.id} className={`workshop-card ${item.type}`}>
                      <div className="workshop-date">
                        <CalendarIcon size={18} />
                        <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <h3 className="workshop-title">{item.title}</h3>
                      <div className="workshop-details">
                        <div className="detail">
                          <ClockIcon size={16} />
                          <span>{item.time}</span>
                        </div>
                        <div className="detail">
                          <MapPinIcon size={16} />
                          <span>{item.location}</span>
                        </div>
                        {item.type === 'workshop' && (
                          <div className="detail">
                            <UsersIcon size={16} />
                            <span>{item.registered} / {item.capacity} registered</span>
                          </div>
                        )}
                        {item.type === 'event' && (
                          <div className="detail">
                            <BriefcaseIcon size={16} />
                            <span>{item.companies} companies</span>
                          </div>
                        )}
                      </div>
                      <div className="skills-tags">
                        {item.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                      <div className="workshop-actions">
                        <button 
                          className="edit-button"
                          onClick={() => startEditingWorkshop(item)}
                        >
                          <EditIcon size={16} />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteWorkshop(item.id)}
                        >
                          <TrashIcon size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {editingWorkshop && (
              <div className="edit-overlay">
                <div className="edit-panel">
                  <div className="edit-panel-header">
                    <h3>Edit {editingWorkshop.type === 'workshop' ? 'Workshop' : 'Event'}</h3>
                    <button className="close-button" onClick={() => setEditingWorkshop(null)}>
                      <XIcon size={20} />
                    </button>
                  </div>
                  <div className="edit-panel-content">
                    <div className="form-group">
                      <label htmlFor="edit-workshop-type">Type</label>
                      <div className="type-selector">
                        <label className={`type-option ${editingWorkshop.type === 'workshop' ? 'selected' : ''}`}>
                          <input 
                            type="radio" 
                            name="edit-workshop-type" 
                            value="workshop"
                            checked={editingWorkshop.type === 'workshop'}
                            onChange={() => setEditingWorkshop({ ...editingWorkshop, type: 'workshop' })}
                          />
                          <span>Workshop</span>
                        </label>
                        <label className={`type-option ${editingWorkshop.type === 'event' ? 'selected' : ''}`}>
                          <input 
                            type="radio" 
                            name="edit-workshop-type" 
                            value="event"
                            checked={editingWorkshop.type === 'event'}
                            onChange={() => setEditingWorkshop({ ...editingWorkshop, type: 'event' })}
                          />
                          <span>Event</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="edit-workshop-title">Title*</label>
                        <input 
                          type="text" 
                          id="edit-workshop-title" 
                          value={editingWorkshop.title}
                          onChange={(e) => setEditingWorkshop({ ...editingWorkshop, title: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-workshop-date">Date*</label>
                        <input 
                          type="date" 
                          id="edit-workshop-date" 
                          value={editingWorkshop.date}
                          onChange={(e) => setEditingWorkshop({ ...editingWorkshop, date: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-workshop-time">Time*</label>
                        <input 
                          type="text" 
                          id="edit-workshop-time" 
                          value={editingWorkshop.time}
                          onChange={(e) => setEditingWorkshop({ ...editingWorkshop, time: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-workshop-location">Location*</label>
                        <input 
                          type="text" 
                          id="edit-workshop-location" 
                          value={editingWorkshop.location}
                          onChange={(e) => setEditingWorkshop({ ...editingWorkshop, location: e.target.value })}
                        />
                      </div>
                      {editingWorkshop.type === 'workshop' && (
                        <>
                          <div className="form-group">
                            <label htmlFor="edit-workshop-instructor">Instructor</label>
                            <input 
                              type="text" 
                              id="edit-workshop-instructor" 
                              value={editingWorkshop.instructor}
                              onChange={(e) => setEditingWorkshop({ ...editingWorkshop, instructor: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="edit-workshop-capacity">Capacity</label>
                            <input 
                              type="number" 
                              id="edit-workshop-capacity" 
                              value={editingWorkshop.capacity}
                              onChange={(e) => setEditingWorkshop({ ...editingWorkshop, capacity: e.target.value })}
                              min="1"
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="edit-workshop-registered">Currently Registered</label>
                            <input 
                              type="number" 
                              id="edit-workshop-registered" 
                              value={editingWorkshop.registered}
                              onChange={(e) => setEditingWorkshop({ ...editingWorkshop, registered: e.target.value })}
                              min="0"
                            />
                          </div>
                        </>
                      )}
                      {editingWorkshop.type === 'event' && (
                        <div className="form-group">
                          <label htmlFor="edit-event-companies">Number of Companies/Organizations</label>
                          <input 
                            type="number" 
                            id="edit-event-companies" 
                            value={editingWorkshop.companies}
                            onChange={(e) => setEditingWorkshop({ ...editingWorkshop, companies: e.target.value })}
                            min="0"
                          />
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Skills</label>
                      <div className="skills-inputs">
                        {editingWorkshop.skills.map((skill, index) => (
                          <div key={index} className="skill-input-group">
                            <input 
                              type="text" 
                              value={skill}
                              onChange={(e) => handleWorkshopSkillChange(index, e.target.value)}
                            />
                            <button 
                              type="button" 
                              className="remove-skill-button"
                              onClick={() => handleRemoveWorkshopSkill(index)}
                              disabled={editingWorkshop.skills.length <= 1}
                            >
                              <XIcon size={16} />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className="add-skill-button"
                          onClick={() => handleAddWorkshopSkill()}
                        >
                          <PlusIcon size={16} />
                          <span>Add Skill</span>
                        </button>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => setEditingWorkshop(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={handleUpdateWorkshop}
                        disabled={!editingWorkshop.title || !editingWorkshop.date || !editingWorkshop.time || !editingWorkshop.location}
                      >
                        <SaveIcon size={16} />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'competitions' && (
          <div className="competitions-management-section">
            <div className="section-header">
              <h2 className="section-title">Competitions</h2>
              <p className="section-description">
                Manage competitions for students to participate in and enhance their skills.
              </p>
            </div>
            <div className="add-competition-form">
              <h3 className="form-title">Add New Competition</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="competition-title">Title*</label>
                  <input 
                    type="text" 
                    id="competition-title" 
                    value={newCompetition.title}
                    onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })}
                    placeholder="e.g., Annual Hackathon Challenge"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="competition-date">Date*</label>
                  <input 
                    type="date" 
                    id="competition-date" 
                    value={newCompetition.date}
                    onChange={(e) => setNewCompetition({ ...newCompetition, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="competition-deadline">Registration Deadline*</label>
                  <input 
                    type="date" 
                    id="competition-deadline" 
                    value={newCompetition.registrationDeadline}
                    onChange={(e) => setNewCompetition({ ...newCompetition, registrationDeadline: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="competition-organizer">Organizer</label>
                  <input 
                    type="text" 
                    id="competition-organizer" 
                    value={newCompetition.organizer}
                    onChange={(e) => setNewCompetition({ ...newCompetition, organizer: e.target.value })}
                    placeholder="e.g., Tech Innovation Club"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="competition-description">Description</label>
                <textarea 
                  id="competition-description" 
                  value={newCompetition.description}
                  onChange={(e) => setNewCompetition({ ...newCompetition, description: e.target.value })}
                  placeholder="Describe the competition..."
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="competition-prizes">Prizes</label>
                <textarea 
                  id="competition-prizes" 
                  value={newCompetition.prizes}
                  onChange={(e) => setNewCompetition({ ...newCompetition, prizes: e.target.value })}
                  placeholder="Describe the prizes..."
                  rows="2"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="competition-eligibility">Eligibility</label>
                <input 
                  type="text" 
                  id="competition-eligibility" 
                  value={newCompetition.eligibility}
                  onChange={(e) => setNewCompetition({ ...newCompetition, eligibility: e.target.value })}
                  placeholder="e.g., All students"
                />
              </div>
              <div className="form-group">
                <label>Skills</label>
                <div className="skills-inputs">
                  {newCompetition.skills.map((skill, index) => (
                    <div key={index} className="skill-input-group">
                      <input 
                        type="text" 
                        value={skill}
                        onChange={(e) => handleCompetitionSkillChange(index, e.target.value, true)}
                        placeholder="e.g., Programming"
                      />
                      <button 
                        type="button" 
                        className="remove-skill-button"
                        onClick={() => handleRemoveCompetitionSkill(index, true)}
                        disabled={newCompetition.skills.length <= 1}
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="add-skill-button"
                    onClick={() => handleAddCompetitionSkill(true)}
                  >
                    <PlusIcon size={16} />
                    <span>Add Skill</span>
                  </button>
                </div>
              </div>
              <button 
                className="add-button"
                onClick={handleAddCompetition}
                disabled={!newCompetition.title || !newCompetition.date || !newCompetition.registrationDeadline}
              >
                <PlusIcon size={16} />
                <span>Add Competition</span>
              </button>
            </div>
            <div className="competitions-list animate-in">
              <h3 className="list-title">Existing Competitions</h3>
              {competitions.length === 0 ? (
                <div className="empty-state">
                  <p>No competitions added yet. Add your first one above.</p>
                </div>
              ) : (
                <div className="competitions-grid">
                  {competitions.map(competition => (
                    <div key={competition.id} className="competition-card">
                      <div className="competition-header">
                        <div className="competition-date">
                          <CalendarIcon size={18} />
                          <span>{new Date(competition.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="competition-deadline">
                          Registration Deadline: {new Date(competition.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                      <h3 className="competition-title">{competition.title}</h3>
                      {competition.organizer && (
                        <div className="competition-organizer">
                          <span>Organized by:</span> {competition.organizer}
                        </div>
                      )}
                      {competition.description && (
                        <div className="competition-description">
                          {competition.description}
                        </div>
                      )}
                      {competition.prizes && (
                        <div className="competition-prizes">
                          <h4>Prizes:</h4>
                          <p>{competition.prizes}</p>
                        </div>
                      )}
                      {competition.eligibility && (
                        <div className="competition-eligibility">
                          <h4>Eligibility:</h4>
                          <p>{competition.eligibility}</p>
                        </div>
                      )}
                      <div className="skills-tags">
                        {competition.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                      <div className="competition-actions">
                        <button 
                          className="edit-button"
                          onClick={() => startEditingCompetition(competition)}
                        >
                          <EditIcon size={16} />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteCompetition(competition.id)}
                        >
                          <TrashIcon size={16} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {editingCompetition && (
              <div className="edit-overlay">
                <div className="edit-panel">
                  <div className="edit-panel-header">
                    <h3>Edit Competition</h3>
                    <button className="close-button" onClick={() => setEditingCompetition(null)}>
                      <XIcon size={20} />
                    </button>
                  </div>
                  <div className="edit-panel-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="edit-competition-title">Title*</label>
                        <input 
                          type="text" 
                          id="edit-competition-title" 
                          value={editingCompetition.title}
                          onChange={(e) => setEditingCompetition({ ...editingCompetition, title: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-competition-date">Date*</label>
                        <input 
                          type="date" 
                          id="edit-competition-date" 
                          value={editingCompetition.date}
                          onChange={(e) => setEditingCompetition({ ...editingCompetition, date: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-competition-deadline">Registration Deadline*</label>
                        <input 
                          type="date" 
                          id="edit-competition-deadline" 
                          value={editingCompetition.registrationDeadline}
                          onChange={(e) => setEditingCompetition({ ...editingCompetition, registrationDeadline: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-competition-organizer">Organizer</label>
                        <input 
                          type="text" 
                          id="edit-competition-organizer" 
                          value={editingCompetition.organizer}
                          onChange={(e) => setEditingCompetition({ ...editingCompetition, organizer: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-competition-description">Description</label>
                      <textarea 
                        id="edit-competition-description" 
                        value={editingCompetition.description}
                        onChange={(e) => setEditingCompetition({ ...editingCompetition, description: e.target.value })}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-competition-prizes">Prizes</label>
                      <textarea 
                        id="edit-competition-prizes" 
                        value={editingCompetition.prizes}
                        onChange={(e) => setEditingCompetition({ ...editingCompetition, prizes: e.target.value })}
                        rows="2"
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-competition-eligibility">Eligibility</label>
                      <input 
                        type="text" 
                        id="edit-competition-eligibility" 
                        value={editingCompetition.eligibility}
                        onChange={(e) => setEditingCompetition({ ...editingCompetition, eligibility: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label>Skills</label>
                      <div className="skills-inputs">
                        {editingCompetition.skills.map((skill, index) => (
                          <div key={index} className="skill-input-group">
                            <input 
                              type="text" 
                              value={skill}
                              onChange={(e) => handleCompetitionSkillChange(index, e.target.value)}
                            />
                            <button 
                              type="button" 
                              className="remove-skill-button"
                              onClick={() => handleRemoveCompetitionSkill(index)}
                              disabled={editingCompetition.skills.length <= 1}
                            >
                              <XIcon size={16} />
                            </button>
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className="add-skill-button"
                          onClick={() => handleAddCompetitionSkill()}
                        >
                          <PlusIcon size={16} />
                          <span>Add Skill</span>
                        </button>
                      </div>
                    </div>
                    <div className="form-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => setEditingCompetition(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={handleUpdateCompetition}
                        disabled={!editingCompetition.title || !editingCompetition.date || !editingCompetition.registrationDeadline}
                      >
                        <SaveIcon size={16} />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default TeacherCareerManagement;