import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming useAuth provides login functionality
import './LoginPage.css';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const { login } = useAuth(); // Assuming this context manages the user login
  const navigate = useNavigate();
  const validateForm = () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.user && data.token) {
        login(data.user);
        localStorage.setItem('token', data.token); 
        setEmail('');
        setPassword('');
        navigate('/calendar'); 
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Please try again later.');
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="login-footer">
          Don’t have an account?{' '}
          <span className="signup-link" onClick={() => navigate('/signup')}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
