import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CoursePage from './pages/CoursePage'
import AllCourses from './pages/AllCourses'
import CareerDevelopment from './pages/CareerDevelopment'
import Settings from './pages/Settings'
import StudentDashboard from './pages/StudentDashboard'

import './App.css'
 function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/courses" element={<AllCourses />} />
            <Route path="/career" element={<CareerDevelopment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<StudentDashboard />} />

            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
export default App