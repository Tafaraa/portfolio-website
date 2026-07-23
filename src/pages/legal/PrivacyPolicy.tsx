import SEO from '../../components/ui/SEO';
import LegalLayout, { LegalSection } from './LegalLayout';

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | Tafara Mutsvedu"
      description="How personal information is collected, used, and protected on mutsvedutafara.com, in line with POPIA, the GDPR and UK GDPR, the CCPA/CPRA, PIPEDA, the LGPD, the Australian Privacy Act and other applicable data protection laws worldwide."
      canonical="/privacy-policy"
    />
    <LegalLayout title="Privacy Policy" lastUpdated="23 July 2026">
      <LegalSection heading="1. Who is responsible for your information">
        <p>
          This website, mutsvedutafara.com, is operated by Tafara Mutsvedu, a software engineer and data
          scientist based in Midrand, Gauteng, South Africa. I am the "responsible party" under South Africa's
          Protection of Personal Information Act 4 of 2013 ("POPIA") and the "data controller" under the EU
          General Data Protection Regulation ("GDPR") and the UK GDPR, and I act as a "business" under the
          California Consumer Privacy Act as amended by the CPRA ("CCPA").
        </p>
        <p>
          I work with clients worldwide, so this policy is written to meet not only POPIA but also the GDPR
          (European Economic Area), the UK GDPR and Data Protection Act 2018 (United Kingdom), the CCPA/CPRA
          (California, USA), PIPEDA (Canada), the LGPD (Brazil), the Privacy Act 1988 and Australian Privacy
          Principles (Australia), and other applicable data protection laws in the regions I serve. For anything
          related to your personal information, contact tafara@mutsvedutafara.com.
        </p>
      </LegalSection>

      <LegalSection heading="2. What information is collected">
        <p>When you use the contact form, the following is collected:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your phone number and business or organisation, if you provide them</li>
          <li>
            Your project type, scope, timeline, working budget, selected features, hosting or care choice, and
            planning estimate
          </li>
          <li>The project context you include in your brief</li>
          <li>Whether you opted in to receiving occasional updates (marketing)</li>
        </ul>
        <p>
          When you browse the site, limited technical information (such as pages visited, approximate
          region-level location, device and browser type) is collected through Google Analytics using cookies.
          This data is aggregated and is not used to personally identify you. I do not intentionally collect any
          special-category or sensitive personal information, and you should not send any through the form.
        </p>
      </LegalSection>

      <LegalSection heading="3. Why it is collected and the lawful basis">
        <p>
          I only process your information where I have a lawful basis to do so. Depending on your region, the
          bases below correspond to consent, the taking of steps prior to a contract, and legitimate interests
          under the GDPR/UK GDPR, and to the equivalent grounds under POPIA, PIPEDA, the LGPD and other laws:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>To respond to your enquiry.</strong> Processing is necessary to take steps at your request
            before entering into an agreement, and is based on the consent you give when submitting the form.
          </li>
          <li>
            <strong>To send occasional updates.</strong> Only if you explicitly ticked the opt-in box (consent).
            You can withdraw this consent at any time by clicking unsubscribe in any update email or by emailing
            tafara@mutsvedutafara.com.
          </li>
          <li>
            <strong>To improve the website and keep it secure.</strong> Aggregated analytics and basic security
            logging are processed on the basis of my legitimate interest in understanding how the site is used
            and protecting it from abuse, balanced against your rights.
          </li>
        </ul>
        <p>
          Decisions about your enquiry are made by a human. No decision producing legal or similarly significant
          effects is made about you solely by automated means. Your information is never sold or rented to anyone.
        </p>
      </LegalSection>

      <LegalSection heading="4. Who processes your information">
        <p>
          The following service providers ("operators" under POPIA, "processors" under the GDPR/UK GDPR, and
          "service providers" under the CCPA) process data on my behalf under agreements that restrict their use
          of it to providing their service to me:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Netlify</strong> hosts the website and runs the contact form service.</li>
          <li><strong>Resend</strong> delivers the enquiry and confirmation emails.</li>
          <li><strong>Supabase</strong> stores contact form submissions in a secured database.</li>
          <li><strong>Google Analytics</strong> provides aggregated site usage statistics.</li>
        </ul>
        <p>
          I do not disclose your personal information to third parties for their own marketing, and I do not
          "sell" or "share" it as those terms are defined under the CCPA.
        </p>
      </LegalSection>

      <LegalSection heading="5. International data transfers">
        <p>
          I operate from South Africa and use reputable providers that may store and process data in the United
          States, the European Union and other countries. This means your information may be transferred across
          borders, including out of your home country.
        </p>
        <p>
          Where such transfers happen, they are protected by appropriate safeguards recognised by the relevant
          law, for example the European Commission's Standard Contractual Clauses (and the UK International Data
          Transfer Addendum) for transfers from the EEA and UK, transfers to countries with an adequacy decision,
          and the cross-border transfer conditions in section 72 of POPIA. A copy of the relevant safeguard is
          available on request by emailing tafara@mutsvedutafara.com.
        </p>
      </LegalSection>

      <LegalSection heading="6. How long it is kept">
        <p>
          Enquiry details are kept for as long as needed to handle your request and for a reasonable period
          afterwards for record-keeping and to comply with legal obligations. If you opted in to updates, your
          email address is kept until you unsubscribe or ask for it to be removed. When information is no longer
          needed, it is deleted or de-identified.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your privacy rights">
        <p>
          Wherever you are, you can email tafara@mutsvedutafara.com to exercise your rights, and I will respond
          within the timeframe required by your local law (for example, without undue delay and within one month
          under the GDPR/UK GDPR, and within 45 days under the CCPA). Verifying your identity may be necessary
          before I act on a request. You will not be discriminated against for exercising your rights.
        </p>
        <p>Depending on where you live, your rights include some or all of the following:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Access the personal information held about you and request a copy</li>
          <li>Have inaccurate information corrected and incomplete information completed</li>
          <li>Have your information deleted ("right to erasure" / "right to delete")</li>
          <li>Restrict or object to processing, including any direct marketing</li>
          <li>Receive your information in a portable, machine-readable format and have it transferred</li>
          <li>Withdraw any consent you previously gave, without affecting prior processing</li>
          <li>
            Opt out of the "sale" or "sharing" of personal information (note: I do none), and limit the use of
            sensitive information (note: I do not collect it)
          </li>
        </ul>

        <p className="pt-2">
          <strong>EEA &amp; UK (GDPR / UK GDPR).</strong> You may lodge a complaint with your local supervisory
          authority; in the UK this is the Information Commissioner's Office (ico.org.uk).
        </p>
        <p>
          <strong>California (CCPA/CPRA).</strong> You have the rights to know, delete, correct, and opt out of
          sale/sharing, and to non-discrimination. You may use an authorised agent to submit a request. I do not
          sell or share personal information and have not done so in the preceding 12 months.
        </p>
        <p>
          <strong>South Africa (POPIA).</strong> You may lodge a complaint with the Information Regulator
          (inforegulator.org.za, complaints.IR@inforegulator.org.za).
        </p>
        <p>
          <strong>Canada, Brazil, Australia and other regions (PIPEDA, LGPD, Privacy Act and equivalents).</strong>{' '}
          You have comparable rights of access, correction, and complaint, and may contact your national data
          protection authority (for example the OPC in Canada, the ANPD in Brazil, or the OAIC in Australia).
        </p>
      </LegalSection>

      <LegalSection heading="8. Security">
        <p>
          Reasonable technical and organisational measures protect your information: the site is served over
          HTTPS with strict security headers, form submissions are processed server-side, database access is
          restricted with credentials that are never exposed in the browser, and access to stored submissions
          is limited to me. No method of transmission or storage is perfectly secure, but I work to protect your
          information and to notify you and the relevant authority of any breach where the law requires it.
        </p>
      </LegalSection>

      <LegalSection heading="9. Cookies and consent">
        <p>
          The site uses cookies for analytics (Google Analytics) and for remembering preferences such as your
          light or dark theme. Where required in your region, non-essential cookies are only set with your
          consent, and you can block or delete cookies in your browser settings; the site will still work.
        </p>
      </LegalSection>

      <LegalSection heading="10. Children">
        <p>
          This site is not directed at children, and their personal information is not knowingly collected. I do
          not knowingly collect information from anyone under the age of 18 (POPIA), under 16 in the EEA/UK
          (GDPR), or under 13 in the United States (COPPA), consistent with the higher standard applicable to
          you. If you believe a child's information has been submitted, contact me and it will be deleted.
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes to this policy">
        <p>
          This policy may be updated from time to time. The date at the top shows when it was last revised, and
          material changes will be noted on this page.
        </p>
      </LegalSection>
    </LegalLayout>
  </>
);

export default PrivacyPolicy;
