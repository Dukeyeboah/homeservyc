'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
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
  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

        // Create and render recaptcha verifier - must be done after container is in DOM
        // This will initialize invisible reCAPTCHA
        const recaptchaVerifier = await createRecaptchaVerifier(
          'recaptcha-container'
        );

        // Wait a bit more to ensure reCAPTCHA is fully ready
        await new Promise((resolve) => setTimeout(resolve, 300));

        const confirmation = await signInWithPhone(
          formattedPhone,
          recaptchaVerifier
        );
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
        setError('Too many attempts. Please try again later.');
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
          'reCAPTCHA verification failed. Please refresh the page and try again. If the problem persists, check your Firebase configuration.'
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
    <div className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto'>
      <div
        className='bg-card border border-border rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10'
        >
          <X size={20} className='text-foreground' />
        </button>

        {/* Content */}
        <div className='p-8 space-y-6'>
          <div>
            <h2 className='text-2xl font-semibold text-foreground mb-2'>
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </h2>
            <p className='text-muted-foreground text-sm'>
              {mode === 'signup'
                ? 'Join HappyHomes to access contact information and save your favorite service providers.'
                : 'Welcome back! Sign in to continue.'}
            </p>
          </div>

          {error && (
            <div className='bg-destructive/10 text-destructive text-sm p-3 rounded-lg'>
              {error}
            </div>
          )}

          {/* Auth Method Toggle */}
          <div className='flex gap-2 p-1 bg-muted rounded-lg'>
            <button
              type='button'
              onClick={() => {
                setAuthMethod('email');
                setError('');
                setConfirmationResult(null);
                setVerificationCode('');
              }}
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
                setAuthMethod('phone');
                setError('');
                setConfirmationResult(null);
                setVerificationCode('');
              }}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                authMethod === 'phone'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Phone
            </button>
          </div>

          {authMethod === 'email' ? (
            <form onSubmit={handleEmailAuth} className='space-y-4'>
              {/* Email */}
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
                  placeholder='your@email.com'
                />
              </div>

              {/* Password */}
              <div>
                <label className='block text-sm font-medium text-foreground mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
                  placeholder='••••••••'
                  minLength={6}
                />
              </div>

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
                  : 'Sign In'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handlePhoneAuth} className='space-y-4'>
              {!confirmationResult ? (
                <>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Phone Number
                    </label>
                    <input
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
                  {/* reCAPTCHA container - must exist in DOM before verifier is created */}
                  {/* Positioned off-screen but visible (1px) for invisible reCAPTCHA initialization */}
                  <div
                    id='recaptcha-container'
                    style={{
                      position: 'fixed',
                      bottom: '10px',
                      right: '10px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                      pointerEvents: 'none',
                      zIndex: 9999,
                      overflow: 'hidden',
                      visibility: 'visible',
                      display: 'block',
                    }}
                  ></div>
                </>
              ) : (
                <>
                  <div>
                    <label className='block text-sm font-medium text-foreground mb-2'>
                      Verification Code
                    </label>
                    <input
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

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-border'></div>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-card px-2 text-muted-foreground'>Or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            variant='outline'
            className='w-full'
          >
            <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
              />
              <path
                fill='currentColor'
                d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
              />
              <path
                fill='currentColor'
                d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
              />
              <path
                fill='currentColor'
                d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
              />
            </svg>
            Continue with Google
          </Button>

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
                setError('');
              }}
              className='text-primary hover:underline font-medium'
            >
              {mode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render modal using portal at document body level
  return createPortal(modalContent, document.body);
}
