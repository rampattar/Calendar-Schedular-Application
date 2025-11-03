import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarPreview from '../components/CalendarPreview';
import './HomePage.css';
import calendarImage from '../assets/calendar.jpg';
import Cookies from 'js-cookie';
function HomePage() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const cookieUser = Cookies.get("userName");
    if (cookieUser) {
      setUserName(cookieUser);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.name) {
        setUserName(storedUser.name);
        Cookies.set("userName", storedUser.name, { expires: 7 }); // Save in cookie for 7 days
      }
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('user');
    Cookies.remove('userName');
    navigate('/login');
  };
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <div className="home-left">
          <img src={calendarImage} alt="Calendar" className="calendar-image" />
          <div className="date-time">
            <h3>{dateTime.toLocaleDateString()}</h3>
            <p>{dateTime.toLocaleTimeString()}</p>
          </div>
          <div className="quotes">
            <p>📅 "A goal without a plan is just a wish."</p>
            <p>🧡 "The key is not to prioritize what's on your schedule, but to schedule your priorities."</p>
            <p>⏰ "Time isn't the main thing. It's the only thing."</p>
          </div>
        </div>
        <div className="home-right">
          <div className="auth-box">
            <h2>Welcome to Calendar Scheduler 🗓️</h2>
            {userName ? (
              <div className="user-logout-section">
                <span className="user-name">Welcome, {userName}</span>
                <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <p>Please login or sign up to get started</p>
                <button onClick={() => navigate('/login')} className="btn orange">Login</button>
                <button onClick={() => navigate('/signup')} className="btn white">Signup</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
