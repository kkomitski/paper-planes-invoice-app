import React, { useState } from 'react';
import { Mode } from './Modes';

import '../App.css';
import defaultPhoto from '../assets/user-solid.svg';
import logo from '../assets/chart-pie-solid.svg';

export function Header() {
	const [profilePhoto, setProfilePhoto] = useState(defaultPhoto);

	return (
		<header className='header'>
			<div className='icon-container'>
				<img className='logo' src={logo} alt='' />
			</div>
			<div className='profile-mode-container'>
				<div className='mode-container'>
					<Mode />
				</div>
				<div className='profile-photo-container'>
					<img className='profile-photo' src={profilePhoto} alt='' />
				</div>
			</div>
		</header>
	);
}
