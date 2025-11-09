import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import './App.css';

function App() {
  useEffect(() => {
    if (window.handleRoutes) {
      window.handleRoutes(['/', '/register', '/login', '/profile']);
    }
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
