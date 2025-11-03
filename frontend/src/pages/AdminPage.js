import React, { useEffect, useState } from 'react';
const AdminPage = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then(res => res.json())
      .then(setEvents);
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-orange-600 mb-4">Admin Event Viewer</h2>
      <ul className="list-disc ml-6">
        {events.map((e, i) => (
          <li key={i}>{e.date}: {e.text}</li>
        ))}
      </ul>
    </div>
  );
};
export default AdminPage;
