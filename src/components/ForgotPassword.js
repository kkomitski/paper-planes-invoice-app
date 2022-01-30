import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function ForgotPassword() {
	const emailRef = useRef();

	const { currentUser, reset } = useAuth();

	const [error, setError] = useState('');
	// const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			// setLoading(true);
			// await login(emailRef.current.value, passwordRef.current.value);
			await reset(emailRef.current.value);
			setMessage('Check inbox for further instructions');
		} catch (e) {
			console.log(e.message);
			setError('Failed to reset password');
		}

		// setLoading(false);
	}

	return (
		<>
			<fieldset>
				<form onSubmit={handleSubmit}>
					<legend>Reset Password</legend>
					<div style={{ color: 'red' }}>{error} </div>
					<br />
					<div style={{ color: 'green' }}>{message}</div>
					{currentUser ? currentUser.email : 'noone logged'}
					<br />
					<label htmlFor='email'>email</label> <br />
					<input type='text' id='email' ref={emailRef} /> <br />
					{/* <button disabled={loading}>Log In</button> */}
					<button>Reset</button>
					<div>
						<Link to='/login'>Login</Link>
					</div>
				</form>
				<div className='w-100 text-center mt-2'>
					Need an account? <Link to='../signup'>Sign Up</Link>
				</div>
			</fieldset>
		</>
	);
}
