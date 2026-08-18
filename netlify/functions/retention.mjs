// Scheduled retention sweep. POPIA requires a defined retention period per data
// type and requires that deletion or anonymisation actually happens; "we keep
// it forever" is not a policy. Runs daily and anonymises in place rather than
// deleting, so the aggregate picture (which project types get asked for, what
// people budget, how estimates track) survives while the personal data does not.
//
// Retention period: 24 months from submission.
//
// Rows with live marketing consent are skipped. Their purpose is ongoing, so
// the clock has not started; unsubscribing ends the consent and puts the row
// back in scope on the next run. That carve-out is the one judgement call in
// here and should be confirmed by an attorney before it is relied on.

const RETENTION_MONTHS = 24;

// Kept alongside the record so an anonymised row is self-evidently anonymised
// rather than looking like a badly filled-in enquiry.
const ANONYMISED = {
  name: 'Anonymised',
  email: 'anonymised@removed.invalid',
  message: '[removed under the 24-month retention policy]',
  phone: null,
  organization: null,
  ip_hash: null,
  notes: null
};

export default async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Retention sweep skipped: SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing');
    return new Response('not configured', { status: 503 });
  }

  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);
  const cutoffIso = cutoff.toISOString();

  // created_at older than the cutoff, not already anonymised, and not holding
  // live marketing consent. PostgREST's `or` covers "opted out or unsubscribed".
  const query =
    `${url}/rest/v1/contact_submissions` +
    `?created_at=lt.${encodeURIComponent(cutoffIso)}` +
    `&anonymized_at=is.null` +
    `&or=(marketing_opt_in.is.false,unsubscribed_at.not.is.null)`;

  const response = await fetch(query, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({ ...ANONYMISED, anonymized_at: new Date().toISOString() })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Retention sweep failed:', response.status, detail);
    return new Response('failed', { status: 502 });
  }

  const rows = await response.json();
  const count = Array.isArray(rows) ? rows.length : 0;
  console.log(`Retention sweep: anonymised ${count} submission(s) older than ${RETENTION_MONTHS} months.`);
  return new Response(`anonymised ${count}`, { status: 200 });
};

export const config = { schedule: '@daily' };
