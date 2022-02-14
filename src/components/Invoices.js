import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';

import { db } from '../firebase-config';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

import SingleInvoice from './SingleInvoice';

export default function Invoices() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [invoices, setInvoices] = useState([]);

	const { currentUser } = useAuth();

	const invoicesRef = collection(db, 'users', currentUser.email, 'Invoices');

	const getInvoices = () => {
		setLoading(true);
		onSnapshot(invoicesRef, (snapshot) => {
			const ref = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

			// If not paid and overdue, change status to Overdue
			ref.map((ref) => {
				const overdueDate = new Date(ref.createdAt.toDate());
				overdueDate.setDate(overdueDate.getDate() + ref.due);
				const currentDate = Date.now();

				if (ref.status !== 'Draft') {
					if (ref.status !== 'Paid') {
						if (currentDate > overdueDate) {
							const docRef = doc(db, 'users', currentUser.email, 'Invoices', ref.id);
							updateDoc(docRef, {
								status: 'Overdue',
							});
						}
					}
				}
			});
			setInvoices(ref);
			setLoading(false);
		});
	};

	useEffect(() => getInvoices(), []);
	return (
		<section className='main-section'>
			<article className='main-section__container'>
				<div className='title-container'>
					<h1 className='page-title'>Invoices</h1>
					<h2 className='filter'>Filter</h2>
				</div>
				{/* {loading === true ? console.log('Loading invoices..') : console.log('Done.')} */}
				{invoices.map((invoice) => {
					return <SingleInvoice key={invoice.id} {...invoice} />;
				})}
			</article>
		</section>
	);
}
