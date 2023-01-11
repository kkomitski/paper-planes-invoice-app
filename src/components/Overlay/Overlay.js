import React, { useRef, useState } from 'react';
import plus from '../../assets/plus-circle-solid.svg';
import '../../css/new-invoice-screen.css';
import Item from './Item';
import { doc, serverTimestamp, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from '../../context/AuthContext';
import Calendar from 'react-calendar';
// import { persistUser } from '../../firebase-config';

export default function Overlay(props) {
	const [overlayContainerState, setOverlayContainerState] = useState('closed');
	const [field, setField] = useState('info');
	const [addState, setAddState] = useState('add');
	const [dropdown, setDropdown] = useState('dropdown-closed');

	const [calendar, setCalender] = useState('');
	const [date, setDate] = useState(new Date());
	const [items, setItems] = useState([{ id: 0, name: '', quantity: '', price: '' }]);

	const blankForm = {
		client: '',
		createdAt: serverTimestamp(),
		status: 'Pending',
		items: [],
		total: 0,
		due: 30,
	};
	const [formData, setFormData] = useState(blankForm);

	const plusBtn = useRef();
	const cancelBtn = useRef();
	const overlay = useRef();

	const { checkUser } = useAuth();
	const currentUser = checkUser();

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

	const toggleOverlay = () => {
		if (overlayContainerState === 'closed') {
			setOverlayContainerState('open');
			setItems([{ id: 0, name: '', quantity: '', price: '' }]);
			paymentExpected.current.value = 'Within 30 days';
			invoiceDate.current.value = date.toLocaleString('en-GB', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
			});
			senderCompany.current.value = props.infoStore['company-name'];
			senderStreet.current.value = props.infoStore['street'];
			senderCity.current.value = props.infoStore['city'];
			senderPostcode.current.value = props.infoStore['postcode'];
			senderCountry.current.value = props.infoStore['country'];
		} else {
			setOverlayContainerState('closed');
			setItems([]);
			setTimeout(() => setField('info'), 500);
			clientClient.current.setAttribute('placeholder', '');
			setAddState('add');
			setFormData(blankForm);
			setDropdown('dropdown-closed');
			setDate(new Date());
			clearAllInputs();
		}
	};

	const toggleInputField = () => {
		if (field === 'info') {
			setField('items');
		} else {
			let sumTotal = 0;
			const currentItems = getItems();
			currentItems.forEach((item) => {
				if (item.total) {
					sumTotal += parseFloat(item.total);
				}
			});
			setFormData({ ...formData, items: [...currentItems], total: sumTotal });
			setField('info');
			setAddState('add');
		}
	};

	const toggleCalendar = () => {
		calendar === ''
			? setCalender(<Calendar onChange={setDate} onClickDay={(e) => calenderOff(e)} />)
			: setCalender('');
	};

	const toggleDropdown = () => {
		dropdown === 'dropdown-closed' ? setDropdown('dropdown-open') : setDropdown('dropdown-closed');
	};

	const dropdownValueChecker = (e) => {
		// console.log();
		paymentExpected.current.value = e.target.innerHTML;
		setFormData({ ...formData, due: parseInt(e.target.innerText.replace(/[^0-9.]/g, ''), 10) });
		setDropdown('dropdown-closed');
	};

	const dropdownValueCustom = (e) => {
		setFormData({ ...formData, due: parseInt(e.target.value) });
		setDropdown('dropdown-closed');
	};

	const calenderOff = (clickedDate) => {
		setCalender('');
		invoiceDate.current.value = clickedDate.toLocaleString('en-GB', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
		setFormData({ ...formData, createdAt: clickedDate });
	};

	const addItem = () => {
		setItems((items) => [
			...items,
			{ id: items.slice(-1)[0] ? items.slice(-1)[0].id + 1 : 0, name: '', quantity: '', price: '' },
		]);
		// getItems();
	};

	const removeItem = (id) => {
		setItems((items) => {
			return items.filter((item) => item.id !== id);
		});
	};

	const getItems = () => {
		const allItems = document.querySelectorAll('.item');
		let items = [];
		allItems.forEach((item) => {
			if (
				item.children[1].firstChild.value &&
				item.children[2].firstChild.value &&
				item.children[3].firstChild.firstChild.value
			) {
				items.push({
					name: item.children[0].firstChild.value,
					quantity: item.children[1].firstChild.value,
					price: item.children[2].firstChild.value,
					total: item.children[3].firstChild.firstChild.value,
				});
			}
		});
		return items;
	};

	const addInfoToForm = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	let newInvoiceID = 0;
	const invoicesIDRef = doc(db, 'users', currentUser.email);
	const generateInvoiceID = async () => {
		const invoicesIDs = await getDoc(invoicesIDRef);
		const foo = invoicesIDs.data().invoiceIDsCounter + 1;
		newInvoiceID = foo;
	};

	const clearAllInputs = () => {
		const allInputs = document.querySelectorAll('.new-invoice-input');
		allInputs.forEach((input) => {
			input.value = '';
		});
	};

	const saveInvoice = async (e) => {
		console.log(e.target.innerHTML);
		try {
			if (formData.client && formData.total) {
				await generateInvoiceID();
				if (e.target.innerHTML === 'Save') {
					await setDoc(doc(db, 'users', currentUser.email, 'Invoices', `invoice-${newInvoiceID}`), {
						...formData,
						invoiceID: newInvoiceID,
					});
				} else {
					await setDoc(doc(db, 'users', currentUser.email, 'Invoices', `invoice-${newInvoiceID}`), {
						...formData,
						invoiceID: newInvoiceID,
						status: 'Draft',
					});
				}
				updateDoc(invoicesIDRef, { invoiceIDsCounter: increment(1) });
				// Reset
				setOverlayContainerState('closed');
				setItems([{ id: 0 }]);
				setTimeout(() => setField('info'), 500);
				setItems([]);
				clientClient.current.setAttribute('placeholder', '');
				setAddState('add');
				setFormData(blankForm);
				clearAllInputs();
			} else if (formData.client && !formData.total) {
				setAddState('add-error');
			} else if (!formData.client && formData.total) {
				clientClient.current.setAttribute('placeholder', 'Please add client');
			} else {
				clientClient.current.setAttribute('placeholder', 'Please add client');
				setAddState('add-error');
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section className={`overlay-container ${overlayContainerState}`}>
			<article ref={plusBtn} onClick={toggleOverlay} className={`icon-container`}>
				<button ref={cancelBtn} onClick={toggleOverlay} className='btn cancel-btn'>
					Cancel
				</button>
				<img className='logo' src={plus} alt='' />
			</article>
			<article ref={overlay} className={`overlay`}>
				<div className={`overlay-fields ${field}`}>
					{/* ITEMS */}
					<fieldset style={{ outline: 'none', border: 'none' }} className='new-invoice'>
						<form action='' className='new-invoice-item-form'>
							<h4 className='input-title items'>Items:</h4>
							<div className='items-list'>
								<div className='items-titles'>
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
									return (
										<Item
											key={item.id}
											id={item.id}
											name={item.name}
											price={item.price}
											quantity={item.quantity}
											removeItem={removeItem}
										/>
									);
								})}
							</div>
							<div onClick={() => addItem()} className='add-items'>
								+ Add New Item
							</div>
							<div onClick={() => toggleInputField()} className='add-items'>
								Back
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
									<h2 className='item-attribute'>Company</h2>
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
								<input
									ref={clientClient}
									onChange={(e) => addInfoToForm(e)}
									name='client'
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<div className='email'>
								<h2 className='item-attribute'>Email</h2>
								<input
									ref={clientEmail}
									onChange={(e) => addInfoToForm(e)}
									name='client-email'
									type='email'
									className='new-invoice-input'
								/>
							</div>
							<div className='client-street'>
								<h2 className='item-attribute'>Street</h2>
								<input
									ref={clientStreet}
									onChange={(e) => addInfoToForm(e)}
									name='client-street'
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<div className='client-city'>
								<h2 className='item-attribute'>City</h2>
								<input
									ref={clientCity}
									onChange={(e) => addInfoToForm(e)}
									name='client-city'
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<div className='client-postcode'>
								<h2 className='item-attribute'>Postcode</h2>
								<input
									ref={clientPostcode}
									onChange={(e) => addInfoToForm(e)}
									name='client-postcode'
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<div className='client-country'>
								<h2 className='item-attribute'>Country</h2>
								<input
									ref={clientCountry}
									onChange={(e) => addInfoToForm(e)}
									name='client-country'
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<br />
							<div className='invoice-date'>
								<h2 className='item-attribute'>Invoice Date</h2>
								<input
									type='text'
									onClick={toggleCalendar}
									ref={invoiceDate}
									onChange={(e) => addInfoToForm(e)}
									// name='createdAt'
									style={{ border: 'none' }}
									// disabled={true}
									// defaultValue={date.toLocaleString('en-GB', {
									// 	month: 'long',
									// 	day: 'numeric',
									// 	year: 'numeric',
									// })}
									className='new-invoice-input'
								/>
								{calendar}
							</div>
							<div className='payment-expected'>
								<h2 className='item-attribute'>Payment Expected</h2>
								<input
									// value={`Within 30 days`}
									onClick={() => toggleDropdown()}
									onChange={(e) => dropdownValueCustom(e)}
									ref={paymentExpected}
									type='text'
									className='new-invoice-input'
								/>
								<div className={`dropdown ${dropdown}`}>
									<h2 onClick={(e) => dropdownValueChecker(e)} className='item-attribute'>
										Within 7 days
									</h2>
									<h2 onClick={(e) => dropdownValueChecker(e)} className='item-attribute'>
										Within 14 days
									</h2>
									<h2 onClick={(e) => dropdownValueChecker(e)} className='item-attribute'>
										Within 30 days
									</h2>
									<h2 onClick={(e) => dropdownValueChecker(e)} className='item-attribute'>
										Within 45 days
									</h2>
								</div>
							</div>
							<div className='job-description'>
								<h2 className='item-attribute'>Job Description</h2>
								<input
									ref={jobDescription}
									name='job-description'
									onChange={(e) => addInfoToForm(e)}
									type='text'
									className='new-invoice-input'
								/>
							</div>
							<div onClick={() => toggleInputField()} className={`add-items ${addState}`}>
								+ Add Items
							</div>
							<div onClick={(e) => saveInvoice(e)} className='add-items save'>
								Save
							</div>
							<div onClick={(e) => saveInvoice(e)} className='add-items save-draft'>
								Save Draft
							</div>
							<div className='add-items download-pdf'>Download PDF</div>
						</form>
					</fieldset>
				</div>
			</article>
		</section>
	);
}
