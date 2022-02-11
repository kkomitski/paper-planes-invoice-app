import React, { useEffect, useState } from 'react';
import '../App.css';

export default function SingleInvoice({ id, client, total, createdAt, status, due }) {
	const [currentStatus, setStatus] = useState('');
	const [date, setDueDate] = useState('');

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

	// Draft
	const getStatus = () => {
		// await status;
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

	useEffect(() => {
		getStatus();
		getDate();
	}, [status]);

	return (
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
				<div className={`status-container ${currentStatus}`}>
					<div className='dot'>•</div>
					<h4 className='status'>{status}</h4>
				</div>
			</div>
		</div>
	);
}
