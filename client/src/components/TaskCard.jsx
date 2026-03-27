export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <h3 style={{ textDecoration: task.done ? 'line-through' : 'none', margin: '0 0 6px' }}>
        {task.title}
      </h3>
      {task.description && <p style={{ margin: '0 0 12px', color: '#666' }}>{task.description}</p>}
      <button onClick={() => onToggle(task)}>
        {task.done ? 'Mark undone' : 'Mark done'}
      </button>
      {' '}
      <button onClick={() => onDelete(task._id)} style={{ color: 'red' }}>
        Delete
      </button>
    </div>
  );
}