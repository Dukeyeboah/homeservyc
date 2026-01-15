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

// Store verifier instance to clean up properly
let recaptchaVerifierInstance: RecaptchaVerifier | null = null;

export async function createRecaptchaVerifier(containerId: string = 'recaptcha-container') {
  // Clean up any existing verifier
  if (recaptchaVerifierInstance) {
    try {
      recaptchaVerifierInstance.clear();
      console.log('Cleared existing reCAPTCHA verifier');
    } catch (e) {
      console.warn('Error clearing existing verifier:', e);
    }
    recaptchaVerifierInstance = null;
  }

  // Get container - must exist
  const container = document.getElementById(containerId);
  if (!container) {
    throw new Error(`reCAPTCHA container with id "${containerId}" not found`);
  }

  // Clear container but keep it in DOM
  container.innerHTML = '';

  // For visible reCAPTCHA, container should be visible and in normal flow
  // Reset any previous styling
  container.style.position = '';
  container.style.bottom = '';
  container.style.right = '';
  container.style.width = '';
  container.style.height = '';
  container.style.opacity = '';
  container.style.pointerEvents = '';
  container.style.zIndex = '';
  container.style.overflow = '';
  container.style.visibility = '';
  container.style.display = '';

  console.log('Creating visible reCAPTCHA verifier...');

  // Create new verifier with visible reCAPTCHA widget (normal size)
  // Following Firebase docs exactly
  recaptchaVerifierInstance = new RecaptchaVerifier(auth, containerId, {
    size: 'normal',
    callback: (response: string) => {
      // reCAPTCHA solved - user completed the challenge
      console.log('reCAPTCHA solved - token received');
    },
    'expired-callback': () => {
      // reCAPTCHA expired
      console.log('reCAPTCHA expired');
      if (recaptchaVerifierInstance) {
        try {
          recaptchaVerifierInstance.clear();
        } catch (e) {
          // Ignore cleanup errors
        }
        recaptchaVerifierInstance = null;
      }
    },
    'error-callback': (error: any) => {
      // reCAPTCHA error
      console.error('reCAPTCHA error callback:', error);
      if (recaptchaVerifierInstance) {
        try {
          recaptchaVerifierInstance.clear();
        } catch (e) {
          // Ignore cleanup errors
        }
        recaptchaVerifierInstance = null;
      }
    },
  });

  // Pre-render the reCAPTCHA widget (optional but recommended)
  try {
    console.log('Rendering reCAPTCHA widget...');
    const widgetId = await recaptchaVerifierInstance.render();
    console.log('reCAPTCHA widget rendered with ID:', widgetId);
  } catch (error: any) {
    console.error('Error rendering reCAPTCHA:', error);
    recaptchaVerifierInstance = null;
    throw new Error('Failed to initialize reCAPTCHA. Please refresh and try again.');
  }

  return recaptchaVerifierInstance;
}

export async function signOut() {
  return await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

