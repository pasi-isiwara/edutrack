import React from 'react';
import { BookOpenIcon } from 'lucide-react';
import '../styles/Footer.css';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <BookOpenIcon className="logo-icon" />
          <span>EduTrack</span>
        </div>
        <div className="footer-copyright">
          © {currentYear} EduTrack. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;