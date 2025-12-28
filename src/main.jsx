import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import "@fontsource/manrope";
import "@fontsource/playfair-display";
import { ThemeProvider } from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async';
import { initPostHog } from './lib/posthog';
import GlobalErrorBoundary from './components/GlobalErrorBoundary';

// Initialize Analytics
initPostHog();

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <GlobalErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </GlobalErrorBoundary>
  </HelmetProvider>
)
