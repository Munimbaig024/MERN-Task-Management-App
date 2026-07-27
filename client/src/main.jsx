import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster
        position="top-right"
        gutter={10}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1a1d27',
            color: '#e2e8f0',
            border: '1px solid #2d3148',
            borderRadius: '10px',
            fontSize: '0.9rem',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            padding: '0.75rem 1rem',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#14532d',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#f87171',
              secondary: '#450a0a',
            },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
