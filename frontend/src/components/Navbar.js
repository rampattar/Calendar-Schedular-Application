// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? '✖' : '☰'} {/* Unicode for hamburger and close icon */}
        </div>
        <h1 className="logo">My App</h1>
        {user && (
          <div className="user-info">
            <span>{user.name}</span>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="dropdown-menu">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/calendar" onClick={toggleMenu}>Calendar</Link>
          <Link to="/tasks" onClick={toggleMenu}>Tasks</Link>
          <Link to="/birthdays" onClick={toggleMenu}>Birthdays</Link>
          <Link to="/events" onClick={toggleMenu}>Events</Link>
          <Link to="/admin" onClick={toggleMenu}>Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
