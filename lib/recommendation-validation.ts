import { parsePhoneNumberFromString, getCountryCallingCode, type CountryCode } from 'libphonenumber-js/max';

export const MAX_SERVICE_CATEGORIES = 8;
export function toggleServiceCategory(selected: string[], category: string): string[] {
  if (selected.includes(category)) return selected.filter(item => item !== category);
  return selected.length < MAX_SERVICE_CATEGORIES ? [...selected, category] : selected;
}

export function validateContactNumber(country: CountryCode | '', input: string, required = true): { number?: string; error?: string } {
  if (!input.trim()) return required || country ? { error: 'Enter the phone number.' } : {};
  if (!country) return { error: 'Choose a country calling code first.' };
  if (!/^\+?[\d\s().-]+$/.test(input.trim())) return { error: 'Use digits and standard phone punctuation only; extensions are not supported.' };
  const parsed = parsePhoneNumberFromString(input.trim(), { defaultCountry: country, extract: false });
  if (!parsed || !parsed.isValid() || parsed.ext) return { error: 'Enter a valid complete number, including its local area code if needed.' };
  if (parsed.countryCallingCode !== getCountryCallingCode(country) || (parsed.country && parsed.country !== country)) return { error: 'The number does not match the selected country. Check the country and number.' };
  return { number: parsed.number };
}
