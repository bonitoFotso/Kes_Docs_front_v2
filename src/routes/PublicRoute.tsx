// src/components/PublicRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';

interface PublicRouteProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export function PublicRoute({ redirectTo = '/', children }: PublicRouteProps) {
  const { isAuthenticated } = useAuthContext();
  console.log('isAuthenticated', isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
