import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if user is logged in by checking localStorage
  const user = localStorage.getItem('user');
  
  if (!user) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  // If logged in, render the protected component
  return children;
}

export default ProtectedRoute;
