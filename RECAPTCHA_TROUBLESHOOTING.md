# reCAPTCHA Enterprise Troubleshooting

## Important: Firebase Handles reCAPTCHA Automatically

Firebase Authentication **automatically** uses reCAPTCHA Enterprise for phone authentication. You **do NOT need to**:

- ❌ Manually create reCAPTCHA keys in Google Cloud Console
- ❌ Add reCAPTCHA script tags to your HTML
- ❌ Use `grecaptcha.enterprise.execute()` manually
- ❌ Configure reCAPTCHA keys in your code

Firebase SDK's `RecaptchaVerifier` handles everything automatically.

## If You Already Created Manual reCAPTCHA Keys

If you manually created reCAPTCHA Enterprise keys in Google Cloud Console (like `6Ld9WkssAAAAAKGEP48BN1oyjK8TGG1aJWUswt9P`):

1. **You can ignore them** - Firebase uses its own automatically-generated keys
2. **They won't interfere** - Firebase's keys are separate
3. **No code changes needed** - Your existing code using `RecaptchaVerifier` is correct

## Verify Firebase reCAPTCHA Setup

1. Go to [Firebase Console](https://console.firebase.google.com/project/homeservyc/authentication/providers)
2. Click **Authentication** → **Settings** tab
3. Scroll to **reCAPTCHA** section
4. You should see:
   - ✅ **Phone authentication enforcement mode**: AUDIT or ENFORCE
   - ✅ **SMS fraud risk threshold score**: Configured
   - ✅ **Configured platform site keys**: Should show 3 keys (automatically created by Firebase)

These keys are **automatically managed by Firebase** - you don't need to do anything with them.

## Common Issues

### Error: `auth/invalid-app-credential`

This usually means:
1. **Domain not authorized** - Check Firebase Console → Authentication → Settings → Authorized domains
2. **reCAPTCHA not properly initialized** - Make sure container exists in DOM before creating verifier
3. **Timing issue** - Wait for reCAPTCHA to render before calling `signInWithPhoneNumber`

### Solution Steps:

1. **Verify Authorized Domains:**
   - Go to Firebase Console → **Authentication** → **Settings** → **Authorized domains**
   - Ensure `localhost` is listed (should be by default)
   - For production: Add your domain (e.g., `homeservyc.vercel.app`)

2. **Check reCAPTCHA Container:**
   - Make sure `<div id="recaptcha-container"></div>` exists in your HTML
   - Container must be in DOM before creating `RecaptchaVerifier`
   - Wait 300ms after modal opens before creating verifier

3. **Verify Code:**
   - Your code should use Firebase's `RecaptchaVerifier` (which you're already doing)
   - Don't manually load reCAPTCHA scripts
   - Don't use `grecaptcha.enterprise.execute()` - Firebase handles this

## Testing

1. **Clear browser cache** - Sometimes cached reCAPTCHA config causes issues
2. **Try different browser** - Some extensions block reCAPTCHA
3. **Check browser console** - Look for reCAPTCHA-related errors
4. **Verify HTTPS** - reCAPTCHA requires HTTPS in production (Vercel provides this)

## Still Having Issues?

If you're still getting `auth/invalid-app-credential`:

1. **Double-check authorized domains** in Firebase Console
2. **Verify Firebase project ID** matches your `.env.local` file
3. **Check Firebase API key** is correct in `.env.local`
4. **Try disabling browser extensions** that might block reCAPTCHA
5. **Check Firebase Console** → Authentication → Settings → reCAPTCHA for any warnings

## Reference

- [Firebase Phone Auth Docs](https://firebase.google.com/docs/auth/web/phone-auth)
- [Firebase reCAPTCHA Enterprise](https://firebase.google.com/docs/auth/web/phone-auth#recaptcha-enterprise)

