import { updateCurrentUser } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout() {
		setError('');

		try {
			await logout();
			navigate('/login');
		} catch (e) {
			console.log(e);
			setError('Failed to log out');
		}
	}

	return (
		<>
			<h2>Profile</h2>
			{error}
			<strong>email: </strong>
			{currentUser.email} <br />
			<br />
			<strong>ID: </strong>
			{currentUser.uid} <br />
			<br />
			<button>
				<Link to='/update-profile'>update profile</Link>
			</button>
			<br />
			<br />
			<button type='link' onClick={handleLogout}>
				Log Out
			</button>
		</>
	);
}
