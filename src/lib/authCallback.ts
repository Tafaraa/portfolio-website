// Supabase falls back to the project's Site URL whenever the `redirect_to` on a
// magic link isn't in the allow-list, so a sign-in can land on the marketing
// home page carrying its tokens (or its error) in the URL. Rather than silently
// showing the home page, forward the whole callback to the dashboard entry.
//
// This runs before anything else in main.tsx, which matters: the marketing
// bundle must not construct a Supabase client and consume the one-time token on
// a page that has no dashboard to show for it.

import { DASHBOARD_PATH } from './site';

// Supabase PKCE sends back an opaque `code`. Require a token-ish shape so a
// marketing link that happens to use ?code= can never trigger a redirect.
const AUTH_CODE_PATTERN = /^[A-Za-z0-9_-]{20,}$/;

const isOnDashboard = (pathname: string) =>
  pathname === DASHBOARD_PATH || pathname.startsWith(`${DASHBOARD_PATH}/`);

/**
 * Forwards a Supabase auth callback to the dashboard, preserving the query and
 * hash exactly. Returns true when a redirect was started, so the caller can
 * skip rendering the app it is about to navigate away from.
 */
export const forwardAuthCallback = (): boolean => {
  if (typeof window === 'undefined') return false;

  const { pathname, search, hash } = window.location;
  if (isOnDashboard(pathname)) return false;

  const fromHash = new URLSearchParams(hash.replace(/^#/, ''));
  const fromQuery = new URLSearchParams(search);
  const has = (key: string) => fromHash.has(key) || fromQuery.has(key);

  const isCallback =
    has('access_token') ||
    has('refresh_token') ||
    has('error_code') ||
    has('error_description') ||
    AUTH_CODE_PATTERN.test(fromQuery.get('code') ?? '');

  if (!isCallback) return false;

  window.location.replace(`${DASHBOARD_PATH}${search}${hash}`);
  return true;
};

export type AuthCallbackError = { code: string; message: string };

/**
 * Reads an error the way Supabase reports it — usually in the hash, sometimes
 * in the query — and clears it from the address bar so a refresh doesn't
 * resurrect a stale message.
 */
export const consumeAuthCallbackError = (): AuthCallbackError | null => {
  if (typeof window === 'undefined') return null;

  const { search, hash, pathname } = window.location;
  const fromHash = new URLSearchParams(hash.replace(/^#/, ''));
  const fromQuery = new URLSearchParams(search);
  const read = (key: string) => fromHash.get(key) ?? fromQuery.get(key);

  const code = read('error_code');
  const description = read('error_description');
  if (!code && !description) return null;

  window.history.replaceState(null, '', pathname);

  return {
    code: code ?? 'unknown',
    // Supabase form-encodes the description, so '+' means space.
    message: (description ?? 'The sign-in link could not be used.').replace(/\+/g, ' ')
  };
};
