import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();

	const { login, currentUser } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	// const [path, setPath] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (e) {
			console.log(e.message);
			setError('Failed to sign-in');
		}

		setLoading(false);
	}

	return (
		<>
			<fieldset>
				<form onSubmit={handleSubmit}>
					<legend>Log In</legend>
					{error}
					{currentUser ? currentUser.email : 'noone logged'}
					<br />
					<label htmlFor='email'>email</label> <br />
					<input type='text' id='email' ref={emailRef} /> <br />
					<label htmlFor='password'>password</label> <br />
					<input type='password' id='password' ref={passwordRef} /> <br />
					<button disabled={loading}>Log In</button>
					<div>
						<Link to='/forgot-password'>Forgot Password?</Link>
					</div>
				</form>
				<div className='w-100 text-center mt-2'>
					Need an account? <Link to='../signup'>Sign Up</Link>
				</div>
			</fieldset>
		</>
	);
}
