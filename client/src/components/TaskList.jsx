import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TaskItem from './TaskItem';
import toast from 'react-hot-toast';

function TaskList({ onEdit, onDelete, refreshTrigger }) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTasks = async (currentPage = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/tasks?page=${currentPage}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setPage(currentPage);
    } catch (error) {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when refreshTrigger changes (after create/edit/delete)
  useEffect(() => {
    fetchTasks(1);
  }, [refreshTrigger]);

  if (loading) {
    return <p className="placeholder-text">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet.</p>
        <span>Click &quot;New Task&quot; to get started!</span>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-page"
            disabled={page === 1}
            onClick={() => fetchTasks(page - 1)}
          >
            ← Prev
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button
            className="btn-page"
            disabled={page === totalPages}
            onClick={() => fetchTasks(page + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
