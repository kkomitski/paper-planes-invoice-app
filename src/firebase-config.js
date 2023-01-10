import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import cryptoJs from 'crypto-js';

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// User Data
const key = process.env.REACT_APP_CRYPT_KEY
const bytes = cryptoJs.AES.decrypt(localStorage.encuser, key)
const user = JSON.parse(bytes.toString(cryptoJs.enc.Utf8))

export const auth = getAuth(app);
export const db = getFirestore(app);
export const currentUser = user
