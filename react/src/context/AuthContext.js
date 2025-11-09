import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const value = {
    user,
    setUser,
    loading,
    isAuthenticated: isAuthenticated()
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
