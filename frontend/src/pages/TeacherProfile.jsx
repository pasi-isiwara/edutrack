import React, { useState, useEffect } from 'react';
import TeacherSidebarNav from '../components/TeacherSidebarNav';

const TeacherProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    qualifications: '',
    experience: '',
    specialization: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('User from localStorage:', user);

      if (!user || !user.id) {
        console.log('No user found');
        setLoading(false);
        return;
      }

      console.log('Fetching profile for user ID:', user.id);
      const response = await fetch(`http://localhost:5000/api/profile/teacher/${user.id}`);
      const data = await response.json();

      console.log('Profile response:', response.status, data);

      if (response.ok) {
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || '',
          qualifications: data.qualifications || '',
          experience: data.experience || '',
          specialization: data.specialization || ''
        });
        console.log('Profile loaded successfully');
      } else {
        // If profile not found, initialize with localStorage data
        setProfileData({
          name: user.name || '',
          email: user.email || '',
          phone: '',
          bio: '',
          qualifications: '',
          experience: '',
          specialization: ''
        });
        showMessage('Profile not found. Please complete your profile.', 'error');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // On error, try to load from localStorage
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setProfileData({
            name: user.name || '',
            email: user.email || '',
            phone: '',
            bio: '',
            qualifications: '',
            experience: '',
            specialization: ''
          });
        }
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }
      showMessage('Failed to load profile. Using default data.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profileData.name.trim()) {
      showMessage('Name is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await fetch(`http://localhost:5000/api/profile/teacher/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = { ...user, name: profileData.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        showMessage('Profile updated successfully!', 'success');
      } else {
        showMessage(data.message || 'Failed to update profile', 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Failed to update profile. Please try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <TeacherSidebarNav />
        <div style={{ padding: '40px', flex: 1, textAlign: 'center' }}>
          <h2>Loading profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <TeacherSidebarNav />
      <div style={{ padding: '40px', flex: 1, maxWidth: '1000px' }}>
        {message && (
          <div style={{
            padding: '12px 20px',
            marginBottom: '20px',
            background: messageType === 'success' ? '#d4edda' : '#f8d7da',
            color: messageType === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            borderRadius: '4px'
          }}>
            {message}
          </div>
        )}

        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#172b4d' }}>Teacher Profile</h1>
        <p style={{ color: '#5e6c84', marginBottom: '2rem' }}>Manage your personal information and professional details</p>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#172b4d' }}>Personal Information</h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                  style={{ width: '100%', padding: '8px', fontSize: '14px', background: '#f7f9fc', border: '1px solid #dfe1e6', borderRadius: '4px', cursor: 'not-allowed' }}
                />
                <small style={{ color: '#5e6c84', fontSize: '0.85rem' }}>Email cannot be changed</small>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Bio / About</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about yourself..."
                  style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#172b4d' }}>Professional Information</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Qualifications / Education</label>
              <textarea
                name="qualifications"
                value={profileData.qualifications}
                onChange={handleChange}
                rows="3"
                placeholder="List your degrees and certifications..."
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Experience</label>
              <textarea
                name="experience"
                value={profileData.experience}
                onChange={handleChange}
                rows="3"
                placeholder="Describe your teaching experience..."
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', fontSize: '0.9rem' }}>Specialization / Subject Areas</label>
              <input
                type="text"
                name="specialization"
                value={profileData.specialization}
                onChange={handleChange}
                placeholder="e.g., Computer Science, Physics"
                style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #dfe1e6', borderRadius: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 20px',
                background: saving ? '#ccc' : '#3366ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;
