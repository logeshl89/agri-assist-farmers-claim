import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../services/api';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'farmer' | 'admin';
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const currentUser = auth.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}