import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate auth state from localStorage on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('taskflow_user');
    const storedToken = localStorage.getItem('taskflow_token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Save user + token to state and localStorage
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('taskflow_user', JSON.stringify(userData));
    localStorage.setItem('taskflow_token', authToken);
  };

  // Clear user + token from state and localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('taskflow_user');
    localStorage.removeItem('taskflow_token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
