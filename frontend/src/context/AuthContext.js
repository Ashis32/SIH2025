import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('employee'); // 'employee' or 'admin'

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setRole('employee');
  };

  const toggleRole = () => {
    setRole(prev => prev === 'employee' ? 'admin' : 'employee');
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout, toggleRole }}>
      {children}
    </AuthContext.Provider>
  );
};