import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
	addDoc,
	collection,
	getDoc,
	doc,
	document,
	addCollection,
	documentId,
	data,
	serverTimestamp,
	setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import plane from '../../assets/maxresdefault.png';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { signup, currentUser } = useAuth();

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
			// await signup(emailRef.current.value, passwordRef.current.value);
			signup(emailRef.current.value, passwordRef.current.value).then((credentials) => {
				setDoc(doc(db, 'users', credentials.user.email), {
					uid: credentials.user.uid,
					email: credentials.user.email,
					createdAt: serverTimestamp(),
					'company-name': 'Company Name',
					invoiceIDsCounter: 0,
					// invoices: addDoc(collection(db, 'users', credentials.user.email, 'Invoices')),
				});
				// addDoc(collection(db, 'users', credentials.user.email, 'Invoices'));
			});

			navigate('/');
		} catch (e) {
			console.log(e.message);
			setError('Failed to create account');
		}

		setLoading(false);
	}

	return (
		<article className='field-container'>
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
			<img className='paper-plane' src={plane} alt='paper plane' />
		</article>
	);
}
