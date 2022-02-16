import React, { useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	updateEmail,
	updatePassword,
} from 'firebase/auth';
import { auth } from '../firebase-config';

const AuthContext = React.createContext();

const createUser = createUserWithEmailAndPassword;
const logInUser = signInWithEmailAndPassword;
const signOutUser = signOut;
const resetPassword = sendPasswordResetEmail;

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();

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
		let isMounted = true;
		auth.onAuthStateChanged((user) => {
			if (isMounted) {
				if (user) {
					setCurrentUser(user);
					localStorage.setItem('isSigned', true);
				} else {
					console.log('user-signed out');
					localStorage.setItem('isSigned', false);
				}
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

	// useEffect(() => {
	// 	let isMounted = true;
	// 	auth.onAuthStateChanged((user) => {
	// 		if (isMounted) {
	// 			setCurrentUser(user);
	// 		}
	// 	});

	// 	return () => {
	// 		isMounted = false;
	// 	};
	// }, []);

	const value = { currentUser, signup, login, logout, reset, updateUserEmail, updateUserPassword };

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
