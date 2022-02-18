import React, { useState } from 'react';

// Styles
import '../App.css';

// Components
import { Header } from './Header';
import Overlay from './Overlay/Overlay';
import SwitchComponents from './SwitchComponents';
import Invoices from './Invoices';
import { UpdateProfile } from './Authentication/UpdateProfile';

export let page = 'invoices';

export function Dashboard() {
	const [activeComponent, setActiveComponent] = useState(page);

	return (
		<article className='dashboard'>
			<Header activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
			<Overlay />
			<SwitchComponents active={activeComponent}>
				<Invoices name='invoices' />
				<UpdateProfile setActiveComponent={setActiveComponent} name='update-profile' />
			</SwitchComponents>
		</article>
	);
}
