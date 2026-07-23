import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleNewTask = () => {
    setTaskToEdit(null);
    setShowForm(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowForm(true);
  };

  const handleDelete = (task) => {
    // Delete modal added in Task 24
    console.log('Delete task:', task);
  };

  const handleFormSuccess = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>My Tasks</h1>
            <p className="dashboard-subtitle">Manage and track your tasks</p>
          </div>
          <button className="btn-primary btn-new-task" onClick={handleNewTask}>
            + New Task
          </button>
        </div>

        <div className="dashboard-content">
          <TaskList
            onEdit={handleEdit}
            onDelete={handleDelete}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </main>

      {showForm && (
        <TaskForm
          taskToEdit={taskToEdit}
          onSuccess={handleFormSuccess}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default Dashboard;
