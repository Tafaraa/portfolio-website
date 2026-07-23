import SEO from '../../components/ui/SEO';
import LegalLayout, { LegalSection } from './LegalLayout';

const PrivacyPolicy = () => (
  <>
    <SEO
      title="Privacy Policy | Tafara Mutsvedu"
      description="How personal information is collected, used, and protected on mutsvedutafara.com, in line with POPIA."
      canonical="/privacy-policy"
    />
    <LegalLayout title="Privacy Policy" lastUpdated="23 July 2026">
      <LegalSection heading="1. Who is responsible for your information">
        <p>
          This website, mutsvedutafara.com, is operated by Tafara Mutsvedu, a software engineer and data
          scientist based in Midrand, Gauteng, South Africa (the "responsible party" under the Protection of
          Personal Information Act 4 of 2013, "POPIA"). For anything related to your personal information,
          contact tafara@mutsvedutafara.com.
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
          When you browse the site, limited technical information (such as pages visited, approximate location,
          device and browser type) is collected through Google Analytics using cookies. This data is aggregated
          and is not used to personally identify you.
        </p>
      </LegalSection>

      <LegalSection heading="3. Why it is collected and the lawful basis">
        <ul className="list-disc space-y-1 pl-6">
          <li>
            <strong>To respond to your enquiry.</strong> Processing is necessary to take steps at your request
            before entering into an agreement, and is based on your consent given when submitting the form.
          </li>
          <li>
            <strong>To send occasional updates.</strong> Only if you explicitly ticked the opt-in box. You can
            withdraw this consent at any time by clicking unsubscribe in any update email or by emailing
            tafara@mutsvedutafara.com.
          </li>
          <li>
            <strong>To improve the website.</strong> Aggregated analytics are processed on the basis of
            legitimate interest in understanding how the site is used.
          </li>
        </ul>
        <p>Your information is never sold or rented to anyone.</p>
      </LegalSection>

      <LegalSection heading="4. Who processes your information">
        <p>The following service providers ("operators" under POPIA) process data on my behalf:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li><strong>Netlify</strong> hosts the website and runs the contact form service.</li>
          <li><strong>Resend</strong> delivers the enquiry and confirmation emails.</li>
          <li><strong>Supabase</strong> stores contact form submissions in a secured database.</li>
          <li><strong>Google Analytics</strong> provides aggregated site usage statistics.</li>
        </ul>
        <p>
          Some of these providers store data outside South Africa. They are contractually bound to protect it
          to standards consistent with POPIA's requirements for cross-border transfers.
        </p>
      </LegalSection>

      <LegalSection heading="5. How long it is kept">
        <p>
          Enquiry details are kept for as long as needed to handle your request and for a reasonable period
          afterwards for record-keeping. If you opted in to updates, your email address is kept until you
          unsubscribe or ask for it to be removed.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your rights under POPIA">
        <p>You have the right to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Ask what personal information is held about you and request a copy</li>
          <li>Ask for it to be corrected or deleted</li>
          <li>Object to processing, including direct marketing</li>
          <li>Withdraw any consent you previously gave</li>
          <li>
            Lodge a complaint with the Information Regulator of South Africa
            (inforegulator.org.za, complaints.IR@inforegulator.org.za)
          </li>
        </ul>
        <p>To exercise any of these rights, email tafara@mutsvedutafara.com and I will respond promptly.</p>
      </LegalSection>

      <LegalSection heading="7. Security">
        <p>
          Reasonable technical and organisational measures protect your information: the site is served over
          HTTPS with strict security headers, form submissions are processed server-side, database access is
          restricted with credentials that are never exposed in the browser, and access to stored submissions
          is limited to me.
        </p>
      </LegalSection>

      <LegalSection heading="8. Cookies">
        <p>
          The site uses cookies for analytics (Google Analytics) and for remembering preferences such as your
          light or dark theme. You can block or delete cookies in your browser settings; the site will still
          work.
        </p>
      </LegalSection>

      <LegalSection heading="9. Children">
        <p>
          This site is not directed at children under 18, and their personal information is not knowingly
          collected. If you believe a child's information has been submitted, contact me and it will be deleted.
        </p>
      </LegalSection>

      <LegalSection heading="10. Changes to this policy">
        <p>
          This policy may be updated from time to time. The date at the top shows when it was last revised, and
          material changes will be noted on this page.
        </p>
      </LegalSection>
    </LegalLayout>
  </>
);

export default PrivacyPolicy;
