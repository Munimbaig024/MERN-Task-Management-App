import React from 'react';

const STATUS_LABELS = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'done': 'Done',
};

const STATUS_CLASSES = {
  'todo': 'badge-todo',
  'in-progress': 'badge-inprogress',
  'done': 'badge-done',
};

function TaskItem({ task, onEdit, onDelete }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  const isOverdue =
    task.dueDate &&
    task.status !== 'done' &&
    new Date(task.dueDate) < new Date();

  return (
    <div className="task-item">
      <div className="task-item-left">
        <div className="task-item-top">
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge ${STATUS_CLASSES[task.status]}`}>
            {STATUS_LABELS[task.status]}
          </span>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {formattedDate && (
          <p className={`task-due ${isOverdue ? 'overdue' : ''}`}>
            📅 Due: {formattedDate} {isOverdue && '— Overdue'}
          </p>
        )}
      </div>

      <div className="task-item-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(task)}
          aria-label={`Edit task ${task.title}`}
        >
          Edit
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(task)}
          aria-label={`Delete task ${task.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
