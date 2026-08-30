export interface LandingFaq {
  q: string;
  a: string;
}

export interface PageDataEntry {
  title: string;
  subtitle: string;
  description: string;
  keywords: string;
  location?: string; // Made optional
  remote?: boolean; // Made optional
  eyebrow?: string; // Small label shown above the H1
  audience?: 'business' | 'recruiter' | 'both';
  highlights?: string[]; // Hero chips
  faqs?: LandingFaq[]; // Page-specific FAQs (merged with defaults)
  marketHeading?: string;
  marketSummary?: string;
  marketPoints?: string[];
  // Opt in to the full page (market block, service cards, FAQ section + FAQPage
  // schema, CTA band). Left off, a page renders the short hero-and-proof layout.
  longForm?: boolean;
  // Which set of service cards to show. 'it' swaps the engineering language for
  // the plain-English framing non-technical visitors actually search with.
  serviceSet?: 'engineering' | 'it';
  // Overrides the "Questions people usually ask" defaults, which are written for
  // developer/recruiter traffic and read wrong on an IT-support page.
  faqsReplaceDefaults?: boolean;
}
