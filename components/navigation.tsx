'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from '@/components/auth-modal';
import { UserMenu } from '@/components/user-menu';
export function Navigation({ onAddClick }: { onAddClick: () => void }) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  return <>
    <nav className="site-nav" aria-label="Main navigation"><div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3 h-20">
      <Link href="/" aria-label="HomeServyc home" className="brand-link"><img className="brand-wordmark" src="/design/homeservyc-logo-proposal.png" alt="HomeServyc"/><img className="brand-symbol" src="/icon.svg" alt=""/></Link>
      <div className="flex items-center gap-2 sm:gap-6">
        <button onClick={onAddClick} className="nav-add"><Plus size={16}/><span>Add</span></button>
        {isAuthenticated ? <UserMenu/> : <button onClick={() => setShowAuthModal(true)} className="flex items-center gap-2 text-sm px-2 py-2 rounded-full"><LogIn size={17}/><span className="hidden sm:inline">Log in</span><span className="sr-only sm:hidden">Log in</span></button>}
      </div>
    </div></nav>
    {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} initialMode="signin"/>}
  </>;
}
