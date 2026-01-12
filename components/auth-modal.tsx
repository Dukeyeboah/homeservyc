'use client';

import { useState, useEffect } from 'react';
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
  const { user } = useAuth();

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
        // Wait for recaptcha container to be available
        await new Promise((resolve) => setTimeout(resolve, 100));
        const recaptchaVerifier = createRecaptchaVerifier('recaptcha-container');
        const formattedPhone = phoneNumber.startsWith('+')
          ? phoneNumber
          : `+233${phoneNumber.replace(/^0/, '')}`;
        
        const confirmation = await signInWithPhone(formattedPhone, recaptchaVerifier);
        setConfirmationResult(confirmation);
      } else {
        // Step 2: Verify code
        await confirmationResult.confirm(verificationCode);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
      if (err.code === 'auth/invalid-verification-code') {
        setVerificationCode('');
      }
      if (err.code === 'auth/code-expired') {
        setConfirmationResult(null);
        setVerificationCode('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="bg-card border border-border rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
        >
          <X size={20} className="text-foreground" />
        </button>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {mode === 'signup' ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="text-muted-foreground text-sm">
              {mode === 'signup'
                ? 'Join HomeServyc to access contact information and save your favorite service providers.'
                : 'Welcome back! Sign in to continue.'}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Auth Method Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              type="button"
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
              type="button"
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
            <form onSubmit={handleEmailAuth} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading
                ? 'Please wait...'
                : mode === 'signup'
                  ? 'Create Account'
                  : 'Sign In'}
            </Button>
          </form>
          ) : (
            <form onSubmit={handlePhoneAuth} className="space-y-4">
              {!confirmationResult ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="0551234567"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter your phone number (Ghana format)
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {loading ? 'Sending code...' : 'Send Verification Code'}
                  </Button>
                  <div id="recaptcha-container"></div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      required
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all text-center text-2xl tracking-widest"
                      placeholder="000000"
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Enter the 6-digit code sent to {phoneNumber}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || verificationCode.length !== 6}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {loading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmationResult(null);
                      setVerificationCode('');
                      setError('');
                    }}
                    className="w-full text-sm text-muted-foreground hover:text-foreground"
                  >
                    Use a different number
                  </button>
                </>
              )}
            </form>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleAuth}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Toggle Mode */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">
              {mode === 'signup'
                ? 'Already have an account?'
                : "Don't have an account?"}
            </span>{' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setError('');
              }}
              className="text-primary hover:underline font-medium"
            >
              {mode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

