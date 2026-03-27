import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch {
      navigate('/login');
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleAdd = async (form) => {
    const res = await api.post('/tasks', form);
    setTasks([res.data, ...tasks]);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  const handleToggle = async (task) => {
    const res = await api.put(`/tasks/${task._id}`, { done: !task.done });
    setTasks(tasks.map((t) => (t._id === task._id ? res.data : t)));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Hello, {name}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <TaskForm onAdd={handleAdd} />
      {tasks.length === 0 && <p>No tasks yet. Add one above!</p>}
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={handleDelete} onToggle={handleToggle} />
      ))}
    </div>
  );
}