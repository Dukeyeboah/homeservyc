'use client';

import Image from 'next/image';
import { ChevronRight, Bookmark, BookmarkCheck } from 'lucide-react';
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
            phoneNumber: '',
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

  return (
    <div className='group relative bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1'>
      {/* Bookmark Button */}
      {isAuthenticated && (
        <button
          onClick={handleBookmarkClick}
          disabled={saving}
          className='absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-10'
          title={isSaved ? 'Remove from saved' : 'Save to dashboard'}
        >
          {isSaved ? (
            <BookmarkCheck size={20} className='text-[#dc143c]' />
          ) : (
            <Bookmark
              size={20}
              className='text-muted-foreground hover:text-[#dc143c]'
            />
          )}
        </button>
      )}

      <button onClick={onClick} className='w-full text-left cursor-pointer'>
        {/* Profile Section */}
        <div className='flex items-start gap-4 mb-4'>
          {/* Profile Image - Commented out for now */}
          {/* <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-muted">
          <Image src={profileImage || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div> */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-lg font-medium text-foreground truncate'>
              {name}
            </h3>
            <p className='text-sm text-muted-foreground mt-1'>{location}</p>
          </div>
        </div>

        {/* Categories Tags */}
        <div className='flex flex-wrap gap-2 mb-4'>
          {categories.map((cat) => (
            <span
              key={cat}
              className='inline-block px-3 py-1 bg-muted text-foreground text-xs font-medium rounded-full'
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Work Type Badge */}
        <div className='flex items-center gap-2 mb-3'>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded ${
              workType === 'Full-time'
                ? 'bg-primary/10 text-primary'
                : 'bg-accent/10 text-accent'
            }`}
          >
            {workType}
          </span>
        </div>

        {/* Description */}
        <p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
          {description}
        </p>

        {/* View Details Button */}
        <div className='flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all'>
          View Details
          <ChevronRight size={16} />
        </div>
      </button>
    </div>
  );
}
