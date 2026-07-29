// Reads the Supabase session straight out of storage instead of instantiating
// the auth client. Two reasons:
//
//   1. Weight — the public site would otherwise have to pull
//      @supabase/supabase-js into the main chunk just to decide whether to show
//      the owner controls.
//   2. Noise — an anonymous visitor makes zero extra network requests. There is
//      nothing in the network tab that hints a dashboard exists. The auth SDK
//      would fire a token refresh on load; reading storage does not.
//
// This only decides what to *render*. Access itself is enforced by Supabase RLS
// and the server-side token check, so faking the stored value in devtools gets
// you a button that leads to a dashboard the database refuses to populate.

import { ADMIN_EMAIL, SUPABASE_URL } from './site';

export type OwnerSession = { email: string };

const storageKey = (): string | null => {
  if (!SUPABASE_URL) return null;
  try {
    // Project ref is the first label of the Supabase hostname.
    const ref = new URL(SUPABASE_URL).hostname.split('.')[0];
    return ref ? `sb-${ref}-auth-token` : null;
  } catch {
    return null;
  }
};

// supabase-js writes plain JSON on some versions and a `base64-` prefixed blob
// on others. Accept both so an SDK upgrade cannot silently hide the controls.
const decodeStoredSession = (raw: string): unknown => {
  if (!raw.startsWith('base64-')) return JSON.parse(raw);
  const body = raw.slice('base64-'.length).replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(body));
};

/**
 * Returns the signed-in owner, or null for everyone else. Never throws: a
 * malformed or expired entry is treated as "not signed in".
 */
export const readOwnerSession = (): OwnerSession | null => {
  const key = storageKey();
  if (!key || typeof localStorage === 'undefined') return null;

  let raw: string | null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return null; // Storage blocked (private mode, cookie settings).
  }
  if (!raw) return null;

  try {
    const session = decodeStoredSession(raw) as {
      expires_at?: number;
      user?: { email?: string };
    } | null;

    const email = session?.user?.email?.toLowerCase();
    if (!email) return null;

    // expires_at is seconds since epoch. Treat a lapsed token as signed out
    // rather than showing a control that would bounce straight to sign-in.
    if (typeof session?.expires_at === 'number' && session.expires_at * 1000 <= Date.now()) {
      return null;
    }

    if (ADMIN_EMAIL && email !== ADMIN_EMAIL) return null;

    return { email };
  } catch {
    return null;
  }
};
