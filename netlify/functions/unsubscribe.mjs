// Honours an unsubscribe from a signed link. No sign-in, no origin check: the
// token is the proof, and the request has to work when it is clicked straight
// out of a mail client, which sends no Origin and often prefetches the URL.
//
// POPIA's data-subject participation condition requires objection to actually
// work, and the Regulator treats direct-marketing consent as an enforcement
// priority. So this endpoint is deliberately forgiving: it is idempotent, it
// reports success for an address that was already unsubscribed, and it never
// reveals whether an address is in the database at all.

import { readUnsubscribeToken } from './_shared/unsubscribe-token.mjs';

const done = (body, status = 200) => Response.json(body, { status });

export default async (request) => {
  if (request.method !== 'POST' && request.method !== 'GET') {
    return done({ error: 'Method not allowed' }, 405);
  }

  const url = new URL(request.url);
  const token =
    url.searchParams.get('token') ||
    (request.method === 'POST' ? (await request.json().catch(() => ({}))).token : null);

  const email = await readUnsubscribeToken(token);
  if (!email) {
    return done({ error: 'This unsubscribe link is not valid. Reply to any email and I will remove you by hand.' }, 400);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !key) {
    console.error('Unsubscribe is not configured: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing');
    return done({ error: 'Unsubscribe is temporarily unavailable. Reply to any email and I will remove you by hand.' }, 503);
  }

  // Only ever clears marketing consent. The enquiry itself is left alone: it is
  // held on a different basis and has its own retention clock.
  const response = await fetch(
    `${supabaseUrl}/rest/v1/contact_submissions?email=eq.${encodeURIComponent(email)}&unsubscribed_at=is.null`,
    {
      method: 'PATCH',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ unsubscribed_at: new Date().toISOString(), marketing_opt_in: false })
    }
  );

  if (!response.ok) {
    console.error('Unsubscribe update failed:', response.status, await response.text());
    return done({ error: 'Something went wrong. Reply to any email and I will remove you by hand.' }, 502);
  }

  // Same answer whether rows changed or not, so the endpoint cannot be used to
  // test whether an address is on the list.
  return done({ ok: true, email });
};

export const config = { path: '/api/unsubscribe' };
