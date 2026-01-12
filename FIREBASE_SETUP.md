# Firebase Setup Instructions

## Deploying Firestore Security Rules

To deploy the Firestore security rules to production:

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init firestore
   ```

4. Deploy the security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Security Rules Overview

The `firestore.rules` file contains production-ready security rules:

- **savedServices**: Users can only read/write their own saved services
- **recommendations**: Users can create recommendations, and only read/update their own (or admins can access all)

## Enabling Authentication Methods in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `homeservyc`
3. Navigate to **Authentication** > **Sign-in method**
4. Enable the following providers:
   - **Email/Password**: Enable
   - **Google**: Enable and configure OAuth consent screen
   - **Phone**: Enable (requires reCAPTCHA setup)

## Phone Authentication Setup

Phone authentication requires additional setup:

1. In Firebase Console, go to **Authentication** > **Sign-in method** > **Phone**
2. Enable Phone provider
3. Add your domain to authorized domains
4. The reCAPTCHA will be automatically handled by Firebase SDK

## Admin Access

To grant admin access to users (for managing recommendations):

1. Go to Firebase Console > **Authentication** > **Users**
2. Edit a user's custom claims
3. Add: `{ "admin": true }`

Or use Firebase Admin SDK to set custom claims programmatically.

