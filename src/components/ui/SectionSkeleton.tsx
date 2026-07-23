import React from 'react';

interface SectionSkeletonProps {
  /** Full-viewport centred layout (for whole-page route fallbacks). */
  fullPage?: boolean;
  /** Number of card placeholders to render in the grid. */
  cards?: number;
  className?: string;
}

/**
 * Themed loading placeholder used as a Suspense fallback. Mirrors the shape of
 * a typical content section (kicker, heading, copy, a grid of cards) with a
 * warm stone shimmer so loading states feel on-brand instead of a bare spinner.
 */
const SectionSkeleton: React.FC<SectionSkeletonProps> = ({
  fullPage = false,
  cards = 3,
  className = ''
}) => {
  return (
    <div
      className={`w-full ${fullPage ? 'min-h-screen flex items-center' : ''} py-20 md:py-28 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-xl">
          <div className="skeleton h-3 w-28 mb-6" />
          <div className="skeleton h-9 w-3/4 mb-4" />
          <div className="skeleton h-9 w-1/2 mb-8" />
          <div className="skeleton h-3.5 w-full mb-3" />
          <div className="skeleton h-3.5 w-5/6 mb-3" />
          <div className="skeleton h-3.5 w-2/3" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-300/60 p-5 dark:border-white/10"
            >
              <div className="skeleton mb-5 aspect-video w-full rounded-xl" />
              <div className="skeleton mb-3 h-4 w-2/3" />
              <div className="skeleton mb-2 h-3 w-full" />
              <div className="skeleton h-3 w-4/5" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">Loading content…</span>
    </div>
  );
};

export default SectionSkeleton;
