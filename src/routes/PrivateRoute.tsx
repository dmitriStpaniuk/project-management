import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/store';

type PrivateRouteProps = {
  children: React.ReactNode;
};
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useAppSelector((state) => state.user.user);

  return user ? <> {children} </> : <Navigate to="/login" />;
};
