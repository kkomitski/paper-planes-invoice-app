import { collection, doc, setDoc } from 'firebase/firestore';
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
	} = props;
	const [currentStatus, setStatus] = useState('');
	const [date, setDueDate] = useState('');
	const [show, setShow] = useState('less');
	const [hightlight, setHighlight] = useState('highlight-off');

	const { currentUser } = useAuth();

	const getDate = async () => {
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

	useEffect(() => {
		getStatus();
		getDate();
	}, [status]);

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
					<div onClick={(e) => statusToggle(e)} className={`status-container ${currentStatus}`}>
						<div className='dot'>•</div>
						<h4 className='status'>{status}</h4>
					</div>
				</div>
			</div>
			<div className={`full-info ${show}`}>
				<div className='full-info-container'>
					<div className='full-info-title-container'>
						<h1 className='full-info-title'>{jobDescription}</h1>
					</div>
				</div>
			</div>
		</div>
	);
}
