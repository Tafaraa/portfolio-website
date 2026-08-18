# Privacy Policy update — DRAFT for attorney review

**Site:** mutsvedutafara.com
**Prepared:** 18 August 2026
**Current published version:** "Last updated: 23 July 2026"
**Status:** DRAFT. Not published. Do not deploy before a South African attorney has reviewed it.

---

## Why this update exists

Four things changed on 18 August 2026 that the published policy does not describe:

1. A defined **24-month retention period**, enforced by an automated daily job that anonymises rather than deletes
2. A working **one-click unsubscribe** at `/unsubscribe`, reached from a signed link in marketing email
3. A **data export** for access requests, and deletion, both operated from the admin dashboard
4. Nothing in the site changed here, but the review found the policy **does not disclose the salted hash of the submitter's IP address** that has been collected since launch

A policy that understates what a site does is its own compliance problem. That is what makes this update necessary rather than cosmetic.

---

## The gap that was not on the list

Every contact submission stores `ip_hash`: a salted SHA-256 of the submitter's IP address, used only to rate-limit repeat submissions. The raw address is never stored.

**It is not mentioned anywhere in the published policy.** A pseudonymised identifier is still personal information under POPIA and still personal data under the GDPR. Hashing reduces risk; it does not take the data out of scope. This needs disclosing regardless of what else is agreed here.

Worth flagging to the attorney: because of a separate database defect, no submission was ever actually written to the table before 18 August 2026, so in practice no IP hash was ever stored. The disclosure obligation applies going forward.

---

## Proposed changes, section by section

Only the sections below change. Everything else in the published policy stands.

### Section 1 — Who is responsible for your information

**Add** as a new closing paragraph:

> I am the Information Officer for this site as contemplated by POPIA, and can be reached at
> tafara@mutsvedutafara.com. Under POPIA the head of a private body is its Information Officer by default,
> and the role may only be taken up once registered with the Information Regulator.

**For Tafara, before this goes to the attorney:** confirm your Information Officer registration is actually complete. Operating without a registered Information Officer is itself a contravention, and it is the most commonly missed obligation among South African SMEs. If registration is not done, do that first — the paragraph above should not be published until it is true.

### Section 2 — What information is collected

**Add** to the bulleted list of what the contact form collects:

> - A salted, one-way hash of your IP address, used only to limit repeat submissions from the same source.
>   The address itself is never stored, and the hash cannot be reversed to recover it.

### Section 3 — Why it is collected and the lawful basis

**Replace** the second bullet ("To send occasional updates") with:

> - **To send occasional updates.** Only if you explicitly ticked the opt-in box (consent). Every update email
>   carries a one-click unsubscribe link that works without signing in and never expires. You can also
>   withdraw consent at any time by emailing tafara@mutsvedutafara.com. Withdrawing marketing consent does not
>   affect an enquiry you have open; I will still reply to it.

**Add** a fourth bullet:

> - **To prevent abuse of the contact form.** A hashed IP address and your email address are used to limit how
>   many briefs can be submitted in an hour, on the basis of my legitimate interest in keeping the form usable
>   and protecting it from automated abuse.

### Section 6 — How long it is kept

**Replace the section in full:**

> Enquiry details are kept for **24 months** from the date you submit them.
>
> After 24 months the record is automatically anonymised by a scheduled job that runs daily. Your name, email
> address, phone number, organisation, the content of your brief, my private notes and the hashed IP address
> are all irreversibly removed. What remains is the non-identifying shape of the enquiry — project type,
> scope, timeline, budget band and planning estimate — which I keep to understand what people ask for and to
> improve how the site and its estimates work. That remaining record cannot be linked back to you.
>
> If you opted in to updates, your email address is kept for as long as that consent stands, because the
> purpose is ongoing. Unsubscribing ends the consent, and the 24-month clock then applies from your original
> submission, so an unsubscribe from an older enquiry will usually lead to anonymisation on the next daily run.
>
> You do not have to wait for either. You can ask me to delete your information at any time and I will action
> it directly.

**The one judgement call in this draft** is the middle paragraph: pausing the retention clock while marketing consent is live, on the basis that active consent is an ongoing purpose. That is reasoning, not advice, and it is the specific point to put in front of the attorney. If they disagree, the fix is small — remove the carve-out from `netlify/functions/retention.mjs` and every row anonymises at 24 months regardless of consent.

### Section 7 — Your privacy rights

**Add** after the existing bulleted list of rights, before the region-specific paragraphs:

> **How these work in practice.** For access or portability, I export everything held about you as a
> structured, machine-readable file and send it to you. For deletion, I remove the record outright rather than
> just flagging it. For direct marketing, use the unsubscribe link in any update email: it takes effect
> immediately, needs no sign-in, and never expires. For correction, email me the change and I will make it and
> confirm back to you.

### Section 8 — Security

**Add** as a closing sentence:

> Personal information is also removed on a schedule rather than kept indefinitely; see "How long it is kept"
> above.

---

## Questions for the attorney

1. **The retention carve-out.** Is pausing the 24-month clock while marketing consent is live defensible under POPIA, or should retention run regardless of consent status?
2. **Anonymisation as deletion.** Is the anonymisation described in Section 6 sufficient to count as de-identification under POPIA and GDPR Recital 26, given the residual record keeps project type, budget band, estimate and the original timestamp? Is that residual set genuinely non-identifying?
3. **The IP hash.** Is a salted one-way hash used purely for rate limiting adequately covered by the legitimate-interest basis proposed in Section 3, or does it require consent?
4. **Retroactive disclosure.** No data was in fact stored before 18 August 2026 because of the database defect. Does that need stating anywhere, or is a forward-looking disclosure sufficient?
5. **Information Officer.** Is the Section 1 wording correct for a sole proprietor, and is registration confirmed?
6. **24 months.** Is that period appropriate for a professional-services enquiry, given any record-keeping or tax obligations that might argue for longer?

---

## Applying it, once approved

The published policy lives in `src/pages/legal/PrivacyPolicy.tsx` as JSX, not markdown, so approved wording has to be transferred into that component by hand. Update `lastUpdated` on the `LegalLayout` at the same time, and note the change on the page as Section 11 requires.

Nothing in this file is live. Editing it changes nothing on the site.
