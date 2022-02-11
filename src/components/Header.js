import React, { useState, useRef } from 'react';
import { Mode } from './Modes';
import Overlay from './Overlay/Overlay';

import '../App.css';
import defaultPhoto from '../assets/user-solid.svg';
// import logo from '../assets/chart-pie-solid.svg';
// import plus from '../assets/plus-circle-solid.svg';

export function Header() {
	const [profilePhoto, setProfilePhoto] = useState(defaultPhoto);

	return (
		<>
			<header className='header'>
				<div className={`profile-mode-container`}>
					<div className='mode-container'>
						<Mode />
					</div>
					<div className='profile-photo-container'>
						<img className='profile-photo' src={profilePhoto} alt='' />
					</div>
				</div>
			</header>
		</>
	);
}
