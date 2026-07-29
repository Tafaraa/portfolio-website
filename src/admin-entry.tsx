// Entry point for the dashboard. Deliberately separate from main.tsx so the
// dashboard's code is its own bundle: it is never referenced by the marketing
// site's chunks, never precached by the service worker, and therefore never
// appears in a visitor's network tab.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ui/ErrorBoundary';
import AdminApp from './pages/admin';
import { HANDOFF_FLAG } from './lib/site';
import './index.css';
import './admin.css';

// Reaching this document means the service-worker handoff worked. Clear the
// one-shot guard so a later visit in this tab can retry if it ever needs to.
try {
  sessionStorage.removeItem(HANDOFF_FLAG);
} catch {
  /* Storage blocked; the guard simply never gets set either. */
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AdminApp />
    </ErrorBoundary>
  </StrictMode>
);
