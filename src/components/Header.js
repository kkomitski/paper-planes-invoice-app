import React from 'react';
import { Mode } from './Modes';

import '../App.css';
import defaultPhoto from '../assets/user-solid.svg';

export function Header({ activeComponent, setActiveComponent }) {
	const currentPageToggle = () => {
		activeComponent === 'invoices'
			? setActiveComponent('update-profile')
			: setActiveComponent('invoices');
	};

	return (
		<header className='header'>
			<div className={`profile-mode-container`}>
				<div className='mode-container'>
					<Mode />
				</div>
				<div onClick={() => currentPageToggle()} className='profile-photo-container'>
					<img className='profile-photo' src={defaultPhoto} alt='' />
				</div>
			</div>
		</header>
	);
}
