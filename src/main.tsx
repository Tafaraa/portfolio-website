import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { forwardAuthCallback } from './lib/authCallback';
import './index.css';

// A sign-in link that lands here instead of the dashboard is handed straight
// on, tokens and all, before the marketing app renders. The intro loader in
// index.html stays up for the hop.
if (!forwardAuthCallback()) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Registered here rather than injected into every HTML entry, so the
  // dashboard document never installs or talks to a service worker.
  if (import.meta.env.PROD && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        /* A failed registration must never take the site down. */
      });
    });
  }
}
