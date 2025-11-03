import React, { useState, useEffect } from 'react';
import './EventPage.css';

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventDate, setEventDate] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(setEvents)
      .catch(err => console.error('Error fetching events:', err));
  }, []);
  const handleAddEvent = async () => {
    const newEvent = {
      name: eventName,
      description: eventDesc,
      date: eventDate,
      type: 'event',
      text: `${eventName} - ${eventDesc}`
    };
    const res = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });
    if (res.ok) {
      const created = await res.json();
      setEvents([...events, created]);
      setEventName('');
      setEventDesc('');
      setEventDate('');
    }
  };
  return (
    <div className="event-container">
      <h2 className="event-title">Event Planner</h2>
      <input
        className="event-input"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        className="event-input"
        placeholder="Description"
        value={eventDesc}
        onChange={(e) => setEventDesc(e.target.value)}
      />
      <input
        type="date"
        className="event-input"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <button className="event-button" onClick={handleAddEvent}>Add Event</button>
      <ul className="event-list">
        {events.map((event, idx) => (
          <li key={idx} className="event-item">
            <strong>{event.name}</strong> - {event.description} on {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default EventPage;
