import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/SignUp'
import StudentDashboard from './pages/StudentDashboard'
import AllCourses from './pages/AllCourses'
import CareerDevelopment from './pages/CareerDevelopment'
import Settings from './pages/Settings'
import CoursePage from './pages/CoursePage'
import TeacherDashboard from './pages/TeacherDashboard'
import AddCourse from './pages/AddCourse'
import ViewCourse from './pages/ViewCourse'
import UpdateCourse from './pages/UpdateCourse'
import TeacherCareerManagement from './pages/TeacherCareerManagement'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'
 function App() {
  // Determine if we should show navbar/footer based on route
  const isStudentRoute = (pathname) => {
    return ['/dashboard', '/courses', '/career', '/settings', '/course'].some(
      (route) => pathname.startsWith(route),
    )
  }
  const isTeacherRoute = (pathname) => {
    return ['/teacher'].some((route) => pathname.startsWith(route))
  }
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes with navbar and footer */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main className="main-content">
                  <Home />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <main className="main-content">
                  <Login />
                </main>
                <Footer />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <main className="main-content">
                  <Signup />
                </main>
                <Footer />
              </>
            }
          />
          {/* Student routes without navbar and footer */}
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/career" element={<CareerDevelopment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          {/* Teacher routes without navbar and footer */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/add-course" element={<AddCourse />} />
          <Route
            path="/teacher/view-course/:courseId"
            element={<ViewCourse />}
          />
          <Route
            path="/teacher/update-course/:courseId"
            element={<UpdateCourse />}
          />
          <Route
            path="/teacher/career-management"
            element={<TeacherCareerManagement />}
          />
        </Routes>
      </div>
    </Router>
  )
}
export default App
