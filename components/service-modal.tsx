'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Phone,
  Mail,
  MessageCircle,
  Lock,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import type { Service } from '@/lib/services';
import { useAuth } from '@/contexts/auth-context';
import { SignInModal } from '@/components/sign-in-modal';
import { saveService, unsaveService, isServiceSaved } from '@/lib/firestore';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { isAuthenticated, user } = useAuth();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkIfSaved();
    } else {
      setIsSaved(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, service.id]);

  const checkIfSaved = async () => {
    if (!user || !isAuthenticated) return;
    try {
      const saved = await isServiceSaved(user.uid, service.id);
      setIsSaved(saved);
    } catch (error: any) {
      // Silently fail - user might not have permissions yet or not authenticated
      if (error?.code !== 'permission-denied') {
        console.error('Error checking if saved:', error);
      }
      setIsSaved(false);
    }
  };

  const handleSaveToggle = async () => {
    if (!isAuthenticated || !user) {
      setShowSignInModal(true);
      return;
    }

    setSaving(true);
    try {
      if (isSaved) {
        await unsaveService(user.uid, service.id);
        setIsSaved(false);
      } else {
        await saveService(user.uid, service);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving/unsaving service:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleRevealClick = () => {
    if (!isAuthenticated) {
      setShowSignInModal(true);
    }
  };

  const handleSignIn = () => {
    // Auth is handled by Firebase, so we just close the modal
    // The auth context will update automatically
    setShowSignInModal(false);
    // Re-check if saved after sign in
    if (isAuthenticated && user) {
      checkIfSaved();
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-end sm:items-center justify-center p-4'>
      {/* Modal Container */}
      <div
        className='bg-card border border-border rounded-3xl sm:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-center sm:zoom-in-95 duration-300'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-1 right-1 z-10 p-2 hover:bg-muted rounded-full transition-colors'
        >
          <X size={24} className='text-foreground' />
        </button>

        {/* Content */}
        <div className='p-8 space-y-8'>
          {/* Profile Section */}
          <div className='flex flex-col sm:flex-row gap-6 items-start'>
            {/* Profile Image - Commented out for now */}
            {/* <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
              <Image
                src={service.profileImage || "/placeholder.svg"}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div> */}
            <div className='flex-1'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex-1'>
                  <h2 className='text-3xl font-medium text-foreground'>
                    {service.name}
                  </h2>
                  <p className='text-muted-foreground mt-1'>
                    {service.location}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                        service.workType === 'Full-time'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-accent/10 text-accent'
                      }`}
                    >
                      {service.workType}
                    </span>
                  </div>
                </div>
                {isAuthenticated && (
                  <button
                    onClick={handleSaveToggle}
                    disabled={saving}
                    className='p-3 hover:bg-muted rounded-lg transition-colors'
                    title={isSaved ? 'Remove from saved' : 'Save to dashboard'}
                  >
                    {isSaved ? (
                      <BookmarkCheck size={24} className='text-[#dc143c]' />
                    ) : (
                      <Bookmark
                        size={24}
                        className='text-muted-foreground hover:text-[#dc143c]'
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <h3 className='text-lg font-medium text-foreground mb-3'>
              Services Offered
            </h3>
            <div className='flex flex-wrap gap-2'>
              {service.categories.map((cat) => (
                <span
                  key={cat}
                  className='inline-block px-4 py-2 bg-muted text-foreground text-sm font-medium rounded-full'
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className='text-lg font-medium text-foreground mb-3'>About</h3>
            <p className='text-muted-foreground leading-relaxed'>
              {service.description}
            </p>
          </div>

          {/* Availability */}
          <div>
            <h3 className='text-lg font-medium text-foreground mb-3'>
              Availability
            </h3>
            <p className='text-muted-foreground'>
              {service.workType === 'Full-time'
                ? 'Available Monday–Saturday, 8:00 AM – 6:00 PM'
                : 'Flexible scheduling. Contact for availability.'}
            </p>
          </div>

          {/* Verification Badge (Placeholder) */}
          <div className='pt-4 border-t border-border'>
            <p className='text-sm text-muted-foreground'>
              <span className='inline-block w-2 h-2 bg-primary rounded-full mr-2'></span>
              Community submitted • Not yet verified
            </p>
          </div>

          {/* Contact Information */}
          <div className='bg-muted/50 rounded-xl p-6 space-y-4 relative'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-medium text-foreground'>
                Contact Information
              </h3>
              {!isAuthenticated && (
                <button
                  onClick={handleRevealClick}
                  className='flex items-center gap-2 px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors'
                >
                  <Lock size={14} />
                  Reveal
                </button>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {/* Phone Number */}
                <div className='flex items-center gap-3'>
                  <Phone size={20} className='text-primary' />
                  <div>
                    <p className='text-sm font-medium text-foreground'>Phone</p>
                    <a
                      href={`tel:${service.phoneNumber}`}
                      className='text-sm text-primary hover:underline'
                    >
                      {service.phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Reference Contact */}
                {service.reference && (
                  <div className='pt-4 border-t border-border space-y-3'>
                    <p className='text-sm font-medium text-foreground'>
                      Reference Contact
                    </p>
                    <div className='space-y-2'>
                      <div>
                        <p className='text-sm text-muted-foreground'>
                          Name:{' '}
                          <span className='text-foreground font-medium'>
                            {service.reference.name}
                          </span>
                        </p>
                      </div>
                      {service.reference.phone && (
                        <div className='flex items-center gap-2'>
                          <Phone size={16} className='text-muted-foreground' />
                          <a
                            href={`tel:${service.reference.phone}`}
                            className='text-sm text-primary hover:underline'
                          >
                            {service.reference.phone}
                          </a>
                        </div>
                      )}
                      {service.reference.whatsapp && (
                        <div className='flex items-center gap-2'>
                          <MessageCircle
                            size={16}
                            className='text-muted-foreground'
                          />
                          <span className='text-sm text-muted-foreground'>
                            Available via WhatsApp
                          </span>
                        </div>
                      )}
                      {service.reference.email && (
                        <div className='flex items-center gap-2'>
                          <Mail size={16} className='text-muted-foreground' />
                          <a
                            href={`mailto:${service.reference.email}`}
                            className='text-sm text-primary hover:underline'
                          >
                            {service.reference.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className='relative'>
                {/* Blurred Content */}
                <div className='blur-sm select-none pointer-events-none space-y-4'>
                  <div className='flex items-center gap-3'>
                    <Phone size={20} className='text-primary' />
                    <div>
                      <p className='text-sm font-medium text-foreground'>
                        Phone
                      </p>
                      <p className='text-sm text-primary'>
                        {service.phoneNumber.replace(/\d/g, '•')}
                      </p>
                    </div>
                  </div>
                  {service.reference && (
                    <div className='pt-4 border-t border-border space-y-3'>
                      <p className='text-sm font-medium text-foreground'>
                        Reference Contact
                      </p>
                      <div className='space-y-2'>
                        <div>
                          <p className='text-sm text-muted-foreground'>
                            Name:{' '}
                            <span className='text-foreground font-medium'>
                              ••••••
                            </span>
                          </p>
                        </div>
                        {service.reference.phone && (
                          <div className='flex items-center gap-2'>
                            <Phone
                              size={16}
                              className='text-muted-foreground'
                            />
                            <span className='text-sm text-primary'>
                              ••••••••••
                            </span>
                          </div>
                        )}
                        {service.reference.whatsapp && (
                          <div className='flex items-center gap-2'>
                            <MessageCircle
                              size={16}
                              className='text-muted-foreground'
                            />
                            <span className='text-sm text-muted-foreground'>
                              Available via WhatsApp
                            </span>
                          </div>
                        )}
                        {service.reference.email && (
                          <div className='flex items-center gap-2'>
                            <Mail size={16} className='text-muted-foreground' />
                            <span className='text-sm text-primary'>
                              ••••••@•••••.com
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Close Button (Mobile Friendly) */}
          <button
            onClick={onClose}
            className='w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-colors mt-6'
          >
            Close
          </button>
        </div>
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <SignInModal
          onClose={() => setShowSignInModal(false)}
          onSignIn={handleSignIn}
        />
      )}
    </div>
  );
}
