import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import ProductManagement from './pages/ProductManagement';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <div className="App">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pos" 
          element={
            <ProtectedRoute>
              <POS />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
