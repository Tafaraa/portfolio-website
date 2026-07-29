// Safety net for one specific situation: a visitor still controlled by a
// service worker from before the dashboard moved to its own document. That old
// worker answers every navigation with the cached marketing shell, so /admin
// would render this SPA instead of the dashboard.
//
// Nothing dashboard-related lives here — it tears down the stale worker and its
// caches, then reloads so Netlify can serve the real /admin document. Once the
// current service worker is installed, /admin never reaches the SPA at all and
// this component stops being reachable.

import { useEffect, useState } from 'react';
import { HANDOFF_FLAG } from '../../lib/site';

const DashboardHandoff = () => {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Already tried once this session and we are still here: reloading again
      // would just spin. Show the manual escape hatch instead.
      if (sessionStorage.getItem(HANDOFF_FLAG)) {
        setStuck(true);
        return;
      }
      sessionStorage.setItem(HANDOFF_FLAG, '1');

      try {
        const registrations = (await navigator.serviceWorker?.getRegistrations?.()) ?? [];
        await Promise.all(registrations.map((registration) => registration.unregister()));
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((key) => caches.delete(key)));
        }
      } catch {
        // Reload regardless; the worst case is the message below.
      }

      if (!cancelled) window.location.reload();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-950 px-6 text-center">
      <div className="max-w-sm">
        <p className="text-sm text-white/70">
          {stuck
            ? 'Your browser is holding an old cached copy of the site. A hard refresh (Ctrl+Shift+R) will clear it.'
            : 'Opening…'}
        </p>
      </div>
    </div>
  );
};

export default DashboardHandoff;
