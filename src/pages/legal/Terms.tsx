import SEO from '../../components/ui/SEO';
import LegalLayout, { LegalSection } from './LegalLayout';

const Terms = () => (
  <>
    <SEO
      title="Terms of Use | Tafara Mutsvedu"
      description="The terms that apply when you use mutsvedutafara.com, send an enquiry, or opt in to updates."
      canonical="/terms"
    />
    <LegalLayout title="Terms of Use" lastUpdated="23 July 2026">
      <LegalSection heading="1. Agreement">
        <p>
          By using mutsvedutafara.com (the "site"), you agree to these terms. The site is operated by Tafara
          Mutsvedu, based in Midrand, South Africa. If you do not agree with these terms, please do not use the
          site.
        </p>
      </LegalSection>

      <LegalSection heading="2. What the site is for">
        <p>
          The site showcases my work as a software engineer and data scientist and lets you get in touch about
          projects, services, or employment. Information on the site is provided for general information and
          does not constitute a binding offer. Any engagement for services is agreed separately in writing.
        </p>
      </LegalSection>

      <LegalSection heading="3. Enquiries and communication">
        <p>
          When you send a message through the contact form, you will receive an automated confirmation and I
          will aim to respond within one business day. Submitting an enquiry creates no obligation on either
          side. Your details are handled as described in the Privacy Policy.
        </p>
        <p>
          Any price range produced by the project calculator is an early planning estimate based only on the
          options you select. It is not a quotation, invoice, or binding offer. Final pricing and delivery dates
          are confirmed only after the requirements have been reviewed and agreed in writing.
        </p>
        <p>
          Once-off project pricing and recurring hosting or care-plan pricing are shown separately. Domains,
          third-party subscriptions, licences, payment-provider fees, content production, and taxes are excluded
          unless they are expressly included in a written proposal.
        </p>
        <p>
          If you opt in to updates, you will occasionally receive emails about new work, services, and
          availability. Every such email includes a way to unsubscribe, and you can opt out at any time.
        </p>
      </LegalSection>

      <LegalSection heading="4. Intellectual property">
        <p>
          The content of this site, including text, design, graphics, and code, belongs to Tafara Mutsvedu
          unless otherwise stated. Client project names, logos, and screenshots remain the property of their
          respective owners and are shown as portfolio references. You may not reproduce or reuse site content
          for commercial purposes without permission.
        </p>
      </LegalSection>

      <LegalSection heading="5. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Use the site or contact form to send unlawful, abusive, or deceptive content</li>
          <li>Attempt to gain unauthorised access to the site or its infrastructure</li>
          <li>Use automated tools to scrape, spam, or overload the site</li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Third-party links">
        <p>
          The site links to external sites (such as client projects, GitHub, and LinkedIn). Those sites have
          their own terms and privacy practices, and I am not responsible for their content.
        </p>
      </LegalSection>

      <LegalSection heading="7. No warranties and limitation of liability">
        <p>
          The site is provided "as is". While I aim to keep information accurate and the site available and
          secure, I make no warranties to that effect. To the maximum extent permitted by law, I will not be
          liable for any indirect or consequential loss arising from your use of the site. Nothing in these
          terms limits liability that cannot lawfully be limited.
        </p>
      </LegalSection>

      <LegalSection heading="8. Governing law">
        <p>
          These terms are governed by the laws of the Republic of South Africa, and any disputes are subject to
          the jurisdiction of the South African courts.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes">
        <p>
          These terms may be updated from time to time. The date at the top shows the latest revision.
          Continued use of the site after changes means you accept the updated terms.
        </p>
      </LegalSection>
    </LegalLayout>
  </>
);

export default Terms;
