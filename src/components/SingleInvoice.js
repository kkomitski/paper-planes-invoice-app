import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

export default function SingleInvoice({ id, client, price, createdAt, status }) {
	const [currentStatus, setStatus] = useState('');
	const [date, setDate] = useState('');
	// const { id, invoice } = props;
	// const due = invoice.createdAt
	// 	.toDate()
	// 	.toLocaleString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' });

	const getDate = async () => {
		const due = createdAt
			.toDate()
			.toLocaleString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' });
		setDate(due);
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
		// console.log(invoice.status);
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
					<h1 className='total'>£ {price}</h1>
				</div>
				<div className={`status-container ${currentStatus}`}>
					<div className='dot'>•</div>
					<h4 className='status'>{status}</h4>
				</div>
			</div>
			{/* <h1>></h1> */}
		</div>
	);
}
