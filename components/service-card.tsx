'use client';

import { CategoryIcon, categoryStyle } from './category-icon';
import { ChevronRight, Bookmark, BookmarkCheck, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useState, useEffect } from 'react';
import { isServiceSaved, saveService, unsaveService } from '@/lib/firestore';
import type { Service } from '@/lib/services';

interface ServiceCardProps {
  id: number;
  name: string;
  profileImage: string;
  categories: string[];
  workType: 'Full-time' | 'Part-time';
  description: string;
  location: string;
  onClick: () => void;
  service?: Service; // Full service object for saving
}

export function ServiceCard({
  id,
  name,
  profileImage,
  categories,
  workType,
  description,
  location,
  onClick,
  service,
}: ServiceCardProps) {
  const { user, isAuthenticated } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      checkIfSaved();
    } else {
      setIsSaved(false);
    }
  }, [isAuthenticated, user, id]);

  const checkIfSaved = async () => {
    if (!user || !isAuthenticated) return;
    try {
      const saved = await isServiceSaved(user.uid, id);
      setIsSaved(saved);
    } catch (error: any) {
      // Silently fail - user might not be authenticated yet or permissions issue
      if (error?.code !== 'permission-denied') {
        console.error('Error checking if saved:', error);
      }
      setIsSaved(false);
    }
  };

  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated || !user) return;

    setSaving(true);
    try {
      if (isSaved) {
        await unsaveService(user.uid, id);
        setIsSaved(false);
      } else {
        // Use full service object if provided, otherwise construct minimal one
        const serviceToSave =
          service ||
          ({
            id,
            name,
            profileImage,
            categories,
            workType,
            description,
            location,
          } as Service);
        await saveService(user.uid, serviceToSave);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    } finally {
      setSaving(false);
    }
  };

  const tone = categoryStyle(categories[0]);
  const initials = name.split(' ').filter(Boolean).slice(0,2).map(n => n[0]).join('');
  return (
    <article className="provider-card" style={{ '--role-color': tone.color, '--role-light': tone.light } as React.CSSProperties}>
      <div className="provider-topline"><span>HOMESERVYC / COMMUNITY PROFILE</span></div>
      {isAuthenticated && <button onClick={handleBookmarkClick} disabled={saving} className="absolute right-4 top-12 z-10 bg-white p-2 rounded-full" aria-label={isSaved ? 'Remove from saved' : 'Save to dashboard'}>{isSaved ? <BookmarkCheck size={18}/> : <Bookmark size={18}/>}</button>}
      <button onClick={onClick} className="provider-body" aria-label={`View profile: ${name}`}>
        <div className="flex items-center gap-4"><div className="provider-initials" aria-hidden="true">{initials}</div><div className="min-w-0"><h3 className="provider-name">{name}</h3><div className="provider-location"><MapPin size={13} className="shrink-0"/>{location}</div></div></div>
        <div className="role-stamps">{categories.map(cat => <span className="role-stamp" key={cat}><CategoryIcon category={cat} small/><span>{cat}</span></span>)}</div>
        <div className="provider-arrangement"><span>{workType}</span><span>Availability unconfirmed</span></div>
        <p className="provider-description">{description}</p>
        <div className="provider-bottom"><span>Community submitted · Not verified</span><span className="provider-arrow"><ChevronRight size={18}/></span></div>
      </button>
    </article>
  );
}
