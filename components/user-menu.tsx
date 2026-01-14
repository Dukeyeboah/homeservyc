'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, LayoutDashboard, User, ChevronDown } from 'lucide-react';
import { signOut } from '@/lib/firebase-auth';
import { useAuth } from '@/contexts/auth-context';

export function UserMenu() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const userPhoto = user?.photoURL || null;
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';

  return (
    <div className='relative' ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors'
      >
        {userPhoto ? (
          <div className='relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary'>
            <Image
              src={userPhoto}
              alt={displayName}
              fill
              className='object-cover'
            />
          </div>
        ) : (
          <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary'>
            <User size={18} className='text-primary' />
          </div>
        )}
        <ChevronDown
          size={16}
          className={`text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-20'>
            <div className='px-4 py-2 border-b border-border'>
              <p className='text-sm font-medium text-foreground truncate'>
                {displayName}
              </p>
              <p className='text-xs text-muted-foreground truncate'>
                {user?.email}
              </p>
            </div>

            <Link
              href='/dashboard'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors'
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              href='/profile'
              onClick={() => setIsOpen(false)}
              className='flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors'
            >
              <User size={18} />
              Profile
            </Link>

            <button
              onClick={handleSignOut}
              className='w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors text-left'
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
