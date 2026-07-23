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
}
