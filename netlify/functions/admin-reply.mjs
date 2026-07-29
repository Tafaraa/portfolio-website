// Sends a reply to an enquiry from the dashboard, through Resend, with Tafara's
// signature. Protected: the caller must present a valid Supabase access token
// belonging to the admin email. Env vars (Netlify):
//   RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL
//   SUPABASE_URL, SUPABASE_ANON_KEY, ADMIN_EMAIL

import { hasTrustedOrigin } from './_shared/guard.mjs';

const SITE_URL = 'https://www.mutsvedutafara.com';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const signatureHtml = `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:2px solid #1c1917;padding-top:4px;">
    <tr><td style="padding-top:14px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0;font-size:15px;font-weight:bold;color:#1c1917;">Tafara Mutsvedu</p>
      <p style="margin:2px 0 0;font-size:13px;color:#57534e;">Software Engineer &amp; Data Scientist</p>
      <p style="margin:10px 0 0;font-size:13px;color:#57534e;">
        <a href="${SITE_URL}" style="color:#047857;text-decoration:none;">mutsvedutafara.com</a>
        &nbsp;&middot;&nbsp;
        <a href="mailto:tafara@mutsvedutafara.com" style="color:#047857;text-decoration:none;">tafara@mutsvedutafara.com</a>
        &nbsp;&middot;&nbsp;
        <span style="color:#57534e;">+27 60 624 9151</span>
      </p>
      <p style="margin:6px 0 0;font-size:13px;">
        <a href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b" style="color:#047857;text-decoration:none;">LinkedIn</a>
        &nbsp;&middot;&nbsp;
        <a href="https://github.com/Tafaraa" style="color:#047857;text-decoration:none;">GitHub</a>
      </p>
    </td></tr>
  </table>`;

const replyHtml = (name, body) => `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#1c1917;line-height:1.6;">
    <p style="font-size:15px;">Hi ${escapeHtml(name)},</p>
    <div style="font-size:15px;white-space:pre-wrap;">${escapeHtml(body)}</div>
    ${signatureHtml}
  </div>`;

// Confirm the bearer token belongs to the admin, using Supabase's auth endpoint.
const verifyAdmin = async (token) => {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
  if (!url || !anon || !adminEmail || !token) return false;
  const res = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: anon, Authorization: `Bearer ${token}` }
  });
  if (!res.ok) return false;
  const user = await res.json();
  return (user?.email || '').toLowerCase() === adminEmail;
};

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Belt and braces: the bearer check below is the real gate, but there is no
  // reason for this endpoint to accept a call from anywhere but the dashboard.
  if (!hasTrustedOrigin(req)) {
    return Response.json({ error: 'Request rejected.' }, { status: 403 });
  }

  const token = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '');
  const authorised = await verifyAdmin(token);
  if (!authorised) {
    return Response.json({ error: 'Not authorised' }, { status: 401 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const to = String(body.to ?? '').trim();
  const name = String(body.name ?? 'there').trim().slice(0, 120);
  const subject = String(body.subject ?? '').trim().slice(0, 200) || 'Re: your message';
  const message = String(body.message ?? '').trim().slice(0, 8000);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || message.length < 1) {
    return Response.json({ error: 'A valid recipient and message are required.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const bcc = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !fromEmail) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      bcc: bcc ? [bcc] : undefined, // keep a copy in your own inbox
      reply_to: bcc || fromEmail,
      subject,
      html: replyHtml(name, message)
    })
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error('Resend reply failed:', res.status, detail);
    return Response.json({ error: 'Failed to send the reply.' }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 200 });
};

export const config = { path: '/api/admin-reply' };
