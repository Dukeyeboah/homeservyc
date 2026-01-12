# Vercel Deployment Setup

## Environment Variables

To deploy this application on Vercel, you need to set up the following environment variables in your Vercel project settings.

### Steps to Add Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each of the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyA3qhlupKyMoco_zUlAgHq8o9gej9DDseY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=homeservyc.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=homeservyc
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=homeservyc.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=56015129216
NEXT_PUBLIC_FIREBASE_APP_ID=1:56015129216:web:1dcb68cdaec860db8ef465
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-S2L1RSBWP7
```

### Environment Variable Details:

- **NEXT_PUBLIC_FIREBASE_API_KEY**: Your Firebase API key
- **NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN**: Your Firebase auth domain
- **NEXT_PUBLIC_FIREBASE_PROJECT_ID**: Your Firebase project ID
- **NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET**: Your Firebase storage bucket
- **NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID**: Your Firebase messaging sender ID
- **NEXT_PUBLIC_FIREBASE_APP_ID**: Your Firebase app ID
- **NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID**: Your Firebase analytics measurement ID

### Important Notes:

1. **NEXT_PUBLIC_** prefix is required for Next.js to expose these variables to the browser
2. These values are safe to expose in the client-side code (Firebase security is handled by Firestore rules)
3. Make sure to set these for all environments (Production, Preview, Development) if needed
4. After adding variables, you'll need to redeploy your application for changes to take effect

### Getting Your Firebase Config:

If you need to retrieve these values:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (homeservyc)
3. Go to **Project Settings** (gear icon)
4. Scroll down to **Your apps** section
5. Click on your web app or the `</>` icon
6. Copy the config values from there

### After Adding Variables:

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Select **Redeploy**
4. Your app will rebuild with the new environment variables

