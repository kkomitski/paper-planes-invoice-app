import React, { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';

import { db } from '../firebase-config';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';

import SingleInvoice from './SingleInvoice';

import { clearItems } from '../features/item';
import { useDispatch } from 'react-redux';
import { setInfo } from '../features/userinfo';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { currentUser } from '../firebase-config';

export default function Invoices() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [currentInvoices, setInvoices] = useState([]);

	// const { currentUser } = useAuth();
	const dispatch = useDispatch();

	const invoicesRef = collection(db, 'users', currentUser.email, 'Invoices');
	const customizedMiddleware = getDefaultMiddleware({
		serializableCheck: false,
	});

	const getInvoices = () => {
		setLoading(true);
		onSnapshot(invoicesRef, (snapshot) => {
			const invoices = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

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

			const userInfoRef = doc(db, 'users', currentUser.email);
			onSnapshot(userInfoRef, (snapshot) => {
				const currentUserInfo = snapshot.data();
				try {
					dispatch(setInfo({ ...currentUserInfo, createdAt: null }));
				} catch (e) {
					console.log(e);
				}
			});

			setInvoices(invoices);
			setLoading(false);
		});
	};

	const filter = (item) => {
		dispatch(clearItems({ item }));
	};

	useEffect(() => {
		getInvoices()
	}, []);

	return (
		<section className='main-section'>
			<article className='main-section__container'>
				<div className='title-container'>
					<h1 className='page-title'>Invoices</h1>
					<h2 onClick={() => filter({ foo: 2 })} className='filter'>
						Filter
					</h2>
				</div>
				{loading === true ? "Loading invoices...." : ''}
				{/* {console.log('run')} */}
				{currentInvoices.map((invoice) => {
					return <SingleInvoice key={invoice.id} {...invoice} />;
				})}
			</article>
		</section>
	);
}
