import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

type LegalLayoutProps = {
  title: string;
  lastUpdated: string;
  children: ReactNode;
};

const LegalLayout = ({ title, lastUpdated, children }: LegalLayoutProps) => (
  <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900 dark:from-dark-bg dark:to-dark-surface dark:text-dark-text">
    <div className="container mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-dark-muted dark:hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to the site
      </Link>

      <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-stone-500 dark:text-dark-muted">Last updated: {lastUpdated}</p>

      <div className="legal-prose mt-10 space-y-8 text-[15px] leading-relaxed text-stone-700 dark:text-dark-text/85">
        {children}
      </div>

      <div className="mt-14 border-t border-stone-300/70 pt-6 text-sm text-stone-500 dark:border-white/10 dark:text-dark-muted">
        Questions about this page? Email{' '}
        <a href="mailto:tafara@mutsvedutafara.com" className="underline underline-offset-2">
          tafara@mutsvedutafara.com
        </a>
        .
      </div>
    </div>
  </div>
);

export const LegalSection = ({ heading, children }: { heading: string; children: ReactNode }) => (
  <section>
    <h2 className="mb-3 text-xl font-semibold text-stone-900 dark:text-white">{heading}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

export default LegalLayout;
