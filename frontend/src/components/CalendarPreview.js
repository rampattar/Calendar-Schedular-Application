import React from 'react';
const CalendarPreview = () => {
  const today = new Date();
  const month = today.toLocaleString('default', { month: 'long' });
  const year = today.getFullYear();
  return (
    <div>
      <h1 style={{ color: '#ff9800' }}>{month} {year}</h1>
      <p>📆 Full calendar available after login</p>
    </div>
  );
};
export default CalendarPreview;
