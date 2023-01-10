import { current } from '@reduxjs/toolkit';
import cryptoJs from 'crypto-js';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { currentUser } from '../../firebase-config';

export function PrivateRoute() {
	// const { currentUser } = useAuth();

	return currentUser ? <Outlet /> : <Navigate to='/login' />;
}
