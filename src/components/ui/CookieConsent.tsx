import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent';

type Choice = 'accepted' | 'declined';

const readStoredChoice = (): Choice | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
};

/** Tell Google Analytics (Consent Mode v2) what the visitor decided. */
const applyConsent = (choice: Choice) => {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.('consent', 'update', {
    analytics_storage: choice === 'accepted' ? 'granted' : 'denied'
  });
};

/**
 * Minimal cookie consent bar. Analytics stays denied (see the Consent Mode
 * defaults in index.html) until the visitor accepts here, which is what the
 * Privacy Policy commits to for regions that require opt-in consent.
 */
const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readStoredChoice() === null) {
      // Let the intro loader finish before sliding this in.
      const timer = window.setTimeout(() => setVisible(true), 3200);
      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable, honour the choice for this session only */
    }
    applyConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie preferences"
      /* bottom-24 on small screens keeps it clear of the Julie chat launcher. */
      className="fixed bottom-24 right-4 z-[60] w-[calc(100vw-2rem)] max-w-sm sm:bottom-6 sm:right-6"
    >
      <div className="toast-in rounded-2xl border border-stone-200 bg-white/95 p-4 shadow-[0_18px_50px_rgba(28,25,23,0.18)] backdrop-blur-md dark:border-white/10 dark:bg-stone-950/95 dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-start gap-3">
          <Cookie size={18} className="mt-0.5 shrink-0 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-stone-600 dark:text-dark-muted">
            I use a couple of cookies to see how the site is used. Nothing is sold, ever.{' '}
            <Link
              to="/privacy-policy"
              className="font-medium text-stone-900 underline underline-offset-2 dark:text-white"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="flex-1 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-white/90"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => choose('declined')}
            className="flex-1 rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 dark:border-white/15 dark:text-dark-text dark:hover:bg-white/10"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
