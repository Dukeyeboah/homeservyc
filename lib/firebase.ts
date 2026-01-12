import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA3qhlupKyMoco_zUlAgHq8o9gej9DDseY',
  authDomain: 'homeservyc.firebaseapp.com',
  projectId: 'homeservyc',
  storageBucket: 'homeservyc.firebasestorage.app',
  messagingSenderId: '56015129216',
  appId: '1:56015129216:web:1dcb68cdaec860db8ef465',
  measurementId: 'G-S2L1RSBWP7',
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics only in browser
export const analytics =
  typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;

