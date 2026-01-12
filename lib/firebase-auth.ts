import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();

export async function signInWithEmail(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
  return await signInWithPopup(auth, googleProvider);
}

export async function signInWithPhone(
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
) {
  return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
}

export function createRecaptchaVerifier(containerId: string = 'recaptcha-container') {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved
    },
  });
}

export async function signOut() {
  return await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

