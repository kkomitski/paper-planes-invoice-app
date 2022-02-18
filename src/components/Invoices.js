import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';

import { db } from '../firebase-config';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

import SingleInvoice from './SingleInvoice';

export default function Invoices({ overlayState, setOverlayState }) {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [currentInvoices, setInvoices] = useState([]);

	const { currentUser } = useAuth();

	const invoicesRef = collection(db, 'users', currentUser.email, 'Invoices');

	const getInvoices = () => {
		setLoading(true);
		onSnapshot(invoicesRef, (snapshot) => {
			const invoices = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			// const invoices = snapshot.docs.map((doc) => console.log(doc.data().id));

			// console.log(invoices);

			// If not paid and overdue, change status to Overdue
			invoices.map((invoice) => {
				const overdueDate = new Date(invoice.createdAt.toDate());
				overdueDate.setDate(overdueDate.getDate() + invoice.due);
				const currentDate = Date.now();

				if (invoice.status !== 'Draft') {
					if (invoice.status !== 'Paid') {
						if (currentDate > overdueDate) {
							const docRef = doc(db, 'users', currentUser.email, 'Invoices', invoice.id);
							updateDoc(docRef, {
								status: 'Overdue',
							});
						}
					}
				}
			});

			setInvoices(invoices);
			setLoading(false);
		});
	};

	// console.log('run');

	useEffect(() => getInvoices(), []);

	return (
		<section className='main-section'>
			<article className='main-section__container'>
				<div className='title-container'>
					<h1 className='page-title'>Invoices</h1>
					<h2 className='filter'>Filter</h2>
				</div>
				{/* {loading === true ? console.log('Loading invoices..') : console.log('Done.')} */}
				{/* {console.log('run')} */}
				{currentInvoices.map((invoice) => {
					return <SingleInvoice key={invoice.id} {...invoice} />;
				})}
			</article>
		</section>
	);
}
