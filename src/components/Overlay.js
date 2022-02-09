import React, { useRef, useState } from 'react';
import { serverTimestamp } from 'firebase/firestore';
import plus from '../assets/plus-circle-solid.svg';
import '../App.css';
import Item from './Item';

export default function Overlay() {
	const [overlayContainerState, setOverlayContainerState] = useState('closed');
	const [field, setField] = useState('info');
	const [items, setItems] = useState([{ id: 0 }]);

	const plusBtn = useRef();
	const cancelBtn = useRef();
	const overlay = useRef();

	const currentDate = new Date().toLocaleString('en-GB', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});

	// User Input fields
	const senderCompany = useRef();
	const senderStreet = useRef();
	const senderCity = useRef();
	const senderPostcode = useRef();
	const senderCountry = useRef();
	const clientClient = useRef();
	const clientEmail = useRef();
	const clientStreet = useRef();
	const clientCity = useRef();
	const clientPostcode = useRef();
	const clientCountry = useRef();
	const invoiceDate = useRef();
	const paymentExpected = useRef();
	const jobDescription = useRef();

	const handleClick = () => {
		console.log('click');
		if (overlayContainerState === 'closed') {
			setOverlayContainerState('open');
		} else {
			setOverlayContainerState('closed');
			setItems([{ id: 0 }]);
			setTimeout(() => setField('info'), 500);
			// setField('info');
		}
	};

	const changeField = () => {
		field === 'info' ? setField('items') : setField('info');
	};

	const removeItem = (id) => {
		setItems((items) => {
			return items.filter((item) => item.id !== id);
		});
	};

	const addNewItem = () => {
		setItems((items) => [...items, { id: items.slice(-1)[0] ? items.slice(-1)[0].id + 1 : 0 }]);
	};

	return (
		<section className={`overlay-container ${overlayContainerState}`}>
			<article ref={plusBtn} onClick={handleClick} className={`icon-container`}>
				<button ref={cancelBtn} onClick={handleClick} className='btn cancel-btn'>
					Cancel
				</button>
				<img className='logo' src={plus} alt='' />
			</article>
			<article ref={overlay} className={`overlay`}>
				{/* <h1 className='overlay-title'>New Invoice</h1> */}
				<div className={`overlay-fields ${field}`}>
					{/* ITEMS */}
					<fieldset style={{ outline: 'none', border: 'none' }} className='new-invoice'>
						<form action='' className='new-invoice-item-form'>
							<h4 className='input-title items'>Items:</h4>
							<div className='items-list'>
								<div className='item'>
									<div className='item-attribute'>
										<h2 className='item-attribute'>Name</h2>
									</div>
									<div className='item-attribute'>
										<h2 className='item-attribute'>Qty</h2>
									</div>
									<div className='item-attribute'>
										<h2 className='item-attribute'>Price</h2>
									</div>
									<div className='item-attribute'>
										<h2 className='item-attribute'>Total</h2>
									</div>
								</div>
								{items.map((item) => {
									return <Item key={item.id} id={item.id} removeItem={removeItem} />;
								})}
							</div>
							<div onClick={() => addNewItem()} className='add-items'>
								+ Add New Item
							</div>
							<div onClick={() => changeField()} className='add-items'>
								Edit Info
							</div>
						</form>
					</fieldset>
					{/* INFORMATION */}
					<fieldset style={{ outline: 'none', border: 'none' }} className='new-invoice'>
						<form className='new-invoice-input-form'>
							{/* SENDER DETAILS */}
							<div className='invoice-from'>
								<h4 className='input-title'>Invoice From:</h4>
								<div className='company'>
									<h2 className='item-attribute' className='item-attribute'>
										Company
									</h2>
									<input ref={senderCompany} className='new-invoice-input' type='text' />
								</div>
								<div className='street'>
									<h2 className='item-attribute'>Street</h2>
									<input ref={senderStreet} className='new-invoice-input' type='text' />
								</div>
								<div className='city'>
									<h2 className='item-attribute'>City</h2>
									<input ref={senderCity} className='new-invoice-input' type='text' />
								</div>
								<div className='postcode'>
									<h2 className='item-attribute'>Postcode</h2>
									<input ref={senderPostcode} className='new-invoice-input' type='text' />
								</div>
								<div className='country'>
									<h2 className='item-attribute'>Country</h2>
									<input ref={senderCountry} className='new-invoice-input' type='text' />
								</div>
							</div>
							{/* CLIENT DETAILS */}
							<h4 className='input-title'>Invoice To:</h4>
							<div className='client'>
								<h2 className='item-attribute'>Client</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='email'>
								<h2 className='item-attribute'>Email</h2>
								<input type='email' className='new-invoice-input' />
							</div>
							<div className='client-street'>
								<h2 className='item-attribute'>Street</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='client-city'>
								<h2 className='item-attribute'>City</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='client-postcode'>
								<h2 className='item-attribute'>Postcode</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='client-country'>
								<h2 className='item-attribute'>Country</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<br />
							<div className='invoice-date'>
								<h2 className='item-attribute'>Invoice Date</h2>
								<input
									type='text'
									style={{ border: 'none' }}
									disabled={true}
									value={currentDate}
									className='new-invoice-input'
								/>
							</div>
							<div className='payment-expected'>
								<h2 className='item-attribute'>Payment Expected</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div className='job-description'>
								<h2 className='item-attribute'>Job Description</h2>
								<input type='text' className='new-invoice-input' />
							</div>
							<div onClick={() => changeField()} className='add-items'>
								+ Add Items
							</div>
						</form>
					</fieldset>
				</div>
			</article>
		</section>
	);
}
