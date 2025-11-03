import React, { useState, useEffect } from 'react';
import './TaskPage.css';
const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => res.json())
      .then(setTasks)
      .catch(err => console.error("Error fetching tasks:", err));
  }, []);
  const handleAddTask = async () => {
    if (!title || !deadline) return;
    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          deadline,
          userId: 'defaultUser', 
        }),
      });
      const created = await res.json();
      setTasks([...tasks, created]);
      setTitle('');
      setDescription('');
      setDeadline('');
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };
  return (
    <div className="task-container">
      <h2 className="task-title">Tasks</h2>
      <input
        className="task-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="task-input"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="task-input"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button className="task-button" onClick={handleAddTask}>Add Task</button>
      <ul className="task-list">
        {tasks.map((t, idx) => (
          <li key={idx}>
            <strong>{t.title}</strong> - {t.description} (Due: {t.deadline})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TaskPage;
