import React from 'react';
import Navbar from '../components/Navbar';

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
          <p className="dashboard-subtitle">Manage and track your tasks</p>
        </div>
        <div className="dashboard-content">
          <p className="placeholder-text">Task list coming soon...</p>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
