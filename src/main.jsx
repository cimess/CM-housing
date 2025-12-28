import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'
import { ThemeProvider } from './context/ThemeContext'
import { HelmetProvider } from 'react-helmet-async';
import { initPostHog } from './lib/posthog';

// Initialize Analytics
initPostHog();

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HelmetProvider>
)
