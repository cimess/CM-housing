import posthog from 'posthog-js';

export const initPostHog = () => {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com';

  if (apiKey) {
    posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: 'identified_only',
      capture_pageview: false, // We will handle this manually if needed, or let it auto-capture
    });
    // Expose to window for debugging (only in dev)
    if (import.meta.env.DEV) {
      window.posthog = posthog;
    }
  } else {
    // console.warn("PostHog API Key not found. Analytics disabled.");
  }
};

export default posthog;
