import React, { useRef, useState } from 'react';
import plus from '../assets/plus-circle-solid.svg';
import '../App.css';

export default function Overlay() {
	const [overlayContainerState, setOverlayContainerState] = useState('closed');

	const plusBtn = useRef();
	const cancelBtn = useRef();

	const handleClick = () => {
		console.log('click');
		if (overlayContainerState === 'closed') {
			setOverlayContainerState('open');
		} else {
			setOverlayContainerState('closed');
		}
	};

	return (
		<section className={`overlay-container ${overlayContainerState}`}>
			<article ref={plusBtn} onClick={handleClick} className={`icon-container`}>
				<button ref={cancelBtn} onClick={handleClick} className='btn cancel-btn'>
					Cancel
				</button>
				<img className='logo' src={plus} alt='' />
			</article>
			<article className={`overlay`}>
				{/* <h1 className='overlay-title'>New Invoice</h1> */}
				<fieldset style={{ outline: 'none', border: 'none' }} className='new-invoice'>
					<form className='new-invoice-input'>
						<h4 className='input-title'>Invoice From:</h4>
						<div className='invoice-from'>
							<div className='company'>
								<h2>Company</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='street'>
								<h2>Street</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='city'>
								<h2>City</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='postcode'>
								<h2>Postcode</h2>
								<input className='new-invoice-input' type='text' />
							</div>
							<div className='country'>
								<h2>Country</h2>
								<input className='new-invoice-input' type='text' />
							</div>
						</div>
						<h4 className='input-title'>Invoice To:</h4>
						<div className='invoice-to'>
							<div className='client'>
								<h2>Client</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='email'>
								<h2>Email</h2>
								<input type='email' className='new-invoice-input' />
							</div>
							<div className='Street'>
								<h2>Street</h2>
								<input type='text' className='new-invoice-input' />
							</div>
						</div>
					</form>
				</fieldset>
			</article>
		</section>
	);
}
