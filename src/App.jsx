import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MenuPage from './pages/MenuPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import OrderTracker from './pages/OrderTracker';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const { user, loading } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      <Route 
        path="/" 
        element={user ? <MenuPage theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" />} 
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login theme={theme} toggleTheme={toggleTheme} />} />
      <Route 
        path="/admin" 
        element={user && user.role === 'admin' ? <AdminDashboard theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/orders" 
        element={user ? <OrderTracker theme={theme} toggleTheme={toggleTheme} /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;
