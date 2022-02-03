import React, { useEffect, useState } from 'react';

// Auth
import { updateCurrentUser } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

// Router
import { useNavigate } from 'react-router-dom';

// Database
import {
	collection,
	addDoc,
	onSnapshot,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase-config';

// Styles
import '../App.css';

// Components
import { Header } from './Header';
import SingleInvoice from './SingleInvoice';
import Invoices from './Invoices';
import Overlay from './Overlay';
// import { getStatus, getDate } from './SingleInvoice';

export function Dashboard() {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [invoices, setInvoices] = useState([]);

	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	const invoicesRef = collection(db, 'users', currentUser.email, 'Invoices');

	async function handleLogout() {
		setError('');

		try {
			await logout();
			navigate('/login');
		} catch (e) {
			console.log(e);
			setError('Failed to log out');
		}
	}

	const [barState, setBarState] = useState('close-bar');
	const [profileState, setProfileState] = useState('reveal');

	// const plusBtn = useRef();
	// const profModeRef = useRef();

	const handleClickNew = () => {
		console.log('click');
		if (barState === 'close-bar') {
			setBarState('open-bar');
			setProfileState('hide');
		} else {
			setBarState('close-bar');
			setProfileState('reveal');
		}
	};

	const randomInvoice = {
		client: 'George Peters',
		price: 534.23,
		createdAt: serverTimestamp(),
		status: 'Pending',
	};

	const addInvoice = async () => {
		await addDoc(collection(db, 'users', currentUser.email, 'Invoices'), {
			client: 'George Peters',
			price: 534.23,
			createdAt: serverTimestamp(),
			status: 'Pending',
		});
	};

	const getInvoices = () => {
		setLoading(true);
		onSnapshot(invoicesRef, (snapshot) => {
			const ref = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

			// If not paid and overdue, change status to Overdue
			ref.map((ref) => {
				const overdueDate = new Date(ref.createdAt.toDate());
				overdueDate.setDate(overdueDate.getDate() + 30);
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
	// addInvoice(invoiceJim);

	return (
		<main className='dashboard'>
			{/* <Header handleClickNew={handleClickNew()} barState={barState} profileState={profileState} /> */}
			<Header />
			<Overlay />
			<Invoices>
				{invoices.map((invoice) => {
					// console.log(invoice);
					return <SingleInvoice key={invoice.id} {...invoice} />;
				})}
			</Invoices>

			{/* <button
				style={{ transform: 'translateX(500px)' }}
				className='btn'
				onClick={() => addInvoice(randomInvoice)}
			>
				add
			</button> */}
			{/* <h2>Profile</h2>
			{error}
			<strong>email: </strong>
			{currentUser.email} <br />
			<br />
			<strong>ID: </strong>
			{currentUser.uid} <br />
			<br />
			<button>
				<Link to='/update-profile'>update profile</Link>
			</button>
			<br />
			<br /> */}
			<button type='link' style={{ position: 'absolute' }} className='btn' onClick={handleLogout}>
				Log Out
			</button>
		</main>
	);
}
