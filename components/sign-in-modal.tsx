'use client';

import { ModalFrame } from './modal-frame';
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/auth-modal';

interface SignInModalProps {
  onClose: () => void;
  onSignIn: () => void;
}

export function SignInModal({ onClose, onSignIn }: SignInModalProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <ModalFrame title="Sign in required" onClose={onClose}>
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close sign in prompt"
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} className="text-foreground" />
          </button>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Sign In Required
              </h2>
              <p className="text-muted-foreground">
                Sign in to save profiles and submit recommendations. Contact introductions are not available yet.
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-foreground">Benefits of signing in:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">

                  <li>Save favorite service providers</li>

                  <li>Submit and manage your own recommendations</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={handleSignInClick}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={onClose}
            aria-label="Close sign in prompt"
                  variant="outline"
                  className="w-full"
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
      </ModalFrame>

      {showAuthModal && (
        <AuthModal
          onClose={() => {
            setShowAuthModal(false);
            onSignIn(); // Call onSignIn when auth modal closes (user might have signed in)
          }}
          initialMode="signin"
        />
      )}
    </>
  );
}
