'use client';
import { useState } from 'react';
import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js/max';
import { validateContactNumber } from '@/lib/recommendation-validation';
const names = new Intl.DisplayNames(['en'], { type: 'region' });
const countries = getCountries().map(country => ({ country, name: names.of(country) ?? country, code: getCountryCallingCode(country) })).sort((a,b) => a.name.localeCompare(b.name));
export function ContactNumberField({id, title, country, value, onCountryChange, onChange, required = false}: {
 id: string; title: string; country: CountryCode | ''; value: string; onCountryChange: (country: CountryCode | '') => void; onChange: (value: string) => void; required?: boolean;
}) {
 const [touched, setTouched] = useState(false);
 const result = validateContactNumber(country, value, required);
 const showError = touched && !!result.error;
 return <fieldset className="min-w-0 space-y-2">
  <legend className="text-sm font-medium mb-2">{title}{!required && ' (optional)'}</legend>
  <div className="contact-number-fields">
   <div className="min-w-0"><label htmlFor={`${id}-country`} className="block text-xs mb-2">Country calling code</label><select id={`${id}-country`} value={country} required={required || !!value} onChange={e=>onCountryChange(e.target.value as CountryCode | '')} onBlur={()=>setTouched(true)} aria-describedby={`${id}-help ${id}-feedback`} className="person-input"><option value="">Choose country</option>{countries.map(c=><option key={c.country} value={c.country}>{c.name} (+{c.code})</option>)}</select></div>
   <div className="min-w-0"><label htmlFor={`${id}-number`} className="block text-xs mb-2">Phone number</label><input id={`${id}-number`} type="tel" inputMode="tel" required={required || !!country} value={value} onChange={e=>onChange(e.target.value)} onBlur={()=>setTouched(true)} aria-invalid={showError} aria-describedby={`${id}-help ${id}-feedback`} className="person-input" placeholder="Complete phone number"/></div>
  </div>
  <p id={`${id}-help`} className="text-xs text-muted-foreground">Choose the number’s country, not your location. The + code is a country calling code; include any local area code in the phone number.</p>
  <p id={`${id}-feedback`} className={`text-xs ${showError ? 'text-destructive' : 'text-muted-foreground'}`} aria-live="polite">{showError ? result.error : result.number ? `International number: ${result.number}` : ''}</p>
 </fieldset>;
}
