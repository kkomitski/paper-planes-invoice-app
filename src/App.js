// React
import { React, useEffect, useState } from 'react';

// Firebase
import { db } from './firebase-config';
import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	onSnapshot,
	getId,
} from 'firebase/firestore';

// Styling/Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

// Components
import SignUp from './components/SignUp';
import AuthProvider from './context/AuthContext';

function App() {
	const [newName, setNewName] = useState('');
	const [newAge, setNewAge] = useState(0);
	const [loading, setLoading] = useState(false);

	// populate with content
	const [users, setUsers] = useState([]);

	// collection(database, collection)
	// const usersRef = collection(db, 'users');
	const usersRef = collection(db, 'users');

	// Create
	const createUser = async () => {
		await addDoc(usersRef, { name: newName, age: Number(newAge) });
	};

	// Update
	const updateUser = async (id, age) => {
		const userDoc = doc(db, 'users', id);
		const newFields = { age: age + 1 };

		await updateDoc(userDoc, newFields);
	};

	// Delete
	const deleteUser = async (id) => {
		const userDoc = doc(db, 'users', id);
		await deleteDoc(userDoc);
	};

	const getUsers = () => {
		setLoading(true);
		onSnapshot(usersRef, (snapshot) => {
			console.log(snapshot.id);
			const ref = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			console.log(ref);
			setUsers(ref);
			setLoading(false);
		});
	};

	// Read
	useEffect(() => getUsers(), []);

	if (loading) {
		return <h1>loading...</h1>;
	}
	return (
		<>
			<AuthProvider>
				<Container
					className='d-flex align-items-center justify-content-center'
					style={{ minHeight: '100vh' }}
				>
					<div className='w-100' style={{ maxWidth: '400px' }}>
						<SignUp />
					</div>
				</Container>
			</AuthProvider>
			<div className='App'>
				<input
					type='text'
					placeholder='name'
					onChange={(e) => {
						setNewName(e.target.value);
					}}
				/>
				<input
					type='number'
					placeholder='age'
					onChange={(e) => {
						setNewAge(e.target.value);
					}}
				/>
				<button onClick={createUser}>CREATE USER</button>
				{users.map((user) => {
					return (
						<div style={{ border: '2px solid red', width: '400px', margin: '25px auto' }}>
							<h1>name:{user.name}</h1>
							<h1>name:{user.age}</h1>
							<button
								onClick={() => {
									updateUser(user.id, user.age);
								}}
							>
								increase age
							</button>
							<button
								onClick={() => {
									deleteUser(user.id);
								}}
							>
								Delete User
							</button>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default App;
