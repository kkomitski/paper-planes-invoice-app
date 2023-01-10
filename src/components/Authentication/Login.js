import React, { useEffect, useRef, useState } from 'react';

// Components
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

// Styles
import '../../css/auth.css';
import plane from '../../assets/maxresdefault.png';

export function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();

	const { login } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	// const [path, setPath] = useState('');

	const mounted = useRef(true)

	useEffect(() => {
		return () => {
			mounted.current = false
		}
	}, [])

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			navigate('/');
		} catch (e) {
			if(mounted.current){
				console.log(e.message);
				setError('Failed to sign-in');
			}
		}
		if(mounted.current){
			setLoading(false);
		}
	}

	return (
		<article className='field-container'>
			<fieldset className='field'>
				<form className='form' onSubmit={handleSubmit}>
					<legend className='auth-title'>Login</legend>
					<br />
					<div className='error'>{error}</div>
					{/* {currentUser ? currentUser.email : 'noone logged'} */}
					<br />
					<label htmlFor='email'>email</label> <br />
					<input className='input' type='text' id='email' ref={emailRef} /> <br />
					<label htmlFor='password'>password</label> <br />
					<input type='password' id='password' ref={passwordRef} /> <br />
					<button className='btn' disabled={loading}>
						Login
					</button>
					<br />
					<div>
						<Link to='/forgot-password'>Forgot Password?</Link>
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
