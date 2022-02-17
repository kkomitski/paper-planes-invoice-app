import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';

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
	} = props;

	const [userInfo, setUserInfo] = useState('');
	const [currentStatus, setStatus] = useState('');
	const [date, setDueDate] = useState('');
	const [show, setShow] = useState('less');
	const [hightlight, setHighlight] = useState('highlight-off');

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
		}
	};

	const deleteInvoice = async () => {
		await deleteDoc(doc(db, 'users', currentUser.email, 'Invoices', id));
	};

	useEffect(() => {
		getCurrentUserInfo();
	}, []);

	useEffect(() => getStatus(), [status]);

	return (
		<div className='single-invoice'>
			<div onClick={(e) => showMore(e)} className={`${hightlight} invoice-container`}>
				<div className='name-and-id'>
					<h3 className='id'>#{id.slice(0, 5)}</h3>
					<h2 className='name'>{client}</h2>
				</div>
				<div className='due-and-status'>
					<div className='due-and-total'>
						<h2 className='due'>Due {date}</h2>
						<h1 className='total'>£ {parseFloat(total).toFixed(2)}</h1>
					</div>
					<div
						onClick={(e) => statusToggle(e)}
						// style={{ background: '#da6d6d', color: '#fbeeee' }}
						className={`status-container ${currentStatus}`}
					>
						<div className='dot'>•</div>
						<h4 className='status'>{status}</h4>
					</div>
				</div>
			</div>
			<div className={`full-info ${show}`}>
				<div className='full-info-container'>
					<div className='full-info-title-container'>
						<div className='description-creation'>
							<h1 className='full-info-title'>{jobDescription}</h1>
							{/* <h2> */}
							From:{' '}
							{createdAt.toDate().toLocaleString('en-GB', {
								month: 'long',
								day: 'numeric',
								year: 'numeric',
							})}{' '}
							{/* </h2> */}
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
							<h2 className='full-info-item-name'>Item Name</h2>
							<h2>Qty</h2>
							<h2>Price</h2>
							<h2>Total</h2>
						</div>
						{items.map((item) => {
							return (
								<div className='full-info-single-item'>
									<h4 className='full-info-item-name'>{item.name}</h4>
									<h4>{item.quantity}</h4>
									<h4>£{item.price}</h4>
									<h4>£{item.total}</h4>
								</div>
							);
						})}
					</div>
				</div>
				<div className='full-info-footer'>
					<div className='full-info-buttons-container'>
						<div className='full-info-btns edit-invoice'>Edit</div>
						<div onClick={() => deleteInvoice()} className='full-info-btns delete-invoice'>
							Delete
						</div>
					</div>
					<h1 className='full-info-total'>
						<h2>Amount Due</h2> £{total.toFixed(2)}
					</h1>
				</div>
			</div>
		</div>
	);
}
