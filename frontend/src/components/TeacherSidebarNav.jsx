import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboardIcon, BookOpenIcon, UserIcon, 
  SettingsIcon, LogOutIcon, MenuIcon, XIcon, PlusCircleIcon, TrendingUpIcon
} from 'lucide-react';
import '../styles/TeacherSidebarNav.css';
const TeacherSidebarNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    { 
      path: '/teacher/dashboard', 
      icon: <LayoutDashboardIcon size={20} />, 
      label: 'Dashboard' 
    },
    { 
      path: '/teacher/courses', 
      icon: <BookOpenIcon size={20} />, 
      label: 'My Courses' 
    },
    { 
      path: '/teacher/add-course', 
      icon: <PlusCircleIcon size={20} />, 
      label: 'Add New Course' 
    },
    { 
      path: '/teacher/career-management', 
      icon: <TrendingUpIcon size={20} />, 
      label: 'Career Management' 
    },
    { 
      path: '/teacher/profile', 
      icon: <UserIcon size={20} />, 
      label: 'Profile' 
    },
    { 
      path: '/teacher/settings', 
      icon: <SettingsIcon size={20} />, 
      label: 'Settings' 
    }
  ];
  return (
    <>
      <button className="teacher-sidebar-toggle" onClick={toggleSidebar}>
        <MenuIcon size={24} />
      </button>
      <div className={`teacher-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="teacher-sidebar-header">
          <Link to="/teacher/dashboard" className="teacher-sidebar-logo">
            <BookOpenIcon className="logo-icon" />
            <span>EduTrack</span>
            <span className="teacher-badge">Teacher</span>
          </Link>
          <button className="close-teacher-sidebar" onClick={toggleSidebar}>
            <XIcon size={24} />
          </button>
        </div>
        <nav className="teacher-sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`teacher-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="teacher-sidebar-footer">
          <Link to="/" className="teacher-logout-button">
            <LogOutIcon size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      {isOpen && <div className="teacher-sidebar-backdrop" onClick={toggleSidebar}></div>}
    </>
  );
};
export default TeacherSidebarNav;