import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyB6WBoXTV9OX61EMY0VVCh62QXr12z6pgY',
	authDomain: 'my-test-app-c99a2.firebaseapp.com',
	projectId: 'my-test-app-c99a2',
	storageBucket: 'my-test-app-c99a2.appspot.com',
	messagingSenderId: '322389108804',
	appId: '1:322389108804:web:8279130f14677d4493b411',
	measurementId: 'G-85PTMGJTXS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
