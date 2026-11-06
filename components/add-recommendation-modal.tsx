'use client';

import type React from 'react';

import { ModalFrame } from './modal-frame';
import { useState, useRef } from 'react';
import { RecommendationDetails, initialDetails } from './recommendation-details';
import { X, Upload } from 'lucide-react';
import { getAllCategories } from '@/lib/services';
import { useAuth } from '@/contexts/auth-context';
import { submitRecommendation } from '@/lib/firestore';

import type { CountryCode } from 'libphonenumber-js';
import { ContactNumberField } from './contact-number-field';
import { MAX_SERVICE_CATEGORIES, toggleServiceCategory, validateContactNumber } from '@/lib/recommendation-validation';

const categories = getAllCategories();

interface AddRecommendationModalProps {
  onClose: () => void;
}

export function AddRecommendationModal({
  onClose,
}: AddRecommendationModalProps) {
  const [userType, setUserType] = useState<'recommender' | 'service-personnel'>(
    'recommender'
  );
  const [formData, setFormData] = useState({
    name: '',
    categories: [] as string[],
    workType: 'Full-time' as 'Full-time' | 'Part-time',
    notes: '',
    location: '',
    servicePersonnelCountry: '' as CountryCode | '',
    servicePersonnelPhone: '',
    servicePersonnelPhoneWhatsApp: false,
    recommenderCountry: '' as CountryCode | '',
    recommenderPhone: '',
    recommenderPhoneWhatsApp: false,
  });
  const [details, setDetails] = useState(initialDetails);
  const [savedSubmissionId, setSavedSubmissionId] = useState<string | null>(null);
  const photoInput = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [categoryNotice, setCategoryNotice] = useState('');
  const handleCategoryToggle = (category: string) => {
    if (!formData.categories.includes(category) && formData.categories.length >= MAX_SERVICE_CATEGORIES) {
      setCategoryNotice('Eight-category limit reached. Deselect a category before adding another.');
      return;
    }
    setCategoryNotice('');
    setFormData(prev => ({ ...prev, categories: toggleServiceCategory(prev.categories, category) }));
  };
  const providerNumber = validateContactNumber(formData.servicePersonnelCountry, formData.servicePersonnelPhone);
  const recommenderNumber = validateContactNumber(formData.recommenderCountry, formData.recommenderPhone, formData.recommenderPhoneWhatsApp);
  const [formError, setFormError] = useState('');

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 10 * 1024 * 1024) {
        setPhotoError('Choose a JPG, PNG or WebP image up to 10 MB.');
        e.target.value = '';
        return;
      }
      setPhotoError('');
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const { user, isAuthenticated } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormError('');
    if (formData.categories.length < 1 || formData.categories.length > MAX_SERVICE_CATEGORIES || providerNumber.error || (userType === 'recommender' && recommenderNumber.error)) {
      setFormError(providerNumber.error || (userType === 'recommender' && recommenderNumber.error) || 'Choose between one and eight categories.');
      return;
    }

    if (!isAuthenticated || !user) {
      alert('Please log in to submit a recommendation.');
      return;
    }

    setSubmitting(true);
    try {
      const submissionId = savedSubmissionId ?? await submitRecommendation(user.uid, {
        details: {...details, whatsappConsent: userType === 'service-personnel' && details.whatsappConsent, contactConsent: userType === 'service-personnel' && details.contactConsent, publishingConsent: userType === 'service-personnel' && details.publishingConsent, photoConsent: userType === 'service-personnel' && details.photoConsent},
        userType,
        name: formData.name,
        categories: formData.categories,
        workType: formData.workType,
        description: formData.notes,
        location: formData.location,
        phoneNumber: providerNumber.number!,
        phoneNumberWhatsApp: formData.servicePersonnelPhoneWhatsApp,
        recommenderPhone:
          userType === 'recommender' ? recommenderNumber.number : undefined,
        recommenderPhoneWhatsApp:
          userType === 'recommender'
            ? formData.recommenderPhoneWhatsApp
            : undefined,
        // photoUrl will be handled when we implement file upload
      });

      setSavedSubmissionId(submissionId);
      if (photoFile) {
        const upload = new FormData(); upload.set('photo', photoFile); upload.set('recommendationId', submissionId);
        const response = await fetch('/api/photos', {method:'POST',headers:{Authorization:`Bearer ${await user.getIdToken()}`},body:upload});
        if (!response.ok) { setFormError('Your recommendation was saved, but the photo was not uploaded. Retry to upload it without creating another recommendation.'); return; }
      }
      alert(
        'Thank you for your recommendation! It will be reviewed and added to the directory soon.'
      );
      onClose();
    } catch (error) {
      console.error('Error submitting recommendation:', error);
      alert(
        'There was an error submitting your recommendation. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalFrame title="Add a recommendation" onClose={onClose} wide>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label='Close recommendation'
          className='sticky top-6 right-6 z-10 float-right p-2 hover:bg-muted rounded-full transition-colors'
        >
          <X size={24} className='text-foreground' />
        </button>

        {/* Content */}
        <form onSubmit={handleSubmit} className='recommendation-form p-5 sm:p-8 space-y-6'>
          <div>
            <h2 className='text-2xl sm:text-3xl font-medium text-foreground mb-2 pr-7'>
              Add a Recommendation
            </h2>
            <p className='text-muted-foreground'>
              Share a trusted service provider with the community
            </p>
          </div>

          <fieldset className="min-w-0">
            <legend className="text-sm font-medium mb-3">Are you a recommender or the service personnel?</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {([['recommender', 'Recommender'], ['service-personnel', 'Service personnel']] as const).map(([value, label]) => <label key={value} className="inline-flex items-center gap-2.5 text-sm cursor-pointer min-h-10">
                <input type="radio" name="recommendation-user-type" value={value} checked={userType === value} onChange={() => setUserType(value)} className="size-4 accent-primary"/>{label}
              </label>)}
            </div>
          </fieldset>

          <section aria-label="Personal details" className="person-details">
            <div className="person-photo-section">
              <span className="text-sm font-medium">Photo</span>
              <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhotoChange} className="hidden" tabIndex={-1} aria-label="Choose profile photo" id="photo-input"/>
              <button type="button" onClick={() => photoInput.current?.click()} className="person-photo" aria-label={photoPreview ? 'Change profile photo' : 'Choose profile photo'} aria-describedby="photo-help">
                {photoPreview ? <img src={photoPreview} alt="Selected profile photo preview"/> : <span className="flex flex-col items-center gap-2"><Upload size={25} aria-hidden="true"/><span className="text-xs">Add photo</span></span>}
              </button>
              {photoPreview && <button type="button" onClick={() => { setPhotoPreview(null); setPhotoFile(null); setPhotoError(''); if (photoInput.current) photoInput.current.value = ''; }} className="text-xs underline underline-offset-4">Remove photo</button>}
            </div>
            <div className="person-fields">
              <div><label htmlFor="person-name" className="block text-sm font-medium mb-2">Full name</label><input id="person-name" type="text" autoComplete="name" required value={formData.name} onChange={e => setFormData(prev => ({...prev, name:e.target.value}))} placeholder="John Doe" className="person-input"/></div>
              <div><label htmlFor="person-location" className="block text-sm font-medium mb-2">Location / Area</label><input id="person-location" type="text" value={formData.location} onChange={e => setFormData(prev => ({...prev, location:e.target.value}))} placeholder="e.g., Accra, Osu" className="person-input"/></div>
            </div>
            <p id="photo-help" className="person-photo-help text-xs text-muted-foreground">JPG, PNG or WebP · Up to 10 MB · Stored privately for review after submission</p>
            {photoError && <p role="alert" className="person-photo-help text-xs text-destructive">{photoError}</p>}
          </section>

          <fieldset className="service-options min-w-0">
            <legend className="text-sm font-medium px-1">Service categories</legend>
            <div className="flex justify-between items-center gap-2 mb-3"><p className="text-xs text-muted-foreground">Choose up to eight</p><span className="text-xs text-muted-foreground" aria-live="polite">{formData.categories.length} / {MAX_SERVICE_CATEGORIES} selected</span></div>
            <div className="service-option-chips">
              {categories.map(category => <label key={category} className="service-option" data-selected={formData.categories.includes(category)}><input type="checkbox" checked={formData.categories.includes(category)} aria-describedby="category-limit" aria-disabled={!formData.categories.includes(category) && formData.categories.length >= MAX_SERVICE_CATEGORIES} onChange={() => handleCategoryToggle(category)} className="size-3.5 shrink-0 accent-primary"/><span>{category}</span></label>)}
            </div>
            <p id="category-limit" role="status" className="text-xs text-muted-foreground mt-3">{categoryNotice || (formData.categories.length === MAX_SERVICE_CATEGORIES ? "Eight selected. Deselect one to choose another." : "Select between one and eight categories.")}</p>
          </fieldset>

          {/* Work Type */}
          <div>
            <label className='block text-sm font-medium text-foreground mb-3'>
              Work Type
            </label>
            <div className='flex gap-3'>
              {['Full-time', 'Part-time'].map((type) => (
                <button
                  key={type}
                  type='button'
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      workType: type as 'Full-time' | 'Part-time',
                    }))
                  }
                  className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                    formData.workType === type
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <ContactNumberField id="provider-contact" title="Service personnel phone number" required country={formData.servicePersonnelCountry} value={formData.servicePersonnelPhone} onCountryChange={country => setFormData(prev=>({...prev,servicePersonnelCountry:country}))} onChange={value=>setFormData(prev=>({...prev,servicePersonnelPhone:value}))}/>
            <div className="space-y-2">
              <label className='flex items-center gap-2 cursor-pointer'>
                <input
                  type='checkbox'
                  checked={formData.servicePersonnelPhoneWhatsApp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      servicePersonnelPhoneWhatsApp: e.target.checked,
                    }))
                  }
                  className='w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-accent'
                />
                <span className='text-sm text-foreground'>
                  This is a WhatsApp number
                </span>
              </label>
            </div>
          </div>

          {userType === 'recommender' && (
            <div className="space-y-3">
              <ContactNumberField id="recommender-contact" title="Your phone number" required={formData.recommenderPhoneWhatsApp} country={formData.recommenderCountry} value={formData.recommenderPhone} onCountryChange={country=>setFormData(prev=>({...prev,recommenderCountry:country}))} onChange={value=>setFormData(prev=>({...prev,recommenderPhone:value}))}/>
              <div className="space-y-2">
                <label className='flex items-center gap-2 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={formData.recommenderPhoneWhatsApp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        recommenderPhoneWhatsApp: e.target.checked,
                      }))
                    }
                    className='w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-accent'
                  />
                  <span className='text-sm text-foreground'>
                    This is a WhatsApp number
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Notes / Recommendation */}
          <div>
            <label className='block text-sm font-medium text-foreground mb-2'>
              Notes & Recommendation
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className='w-full px-4 py-3 bg-secondary text-foreground placeholder-muted-foreground rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none'
              placeholder='Share what makes this person special: experience, skills, customer feedback, etc.'
              rows={4}
            />
          </div>

          <RecommendationDetails value={details} onChange={setDetails} self={userType === 'service-personnel'} />

          {formError && <p role="alert" className="text-sm text-destructive">{formError}</p>}
          {/* Submit Button */}
          <button
            type='submit'
            style={!isAuthenticated ? { marginBottom: 0 } : undefined}
            disabled={
              !formData.name ||
              formData.categories.length === 0 ||
              !!providerNumber.error ||
              (userType === 'recommender' && !!recommenderNumber.error) ||
              formData.categories.length > MAX_SERVICE_CATEGORIES ||
              submitting ||
              !isAuthenticated
            }
            className='w-full py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed text-primary-foreground font-medium rounded-lg transition-colors'
          >
            {submitting
              ? 'Submitting...'
              : !isAuthenticated
              ? 'Log in'
              : savedSubmissionId ? 'Retry photo upload' : 'Submit Recommendation'}
          </button>

          {!isAuthenticated && <p style={{ marginTop: 8 }} className="text-xs text-muted-foreground text-center">(You need to be logged in to add a service provider or recommend someone.)</p>}

          {/* Disclaimer */}
          <p className='text-xs text-muted-foreground text-center'>
            <span className='font-medium'>Community submitted</span> • All
            recommendations are reviewed before appearing in the directory.
          </p>
        </form>
    </ModalFrame>
  );
}
