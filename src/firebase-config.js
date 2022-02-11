import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const {
	REACT_APP_API_KEY,
	REACT_APP_AUTH_DOM,
	REACT_APP_PROJECT_ID,
	REACT_APP_STORAGE_BUCKET,
	REACT_APP_MESSAGING_SENDER_ID,
	REACT_APP_APP_ID,
	REACT_APP_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
	apiKey: REACT_APP_API_KEY,
	authDomain: REACT_APP_AUTH_DOM,
	projectId: REACT_APP_PROJECT_ID,
	storageBucket: REACT_APP_STORAGE_BUCKET,
	messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
	appId: REACT_APP_APP_ID,
	measurementId: REACT_APP_MEASUREMENT_ID,
};
// const firebaseConfig = {
// 	apiKey: 'AIzaSyB6WBoXTV9OX61EMY0VVCh62QXr12z6pgY',
// 	authDomain: 'my-test-app-c99a2.firebaseapp.com',
// 	projectId: 'my-test-app-c99a2',
// 	storageBucket: 'my-test-app-c99a2.appspot.com',
// 	messagingSenderId: '322389108804',
// 	appId: '1:322389108804:web:8279130f14677d4493b411',
// 	measurementId: 'G-85PTMGJTXS',
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
