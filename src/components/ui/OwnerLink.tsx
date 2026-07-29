// The only trace of the dashboard on the public site, and it renders for
// nobody except a signed-in owner. Session state is read from storage, so an
// anonymous visitor triggers no request and this component resolves to null
// before anything reaches the DOM.
//
// A plain <a>, not a react-router <Link>: the dashboard is a separate document,
// not a route in this SPA, so it needs a real navigation.

import { useEffect, useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { readOwnerSession } from '../../lib/ownerSession';
import { DASHBOARD_PATH } from '../../lib/site';

type Props = {
  /** `nav` sits inline in the header; `stacked` fills a mobile menu row. */
  variant?: 'nav' | 'stacked';
  onNavigate?: () => void;
};

const OwnerLink = ({ variant = 'nav', onNavigate }: Props) => {
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const sync = () => setIsOwner(Boolean(readOwnerSession()));
    sync();

    // Signing in or out in another tab, or coming back to a tab whose token
    // lapsed while it was hidden, should be reflected without a reload.
    window.addEventListener('storage', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      window.removeEventListener('storage', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  if (!isOwner) return null;

  const className =
    variant === 'stacked'
      ? 'flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-3 text-xl font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300'
      : 'inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-500/20 dark:text-emerald-300';

  return (
    <a
      href={DASHBOARD_PATH}
      onClick={onNavigate}
      rel="nofollow noreferrer"
      className={`${className} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
    >
      <LayoutDashboard size={variant === 'stacked' ? 20 : 15} aria-hidden="true" />
      Dashboard
    </a>
  );
};

export default OwnerLink;
