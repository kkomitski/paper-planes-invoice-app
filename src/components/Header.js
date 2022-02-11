import React from 'react';
import { Mode } from './Modes';
import { Link } from 'react-router-dom';

import '../App.css';
import defaultPhoto from '../assets/user-solid.svg';
import { UpdateProfile } from './Authentication/UpdateProfile';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';

export function Header({ toggleProfilePage, activeComponent }) {
	const [page, setPage] = useState(activeComponent);

	const currentPage = () => {
		page === 'invoices' ? setPage('update-profile') : setPage('invoices');
		return page;
	};

	return (
		<header className='header'>
			<div className={`profile-mode-container`}>
				<div className='mode-container'>
					<Mode />
				</div>
				<div onClick={() => toggleProfilePage(currentPage())} className='profile-photo-container'>
					<img className='profile-photo' src={defaultPhoto} alt='' />
				</div>
			</div>
		</header>
	);
}
