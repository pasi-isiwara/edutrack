import React, { useState } from 'react';
import { UserIcon, MailIcon, BellIcon, PaletteIcon, ShieldIcon, SaveIcon } from 'lucide-react';
import '../styles/Settings.css';
import SidebarNav from '../components/SidebarNav';
const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    studentId: 'ST12345',
    department: 'Computer Science',
    bio: 'Computer Science student interested in AI and machine learning.'
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    assessmentReminders: true,
    deadlineAlerts: true,
    systemAnnouncements: false
  });
  const [appearance, setAppearance] = useState({
    theme: 'light'
  });
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };
  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearance({
      ...appearance,
      [name]: value
    });
  };
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity({
      ...security,
      [name]: value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic would go here
    console.log('Saving settings...');
    // Show success message
    const saveButton = document.querySelector('.save-button');
    saveButton.classList.add('saved');
    setTimeout(() => {
      saveButton.classList.remove('saved');
    }, 2000);
  };
  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="input-container">
                  <UserIcon className="input-icon" size={18} />
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="input-container">
                  <UserIcon className="input-icon" size={18} />
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-container">
                <MailIcon className="input-icon" size={18} />
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="studentId">Student ID</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    id="studentId" 
                    name="studentId"
                    value={profileData.studentId}
                    onChange={handleProfileChange}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <div className="input-container">
                  <input 
                    type="text" 
                    id="department" 
                    name="department"
                    value={profileData.department}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea 
                id="bio" 
                name="bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                rows={4}
              />
            </div>
            <button type="submit" className="save-button">
              <SaveIcon size={18} />
              <span>Save Changes</span>
            </button>
          </form>
        );
      case 'notifications':
        return (
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="notification-options">
              <div className="notification-option">
                <div>
                  <h3>Email Notifications</h3>
                  <p>Receive notifications via email</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="emailNotifications"
                    checked={notificationSettings.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="notification-option">
                <div>
                  <h3>Course Updates</h3>
                  <p>Get notified when course content is updated</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="courseUpdates"
                    checked={notificationSettings.courseUpdates}
                    onChange={handleNotificationChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="notification-option">
                <div>
                  <h3>Assessment Reminders</h3>
                  <p>Receive reminders about upcoming assessments</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="assessmentReminders"
                    checked={notificationSettings.assessmentReminders}
                    onChange={handleNotificationChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="notification-option">
                <div>
                  <h3>Deadline Alerts</h3>
                  <p>Get alerts for approaching deadlines</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="deadlineAlerts"
                    checked={notificationSettings.deadlineAlerts}
                    onChange={handleNotificationChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="notification-option">
                <div>
                  <h3>System Announcements</h3>
                  <p>Receive notifications about system updates</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="systemAnnouncements"
                    checked={notificationSettings.systemAnnouncements}
                    onChange={handleNotificationChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
            <button type="submit" className="save-button">
              <SaveIcon size={18} />
              <span>Save Changes</span>
            </button>
          </form>
        );
      case 'appearance':
        return (
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="theme-options">
              <h3>Theme</h3>
              <div className="theme-selection">
                <label className={`theme-option ${appearance.theme === 'light' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="light"
                    checked={appearance.theme === 'light'}
                    onChange={handleAppearanceChange}
                  />
                  <div className="theme-preview light-theme">
                    <div className="theme-header"></div>
                    <div className="theme-content"></div>
                  </div>
                  <span>Light</span>
                </label>
                <label className={`theme-option ${appearance.theme === 'dark' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="dark"
                    checked={appearance.theme === 'dark'}
                    onChange={handleAppearanceChange}
                  />
                  <div className="theme-preview dark-theme">
                    <div className="theme-header"></div>
                    <div className="theme-content"></div>
                  </div>
                  <span>Dark</span>
                </label>
                <label className={`theme-option ${appearance.theme === 'system' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="theme" 
                    value="system"
                    checked={appearance.theme === 'system'}
                    onChange={handleAppearanceChange}
                  />
                  <div className="theme-preview system-theme">
                    <div className="theme-header"></div>
                    <div className="theme-content"></div>
                  </div>
                  <span>System</span>
                </label>
              </div>
            </div>
            <button type="submit" className="save-button">
              <SaveIcon size={18} />
              <span>Save Changes</span>
            </button>
          </form>
        );
      case 'security':
        return (
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-container">
                <ShieldIcon className="input-icon" size={18} />
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword"
                  value={security.currentPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-container">
                <ShieldIcon className="input-icon" size={18} />
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword"
                  value={security.newPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="input-container">
                <ShieldIcon className="input-icon" size={18} />
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={security.confirmPassword}
                  onChange={handleSecurityChange}
                  required
                />
              </div>
            </div>
            <div className="password-requirements">
              <h4>Password Requirements:</h4>
              <ul>
                <li>At least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character</li>
              </ul>
            </div>
            <button type="submit" className="save-button">
              <SaveIcon size={18} />
              <span>Update Password</span>
            </button>
          </form>
        );
      default:
        return null;
    }
  };
  return (
    <div className="settings-container">
      <SidebarNav />
      <div className="settings-content">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-layout">
          <div className="settings-sidebar">
            <div className="settings-tabs">
              <button 
                className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <UserIcon size={20} />
                <span>Profile</span>
              </button>
              <button 
                className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                <BellIcon size={20} />
                <span>Notifications</span>
              </button>
              <button 
                className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('appearance')}
              >
                <PaletteIcon size={20} />
                <span>Appearance</span>
              </button>
              <button 
                className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <ShieldIcon size={20} />
                <span>Security</span>
              </button>
            </div>
          </div>
          <div className="settings-panel">
            <div className="settings-panel-content">
              <h2 className="panel-title">
                {activeTab === 'profile' && 'Profile Settings'}
                {activeTab === 'notifications' && 'Notification Preferences'}
                {activeTab === 'appearance' && 'Appearance Settings'}
                {activeTab === 'security' && 'Security Settings'}
              </h2>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Settings;