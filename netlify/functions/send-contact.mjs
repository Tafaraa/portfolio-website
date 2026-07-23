// Qualified project enquiry pipeline:
// 1. validate and normalise the brief
// 2. calculate the planning range again on the server
// 3. store the structured lead in Supabase
// 4. notify Tafara and send the visitor a polished acknowledgement
//
// Required Netlify environment variables:
//   RESEND_API_KEY
//   CONTACT_TO_EMAIL
//   CONTACT_FROM_EMAIL
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY

import {
  DEFAULT_PRICING_CONFIG,
  calculateQuoteFromConfig,
  validatePricingConfig
} from '../../shared/pricing-config.mjs';

const SITE_URL = 'https://www.mutsvedutafara.com';
const WHATSAPP_NUMBER = '27606249151';

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const cleanText = (value, maxLength) => String(value ?? '').trim().slice(0, maxLength);
const formatMoney = (value, currency = 'USD', locale = 'en-US') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
const formatUsd = (value) => formatMoney(value);
const formatConverted = (lead, value) =>
  formatMoney(value * lead.displayCurrency.rate, lead.displayCurrency.code, lead.displayCurrency.locale);
const convertedRangeLabel = (lead) =>
  lead.quote && lead.displayCurrency.code !== 'USD'
    ? `${formatConverted(lead, lead.quote.minimum)} to ${formatConverted(lead, lead.quote.maximum)}`
    : null;

const detailRows = (rows) =>
  rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:9px 0;border-bottom:1px solid #e7e5e4;color:#78716c;font-size:12px;text-transform:uppercase;letter-spacing:.6px;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
          <td style="padding:9px 0;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:14px;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

const signatureHtml = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid #d6d3d1;">
    <tr><td style="padding-top:18px;font-family:Arial,Helvetica,sans-serif;">
      <p style="margin:0;font-size:15px;font-weight:700;color:#1c1917;">Tafara Mutsvedu</p>
      <p style="margin:3px 0 0;font-size:13px;color:#57534e;">Software Engineer &amp; Data Scientist</p>
      <p style="margin:10px 0 0;font-size:13px;line-height:1.7;">
        <a href="${SITE_URL}" style="color:#047857;text-decoration:none;">mutsvedutafara.com</a>
        &nbsp;&middot;&nbsp;
        <a href="mailto:tafara@mutsvedutafara.com" style="color:#047857;text-decoration:none;">tafara@mutsvedutafara.com</a>
        &nbsp;&middot;&nbsp;
        <span style="color:#57534e;">+27 60 624 9151</span>
      </p>
    </td></tr>
  </table>`;

const emailShell = ({ preview, eyebrow, title, body }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>${escapeHtml(title)}</title>
    </head>
    <body style="margin:0;padding:0;background:#f5f5f4;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preview)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;">
        <tr>
          <td align="center" style="padding:28px 12px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#ffffff;border:1px solid #e7e5e4;border-radius:14px;overflow:hidden;">
              <tr>
                <td style="height:6px;background:#047857;font-size:0;line-height:0;">&nbsp;</td>
              </tr>
              <tr>
                <td style="padding:34px 34px 30px;font-family:Arial,Helvetica,sans-serif;color:#1c1917;line-height:1.6;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.7px;text-transform:uppercase;color:#047857;">${escapeHtml(eyebrow)}</p>
                  <h1 style="margin:0 0 24px;font-size:28px;line-height:1.2;letter-spacing:-.5px;color:#1c1917;">${escapeHtml(title)}</h1>
                  ${body}
                </td>
              </tr>
            </table>
            <p style="margin:16px auto 0;max-width:560px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#a8a29e;">
              This message relates to an enquiry submitted at
              <a href="${SITE_URL}" style="color:#78716c;">mutsvedutafara.com</a>.
              Details are handled under the
              <a href="${SITE_URL}/privacy-policy" style="color:#78716c;">privacy policy</a>.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;

const autoReplyHtml = (lead) => {
  const quoteLabel = lead.quote
    ? `${formatUsd(lead.quote.minimum)} to ${formatUsd(lead.quote.maximum)}`
    : 'To be scoped after review';
  const convertedQuote = convertedRangeLabel(lead);
  const featuresLabel = lead.featureLabels.length
    ? lead.featureLabels.join(', ')
    : 'No extras selected yet';
  const monthlyLabel = lead.monthlyPrice > 0
    ? `${formatUsd(lead.monthlyPrice)} / month`
    : 'Not included';
  const whatsAppText = encodeURIComponent(
    `Hi Tafara, I just submitted a ${lead.projectLabel} enquiry from ${lead.name}. I would like to add: `
  );
  const whatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsAppText}`;

  return emailShell({
    preview: `Your ${lead.projectLabel.toLowerCase()} brief is safely in. Here is what happens next.`,
    eyebrow: 'Project brief received',
    title: `Thanks, ${lead.firstName}. Your enquiry is in.`,
    body: `
      <p style="margin:0 0 18px;font-size:15px;color:#44403c;">
        I have received your brief and will personally review the scope, priorities, and budget. You can expect
        a useful response within one business day. You will not receive an automated sales pitch.
      </p>

      <div style="margin:22px 0;padding:4px 20px 16px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;">
        <p style="margin:16px 0 4px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#78716c;">Your project snapshot</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRows([
            ['Project', lead.projectLabel],
            ['Scope', lead.scopeLabel],
            ['Timeline', lead.timelineLabel],
            ['Working budget', lead.budgetLabel],
            ['Planning range', quoteLabel],
            ['Indicative conversion', convertedQuote],
            ['Selected extras', featuresLabel],
            ['Hosting & care', lead.carePlanLabel],
            ['Ongoing cost', monthlyLabel]
          ])}
        </table>
      </div>

      <p style="margin:0 0 10px;font-size:15px;font-weight:700;color:#1c1917;">What happens next</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:32px;vertical-align:top;padding:3px 0 13px;">
            <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background:#ecfdf5;color:#047857;font-size:12px;font-weight:700;">1</span>
          </td>
          <td style="padding:3px 0 13px;font-size:14px;color:#44403c;"><strong>I review the brief</strong> for fit, risks, and missing decisions.</td>
        </tr>
        <tr>
          <td style="width:32px;vertical-align:top;padding:3px 0 13px;">
            <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background:#ecfdf5;color:#047857;font-size:12px;font-weight:700;">2</span>
          </td>
          <td style="padding:3px 0 13px;font-size:14px;color:#44403c;"><strong>I reply with the clearest next step</strong>, whether that is questions, a short call, or a scoped proposal.</td>
        </tr>
        <tr>
          <td style="width:32px;vertical-align:top;padding:3px 0 13px;">
            <span style="display:inline-block;width:24px;height:24px;line-height:24px;text-align:center;border-radius:50%;background:#ecfdf5;color:#047857;font-size:12px;font-weight:700;">3</span>
          </td>
          <td style="padding:3px 0 13px;font-size:14px;color:#44403c;"><strong>Nothing starts without written scope and approval.</strong> The calculator range is planning guidance, not an invoice or binding quote.</td>
        </tr>
      </table>

      <div style="margin:22px 0 4px;">
        <a href="${whatsAppUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#047857;color:#ffffff;text-decoration:none;font-size:14px;font-weight:700;">Add a detail on WhatsApp</a>
      </div>
      <p style="margin:10px 0 0;font-size:12px;color:#78716c;">If the project is urgent, reply to this email or use the WhatsApp button.</p>
      ${signatureHtml}`
  });
};

const autoReplyText = (lead) => {
  const quoteLabel = lead.quote
    ? `${formatUsd(lead.quote.minimum)} to ${formatUsd(lead.quote.maximum)}`
    : 'To be scoped after review';
  const convertedQuote = convertedRangeLabel(lead);
  const monthlyLabel = lead.monthlyPrice > 0
    ? `${formatUsd(lead.monthlyPrice)} / month`
    : 'Not included';
  return `Hi ${lead.firstName},

Thanks. I have received your ${lead.projectLabel.toLowerCase()} brief and will personally review it.

Project: ${lead.projectLabel}
Scope: ${lead.scopeLabel}
Timeline: ${lead.timelineLabel}
Working budget: ${lead.budgetLabel}
Planning range: ${quoteLabel}
${convertedQuote ? `Indicative ${lead.displayCurrency.code} conversion: ${convertedQuote}\n` : ''}Hosting & care: ${lead.carePlanLabel}
Ongoing cost: ${monthlyLabel}

I will reply within one business day with the clearest next step. ${lead.quoteDisclaimer}

Tafara Mutsvedu
Software Engineer & Data Scientist
${SITE_URL}
+27 60 624 9151`;
};

const notificationHtml = (lead) => {
  const quoteLabel = lead.quote
    ? `${formatUsd(lead.quote.minimum)} to ${formatUsd(lead.quote.maximum)}`
    : 'Needs scoping';
  const convertedQuote = convertedRangeLabel(lead);
  const featuresLabel = lead.featureDetails.length
    ? lead.featureDetails.join(', ')
    : 'None selected';
  const monthlyLabel = lead.monthlyPrice > 0
    ? `${formatUsd(lead.monthlyPrice)} / month`
    : 'Not included';

  return emailShell({
    preview: `${lead.name} submitted a ${lead.projectLabel.toLowerCase()} brief.`,
    eyebrow: 'New qualified lead',
    title: `${lead.projectLabel} enquiry from ${lead.name}`,
    body: `
      <div style="margin:0 0 22px;padding:4px 20px 16px;background:#fafaf9;border:1px solid #e7e5e4;border-radius:10px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRows([
            ['Name', lead.name],
            ['Organisation', lead.organization],
            ['Email', lead.email],
            ['Phone / WhatsApp', lead.phone],
            ['Project', lead.projectLabel],
            ['Scope', lead.scopeLabel],
            ['Timeline', lead.timelineLabel],
            ['Working budget', lead.budgetLabel],
            ['Planning range', quoteLabel],
            ['Indicative conversion', convertedQuote],
            ['Extras', featuresLabel],
            ['Hosting & care', lead.carePlanLabel],
            ['Ongoing cost', monthlyLabel],
            ['Hosting included', lead.hostingIncluded ? 'Yes' : 'No'],
            ['Pricing version', String(lead.pricingVersion)],
            ['Marketing opt-in', lead.marketingOptIn ? 'Yes' : 'No']
          ])}
        </table>
      </div>
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#78716c;">What they need</p>
      <div style="padding:16px 18px;background:#f5f5f4;border-left:3px solid #047857;border-radius:4px;">
        <p style="margin:0;font-size:14px;color:#292524;white-space:pre-wrap;">${escapeHtml(lead.message)}</p>
      </div>
      <p style="margin:18px 0 0;font-size:13px;color:#78716c;">Reply to this email to answer ${escapeHtml(lead.firstName)} directly.</p>`
  });
};

const notificationText = (lead) => {
  const quoteLabel = lead.quote
    ? `${formatUsd(lead.quote.minimum)} to ${formatUsd(lead.quote.maximum)}`
    : 'Needs scoping';
  const convertedQuote = convertedRangeLabel(lead);
  const monthlyLabel = lead.monthlyPrice > 0
    ? `${formatUsd(lead.monthlyPrice)} / month`
    : 'Not included';
  return `New qualified website lead

Name: ${lead.name}
Organisation: ${lead.organization || 'Not provided'}
Email: ${lead.email}
Phone / WhatsApp: ${lead.phone || 'Not provided'}
Project: ${lead.projectLabel}
Scope: ${lead.scopeLabel}
Timeline: ${lead.timelineLabel}
Working budget: ${lead.budgetLabel}
Planning range: ${quoteLabel}
${convertedQuote ? `Indicative ${lead.displayCurrency.code} conversion: ${convertedQuote}\n` : ''}Extras: ${lead.featureLabels.length ? lead.featureLabels.join(', ') : 'None selected'}
Hosting & care: ${lead.carePlanLabel}
Ongoing cost: ${monthlyLabel}
Hosting included: ${lead.hostingIncluded ? 'Yes' : 'No'}
Pricing version: ${lead.pricingVersion}
Marketing opt-in: ${lead.marketingOptIn ? 'Yes' : 'No'}

What they need:
${lead.message}`;
};

const sendEmail = async (apiKey, payload, idempotencyKey) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend ${response.status}: ${detail}`);
  }

  return response.json();
};

const loadPublishedPricing = async () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return DEFAULT_PRICING_CONFIG;

  const response = await fetch(
    `${url}/rest/v1/pricing_config?select=published_config&id=eq.default&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    }
  );
  if (!response.ok) {
    throw new Error(`Pricing lookup failed with ${response.status}`);
  }

  const rows = await response.json();
  if (!rows[0]?.published_config) return DEFAULT_PRICING_CONFIG;

  const config = rows[0].published_config;
  const validationError = validatePricingConfig(config);
  if (validationError || config.version < DEFAULT_PRICING_CONFIG.version) {
    console.warn(
      `Using USD defaults because published pricing is invalid or outdated: ${
        validationError || `published version ${config.version}, bundled version ${DEFAULT_PRICING_CONFIG.version}`
      }`
    );
    return DEFAULT_PRICING_CONFIG;
  }
  return config;
};

const storeSubmission = async (submission) => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  const response = await fetch(
    `${url}/rest/v1/contact_submissions?on_conflict=request_id`,
    {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=ignore-duplicates,return=minimal'
      },
      body: JSON.stringify(submission)
    }
  );

  if (!response.ok) {
    console.error('Supabase insert failed:', response.status, await response.text());
  }
};

export default async (request) => {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const honeypot = cleanText(body.website ?? body.company, 200);
  if (honeypot) {
    return Response.json({ ok: true }, { status: 200 });
  }

  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 200).toLowerCase();
  const phone = cleanText(body.phone, 50);
  const organization = cleanText(body.organization, 120);
  const message = cleanText(body.message, 5000);
  const projectTypeId = cleanText(body.projectType, 60);
  const scopeId = cleanText(body.scope, 40);
  const timelineId = cleanText(body.timeline, 40);
  const budgetRangeId = cleanText(body.budgetRange, 40);
  const carePlanId = cleanText(body.carePlan, 60);
  const marketingOptIn = body.marketingOptIn === true;
  const requestedPricingVersion = Number(body.pricingVersion);
  const requestedDisplayCurrency = cleanText(body.displayCurrency, 3).toUpperCase();

  let pricingConfig;
  try {
    pricingConfig = await loadPublishedPricing();
  } catch (error) {
    console.error('Pricing configuration failed:', error);
    return Response.json(
      { error: 'Pricing is temporarily unavailable. Please refresh and try again.' },
      { status: 503 }
    );
  }

  const displayCurrency =
    pricingConfig.displayCurrencies.find((currency) => currency.code === requestedDisplayCurrency) ??
    pricingConfig.displayCurrencies.find((currency) => currency.code === pricingConfig.currency);

  if (
    Number.isInteger(requestedPricingVersion) &&
    requestedPricingVersion > 0 &&
    requestedPricingVersion !== pricingConfig.version
  ) {
    return Response.json(
      { error: 'Pricing changed while you were completing the form. Refresh to review the latest estimate.' },
      { status: 409 }
    );
  }

  const projectType = pricingConfig.projectTypes.find((option) => option.id === projectTypeId);
  const scope = pricingConfig.scopes.find((option) => option.id === scopeId);
  const timeline = pricingConfig.timelines.find((option) => option.id === timelineId);
  const budgetRange = pricingConfig.budgetOptions.find((option) => option.id === budgetRangeId);
  const carePlan = pricingConfig.carePlans.find((option) => option.id === carePlanId);
  const allowedFeatureIds = new Set(pricingConfig.features.map((option) => option.id));
  const featureIds = Array.isArray(body.features)
    ? [...new Set(body.features.map((id) => cleanText(id, 60)).filter((id) => allowedFeatureIds.has(id)))].slice(0, 12)
    : [];
  const selectedFeatures = pricingConfig.features.filter((option) => featureIds.includes(option.id));

  if (
    name.length < 2 ||
    message.length < 20 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !projectType ||
    !scope ||
    !timeline ||
    !budgetRange ||
    !carePlan
  ) {
    return Response.json(
      { error: 'Please provide valid contact details and complete the project brief.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Contact function is missing required environment variables');
    return Response.json({ error: 'The contact service is not configured yet.' }, { status: 500 });
  }

  const suppliedRequestId = cleanText(body.requestId, 80);
  const requestId = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    suppliedRequestId
  )
    ? suppliedRequestId
    : crypto.randomUUID();
  const quote = calculateQuoteFromConfig(
    pricingConfig,
    projectTypeId,
    scopeId,
    timelineId,
    featureIds,
    carePlanId
  );
  const lead = {
    requestId,
    name,
    firstName: name.split(/\s+/)[0],
    email,
    phone,
    organization,
    message,
    projectTypeId,
    projectLabel: projectType.label,
    scopeId,
    scopeLabel: scope.label,
    timelineId,
    timelineLabel: timeline.label,
    budgetRangeId,
    budgetLabel: budgetRange.label,
    carePlanId,
    carePlanLabel: carePlan.label,
    featureIds,
    featureLabels: selectedFeatures.map((feature) => feature.label),
    featureDetails: selectedFeatures.map(
      (feature) => `${feature.label} (+${formatUsd(feature.price)})`
    ),
    displayCurrency,
    quote,
    monthlyPrice: carePlan.monthlyPrice,
    hostingIncluded: carePlan.hostingIncluded,
    pricingVersion: pricingConfig.version,
    quoteDisclaimer: pricingConfig.quoteDisclaimer,
    marketingOptIn
  };

  await storeSubmission({
    request_id: requestId,
    name,
    email,
    phone: phone || null,
    organization: organization || null,
    project_type: projectTypeId,
    project_scope: scopeId,
    timeline: timelineId,
    budget_range: budgetRangeId,
    selected_features: featureIds,
    base_currency: pricingConfig.currency,
    display_currency: displayCurrency.code,
    exchange_rate: displayCurrency.rate,
    estimate_min: quote?.minimum ?? null,
    estimate_max: quote?.maximum ?? null,
    care_plan: carePlanId,
    monthly_price: carePlan.monthlyPrice,
    pricing_version: pricingConfig.version,
    pricing_snapshot: {
      currency: pricingConfig.currency,
      displayCurrency: {
        code: displayCurrency.code,
        label: displayCurrency.label,
        rate: displayCurrency.rate,
        locale: displayCurrency.locale
      },
      displayedEstimate: quote
        ? {
            minimum: quote.minimum * displayCurrency.rate,
            maximum: quote.maximum * displayCurrency.rate,
            monthly: quote.monthly * displayCurrency.rate
          }
        : null,
      project: { id: projectTypeId, label: projectType.label },
      scope: { id: scopeId, label: scope.label },
      timeline: { id: timelineId, label: timeline.label },
      budget: { id: budgetRangeId, label: budgetRange.label },
      carePlan: {
        id: carePlanId,
        label: carePlan.label,
        monthlyPrice: carePlan.monthlyPrice,
        hostingIncluded: carePlan.hostingIncluded
      },
      features: selectedFeatures.map((feature) => ({
        id: feature.id,
        label: feature.label,
        price: feature.price
      }))
    },
    message,
    marketing_opt_in: marketingOptIn,
    consent_text:
      'Submitted via mutsvedutafara.com project brief; agreed to the privacy policy' +
      (marketingOptIn ? ' and opted in to occasional updates.' : '.'),
    source: 'project-brief-calculator'
  });

  try {
    await sendEmail(
      apiKey,
      {
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New ${lead.projectLabel} enquiry from ${name}`,
        html: notificationHtml(lead),
        text: notificationText(lead),
        tags: [
          { name: 'email_type', value: 'lead_notification' },
          { name: 'project_type', value: projectTypeId.replace(/[^a-zA-Z0-9_-]/g, '_') }
        ]
      },
      `${requestId}-lead-notification`
    );

    await sendEmail(
      apiKey,
      {
        from: fromEmail,
        to: [email],
        reply_to: toEmail,
        subject: 'Your project enquiry is in. Here is what happens next',
        html: autoReplyHtml(lead),
        text: autoReplyText(lead),
        tags: [{ name: 'email_type', value: 'lead_acknowledgement' }]
      },
      `${requestId}-lead-acknowledgement`
    );
  } catch (error) {
    console.error('Email send failed:', error);
    return Response.json(
      { error: 'Something went wrong sending your brief. Please try again or email me directly.' },
      { status: 502 }
    );
  }

  return Response.json(
    {
      ok: true,
      requestId,
      estimate: quote
    },
    { status: 200 }
  );
};

export const config = { path: '/api/contact' };
