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
			<fieldset className='field'>
				<form className='form' onSubmit={handleSubmit}>
					<legend className='auth-title'>Reset Password</legend>
					<br />
					<div className='error'>{error}</div>
					<div className='success'>{message}</div>
					<br />
					{/* {currentUser ? currentUser.email : 'noone logged'} */}
					<label htmlFor='email'>email</label> <br />
					<input type='text' id='email' ref={emailRef} />
					{/* <button disabled={loading}>Log In</button> */}
					<br />
					<button className='btn'>Reset</button>
					<br />
					<div>
						<Link to='/login'>Login</Link>
					</div>
					<br />
					<div className=''>
						Need an account? <Link to='../signup'>Sign Up</Link>
					</div>
				</form>
			</fieldset>
		</>
	);
}
