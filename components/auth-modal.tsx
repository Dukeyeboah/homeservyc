'use client';

import { useState, useEffect } from 'react';
import { ModalFrame } from './modal-frame';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithPhone,
  createRecaptchaVerifier,
} from '@/lib/firebase-auth';
import { useAuth } from '@/contexts/auth-context';

interface AuthModalProps {
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  // Ensure we're in the browser before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal if user successfully authenticates
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match. Please check both fields.');
      return;
    }
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError('');
    setLoading(true);

    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!confirmationResult) {
        // Step 1: Send verification code
        // Format phone number first (Ghana format: +233)
        const formattedPhone = phoneNumber.startsWith('+')
          ? phoneNumber
          : `+233${phoneNumber.replace(/^0/, '')}`;

        // Verify phone number format
        if (!/^\+[1-9]\d{1,14}$/.test(formattedPhone)) {
          throw new Error(
            'Invalid phone number format. Please include country code.'
          );
        }

        // Ensure the container exists in the modal
        let container = document.getElementById('recaptcha-container');
        if (!container) {
          throw new Error(
            'reCAPTCHA container not found. Please refresh and try again.'
          );
        }

        // Wait for container to be fully in DOM
        await new Promise((resolve) => setTimeout(resolve, 300));

        console.log('Creating reCAPTCHA verifier...');

        // Create and render recaptcha verifier - must be done after container is in DOM
        // Following Firebase docs: create verifier, render it, then use it
        const recaptchaVerifier = await createRecaptchaVerifier(
          'recaptcha-container'
        );

        console.log('reCAPTCHA verifier created and rendered');
        console.log('Calling signInWithPhoneNumber...');

        // reCAPTCHA is already rendered - user will need to complete the challenge
        // before SMS is sent
        const confirmation = await signInWithPhone(
          formattedPhone,
          recaptchaVerifier
        );

        console.log('Phone authentication initiated successfully');
        setConfirmationResult(confirmation);
      } else {
        // Step 2: Verify code
        await confirmationResult.confirm(verificationCode);
      }
    } catch (err: any) {
      console.error('Phone auth error:', err);

      // Handle specific error codes
      if (err.code === 'auth/invalid-phone-number') {
        setError('Invalid phone number. Please check and try again.');
      } else if (err.code === 'auth/invalid-verification-code') {
        setError('Invalid verification code. Please try again.');
        setVerificationCode('');
      } else if (err.code === 'auth/code-expired') {
        setError('Verification code expired. Please request a new one.');
        setConfirmationResult(null);
        setVerificationCode('');
      } else if (err.code === 'auth/too-many-requests') {
        setError(
          'Too many authentication attempts. Please wait a few minutes before trying again. This is a security measure to prevent abuse.'
        );
      } else if (err.code === 'auth/quota-exceeded') {
        setError('SMS quota exceeded. Please contact support.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError(
          'Phone authentication for this region is not enabled. Please enable it in Firebase Console → Authentication → Settings → SMS region policy.'
        );
      } else if (err.code === 'auth/billing-not-enabled') {
        setError(
          'Billing is not enabled for your Firebase project. Phone authentication requires billing to be enabled. Please enable billing in Firebase Console → Usage and billing.'
        );
      } else if (err.code === 'auth/invalid-app-credential') {
        setError(
          'reCAPTCHA verification failed. This usually means:\n' +
            '1. Your domain (localhost) may not be authorized in Firebase Console\n' +
            '2. There may be a reCAPTCHA configuration issue\n' +
            '3. Try refreshing the page or clearing browser cache\n\n' +
            'To fix: Go to Firebase Console → Authentication → Settings → Authorized domains and ensure "localhost" is listed.'
        );
      } else if (err.message?.includes('reCAPTCHA')) {
        setError(
          'reCAPTCHA verification failed. Please refresh and try again.'
        );
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Use portal to render modal outside navigation component
  if (!mounted) return null;

  const modalContent = (
    <ModalFrame title={mode === 'signup' ? 'Create account' : 'Log in'} onClose={onClose}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label='Close log in'
          className='absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10'
        >
          <X size={20} className='text-foreground' />
        </button>

        {/* Content */}
        <div className='p-6 sm:p-8 space-y-5'>
          <div>
            <h2 className='text-2xl font-semibold text-foreground mb-2'>
              {mode === 'signup' ? 'Create Account' : 'Log in'}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {mode === 'signup'
                ? 'Join HomeServyc to save profiles and share recommendations. Contact introductions are not available yet.'
                : 'Welcome back! Log in to continue.'}
            </p>
          </div>

          {error && (
            <div role='alert' className='bg-destructive/10 text-destructive text-sm p-3 rounded-lg'>
              {error}
            </div>
          )}

          {/* Google Log in */}
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            type='button'
            className='w-full h-12 bg-[#4285f4] hover:bg-[#3367d6] text-white gap-3'
          >
            <span className='bg-white rounded-sm p-2'><svg aria-hidden='true' className='w-5 h-5' viewBox='0 0 24 24'>
              <path
                fill='#4285F4'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='#34A853'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='#FBBC05'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='#EA4335'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg></span>
            Continue with Google
          </Button>

          <p className='text-center text-xs text-muted-foreground'>Or continue with</p>

          {/* Auth Method Toggle */}
          <div className='flex gap-2 p-1 bg-muted rounded-lg'>
            <button
              type='button'
              onClick={() => {
                setAuthMethod(authMethod === 'email' ? null : 'email');
                setError('');
                setConfirmationResult(null);
                setVerificationCode('');
              }}
              disabled={loading}
              aria-expanded={authMethod === 'email'}
              aria-controls='email-auth-fields'
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                authMethod === 'email'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email
            </button>
            <button
              type='button'
              onClick={() => {
                setAuthMethod(authMethod === 'phone' ? null : 'phone');
                setError('');
                setConfirmationResult(null);
                setVerificationCode('');
              }}
              disabled={loading}
              aria-expanded={authMethod === 'phone'}
              aria-controls='phone-auth-fields'
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                authMethod === 'phone'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Phone
            </button>
          </div>

          {authMethod === 'email' && (
            <form id='email-auth-fields' onSubmit={handleEmailAuth} className='space-y-4'>
              {/* Email */}
              <div>
                <label htmlFor='auth-email' className='block text-sm font-medium text-foreground mb-2'>
                  Email
                </label>
                <input
                  id='auth-email'
                  autoComplete='email'
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
                  placeholder='your@email.com'
                />
              </div>

              <div>
                <label htmlFor="auth-password" className="block text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input id="auth-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} required value={password} onChange={e => setPassword(e.target.value)} className="w-full min-w-0 pl-4 pr-12 py-3 bg-secondary rounded-lg border border-border" minLength={6}/>
                  <button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
              </div>
              {mode === 'signup' && <div>
                <label htmlFor="auth-confirm-password" className="block text-sm font-medium mb-2">Confirm password</label>
                <div className="relative">
                  <input id="auth-confirm-password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} aria-invalid={!!confirmPassword && confirmPassword !== password} className="w-full min-w-0 pl-4 pr-12 py-3 bg-secondary rounded-lg border border-border" minLength={6}/>
                  <button type="button" aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'} aria-pressed={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2">{showConfirmPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
                {confirmPassword && confirmPassword !== password && <p className="text-sm text-destructive mt-2" role="status">Passwords do not match yet.</p>}
              </div>}

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={loading}
                className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'signup'
                  ? 'Create Account'
                  : 'Log in'}
              </Button>
            </form>
          )}
          {authMethod === 'phone' && (
            <form id='phone-auth-fields' onSubmit={handlePhoneAuth} className='space-y-4'>
              {!confirmationResult ? (
                <>
                  <div>
                    <label htmlFor='auth-phone' className='block text-sm font-medium text-foreground mb-2'>
                      Phone Number
                    </label>
                    <input
                      id='auth-phone'
                      autoComplete='tel'
                      type='tel'
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
                      placeholder='0551234567'
                    />
                    <p className='text-xs text-muted-foreground mt-1'>
                      Enter your phone number (Ghana format)
                    </p>
                  </div>
                  <Button
                    type='submit'
                    disabled={loading}
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
                  >
                    {loading ? 'Sending code...' : 'Send Verification Code'}
                  </Button>
                  {/* reCAPTCHA container - visible widget will render here */}
                  <div
                    id='recaptcha-container'
                    className='flex justify-center my-4'
                  ></div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor='auth-code' className='block text-sm font-medium text-foreground mb-2'>
                      Verification Code
                    </label>
                    <input
                      id='auth-code'
                      autoComplete='one-time-code'
                      inputMode='numeric'
                      type='text'
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all text-center text-2xl tracking-widest'
                      placeholder='000000'
                      maxLength={6}
                    />
                    <p className='text-xs text-muted-foreground mt-1'>
                      Enter the 6-digit code sent to {phoneNumber}
                    </p>
                  </div>
                  <Button
                    type='submit'
                    disabled={loading || verificationCode.length !== 6}
                    className='w-full bg-primary hover:bg-primary/90 text-primary-foreground'
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                  <button
                    type='button'
                    onClick={() => {
                      setConfirmationResult(null);
                      setVerificationCode('');
                      setError('');
                    }}
                    className='w-full text-sm text-muted-foreground hover:text-foreground'
                  >
                    Use a different number
                  </button>
                </>
              )}
            </form>
          )}

          {/* Toggle Mode */}
          <div className='text-center text-sm'>
            <span className='text-muted-foreground'>
              {mode === 'signup'
                ? 'Already have an account?'
                : "Don't have an account?"}
            </span>{' '}
            <button
              type='button'
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setPassword('');
                setConfirmPassword('');
                setShowPassword(false);
                setShowConfirmPassword(false);
                setError('');
              }}
              className='text-primary hover:underline font-medium'
            >
              {mode === 'signup' ? 'Log in' : 'Sign Up'}
            </button>
          </div>
        </div>
    </ModalFrame>
  );

  // Render modal using portal at document body level
  return modalContent;
}
