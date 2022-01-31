import React, { useRef, useState } from 'react';
// import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { signup } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (e) {
			console.log(e.message);
			setError('Failed to create account');
		}

		setLoading(false);
	}

	return (
		<>
			<fieldset className='field'>
				<form className='form' onSubmit={handleSubmit}>
					<legend className='auth-title'>Sign Up</legend>
					<br />
					<div className='error'>{error}</div>
					{/* {JSON.stringify(currentUser)} */}
					<br />
					<label htmlFor='email'>email</label> <br />
					<input type='text' id='email' ref={emailRef} /> <br />
					<label htmlFor='password'>password</label> <br />
					<input type='password' id='password' ref={passwordRef} /> <br />
					<label htmlFor='email'>confirm password</label> <br />
					<input type='password' id='password-confirm' ref={passwordConfirmRef} /> <br />
					<button className='btn' disabled={loading}>
						Sign Up
					</button>
					<br />
					<div className='w-100 text-center mt-2'>
						Already have an account? <Link to='../login'>Log In</Link>
					</div>
				</form>
			</fieldset>
		</>
	);
}
