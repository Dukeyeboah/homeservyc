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
    } catch (e) {
      // Ignore errors when clearing
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

  // For invisible reCAPTCHA, the container must be:
  // 1. Visible (at least 1px x 1px)
  // 2. In the viewport
  // 3. Not display: none
  // We'll position it in the bottom-right corner, very small
  container.style.position = 'fixed';
  container.style.bottom = '10px';
  container.style.right = '10px';
  container.style.width = '1px';
  container.style.height = '1px';
  container.style.opacity = '0';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  container.style.overflow = 'hidden';
  container.style.visibility = 'visible';
  container.style.display = 'block';

  // Create new verifier with invisible reCAPTCHA
  recaptchaVerifierInstance = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response: string) => {
      // reCAPTCHA solved - this is called automatically when verification succeeds
      console.log('reCAPTCHA verified successfully');
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
      console.error('reCAPTCHA error:', error);
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

  // For invisible reCAPTCHA, we MUST call .render() to initialize it
  // This will set up the reCAPTCHA but it won't show a widget
  try {
    await recaptchaVerifierInstance.render();
    console.log('reCAPTCHA rendered successfully');
  } catch (error: any) {
    console.error('Error rendering reCAPTCHA:', error);
    // Clean up on error
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

