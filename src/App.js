// React
import { React, useEffect, useState } from 'react';

// Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Firebase
import { db } from './firebase-config';
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Styling
import './App.css';

// Components
import SignUp from './components/SignUp';
import { AuthProvider } from './context/AuthContext';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { ForgotPassword } from './components/ForgotPassword';
import { UpdateProfile } from './components/UpdateProfile';

// Auth
import { useAuth } from './context/AuthContext';

function App() {
	const [newName, setNewName] = useState('');
	const [newAge, setNewAge] = useState(0);
	const [loading, setLoading] = useState(false);

	// populate with content
	const [users, setUsers] = useState([]);

	const usersRef = collection(db, 'users');

	// const { currentUser } = useAuth()
	// console.log(currentUser)

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
	// useEffect(() => getUsers(), []);

	if (loading) {
		return <h1>loading...</h1>;
	}

	return (
		<main className='main'>
			<section className='section-center'>
				<Router>
					<AuthProvider>
						<Routes>
							<Route exact path='/' element={<PrivateRoute />}>
								<Route path='/' element={<Dashboard />} />
							</Route>
							<Route exact path='/' element={<PrivateRoute />}>
								<Route path='/update-profile' element={<UpdateProfile />} />
							</Route>
							<Route exact path='/signup' element={<SignUp />} />
							<Route exact path='/login' element={<Login />} />
							<Route exact path='/forgot-password' element={<ForgotPassword />} />
						</Routes>
					</AuthProvider>
				</Router>
			</section>

			{/* <------- CRUD -------->  */}

			{/* <div className='App'>
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
			</div> */}
		</main>
	);
}

export default App;
