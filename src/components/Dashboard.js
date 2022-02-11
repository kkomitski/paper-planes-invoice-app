import React, { useState } from 'react';

// Styles
import '../App.css';

// Components
import { Header } from './Header';
import Overlay from './Overlay/Overlay';
import SwitchComponents from './SwitchComponents';
import Invoices from './Invoices';
import { UpdateProfile } from './Authentication/UpdateProfile';

export function Dashboard() {
	const [activeComponent, setActiveComponent] = useState('invoices');

	const toggleProfilePage = (page) => {
		setActiveComponent(page);
	};

	return (
		<main className='dashboard'>
			<Header toggleProfilePage={toggleProfilePage} activeComponent={activeComponent} />
			<Overlay />
			<SwitchComponents active={activeComponent}>
				<Invoices name='invoices' />
				<UpdateProfile name='update-profile' />
			</SwitchComponents>
			{/* {page} */}
			{/* <br />
			<button>
				<Link to='/update-profile'>update profile</Link>
			</button>
			<br />
			<br />
			<button type='link' style={{ position: 'absolute' }} className='btn' onClick={handleLogout}>
				Log Out
			</button> */}
		</main>
	);
}
