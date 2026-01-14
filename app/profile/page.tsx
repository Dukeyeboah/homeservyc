'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth as useAuthHook } from '@/contexts/auth-context';

interface UserProfile {
  username?: string;
  bio?: string;
  photoURL?: string;
  ageRange?: string;
  gender?: string;
  race?: string;
  email?: string;
  phoneNumber?: string;
}

const AGE_RANGES = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+',
  'Prefer not to say',
];

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const RACES = [
  'Black/African',
  'White/Caucasian',
  'Asian',
  'Hispanic/Latino',
  'Middle Eastern',
  'Mixed',
  'Other',
  'Prefer not to say',
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading: authLoading } = useAuthHook();
  const [profile, setProfile] = useState<UserProfile>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/');
        return;
      }
      loadProfile();
    }
  }, [isAuthenticated, authLoading, router]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setProfile(userDoc.data() as UserProfile);
      } else {
        // Create initial profile
        const initialProfile: UserProfile = {
          username: user.displayName || user.email?.split('@')[0] || '',
          bio: '',
          photoURL: user.photoURL || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
        };
        await setDoc(doc(db, 'users', user.uid), initialProfile);
        setProfile(initialProfile);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const updateData: Partial<UserProfile> = {
        username: profile.username,
        bio: profile.bio,
        ageRange: profile.ageRange,
        gender: profile.gender,
        race: profile.race,
      };

      // Handle photo upload (for now, we'll just use the preview URL)
      // In production, you'd upload to Firebase Storage
      if (photoPreview) {
        updateData.photoURL = photoPreview;
      }

      await updateDoc(doc(db, 'users', user.uid), updateData);

      // Update auth display name if username changed
      if (profile.username && user.displayName !== profile.username) {
        // Note: Updating displayName requires re-authentication in Firebase
        // For now, we'll just update it in Firestore
      }

      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-muted-foreground'>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const displayPhoto = photoPreview || profile.photoURL || null;
  const authMethod = user?.email ? 'email' : 'phone';
  const cannotEditEmail = authMethod === 'email';
  const cannotEditPhone = authMethod === 'phone';

  return (
    <div className='min-h-screen bg-background'>
      <Navigation onAddClick={() => {}} />

      <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='bg-card border border-border rounded-2xl p-8'>
          <h1 className='text-3xl font-bold text-foreground mb-8'>
            Profile Settings
          </h1>

          {/* Photo Section */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-foreground mb-4'>
              Profile Photo
            </label>
            <div className='flex items-center gap-6'>
              <div className='relative w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-primary'>
                {displayPhoto ? (
                  <Image
                    src={displayPhoto}
                    alt='Profile'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <User size={40} className='text-muted-foreground' />
                  </div>
                )}
              </div>
              <div>
                <label className='inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg cursor-pointer transition-colors'>
                  <Upload size={18} />
                  Upload Photo
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handlePhotoChange}
                    className='hidden'
                  />
                </label>
                <p className='text-xs text-muted-foreground mt-2'>
                  JPG, PNG or GIF. Max size 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Username */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Username
            </label>
            <input
              type='text'
              value={profile.username || ''}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
              placeholder='Enter your username'
            />
          </div>

          {/* Bio */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Bio
            </label>
            <textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none'
              placeholder='Tell us about yourself...'
            />
          </div>

          {/* Email (read-only if used for auth) */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Email{' '}
              {cannotEditEmail && (
                <span className='text-xs text-muted-foreground'>
                  (cannot edit)
                </span>
              )}
            </label>
            <input
              type='email'
              value={profile.email || ''}
              onChange={
                cannotEditEmail
                  ? () => {}
                  : (e) => setProfile({ ...profile, email: e.target.value })
              }
              readOnly={cannotEditEmail}
              className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all read-only:opacity-50 read-only:cursor-not-allowed'
              placeholder='your@email.com'
            />
          </div>

          {/* Phone Number (read-only if used for auth) */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Phone Number{' '}
              {cannotEditPhone && (
                <span className='text-xs text-muted-foreground'>
                  (cannot edit)
                </span>
              )}
            </label>
            <input
              type='tel'
              value={profile.phoneNumber || ''}
              onChange={
                cannotEditPhone
                  ? () => {}
                  : (e) =>
                      setProfile({ ...profile, phoneNumber: e.target.value })
              }
              readOnly={cannotEditPhone}
              className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all read-only:opacity-50 read-only:cursor-not-allowed'
              placeholder='0551234567'
            />
          </div>

          {/* Age Range */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Age Range
            </label>
            <select
              value={profile.ageRange || ''}
              onChange={(e) =>
                setProfile({ ...profile, ageRange: e.target.value })
              }
              className='w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
            >
              <option value=''>Select age range</option>
              {AGE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className='mb-6'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Gender
            </label>
            <select
              value={profile.gender || ''}
              onChange={(e) =>
                setProfile({ ...profile, gender: e.target.value })
              }
              className='w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
            >
              <option value=''>Select gender</option>
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          {/* Race */}
          <div className='mb-8'>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Race/Ethnicity
            </label>
            <select
              value={profile.race || ''}
              onChange={(e) => setProfile({ ...profile, race: e.target.value })}
              className='w-full px-4 py-3 bg-secondary text-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all'
            >
              <option value=''>Select race/ethnicity</option>
              {RACES.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={saving}
            className='w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3'
          >
            {saving ? (
              <span className='flex items-center gap-2'>
                <Save size={20} className='animate-spin' />
                Saving...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                <Save size={20} />
                Save Changes
              </span>
            )}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
