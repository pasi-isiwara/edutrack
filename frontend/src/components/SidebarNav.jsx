import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboardIcon, BookOpenIcon, TrendingUpIcon, 
  SettingsIcon, LogOutIcon, MenuIcon, XIcon
} from 'lucide-react';
import '../styles/SidebarNav.css';
const SidebarNav = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navItems = [
    { 
      path: '/dashboard', 
      icon: <LayoutDashboardIcon size={20} />, 
      label: 'Dashboard' 
    },
    { 
      path: '/courses', 
      icon: <BookOpenIcon size={20} />, 
      label: 'My Courses' 
    },
    { 
      path: '/career', 
      icon: <TrendingUpIcon size={20} />, 
      label: 'Career Development' 
    },
    { 
      path: '/settings', 
      icon: <SettingsIcon size={20} />, 
      label: 'Settings' 
    }
  ];
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <MenuIcon size={24} />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            <BookOpenIcon className="logo-icon" />
            <span>EduTrack</span>
          </Link>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <XIcon size={24} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link to="/" className="logout-button">
            <LogOutIcon size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </div>
      {isOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}
    </>
  );
};
export default SidebarNav;