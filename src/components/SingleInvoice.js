import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase-config';

export default function SingleInvoice({ id, client, total, createdAt, status, due }) {
	const [currentStatus, setStatus] = useState('');
	const [date, setDueDate] = useState('');

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

	const statusToggle = () => {
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

	useEffect(() => {
		getStatus();
		getDate();
	}, [status]);

	return (
		<>
			<div className='invoice-container'>
				<div className='name-and-id'>
					<h3 className='id'>#{id.slice(0, 5)}</h3>
					<h2 className='name'>{client}</h2>
				</div>
				<div className='due-and-status'>
					<div className='due-and-total'>
						<h2 className='due'>Due {date}</h2>
						<h1 className='total'>£ {parseFloat(total).toFixed(2)}</h1>
					</div>
					<div onClick={() => statusToggle()} className={`status-container ${currentStatus}`}>
						<div className='dot'>•</div>
						<h4 className='status'>{status}</h4>
					</div>
				</div>
			</div>
			<div className={`full-info`}></div>
		</>
	);
}
