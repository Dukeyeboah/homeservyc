# Phone Authentication Setup Guide

## Overview

Firebase Phone Authentication for web requires reCAPTCHA verification to prevent abuse. This guide will walk you through setting it up step by step.

## ⚠️ Important: Enable Phone Authentication First

**The error you're seeing means phone authentication is not enabled in Firebase Console.** Follow these steps:

## Step 1: Enable Phone Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **homeservyc**
3. In the left sidebar, click **Authentication**
4. Click on the **Sign-in method** tab (at the top)
5. Scroll down to find **Phone** in the list of providers
6. Click on **Phone** to open the settings panel
7. Toggle the **Enable** switch to **ON** (it should turn blue)
8. Click **Save** at the bottom

**That's it!** Once enabled, phone authentication should work immediately.

## ⚠️ IMPORTANT: Enable Phone Number Regions

After enabling phone authentication, you **MUST** enable the phone number regions you want to support:

1. Still in the **Phone** provider settings (where you just enabled it)
2. Scroll down to find **Phone numbers for testing** section (optional, for testing)
3. **Most importantly:** Look for **Phone number regions** or **Allowed regions**
4. **Enable the regions** you want to support:
   - For Ghana: Enable **+233** (Ghana)
   - For other countries: Enable their respective country codes
   - Or enable **All regions** if you want to support all countries

**If you don't enable regions, you'll get this error:**
```
SMS unable to be sent until this region enabled by the app developer. (auth/operation-not-allowed)
```

### How to Enable Regions:

1. In Firebase Console → **Authentication** → **Sign-in method** → **Phone**
2. Look for **Phone number regions** or **Allowed phone number regions**
3. Click to expand the section
4. Check the boxes for regions you want to enable (e.g., **Ghana (+233)**)
5. Click **Save**

**Note:** The exact location varies:
- Usually in **Authentication** → **Settings** → **SMS region policy**
- Select **Allow** and then add the regions you want (e.g., Ghana +233)
- Click **Save**

## ⚠️ CRITICAL: Enable Billing for Phone Authentication

**Phone authentication requires billing to be enabled** because SMS messages cost money. You'll get this error if billing isn't enabled:
```
Firebase: Error (auth/billing-not-enabled)
```

### How to Enable Billing:

1. Go to [Firebase Console](https://console.firebase.google.com/project/homeservyc)
2. Click on the **⚙️ Settings** (gear icon) → **Usage and billing**
3. Click **Modify plan** or **Upgrade project**
4. You'll be redirected to Google Cloud Console
5. **Enable billing** by adding a payment method:
   - Click **Link billing account** or **Create billing account**
   - Add a payment method (credit card)
   - Complete the setup
6. Return to Firebase Console
7. Your project should now show billing as enabled

### Important Notes:

- **Free Tier:** Firebase has a free tier that includes some free SMS messages per month
- **Pricing:** After free tier, SMS costs vary by country (typically $0.01-$0.05 per SMS)
- **No Charges Until Usage:** You won't be charged until you exceed the free tier
- **Can Disable Later:** You can disable billing later if needed

### Check Your Billing Status:

1. Go to **Settings** → **Usage and billing**
2. Look for billing account status
3. If it says "No billing account", you need to enable it

## Step 2: Configure Authorized Domains (For Production)

For **development (localhost)**, you don't need to do anything - it works automatically.

For **production**, you need to add your domain:

1. In Firebase Console, go to **Authentication** → **Settings** tab
2. Scroll down to **Authorized domains** section
3. Click **Add domain**
4. Enter your production domain (e.g., `homeservyc.vercel.app` or your custom domain)
5. Click **Add**

**Note:** `localhost` is automatically included for development.

## Step 3: How reCAPTCHA Works

Firebase uses **reCAPTCHA v3 (invisible)** for phone authentication:
- ✅ **No user interaction needed** - it runs automatically in the background
- ✅ **No visible challenge** - users won't see a checkbox or puzzle
- ✅ **Automatic** - Firebase handles everything, you don't need to configure it
- ✅ **Secure** - Google's reCAPTCHA protects against bots and abuse

**Note:** Firebase automatically generates and uses a reCAPTCHA site key - you don't need to configure anything manually.

## Step 4: Test Phone Authentication

### Testing Steps:

1. **Open your app** (localhost or production)
2. **Click "Sign In"** button
3. **Select "Phone"** tab in the auth modal
4. **Enter your phone number:**
   - For Ghana: `0551234567` (automatically formatted to `+233551234567`)
   - For other countries: Use full international format like `+1234567890`
5. **Click "Send Verification Code"**
6. **Check your phone** for SMS with 6-digit code
7. **Enter the code** in the verification field
8. **Click "Verify Code"**

### What Happens Behind the Scenes:

1. User enters phone number
2. Firebase shows invisible reCAPTCHA (user doesn't see it)
3. reCAPTCHA verifies user is human
4. Firebase sends SMS with verification code
5. User enters code
6. Firebase verifies code and signs user in

## Step 5: Phone Number Format

The app automatically formats Ghana phone numbers:
- Input: `0551234567` or `551234567`
- Formatted: `+233551234567`

For other countries, use the full international format:
- Example: `+1234567890` (US)
- Example: `+442071234567` (UK)

## Troubleshooting

### ⚠️ Error: "SMS unable to be sent until this region enabled" (auth/operation-not-allowed)

**This is the error you're seeing!** It means the phone number region (country code) is not enabled in Firebase.

**Solution:**
1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Click on **Phone** provider
3. Look for **Phone number regions** or **Allowed regions** section
4. Enable the region for your country:
   - For Ghana: Enable **+233** or **Ghana**
   - For other countries: Enable their country code
   - Or enable **All regions** to support all countries
5. Click **Save**
6. Try again

**Note:** The location of this setting varies:
- Sometimes it's directly in the Phone provider settings
- Sometimes in **Authentication** → **Settings** → **Phone numbers**
- Some projects have it enabled by default

### Error: "reCAPTCHA container not found"
- Make sure the `recaptcha-container` div exists in the DOM
- The container is automatically created in the auth modal

### Error: "Invalid phone number"
- Ensure phone number includes country code
- Format: `+[country code][number]`
- Example for Ghana: `+233551234567`

### Error: "Billing not enabled" (auth/billing-not-enabled)

**This error means billing is not enabled for your Firebase project.**

**Solution:**
1. Go to Firebase Console → **Settings** → **Usage and billing**
2. Click **Modify plan** or **Upgrade project**
3. Follow the prompts to enable billing
4. Add a payment method (credit card required)
5. Once billing is enabled, phone authentication will work

**Note:** You won't be charged until you exceed the free tier limits.

### Error: "SMS quota exceeded"
- Firebase has daily SMS limits for free tier
- Check your quota in Firebase Console → Usage and billing
- If you've exceeded the free tier, you'll be charged per SMS

### Error: "Invalid app credential" (auth/invalid-app-credential) or "reCAPTCHA verification failed"

**This error means reCAPTCHA verification failed.** Common causes:

1. **Domain not authorized:** Your domain must be in Firebase authorized domains
2. **HTTPS required:** reCAPTCHA requires HTTPS in production
3. **Container issues:** The reCAPTCHA container must exist in DOM
4. **Browser blocking:** Some browsers or extensions block reCAPTCHA

**Solutions:**
1. **Check authorized domains:**
   - Go to Firebase Console → **Authentication** → **Settings** → **Authorized domains**
   - Make sure your domain is listed (e.g., `homeservyc.vercel.app`)
   - `localhost` is included by default for development

2. **Ensure HTTPS:**
   - reCAPTCHA requires HTTPS in production
   - Vercel provides HTTPS automatically

3. **Clear cache and try again:**
   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache and cookies
   - Try a different browser

4. **Check browser console:**
   - Look for any reCAPTCHA-related errors
   - Disable browser extensions that might block reCAPTCHA

### reCAPTCHA Widget Showing Up (Visible Widget)

**If you see a reCAPTCHA widget (recycler image) in the corner:**
- This shouldn't happen with invisible reCAPTCHA
- It might appear if invisible verification fails and falls back to visible mode
- **Solution:** Check authorized domains and ensure HTTPS is enabled

### reCAPTCHA not showing/working
- Check browser console for errors
- Ensure you're using HTTPS in production (required for reCAPTCHA)
- Clear browser cache and cookies
- Try a different browser

## Security Notes

1. **Rate Limiting:** Firebase automatically rate-limits phone authentication to prevent abuse
2. **reCAPTCHA:** Invisible reCAPTCHA runs in the background - users won't see a challenge
3. **SMS Costs:** Firebase charges for SMS sent (check pricing in Firebase Console)
4. **Phone Verification:** Users must verify their phone number with SMS code

## Production Checklist

- [ ] Phone authentication enabled in Firebase Console
- [ ] Production domain added to authorized domains
- [ ] Tested phone authentication on production domain
- [ ] Verified SMS delivery works
- [ ] Checked Firebase billing/quota limits
- [ ] HTTPS enabled (required for reCAPTCHA)

## Additional Resources

- [Firebase Phone Auth Documentation](https://firebase.google.com/docs/auth/web/phone-auth)
- [reCAPTCHA Documentation](https://developers.google.com/recaptcha/docs/v3)
- [Firebase Console](https://console.firebase.google.com/project/homeservyc/authentication/providers)

