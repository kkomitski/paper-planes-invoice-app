import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function UpdateProfile({ setActiveComponent }) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const { currentUser, updateUserPassword, updateUserEmail, logout } = useAuth();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
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
		<>
			<section className='main-section'>
				<article className='main-section__container'>
					<div className='title-container'>
						<h1 className='page-title'>Profile</h1>
					</div>
					<div className='profile-page-container'>
						<form className='business-info-fieldset'>
							<div className='name-and-logo'>
								<h1 className='company-name'>Company Name</h1>
								<div className='company-logo-container'>
									<h2>logo</h2>
								</div>
							</div>
							<div className='update-street'>
								<h2 className='item-attribute'>Street</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='update-city'>
								<h2 className='item-attribute'>City</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='update-postcode'>
								<h2 className='item-attribute'>Postcode</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='update-country'>
								<h2 className='item-attribute'>Country</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='update-business-number'>
								<h2 className='item-attribute'>Business Number</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='update-vat-registration'>
								<h2 className='item-attribute'>VAT registration</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							{/* </fieldset> */}
							<br />
							{/* <form onSubmit={handleSubmit} className='update-info-fieldset'> */}
							<div className='update-email'>
								<h2 className='item-attribute'>Email</h2>
								<input
									type='text'
									id='email'
									className='new-invoice-input'
									ref={emailRef}
									required
									defaultValue={currentUser.email}
								/>{' '}
							</div>
							<div className='update-password'>
								<h2 className='item-attribute'>New Password</h2>
								<input
									type='password'
									id='password'
									className='new-invoice-input'
									ref={passwordRef}
									placeholder='Leave blank to keep the same'
								/>{' '}
							</div>
							<div className='update-password-confirm'>
								<h2 className='item-attribute'>Confirm New Password</h2>
								<input
									type='password'
									id='password-confirm'
									className='new-invoice-input'
									ref={passwordConfirmRef}
									placeholder='Leave blank to keep the same'
								/>{' '}
							</div>
							<div className='add-items update-info' disabled={loading}>
								Update
							</div>
							<div
								onClick={() => setActiveComponent('invoices')}
								className='add-items cancel-button'
							>
								Cancel
							</div>
							<div type='link' className='add-items logout-button' onClick={handleLogout}>
								Log Out
							</div>
							{/* </form> */}
						</form>
					</div>
				</article>
			</section>
		</>
	);
}
