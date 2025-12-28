# Implementation Plan - Analytics (PostHog)

## Goal
Integrate PostHog to track user behavior, page views, and sessions. This will provide insights into how users interact with the application.

## User Review Required
> [!IMPORTANT]
> You will need a **PostHog Project API Key** and **Host URL** (usually `https://app.posthog.com` or `https://eu.posthog.com`).
> I will set up the code to use environment variables: `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST`.

## Proposed Changes

### 1. [NEW DEPENDENCY] `posthog-js`
-   Install the package: `npm install posthog-js`

### 2. [NEW FILE] `src/lib/posthog.js`
-   Create a utility file to initialize PostHog.

#### [NEW] [src/lib/posthog.js](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/lib/posthog.js)
```javascript
import posthog from 'posthog-js';

export const initPostHog = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

  if (apiKey) {
    posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: 'identified_only', // Better for privacy/cost
      capture_pageview: false, // We will handle this manually for SPA if needed, or let it auto-capture
    });
  } else {
    console.warn("PostHog API Key not found. Analytics disabled.");
  }
};

export default posthog;
```

### 3. [MODIFY] `src/main.jsx`
-   Initialize PostHog when the app starts.
-   Wrap the app with `PostHogProvider` (if we use the React component approach, but standard init is often enough. Let's stick to standard init for simplicity, or use the provider if we want to use hooks later).
-   Actually, for a React SPA, using the `PostHogProvider` from `posthog-js/react` is not a standard package, usually we just init. But `posthog-js` documentation often suggests just running `posthog.init`.
-   **Refinement**: I'll just call `initPostHog()` in `main.jsx`.

#### [MODIFY] [main.jsx](file:///c:/Users/USER/Dev/my-housing-site/housing-clean%20copy/src/main.jsx)
```javascript
import { initPostHog } from './lib/posthog';

// Initialize Analytics
initPostHog();

// ... existing render code
```

## Verification Plan

### Manual Verification
1.  Create a `.env` file (or add to existing) with a dummy key for testing: `VITE_POSTHOG_KEY=test_key`.
2.  Run the app.
3.  Check the browser console. It should **NOT** show the "PostHog API Key not found" warning (if key is present).
4.  Inspect Network tab -> Filter by "posthog". You should see requests (though they might fail with a dummy key, the attempt confirms integration).
