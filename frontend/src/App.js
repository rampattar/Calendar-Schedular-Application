import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CalendarPage from './pages/CalendarPage';
import TaskPage from './pages/TaskPage';
import AdminPage from './pages/AdminPage';
import BirthdayPage from './pages/BirthdayPage';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/birthdays" element={<BirthdayPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
