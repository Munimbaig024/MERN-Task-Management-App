import React, { useState } from 'react';
import api from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

function DeleteModal({ task, onSuccess, onClose }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/tasks/${task._id}`);
      toast.success('Task deleted');
      onSuccess();
      onClose();
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to delete task';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card modal-card--sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        <p className="delete-message">
          Are you sure you want to delete{' '}
          <span className="delete-task-name">&quot;{task.title}&quot;</span>?
          <br />
          <small>This action cannot be undone.</small>
        </p>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn-danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
