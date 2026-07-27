import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import TaskItem from './TaskItem';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const SORT_OPTIONS = [
  { value: 'createdAt_desc', label: 'Newest First' },
  { value: 'createdAt_asc', label: 'Oldest First' },
  { value: 'dueDate_asc', label: 'Due Date ↑' },
  { value: 'dueDate_desc', label: 'Due Date ↓' },
];

// Skeleton card shown while fetching
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-line skeleton-line--title" />
      <div className="skeleton-line skeleton-line--short" />
      <div className="skeleton-line skeleton-line--xshort" />
    </div>
  );
}

function TaskList({ onEdit, onDelete, refreshTrigger }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  // Filter & sort state
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt_desc');

  const fetchTasks = async (currentPage = 1, status = statusFilter, sort = sortBy) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10,
        sortBy: sort,
      });
      if (status !== 'all') params.append('status', status);

      const { data } = await api.get(`/tasks?${params.toString()}`);
      setTasks(data.tasks);
      setTotalPages(data.totalPages);
      setTotalTasks(data.totalTasks);
      setPage(currentPage);
    } catch (error) {
      toast.error('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when refreshTrigger changes (after create/edit/delete)
  useEffect(() => {
    fetchTasks(1, statusFilter, sortBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    fetchTasks(1, value, sortBy);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    fetchTasks(1, statusFilter, value);
  };

  return (
    <div>
      {/* Filter & Sort Bar */}
      <div className="filter-bar">
        <div className="filter-status-group">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`filter-status-btn${statusFilter === opt.value ? ' active' : ''}`}
              onClick={() => handleStatusChange(opt.value)}
              disabled={loading}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="filter-sort-group">
          <label htmlFor="sort-select" className="filter-sort-label">Sort by:</label>
          <select
            id="sort-select"
            className="filter-sort-select"
            value={sortBy}
            onChange={handleSortChange}
            disabled={loading}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count when filtering */}
      {statusFilter !== 'all' && !loading && (
        <p className="filter-result-count">
          {totalTasks} task{totalTasks !== 1 ? 's' : ''} found
        </p>
      )}

      {loading ? (
        // Skeleton placeholders
        <div className="task-list" aria-label="Loading tasks">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p>{statusFilter !== 'all' ? 'No tasks match this filter.' : 'No tasks yet.'}</p>
          <span>
            {statusFilter !== 'all'
              ? 'Try selecting a different status.'
              : 'Click "New Task" to get started!'}
          </span>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default TaskList;
