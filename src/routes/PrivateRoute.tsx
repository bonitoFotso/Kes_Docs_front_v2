import type { ReactNode } from 'react';

import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';


interface PrivateRouteProps {
  redirectTo?: string;
  children: ReactNode;
}

export function PrivateRoute({ redirectTo = '/sign-in', children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuthContext();
  console.log('isAuthenticated', isAuthenticated);


  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
}
