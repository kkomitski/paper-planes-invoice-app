import React, { useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
	setPersistence,
	browserSessionPersistence,
	browserLocalPersistence
} from 'firebase/auth';
import { auth } from '../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/currentUser';
import cryptoJs from 'crypto-js';

const AuthContext = React.createContext();

const createUser = createUserWithEmailAndPassword;
const logInUser = signInWithEmailAndPassword;
const signOutUser = signOut;
const resetPassword = sendPasswordResetEmail;

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState('');

	// const currentUserStore = 
	const dispatch = useDispatch();
	const currentUserStore = useSelector((state) => state.currentUser);

	function signup(email, password) {
		return createUser(auth, email, password);
	}

	function login(email, password) {
		return logInUser(auth, email, password);
	}

	function logout() {
		return signOutUser(auth);
	}

	function reset(email) {
		return resetPassword(auth, email);
	}

	function updateUserEmail(email) {
		return updateEmail(currentUser, email);
	}

	function updateUserPassword(password) {
		return updatePassword(currentUser, password);
	}

	useEffect(() => {
		
		auth.onAuthStateChanged((user) => {
			// console.log("auth state changed")
			// if (isMounted) {
				if (user) {
					const cipher = cryptoJs.AES.encrypt(JSON.stringify(user), process.env.REACT_APP_CRYPT_KEY).toString()
					window.localStorage.setItem('encuser', cipher)
					setCurrentUser(JSON.parse(window.localStorage.user));
				} else {
					window.localStorage.removeItem('encuser')
					console.log('user-signed out');
				}
				// }
			});

		// return () => unsubscribe;
	}, []);

	const value = { currentUser, signup, login, logout, reset, updateUserEmail, updateUserPassword };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
