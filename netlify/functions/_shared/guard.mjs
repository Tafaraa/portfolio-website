// Abuse controls shared by the public API functions.
//
// The underscore prefix keeps Netlify from treating this directory as a
// function of its own; it is imported, never routed.
//
// Two independent layers:
//   1. Origin check — stops a form posted from someone else's page. Cheap, runs
//      before any work, and blocks the drive-by bot case outright.
//   2. Rate limit — the control that actually holds. Counts recent rows in
//      contact_submissions by hashed IP and by email, so swapping the email
//      address does not buy a fresh quota.

const CANONICAL_ORIGINS = ['https://www.mutsvedutafara.com', 'https://mutsvedutafara.com'];

const isAllowedOrigin = (value) => {
  if (!value) return false;
  let origin;
  try {
    origin = new URL(value).origin;
  } catch {
    return false;
  }
  if (CANONICAL_ORIGINS.includes(origin)) return true;

  const { hostname, protocol } = new URL(origin);
  // Netlify deploy previews and branch deploys.
  if (protocol === 'https:' && hostname.endsWith('.netlify.app')) return true;
  // Local development.
  if (hostname === 'localhost' || hostname === '127.0.0.1') return true;
  return false;
};

/**
 * True when the request came from one of our own pages. The browser sets
 * Origin on cross-origin POSTs and Referer on same-origin ones, so a real form
 * submission always carries at least one of them.
 */
export const hasTrustedOrigin = (request) => {
  const origin = request.headers.get('origin');
  // An explicit Origin that doesn't match is a hard no, regardless of Referer.
  if (origin) return isAllowedOrigin(origin);
  return isAllowedOrigin(request.headers.get('referer'));
};

/** Netlify's own header first; x-forwarded-for is client-settable upstream. */
export const clientIp = (request) =>
  request.headers.get('x-nf-client-connection-ip') ||
  (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
  '';

/**
 * Salted SHA-256. The raw address is never stored: a hash is enough to count
 * repeat submissions, and it keeps the table free of personal network data.
 */
export const hashIp = async (ip) => {
  if (!ip) return null;
  // The service-role key is secret, stable and always present, so it works as a
  // salt without adding another required environment variable.
  const salt = process.env.RATE_LIMIT_SALT || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!salt) return null;
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const countRecent = async (column, value, sinceIso) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !value) return 0;

  const query =
    `${url}/rest/v1/contact_submissions` +
    `?select=id` +
    `&${column}=eq.${encodeURIComponent(value)}` +
    `&created_at=gte.${encodeURIComponent(sinceIso)}`;

  const response = await fetch(query, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      // Ask for the count in a header instead of shipping the rows back.
      Prefer: 'count=exact',
      Range: '0-0'
    }
  });

  if (!response.ok) {
    // Never let a failed lookup block a real enquiry.
    console.error('Rate-limit lookup failed:', response.status, await response.text());
    return 0;
  }

  // content-range looks like "0-0/12"; the total is what we want.
  const total = Number((response.headers.get('content-range') || '').split('/')[1]);
  return Number.isFinite(total) ? total : 0;
};

export const RATE_LIMIT = {
  windowMinutes: 60,
  perIp: 5,
  perEmail: 3
};

/**
 * Returns { limited, retryAfterSeconds }. Fails open: if Supabase is
 * unreachable or unconfigured, a genuine enquiry still gets through.
 */
export const checkRateLimit = async ({ ipHash, email }) => {
  const sinceIso = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000).toISOString();

  const [ipCount, emailCount] = await Promise.all([
    ipHash ? countRecent('ip_hash', ipHash, sinceIso) : Promise.resolve(0),
    email ? countRecent('email', email, sinceIso) : Promise.resolve(0)
  ]);

  const limited = ipCount >= RATE_LIMIT.perIp || emailCount >= RATE_LIMIT.perEmail;
  return { limited, retryAfterSeconds: RATE_LIMIT.windowMinutes * 60 };
};
