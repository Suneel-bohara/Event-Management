import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Assuming you store user info in localStorage after login
  const user = JSON.parse(localStorage.getItem('user')); 

  if (!user || !user.isAdmin) {
    // Redirect to home if not an admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;