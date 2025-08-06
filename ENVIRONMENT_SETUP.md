# 🔐 Environment Setup Guide

## Setting up Social Authentication

### 1. Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing one)
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized origins:
     - `http://localhost:5173` (development)
     - `https://yourdomain.com` (production)
   - Add authorized redirect URIs:
     - `http://localhost:5173/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback`
5. **Copy the Client ID** - this goes in your `.env` file

### 2. Facebook OAuth Setup

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a new app**:
   - Click "Create App"
   - Choose "Consumer" or "Business" (Consumer for most cases)
   - Fill in app details
3. **Add Facebook Login product**:
   - In your app dashboard, click "Add Product"
   - Find "Facebook Login" and click "Set Up"
4. **Configure OAuth settings**:
   - Go to Facebook Login > Settings
   - Add valid OAuth redirect URIs:
     - `http://localhost:5173/auth/facebook/callback`
     - `https://yourdomain.com/auth/facebook/callback`
5. **Get your App ID**:
   - Found in Settings > Basic
   - This goes in your `.env` file

### 3. Environment File Setup

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your actual credentials**:
   ```bash
   # Your actual credentials (DO NOT commit to Git)
   VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com
   VITE_FACEBOOK_APP_ID=1234567890123456
   ```

3. **Keep `.env.example` as template** (safe to commit to Git)

## Important Security Notes

- ✅ `.env.example` - Template file, safe to commit
- ❌ `.env` - Contains real secrets, NEVER commit to Git
- ✅ `.env` is already in `.gitignore`
- ✅ Only use `VITE_` prefix for variables you want in the frontend
- ❌ Never put backend secrets in frontend environment variables

## Testing Social Login

1. **Development**: Use `http://localhost:5173` for testing
2. **Production**: Update OAuth settings with your actual domain
3. **HTTPS Required**: Social providers require HTTPS in production

## Additional Setup for Production

### Stripe (Payment Processing)
1. Go to https://stripe.com/
2. Create account and get publishable key
3. Add to `.env`: `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`

### Analytics
1. Google Analytics: https://analytics.google.com/
2. Get tracking ID: `VITE_ANALYTICS_ID=G-XXXXXXXXXX`

### Error Monitoring
1. Sentry: https://sentry.io/
2. Get DSN: `VITE_SENTRY_DSN=https://...@sentry.io/...`
