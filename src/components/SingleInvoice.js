import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { add, set } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';
import EditItems from './EditItems';

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
	const [editDisable, setEditDisable] = useState(false);
	const [formData, setFormData] = useState({ fsada: 30 });
	const [editButtonState, setEditButtonState] = useState({ color: 'edit-invoice', text: 'Edit' });
	// const [totalState, setTotalState] = useState(item.total)

	const { currentUser } = useAuth();

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
		} else if (status === 'Paid') {
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

	const getItemTotal = (price, quantity) => {
		return `${price * quantity}`;
	};

	const editToggle = () => {
		if (!editDisable) {
			setEditDisable(true);
			setEditButtonState({ color: 'edit-invoice', text: 'Edit' });
		} else {
			setEditDisable(false);
			setEditButtonState({ color: 'save-edit', text: 'Save' });
		}
	};

	// const foo = thisTotal();

	// console.log(foo);
	// console.clear();

	const addInfoToForm = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const itemsWithKeys = items.map((item, index) => {
		let uniqueID = parseInt(index);
		return Object.assign(item, { id: uniqueID });
	});

	useEffect(() => {
		getCurrentUserInfo();
	}, []);

	useEffect(() => getStatus(), [status]);

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
						<h4 className='status'>{status}</h4>
					</div>
				</div>
			</div>
			<div className={`full-info ${show}`}>
				<div className='full-info-container'>
					<div className='full-info-title-container'>
						<div className='description-creation'>
							<input
								type='text'
								disabled={editDisable}
								name='job-description'
								className='full-info-item edit-job-description'
								onChange={(e) => addInfoToForm(e)}
								defaultValue={jobDescription}
							/>
							<br />
							{/* <h1 className='full-info-title'>{jobDescription}</h1> */}
							From:
							<br />
							{createdAt.toDate().toLocaleString('en-GB', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}{' '}
							<h2>(Expected within: {due} days)</h2>
						</div>
						<div className='client-address-info'>
							<h2>{clientStreet}</h2>
							<h2>{clientCity}</h2>
							<h2>{clientPostcode}</h2>
							<h2>{clientCountry}</h2>
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
							return <EditItems key={item.id} {...item} editDisable={editDisable} />;
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
						<h2>Amount Due</h2> <h1>£{total.toFixed(2)}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
