import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function PrivateRoute() {
	const { checkUser } = useAuth();
	const currentUser = checkUser()

	return currentUser ? <Outlet /> : <Navigate to='/login' />;
}
