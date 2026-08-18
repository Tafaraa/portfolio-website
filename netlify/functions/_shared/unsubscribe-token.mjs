// Signed unsubscribe links. A person who received marketing mail must be able
// to opt out without signing in, so the link carries its own proof: the email
// address plus an HMAC over it. Nothing is stored, and a forged or edited link
// simply fails to verify.
//
// The token is deliberately not time-limited. An unsubscribe link that has
// expired is worse than useless: it turns a lawful objection into a dead end,
// which is exactly what POPIA's data-subject participation condition rules out.

const encoder = new TextEncoder();

// Same reasoning as hashIp in guard.mjs: the service-role key is secret, stable
// and always present, so it works as a signing key without adding another
// required environment variable. UNSUBSCRIBE_SECRET overrides it when set.
const signingKey = () =>
  process.env.UNSUBSCRIBE_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const b64url = (bytes) =>
  Buffer.from(bytes).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromB64url = (value) =>
  Buffer.from(value.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

const hmac = async (message) => {
  const key = signingKey();
  if (!key) return null;
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
  return b64url(new Uint8Array(signature));
};

/** `<base64url(email)>.<base64url(hmac)>`, or null when no signing key exists. */
export const createUnsubscribeToken = async (email) => {
  const normalised = String(email ?? '').trim().toLowerCase();
  if (!normalised) return null;
  const payload = b64url(encoder.encode(normalised));
  const signature = await hmac(payload);
  return signature ? `${payload}.${signature}` : null;
};

/**
 * Returns the email the token was issued for, or null if it does not verify.
 * Comparison is length-constant so the signature cannot be probed byte by byte.
 */
export const readUnsubscribeToken = async (token) => {
  const [payload, signature] = String(token ?? '').split('.');
  if (!payload || !signature) return null;

  const expected = await hmac(payload);
  if (!expected || expected.length !== signature.length) return null;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (mismatch !== 0) return null;

  try {
    const email = fromB64url(payload).toString('utf8');
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
  } catch {
    return null;
  }
};
