import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarPage.css';
const formatDate = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [items, setItems] = useState([]); // Both events and tasks
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const eventsRes = await fetch('http://localhost:5000/api/events');
        const tasksRes = await fetch('http://localhost:5000/api/tasks');
        const events = await eventsRes.json();
        const tasks = await tasksRes.json();
        setItems([...events, ...tasks]);
      } catch (err) {
        console.error('Failed to fetch items:', err);
      }
    };
    fetchItems();
  }, []);
  const selectedDate = formatDate(date);
  const dailyItems = items.filter((item) => item.date === selectedDate || item.deadline === selectedDate);
  const dailyEvents = dailyItems.filter((item) => item.type === 'event');
  const dailyTasks = dailyItems.filter((item) => item.type === 'task');
  return (
    <div className="calendar-container p-4">
      <h2 className="calendar-header text-xl font-bold text-orange-600 mb-4">Calendar</h2>
      <Calendar
        onChange={setDate}
        value={date}
        className="react-calendar mb-4"
      />
      <div className="events-container mt-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Events and Tasks on {selectedDate}:
        </h3>
        {dailyEvents.length > 0 && (
          <>
            <h4 className="font-medium text-blue-600 mt-2">Events:</h4>
            <ul className="list-disc ml-6">
              {dailyEvents.map((e, index) => (
                <li key={`event-${index}`} className="event-item text-gray-800">{e.text}</li>
              ))}
            </ul>
          </>
        )}
        {dailyTasks.length > 0 && (
          <>
            <h4 className="font-medium text-green-600 mt-4">Tasks:</h4>
            <ul className="list-disc ml-6">
              {dailyTasks.map((t, index) => (
                <li key={`task-${index}`} className="task-item text-gray-800">{t.text}</li>
              ))}
            </ul>
          </>
        )}
        {dailyEvents.length === 0 && dailyTasks.length === 0 && (
          <p className="text-gray-500 italic">No events or tasks scheduled.</p>
        )}
      </div>
    </div>
  );
};
export default CalendarPage;
