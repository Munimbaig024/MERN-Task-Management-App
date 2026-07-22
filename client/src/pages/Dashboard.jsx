import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleEdit = (task) => {
    // TaskForm integration added in Task 23
    console.log('Edit task:', task);
  };

  const handleDelete = (task) => {
    // Delete modal added in Task 24
    console.log('Delete task:', task);
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
          <button className="btn-primary btn-new-task">+ New Task</button>
        </div>
        <div className="dashboard-content">
          <TaskList
            onEdit={handleEdit}
            onDelete={handleDelete}
            refreshTrigger={refreshTrigger}
          />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
