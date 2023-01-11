import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import plane from '../../assets/maxresdefault.png';

export function ForgotPassword() {
	const emailRef = useRef();

	const { reset } = useAuth();

	const [error, setError] = useState('');
	const [message, setMessage] = useState('');

	// Try to reset password using the context rest operation
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setError('');
			await reset(emailRef.current.value);
			setMessage('Check inbox for further instructions');
		} catch (e) {
			setError('Failed to reset password');
		}
	}

	return (
		<article className='field-container'>
			<fieldset className='field'>
				<form className='form' onSubmit={handleSubmit}>
					<legend className='auth-title'>Reset Password</legend>
					<br />
					<div className='error'>{error}</div>
					<div className='success'>{message}</div>
					<br />
					<label htmlFor='email'>email</label> <br />
					<input type='text' id='email' ref={emailRef} />
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
			<img className='paper-plane' src={plane} alt='paper plane' />
		</article>
	);
}
