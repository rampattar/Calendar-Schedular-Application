import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BirthdayPage.css';
import logo from '../assets/calback.jpg';
const BirthdayPage = () => {
  const navigate = useNavigate();
  const [birthdays, setBirthdays] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/birthdays');
        const data = await res.json();
        setBirthdays(data);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
        setErrorMessage('Failed to load birthdays. Please try again later.');
      }
    };
    fetchBirthdays();
  }, []);
  const handleAddBirthday = async () => {
    if (!name || !date) return;
    try {
      const res = await fetch('http://localhost:5000/api/birthdays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, date }),
      });
      const created = await res.json();
      if (res.ok) {
        setBirthdays([...birthdays, created]);
        setName('');
        setDate('');
        setSuccessMessage('🎉 Birthday Date Added Successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Failed to add birthday. Please try again later.');
      }
    } catch (error) {
      console.error("Error adding birthday:", error);
      setErrorMessage('Failed to add birthday. Please try again later.');
    }
  };
  return (
    <div className="birthday-container">
      <img src={logo} alt="Birthday Logo" className="birthday-logo" />
      <h2 className="birthday-title">Birthday Reminders</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <input
        className="birthday-input"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="date"
        className="birthday-input"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button className="birthday-button" onClick={handleAddBirthday}>Add</button>
      <ul className="birthday-list">
        {birthdays.length === 0 ? (
          <li>No birthdays found.</li>
        ) : (
          birthdays.map((b) => {
            const formattedDate = new Date(b.date).toLocaleDateString();
            return (
              <li key={b._id}>
                <strong>{b.name}</strong> – {formattedDate}
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};
export default BirthdayPage;
