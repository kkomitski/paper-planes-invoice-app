import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { add, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import EditItems from './EditItems';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearItems } from '../features/item';

export default function SingleInvoice(props) {
	const {
		id,
		client,
		total,
		createdAt,
		status,
		due,
		'job-description': jobDescription,
		'client-city': clientCity,
		'client-country': clientCountry,
		'client-email': clientEmail,
		'client-postcode': clientPostcode,
		'client-street': clientStreet,
		items,
		invoiceID,
	} = props;

	const [userInfo, setUserInfo] = useState('');
	const [currentStatus, setStatus] = useState('');
	const [date, setDueDate] = useState('');
	const [show, setShow] = useState('less');
	const [hightlight, setHighlight] = useState('highlight-off');
	const [confirmationState, setConfirmatinoState] = useState('Delete');
	const [cancelState, setCancelState] = useState('cancel-closed');
	const [editDisable, setEditDisable] = useState(true);
	const [formData, setFormData] = useState({});
	const [editButtonState, setEditButtonState] = useState({ color: 'edit-invoice', text: 'Edit' });
	const [currentTotal, setCurrentTotal] = useState(parseFloat(total).toFixed(2));

	const { currentUser } = useAuth();

	const itemsStore = useSelector((state) => state.item.items);
	const dispatch = useDispatch();

	const statusRef = useRef();

	const getDate = () => {
		const creationDate = new Date(createdAt.toDate());
		creationDate.setDate(creationDate.getDate() + due);
		const displayDue = creationDate.toLocaleString('en-GB', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
		setDueDate(displayDue);
	};

	const getStatus = () => {
		switch (status) {
			case 'Paid':
				setStatus('paid');
				break;
			case 'Pending':
				setStatus('pending');
				break;
			case 'Overdue':
				setStatus('overdue');
				break;
			case 'Draft':
				setStatus('draft');
				break;
			default:
				setStatus('paid');
		}
		getTotal();
		statusRef.current.innerHTML = status;
		console.log(statusRef.current.innerHTML);
	};

	const getCurrentUserInfo = () => {
		const userInfoRef = doc(db, 'users', currentUser.email);
		onSnapshot(userInfoRef, (snapshot) => {
			const currentUserInfo = snapshot.data();
			setUserInfo(currentUserInfo);
		});
		getDate();
	};

	const statusToggle = (e) => {
		e.stopPropagation();
		if (status === 'Pending' || status === 'Overdue') {
			setDoc(
				doc(db, 'users', currentUser.email, 'Invoices', id),
				{ status: 'Paid' },
				{ merge: true }
			);
		} else if (status === 'Paid' || status === 'Draft') {
			setDoc(
				doc(db, 'users', currentUser.email, 'Invoices', id),
				{ status: 'Pending' },
				{ merge: true }
			);
		}
	};

	const showMore = (e) => {
		e.stopPropagation();
		if (show === 'less') {
			setShow('more');
			setHighlight('highlight-on');
		} else {
			setShow('less');
			setHighlight('highlight-off');
			setConfirmatinoState('Delete');
			setCancelState('cancel-closed');
		}
	};

	const deleteInvoice = async () => {
		if (confirmationState === 'Confirm?') {
			await deleteDoc(doc(db, 'users', currentUser.email, 'Invoices', id));
		}
	};

	const editToggle = async () => {
		if (!editDisable) {
			setEditDisable(true);
			setEditButtonState({ color: 'edit-invoice', text: 'Edit' });
			const valuesOnly = Object.keys(itemsStore[`invoice-${invoiceID}`]).map(
				(val) => itemsStore[`invoice-${invoiceID}`][val]
			);
			await setDoc(
				doc(db, 'users', currentUser.email, 'Invoices', `invoice-${invoiceID}`),
				{ ...formData, items: valuesOnly },
				{ merge: true }
			);
			// dispatch(clearItems())
			console.log(valuesOnly);
		} else {
			setEditDisable(false);
			setEditButtonState({ color: 'save-edit', text: 'Save' });
		}
	};

	const getTotal = () => {
		if (itemsStore) {
			const foo = Object.values({ ...itemsStore[`invoice-${invoiceID}`] }).reduce(
				(t, { total }) => t + total,
				0
			);
			`${foo}`.match(/[+-]?\d+(\.\d+)?/g).map(function (v) {
				return parseFloat(v);
			});
			setCurrentTotal(foo.toFixed(2));
		}
	};

	const addInfoToForm = (e) => {
		setCurrentTotal(getTotal());
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const statusConfirm = () => {};

	const itemsWithKeys = items.map((item, index) => {
		let uniqueID = parseInt(index);
		return Object.assign(item, { id: uniqueID });
	});

	useEffect(() => {
		getCurrentUserInfo();
	}, []);

	useEffect(() => getStatus(), [status, itemsStore]);

	return (
		<div className='single-invoice'>
			<div onClick={(e) => showMore(e)} className={`${hightlight} invoice-container`}>
				<div className='name-and-id'>
					<h3 className='id'>#{invoiceID}</h3>
					<h2 className='name'>{client}</h2>
				</div>
				<div className='due-and-status'>
					<div className='due-and-total'>
						<h2 className='due'>Due {date}</h2>
						<h1 className='total'>£ {parseFloat(total).toFixed(2)}</h1>
					</div>
					<div onClick={(e) => statusToggle(e)} className={`status-container ${currentStatus}`}>
						<div className='dot'>•</div>
						<div onClick={(e) => statusConfirm()} className='status-confirmation'>
							<h4 ref={statusRef} className='status'>
								{status}
							</h4>
							{/* <h4 ref={statusRef} className='status'>
								{status}
							</h4> */}
						</div>
					</div>
				</div>
			</div>
			<div className={`full-info ${show}`}>
				<div className='full-info-container'>
					<div className='full-info-title-container'>
						<div className='description-creation'>
							<textarea
								// rows={1}
								type='text'
								disabled={editDisable}
								name='job-description'
								className='full-info-item edit-job-description'
								onChange={(e) => addInfoToForm(e)}
								defaultValue={jobDescription}
								placeholder='Job Description'
							/>
							<br />
							<div className='edit-sent-date'>
								{' '}
								{createdAt.toDate().toLocaleString('en-GB', {
									month: 'long',
									day: 'numeric',
									year: 'numeric',
								})}
							</div>
							<div className='edit-expected'>(Expected within: {due} days)</div>
						</div>
						<div className='client-address-info'>
							<textarea
								rows={1}
								type='text'
								className='full-info-item edit-client'
								name='client'
								onChange={(e) => addInfoToForm(e)}
								disabled={editDisable}
								defaultValue={client}
								placeholder='Client'
							/>
							<textarea
								rows={1}
								type='text'
								className='full-info-item edit-client-address'
								name='client-street'
								onChange={(e) => addInfoToForm(e)}
								disabled={editDisable}
								defaultValue={clientStreet}
								placeholder='Street'
							/>
							<textarea
								rows={1}
								type='text'
								className='full-info-item edit-client-address'
								name='client-city'
								onChange={(e) => addInfoToForm(e)}
								disabled={editDisable}
								defaultValue={clientCity}
								placeholder='City'
							/>
							<textarea
								rows={1}
								type='text'
								className='full-info-item edit-client-address'
								name='client-postcode'
								onChange={(e) => addInfoToForm(e)}
								disabled={editDisable}
								defaultValue={clientPostcode}
								placeholder='Postcode'
							/>
							<textarea
								rows={1}
								type='text'
								className='full-info-item edit-client-address'
								name='client-country'
								onChange={(e) => addInfoToForm(e)}
								disabled={editDisable}
								defaultValue={clientCountry}
								placeholder='Country'
							/>
						</div>
					</div>
					<div className='full-info-items'>
						<div className='full-info-single-item'>
							<h2 className='full-info-item edit-name'>Item Name</h2>
							<h2>Qty</h2>
							<h2>Price</h2>
							<h2>Total</h2>
						</div>
						{itemsWithKeys.map((item) => {
							return <EditItems key={item.id} {...item} invoiceID={id} editDisable={editDisable} />;
						})}
					</div>
				</div>
				<div className='full-info-footer'>
					<div className='full-info-buttons-container'>
						<div onClick={() => editToggle()} className={`full-info-btns ${editButtonState.color}`}>
							{editButtonState.text}
						</div>
						<div className='confirmation'>
							<div className={`no ${cancelState}`}>
								<div
									onClick={() => {
										setCancelState('cancel-closed');
										setConfirmatinoState('Delete');
									}}
									className={`full-info-btns`}
								>
									Cancel
								</div>
							</div>
							<div
								onClick={() => {
									setCancelState('cancel-open');
									setConfirmatinoState('Confirm?');
									deleteInvoice();
								}}
								className='full-info-btns delete-invoice yes'
							>
								{confirmationState}
							</div>
						</div>
					</div>
					<div className='full-info-total'>
						<h2>Amount Due</h2> <h1>£{currentTotal}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
