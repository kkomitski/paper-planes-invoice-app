import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function UpdateProfile({ toggleProfilePage }) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { currentUser, updateUserPassword, updateUserEmail, logout } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	function handleSubmit(e) {
		e.preventDefault();
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		const promises = [];
		setLoading(true);
		setError('');
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateUserEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updateUserPassword(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				navigate('/');
			})
			.catch((e) => {
				console.log(e);
				setError('Failed to update account');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<main className='dashboard'>
			{/* <Header /> */}
			{/* <Overlay /> */}
			<fieldset className='field-container'>
				<form onSubmit={handleSubmit}>
					<legend>Update Profile</legend>
					{error}
					{/* {JSON.stringify(currentUser)} */}
					<br />
					<label htmlFor='email'>email</label> <br />
					<input
						type='text'
						id='email'
						ref={emailRef}
						required
						defaultValue={currentUser.email}
					/>{' '}
					<br />
					<label htmlFor='password'>password</label> <br />
					<input
						type='password'
						id='password'
						ref={passwordRef}
						placeholder='Leave blank to keep the same'
					/>{' '}
					<br />
					<label htmlFor='email'>confirm password</label> <br />
					<input
						type='password'
						id='password-confirm'
						ref={passwordConfirmRef}
						placeholder='Leave blank to keep the same'
					/>{' '}
					<br />
					<button disabled={loading}>Update</button>
				</form>
				<button type='link' style={{ position: 'absolute' }} className='btn' onClick={handleLogout}>
					Log Out
				</button>
				{/* <div onClick={() => toggleProfilePage('invoices')} className='w-100 text-center mt-2'>
					Cancel
				</div> */}
			</fieldset>
		</main>
	);
}
