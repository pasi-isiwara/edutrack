import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, BookIcon, ClockIcon, UsersIcon, StarIcon } from 'lucide-react';
import '../styles/AllCourses.css';
import SidebarNav from '../components/SidebarNav';
const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Introduction to Computer Science',
      code: 'CS101',
      category: 'Computer Science',
      instructor: 'Dr. Alan Turing',
      duration: '45 hours',
      level: 'Beginner',
      students: 342,
      rating: 4.8,
      description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming concepts.'
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      code: 'CS201',
      category: 'Computer Science',
      instructor: 'Dr. Ada Lovelace',
      duration: '38 hours',
      level: 'Intermediate',
      students: 256,
      rating: 4.6,
      description: 'Master advanced data structures and algorithms to solve complex computational problems efficiently.'
    },
    {
      id: 3,
      title: 'Web Development Fundamentals',
      code: 'WD101',
      category: 'Web Development',
      instructor: 'Prof. Tim Berners-Lee',
      duration: '40 hours',
      level: 'Beginner',
      students: 512,
      rating: 4.9,
      description: 'Learn HTML, CSS, and JavaScript to build responsive and interactive websites from scratch.'
    },
    {
      id: 4,
      title: 'Database Management Systems',
      code: 'DB101',
      category: 'Database',
      instructor: 'Dr. Edgar Codd',
      duration: '35 hours',
      level: 'Intermediate',
      students: 198,
      rating: 4.5,
      description: 'Understand relational database concepts, SQL, and database design principles.'
    }
  ]);
  const categories = ['all', 'Computer Science', 'Web Development', 'Database', 'Artificial Intelligence', 'Cybersecurity'];
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  useEffect(() => {
    // Animation for course cards
    const cards = document.querySelectorAll('.course-item');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, 100 * index);
    });
  }, [filteredCourses]);
  return (
    <div className="courses-container">
      <SidebarNav />
      <div className="courses-content">
        <h1 className="courses-title">All Courses</h1>
        <div className="courses-filters">
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-container">
            <FilterIcon className="filter-icon" />
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="courses-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <div key={course.id} className="course-item">
                <div className="course-header">
                  <div className="course-icon">
                    <BookIcon />
                  </div>
                  <div className="course-meta">
                    <span className="course-category">{course.category}</span>
                    <div className="course-rating">
                      <StarIcon className="star-icon" size={16} />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="course-body">
                  <Link to={`/course/${course.code}`} className="course-title">
                    {course.title}
                  </Link>
                  <span className="course-code">{course.code}</span>
                  <p className="course-description">{course.description}</p>
                </div>
                <div className="course-details">
                  <div className="detail-item">
                    <ClockIcon size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="detail-item">
                    <UsersIcon size={16} />
                    <span>{course.students} students</span>
                  </div>
                </div>
                <div className="course-footer">
                  <span className="course-level">{course.level}</span>
                  <Link to={`/course/${course.code}`} className="view-course-button">
                    View Course
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-courses">
              <p>No courses found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AllCourses;