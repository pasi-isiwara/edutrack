import React, { useState, useEffect } from 'react';
import { 
  BriefcaseIcon, GraduationCapIcon, CalendarIcon, 
  MapPinIcon, ClockIcon, UsersIcon, PlusIcon, 
  TrashIcon, EditIcon, SaveIcon, XIcon, TrophyIcon
} from 'lucide-react';
import '../styles/TeacherCareerManagement.css';
import TeacherSidebarNav from '../components/TeacherSidebarNav';
const TeacherCareerManagement = () => {
  const [activeTab, setActiveTab] = useState('careers');
  const [careers, setCareers] = useState([]);
  const [modules, setModules] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  // Edit states
  const [editingCareer, setEditingCareer] = useState(null);
  const [editingModule, setEditingModule] = useState(null);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [editingCompetition, setEditingCompetition] = useState(null);
  // New item states
  const [newCareer, setNewCareer] = useState({ id: '', name: '' });
  const [newModule, setNewModule] = useState({ 
    id: null, 
    code: '', 
    name: '', 
    level: 'Beginner',
    careerPaths: [] 
  });
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
    // Simulate API call to fetch data
    setTimeout(() => {
      const mockCareers = [
        { id: 'software-developer', name: 'Software Developer' },
        { id: 'data-scientist', name: 'Data Scientist' },
        { id: 'cybersecurity-specialist', name: 'Cybersecurity Specialist' },
        { id: 'network-engineer', name: 'Network Engineer' },
        { id: 'ui-ux-designer', name: 'UI/UX Designer' }
      ];
      const mockModules = [
        { id: 1, code: 'CS101', name: 'Introduction to Computer Science', level: 'Beginner', careerPaths: ['software-developer', 'data-scientist', 'cybersecurity-specialist', 'network-engineer'] },
        { id: 2, code: 'CS201', name: 'Data Structures and Algorithms', level: 'Intermediate', careerPaths: ['software-developer', 'data-scientist'] },
        { id: 3, code: 'WD101', name: 'Web Development Fundamentals', level: 'Beginner', careerPaths: ['software-developer', 'ui-ux-designer'] },
        { id: 4, code: 'DB101', name: 'Database Management Systems', level: 'Intermediate', careerPaths: ['software-developer', 'data-scientist'] },
        { id: 5, code: 'SE301', name: 'Software Engineering Principles', level: 'Advanced', careerPaths: ['software-developer'] },
        { id: 6, code: 'STAT201', name: 'Statistics for Data Science', level: 'Intermediate', careerPaths: ['data-scientist'] },
        { id: 7, code: 'ML301', name: 'Machine Learning Fundamentals', level: 'Advanced', careerPaths: ['data-scientist'] },
        { id: 8, code: 'SEC301', name: 'Information Security Fundamentals', level: 'Advanced', careerPaths: ['cybersecurity-specialist', 'network-engineer'] },
        { id: 9, code: 'DES101', name: 'Design Principles', level: 'Beginner', careerPaths: ['ui-ux-designer'] }
      ];
      const mockWorkshops = [
        {
          id: 1,
          title: 'Introduction to React.js',
          type: 'workshop',
          date: '2023-09-15',
          time: '10:00 AM - 2:00 PM',
          location: 'Tech Hub, Room 302',
          instructor: 'Dr. Jane Smith',
          capacity: 30,
          registered: 18,
          skills: ['Frontend Development', 'JavaScript', 'React']
        },
        {
          id: 2,
          title: 'Data Science Career Fair',
          type: 'event',
          date: '2023-09-20',
          time: '9:00 AM - 4:00 PM',
          location: 'University Main Hall',
          companies: 15,
          skills: ['Networking', 'Career Development', 'Data Science']
        },
        {
          id: 3,
          title: 'Cybersecurity Bootcamp',
          type: 'workshop',
          date: '2023-10-05',
          time: '9:00 AM - 5:00 PM',
          location: 'Security Lab, Building B',
          instructor: 'Prof. Michael Chen',
          capacity: 25,
          registered: 25,
          skills: ['Cybersecurity', 'Ethical Hacking', 'Network Security']
        },
        {
          id: 4,
          title: 'UI/UX Design Sprint',
          type: 'workshop',
          date: '2023-10-12',
          time: '1:00 PM - 5:00 PM',
          location: 'Design Studio, Room 105',
          instructor: 'Sarah Johnson',
          capacity: 20,
          registered: 12,
          skills: ['UI Design', 'UX Design', 'Prototyping']
        },
        {
          id: 5,
          title: 'Tech Industry Networking Night',
          type: 'event',
          date: '2023-10-18',
          time: '6:00 PM - 9:00 PM',
          location: 'Innovation Center',
          companies: 25,
          skills: ['Networking', 'Career Development', 'Professional Skills']
        }
      ];
      const mockCompetitions = [
        {
          id: 1,
          title: 'Annual Hackathon Challenge',
          date: '2023-11-15',
          registrationDeadline: '2023-11-01',
          organizer: 'Tech Innovation Club',
          description: 'A 48-hour hackathon to build innovative solutions for real-world problems',
          prizes: '1st Place: $1000, 2nd Place: $500, 3rd Place: $250',
          skills: ['Programming', 'Problem Solving', 'Teamwork'],
          eligibility: 'All students'
        },
        {
          id: 2,
          title: 'Data Science Competition',
          date: '2023-12-05',
          registrationDeadline: '2023-11-20',
          organizer: 'AI Research Center',
          description: 'Solve complex data analysis challenges and present insights',
          prizes: 'Winners will be offered internship opportunities at leading tech companies',
          skills: ['Data Analysis', 'Machine Learning', 'Visualization'],
          eligibility: 'Students with basic knowledge of statistics and programming'
        },
        {
          id: 3,
          title: 'Web Design Challenge',
          date: '2024-01-25',
          registrationDeadline: '2024-01-10',
          organizer: 'Creative Design Department',
          description: 'Design and implement a responsive website for a non-profit organization',
          prizes: 'Best design will be implemented and featured in the university showcase',
          skills: ['Web Design', 'HTML/CSS', 'UX Design'],
          eligibility: 'Open to all students interested in web design'
        }
      ];
      setCareers(mockCareers);
      setModules(mockModules);
      setWorkshops(mockWorkshops);
      setCompetitions(mockCompetitions);
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
    }, 800);
  }, []);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset all editing states when changing tabs
    setEditingCareer(null);
    setEditingModule(null);
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
  const handleAddCareer = () => {
    if (!newCareer.id || !newCareer.name) return;
    const careerIdExists = careers.some(career => career.id === newCareer.id);
    if (careerIdExists) {
      alert('A career with this ID already exists. Please use a different ID.');
      return;
    }
    const updatedCareers = [...careers, newCareer];
    setCareers(updatedCareers);
    setNewCareer({ id: '', name: '' });
    showSuccessMessage('Career path added successfully');
  };
  const handleUpdateCareer = () => {
    if (!editingCareer || !editingCareer.id || !editingCareer.name) return;
    const updatedCareers = careers.map(career => 
      career.id === editingCareer.originalId ? { ...editingCareer, id: editingCareer.id } : career
    );
    // Update career paths in modules if career id changed
    if (editingCareer.originalId !== editingCareer.id) {
      const updatedModules = modules.map(module => {
        if (module.careerPaths.includes(editingCareer.originalId)) {
          const updatedPaths = module.careerPaths.map(path => 
            path === editingCareer.originalId ? editingCareer.id : path
          );
          return { ...module, careerPaths: updatedPaths };
        }
        return module;
      });
      setModules(updatedModules);
    }
    setCareers(updatedCareers);
    setEditingCareer(null);
    showSuccessMessage('Career path updated successfully');
  };
  const handleDeleteCareer = (careerId) => {
    if (!window.confirm('Are you sure you want to delete this career path? This will also remove it from all associated modules.')) return;
    const updatedCareers = careers.filter(career => career.id !== careerId);
    // Remove this career path from all modules
    const updatedModules = modules.map(module => ({
      ...module,
      careerPaths: module.careerPaths.filter(path => path !== careerId)
    }));
    setCareers(updatedCareers);
    setModules(updatedModules);
    showSuccessMessage('Career path deleted successfully');
  };
  const startEditingCareer = (career) => {
    setEditingCareer({
      ...career,
      originalId: career.id // Keep track of original ID for updating references
    });
  };
  // Module management functions
  const handleAddModule = () => {
    if (!newModule.code || !newModule.name) return;
    const moduleCodeExists = modules.some(module => module.code === newModule.code);
    if (moduleCodeExists) {
      alert('A module with this code already exists. Please use a different code.');
      return;
    }
    const newId = modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1;
    const updatedModules = [...modules, { ...newModule, id: newId }];
    setModules(updatedModules);
    setNewModule({ 
      id: null, 
      code: '', 
      name: '', 
      level: 'Beginner',
      careerPaths: [] 
    });
    showSuccessMessage('Module added successfully');
  };
  const handleUpdateModule = () => {
    if (!editingModule || !editingModule.code || !editingModule.name) return;
    // Check if another module has this code (excluding the current one)
    const codeExists = modules.some(module => 
      module.id !== editingModule.id && module.code === editingModule.code
    );
    if (codeExists) {
      alert('Another module with this code already exists. Please use a different code.');
      return;
    }
    const updatedModules = modules.map(module => 
      module.id === editingModule.id ? editingModule : module
    );
    setModules(updatedModules);
    setEditingModule(null);
    showSuccessMessage('Module updated successfully');
  };
  const handleDeleteModule = (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;
    const updatedModules = modules.filter(module => module.id !== moduleId);
    setModules(updatedModules);
    showSuccessMessage('Module deleted successfully');
  };
  const startEditingModule = (module) => {
    setEditingModule({ ...module });
  };
  const handleCareerPathToggle = (careerId, isForNewModule = false, moduleToUpdate = null) => {
    if (isForNewModule) {
      if (newModule.careerPaths.includes(careerId)) {
        setNewModule({
          ...newModule,
          careerPaths: newModule.careerPaths.filter(id => id !== careerId)
        });
      } else {
        setNewModule({
          ...newModule,
          careerPaths: [...newModule.careerPaths, careerId]
        });
      }
    } else {
      const module = moduleToUpdate || editingModule;
      if (!module) return;
      if (module.careerPaths.includes(careerId)) {
        const updatedPaths = module.careerPaths.filter(id => id !== careerId);
        setEditingModule({ ...module, careerPaths: updatedPaths });
      } else {
        setEditingModule({
          ...module,
          careerPaths: [...module.careerPaths, careerId]
        });
      }
    }
  };
  // Workshop/Event management functions
  const handleAddWorkshop = () => {
    if (!newWorkshop.title || !newWorkshop.date || !newWorkshop.time || !newWorkshop.location) return;
    const newId = workshops.length > 0 ? Math.max(...workshops.map(w => w.id)) + 1 : 1;
    // Clean up skills (remove empty ones)
    const cleanedSkills = newWorkshop.skills.filter(skill => skill.trim() !== '');
    if (cleanedSkills.length === 0) cleanedSkills.push('General');
    const updatedWorkshops = [
      ...workshops, 
      { 
        ...newWorkshop, 
        id: newId,
        skills: cleanedSkills,
        registered: newWorkshop.type === 'workshop' ? parseInt(newWorkshop.registered || 0) : undefined,
        capacity: newWorkshop.type === 'workshop' ? parseInt(newWorkshop.capacity || 0) : undefined,
        companies: newWorkshop.type === 'event' ? parseInt(newWorkshop.companies || 0) : undefined
      }
    ];
    setWorkshops(updatedWorkshops);
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
  };
  const handleUpdateWorkshop = () => {
    if (!editingWorkshop || !editingWorkshop.title || !editingWorkshop.date) return;
    // Clean up skills (remove empty ones)
    const cleanedSkills = editingWorkshop.skills.filter(skill => skill.trim() !== '');
    if (cleanedSkills.length === 0) cleanedSkills.push('General');
    const updatedWorkshops = workshops.map(workshop => 
      workshop.id === editingWorkshop.id ? { 
        ...editingWorkshop,
        skills: cleanedSkills,
        registered: editingWorkshop.type === 'workshop' ? parseInt(editingWorkshop.registered || 0) : undefined,
        capacity: editingWorkshop.type === 'workshop' ? parseInt(editingWorkshop.capacity || 0) : undefined,
        companies: editingWorkshop.type === 'event' ? parseInt(editingWorkshop.companies || 0) : undefined
      } : workshop
    );
    setWorkshops(updatedWorkshops);
    setEditingWorkshop(null);
    showSuccessMessage(`${editingWorkshop.type === 'workshop' ? 'Workshop' : 'Event'} updated successfully`);
  };
  const handleDeleteWorkshop = (workshopId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const workshopToDelete = workshops.find(w => w.id === workshopId);
    const updatedWorkshops = workshops.filter(workshop => workshop.id !== workshopId);
    setWorkshops(updatedWorkshops);
    showSuccessMessage(`${workshopToDelete.type === 'workshop' ? 'Workshop' : 'Event'} deleted successfully`);
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
  const handleAddCompetition = () => {
    if (!newCompetition.title || !newCompetition.date || !newCompetition.registrationDeadline) return;
    const newId = competitions.length > 0 ? Math.max(...competitions.map(c => c.id)) + 1 : 1;
    // Clean up skills (remove empty ones)
    const cleanedSkills = newCompetition.skills.filter(skill => skill.trim() !== '');
    if (cleanedSkills.length === 0) cleanedSkills.push('General');
    const updatedCompetitions = [
      ...competitions, 
      { 
        ...newCompetition, 
        id: newId,
        skills: cleanedSkills
      }
    ];
    setCompetitions(updatedCompetitions);
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
  };
  const handleUpdateCompetition = () => {
    if (!editingCompetition || !editingCompetition.title || !editingCompetition.date) return;
    // Clean up skills (remove empty ones)
    const cleanedSkills = editingCompetition.skills.filter(skill => skill.trim() !== '');
    if (cleanedSkills.length === 0) cleanedSkills.push('General');
    const updatedCompetitions = competitions.map(competition => 
      competition.id === editingCompetition.id ? { 
        ...editingCompetition,
        skills: cleanedSkills
      } : competition
    );
    setCompetitions(updatedCompetitions);
    setEditingCompetition(null);
    showSuccessMessage('Competition updated successfully');
  };
  const handleDeleteCompetition = (competitionId) => {
    if (!window.confirm('Are you sure you want to delete this competition?')) return;
    const updatedCompetitions = competitions.filter(competition => competition.id !== competitionId);
    setCompetitions(updatedCompetitions);
    showSuccessMessage('Competition deleted successfully');
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
            className={`tab-button ${activeTab === 'modules' ? 'active' : ''}`}
            onClick={() => handleTabChange('modules')}
          >
            <GraduationCapIcon size={18} />
            <span>Module Recommendations</span>
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
                            {modules.filter(m => m.careerPaths.includes(career.id)).length} associated modules
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
        {activeTab === 'modules' && (
          <div className="modules-management-section">
            <div className="section-header">
              <h2 className="section-title">Module Recommendations</h2>
              <p className="section-description">
                Manage modules and assign them to relevant career paths.
              </p>
            </div>
            <div className="add-module-form">
              <h3 className="form-title">Add New Module</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="module-code">Module Code</label>
                  <input 
                    type="text" 
                    id="module-code" 
                    value={newModule.code}
                    onChange={(e) => setNewModule({ ...newModule, code: e.target.value })}
                    placeholder="e.g., CS101"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="module-name">Module Name</label>
                  <input 
                    type="text" 
                    id="module-name" 
                    value={newModule.name}
                    onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                    placeholder="e.g., Introduction to Computer Science"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="module-level">Level</label>
                  <select 
                    id="module-level" 
                    value={newModule.level}
                    onChange={(e) => setNewModule({ ...newModule, level: e.target.value })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Associated Career Paths</label>
                <div className="career-paths-selection">
                  {careers.map(career => (
                    <label key={career.id} className="career-path-checkbox">
                      <input 
                        type="checkbox"
                        checked={newModule.careerPaths.includes(career.id)}
                        onChange={() => handleCareerPathToggle(career.id, true)}
                      />
                      <span>{career.name}</span>
                    </label>
                  ))}
                </div>
                {careers.length === 0 && (
                  <p className="form-note">
                    No career paths available. Please add career paths first.
                  </p>
                )}
              </div>
              <button 
                className="add-button"
                onClick={handleAddModule}
                disabled={!newModule.code || !newModule.name}
              >
                <PlusIcon size={16} />
                <span>Add Module</span>
              </button>
            </div>
            <div className="modules-list animate-in">
              <h3 className="list-title">Existing Modules</h3>
              {modules.length === 0 ? (
                <div className="empty-state">
                  <p>No modules added yet. Add your first module above.</p>
                </div>
              ) : (
                <div className="modules-grid">
                  {modules.map(module => (
                    <div key={module.id} className="module-card">
                      <div className="module-header">
                        <div className="module-icon">
                          <GraduationCapIcon size={20} />
                        </div>
                        <span className={`module-level ${module.level.toLowerCase()}`}>
                          {module.level}
                        </span>
                      </div>
                      <div className="module-body">
                        <h4 className="module-name">{module.name}</h4>
                        <p className="module-code">{module.code}</p>
                        <div className="module-careers">
                          <h5>Associated Career Paths:</h5>
                          {module.careerPaths.length > 0 ? (
                            <div className="career-paths-tags">
                              {module.careerPaths.map(pathId => {
                                const career = careers.find(c => c.id === pathId);
                                return career ? (
                                  <span key={pathId} className="career-path-tag">
                                    {career.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          ) : (
                            <p className="no-careers">No career paths associated</p>
                          )}
                        </div>
                      </div>
                      <div className="module-actions">
                        <button 
                          className="edit-button"
                          onClick={() => startEditingModule(module)}
                        >
                          <EditIcon size={16} />
                          <span>Edit</span>
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteModule(module.id)}
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
            {editingModule && (
              <div className="edit-overlay">
                <div className="edit-panel">
                  <div className="edit-panel-header">
                    <h3>Edit Module</h3>
                    <button className="close-button" onClick={() => setEditingModule(null)}>
                      <XIcon size={20} />
                    </button>
                  </div>
                  <div className="edit-panel-content">
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="edit-module-code">Module Code</label>
                        <input 
                          type="text" 
                          id="edit-module-code" 
                          value={editingModule.code}
                          onChange={(e) => setEditingModule({ ...editingModule, code: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-module-name">Module Name</label>
                        <input 
                          type="text" 
                          id="edit-module-name" 
                          value={editingModule.name}
                          onChange={(e) => setEditingModule({ ...editingModule, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="edit-module-level">Level</label>
                        <select 
                          id="edit-module-level" 
                          value={editingModule.level}
                          onChange={(e) => setEditingModule({ ...editingModule, level: e.target.value })}
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Associated Career Paths</label>
                      <div className="career-paths-selection">
                        {careers.map(career => (
                          <label key={career.id} className="career-path-checkbox">
                            <input 
                              type="checkbox"
                              checked={editingModule.careerPaths.includes(career.id)}
                              onChange={() => handleCareerPathToggle(career.id)}
                            />
                            <span>{career.name}</span>
                          </label>
                        ))}
                      </div>
                      {careers.length === 0 && (
                        <p className="form-note">
                          No career paths available. Please add career paths first.
                        </p>
                      )}
                    </div>
                    <div className="form-actions">
                      <button 
                        className="cancel-button"
                        onClick={() => setEditingModule(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        className="save-button"
                        onClick={handleUpdateModule}
                        disabled={!editingModule.code || !editingModule.name}
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