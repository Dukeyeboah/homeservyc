'use client';

import { useAuth } from '@/contexts/auth-context';
import { AuthModal } from './auth-modal';
import { useState } from 'react';
import { CategoryIcon } from './category-icon';
import type { Service } from '@/lib/services';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { ShieldAlert, LockKeyhole } from 'lucide-react';

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { isAuthenticated } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [returnFocus] = useState(() => typeof document === 'undefined' ? null : document.activeElement as HTMLElement | null);
  return (
    <>
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent onCloseAutoFocus={e => { e.preventDefault(); returnFocus?.focus(); }} className="sm:max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl p-6 sm:p-8">
        <div className="pr-7">
          <DialogTitle className="text-2xl leading-tight">{service.name}</DialogTitle>
          <DialogDescription className="mt-2">{service.location} · {service.workType}</DialogDescription>
        </div>
        <div className="flex flex-wrap gap-2">{service.categories.map((category) => <span key={category} className="role-stamp"><CategoryIcon category={category} small/>{category}</span>)}</div>
        <div className="bg-secondary/50 rounded-xl p-4 flex gap-3 text-sm">
          <ShieldAlert className="shrink-0 mt-0.5" size={20} />
          <p><strong className="font-medium">Community submitted · Not verified</strong><br />This is a recommendation, not a verified customer review. Qualifications, references and current availability have not been confirmed.</p>
        </div>
        <section>
          <h3 className="font-medium mb-2">Community recommendation</h3>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{service.description}</p>
        </section>
        <section className="border-t border-border pt-5">
          <h3 className="font-medium mb-2">Availability</h3>
          <p className="text-sm text-muted-foreground">Not confirmed. Dates and schedules in the original recommendation may be out of date.</p>
        </section>
        <section className="rounded-xl bg-muted/50 p-5">
          <h3 className="flex gap-2 items-center font-medium mb-2"><LockKeyhole size={18} />Connect with {service.name}</h3>
          <p className="text-sm text-muted-foreground">{isAuthenticated ? 'You’re signed in. You can save this profile while we prepare private introductions.' : 'Want to connect? Start by signing in. You can save this profile and keep your shortlist together.'}</p>
          <p className="text-sm text-muted-foreground mt-3">Private introductions are coming soon. Connecting will require an account and the provider’s agreement before contact details are shared.</p>
          {!isAuthenticated && <button onClick={() => setShowAuth(true)} className="mt-4 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium">Sign in to get started</button>}
        </section>
        <DialogClose className="rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium">Back to browsing</DialogClose>
      </DialogContent>
    </Dialog>
    {showAuth && <AuthModal onClose={() => setShowAuth(false)}/>}
    </>
  );
}
