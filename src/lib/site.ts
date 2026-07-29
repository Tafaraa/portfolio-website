// Plain config values with no dependency on @supabase/supabase-js. Anything on
// the public site that needs to know about Supabase (the owner-only controls,
// the auth-callback forwarder) imports from here instead of `./supabase`, so
// the auth SDK never lands in the main chunk every visitor downloads.

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// The one email allowed into the dashboard. This is only a cosmetic gate: the
// real enforcement is Supabase row-level security (`public.is_admin()`) and the
// bearer-token check inside the admin-reply function. Both live server-side and
// cannot be bypassed from the browser.
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL as string | undefined)?.toLowerCase();

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// The dashboard lives at its own entry point, outside the marketing SPA.
export const DASHBOARD_PATH = '/admin';

// The apex domain 301s to www. A magic link pointed at the apex therefore gets
// redirected mid-flight, which is how sign-ins ended up on the marketing home
// page instead of the dashboard. Always hand Supabase the canonical origin.
export const CANONICAL_ORIGIN = 'https://www.mutsvedutafara.com';

/**
 * Origin to use for auth redirects. Production always resolves to the canonical
 * www host; localhost and Netlify deploy previews keep their own origin so they
 * stay testable.
 */
export const authRedirectOrigin = (): string => {
  if (typeof window === 'undefined') return CANONICAL_ORIGIN;
  const { hostname, origin } = window.location;
  return hostname === 'mutsvedutafara.com' || hostname === 'www.mutsvedutafara.com'
    ? CANONICAL_ORIGIN
    : origin;
};

export const dashboardUrl = (): string => `${authRedirectOrigin()}${DASHBOARD_PATH}`;

// One-shot guard shared by the stale-service-worker handoff: set by the
// marketing SPA before it tears the worker down, cleared by the dashboard once
// the real document loads.
export const HANDOFF_FLAG = 'dashboard-handoff';
