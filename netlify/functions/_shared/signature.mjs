// One signature for every email that goes out under Tafara's name: the visitor
// auto-response (send-contact) and the manual dashboard reply (admin-reply).
// Kept here so the two can't drift apart again.
//
// Icons are absolute www URLs because the apex 301s to www and some mail
// clients will not follow a redirect for a remote image. The greys are the
// stone palette the enquiry email's shell uses, so the block reads as part of
// the message rather than a pasted-in signature.

export const SITE_URL = 'https://www.mutsvedutafara.com';

const signatureRow = (icon, alt, href, label) => `
        <tr>
          <td width="25" style="width:25px;padding:3px 8px 3px 0;vertical-align:middle;">
            <img src="${SITE_URL}/images/${icon}" alt="${alt}" width="17" height="17" style="display:block;border:0;outline:none;width:17px;height:17px;max-width:17px;max-height:17px;">
          </td>
          <td style="padding:3px 0;vertical-align:middle;">
            <a href="${href}" style="font-size:13px;color:#57534e;text-decoration:none;">${label}</a>
          </td>
        </tr>`;

export const signatureHtml = `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid #e7e5e4;">
    <tr><td style="padding-top:20px;font-family:Arial,Helvetica,sans-serif;">
      <div style="font-size:13px;color:#57534e;">Kind regards,</div>
      <div style="margin-top:10px;font-size:17px;font-weight:bold;color:#1c1917;">Tafara Mutsvedu</div>
      <div style="margin-top:2px;font-size:13px;color:#57534e;">Software Engineer&nbsp;&nbsp;|&nbsp;&nbsp;AI &amp; Web Development</div>
      <div style="border-top:1px solid #e7e5e4;margin:10px 0;width:230px;font-size:1px;line-height:1px;">&nbsp;</div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        ${signatureRow('phone.png', 'Phone', 'tel:+27606249151', '+27 60 624 9151')}
        ${signatureRow('email.png', 'Email', 'mailto:tafara@mutsvedutafara.com', 'tafara@mutsvedutafara.com')}
        ${signatureRow('website.png', 'Website', SITE_URL, 'mutsvedutafara.com')}
      </table>
      <div style="margin-top:12px;font-size:11px;font-style:italic;color:#a8a29e;line-height:15px;max-width:320px;">
        This email and any attachments are confidential and intended solely for the addressee.
        If you have received this email in error, please notify the sender and delete it from your system.
      </div>
    </td></tr>
  </table>`;

export const signatureText = `Kind regards,

Tafara Mutsvedu
Software Engineer | AI & Web Development
+27 60 624 9151
tafara@mutsvedutafara.com
mutsvedutafara.com

This email and any attachments are confidential and intended solely for the addressee. If you have received this email in error, please notify the sender and delete it from your system.`;
