import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const FULL_NAME = 'TAFARA MUTSVEDU';
const SHORT_NAME = 'TAFARA';
const WATERMARK_ROWS = 8;
const CROP_Y = -114;
const CROP_H = 118;

// Shared text presentation. fontWeight 900 keeps the glyphs genuinely thick; no
// textLength means no horizontal squishing. The viewBox is measured to hug the
// real glyphs so the name fills the full width at natural, heavy proportions.
const textProps = {
  x: 0,
  y: 0,
  fontFamily: 'Poppins, sans-serif',
  fontWeight: 900,
  fontSize: 150
} as const;

const FILL_CLASS = 'fill-stone-900/[0.07] dark:fill-white/[0.06]';

// Crawlable entry points into the landing pages. Without these the pages are
// reachable only from the sitemap, which leaves them with no internal links at
// all and nothing pointing search engines at them from the strongest page.
const SERVICE_LINKS: { to: string; label: string }[] = [
  { to: '/it-support-for-small-business', label: 'IT support for small business' },
  { to: '/fix-email-problems', label: 'Fix email problems' },
  { to: '/business-email-setup', label: 'Business email setup' },
  { to: '/emails-going-to-spam', label: 'Emails going to spam' },
  { to: '/excel-spreadsheet-help', label: 'Excel & spreadsheet help' },
  { to: '/move-from-spreadsheets-to-a-system', label: 'Move off spreadsheets' },
  { to: '/get-your-business-online', label: 'Get your business online' },
  { to: '/ecommerce-website-developer', label: 'Sell online' },
  { to: '/ai-workflow-automation', label: 'AI & automation' },
  { to: '/it-support-midrand', label: 'IT support in Midrand' }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const fullMeasureRef = useRef<SVGTextElement>(null);
  const shortMeasureRef = useRef<SVGTextElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Measure each name's real WIDTH so preserveAspectRatio scales it to fill the
  // footer edge to edge. The vertical crop is fixed tight around the cap band
  // (getBBox height includes font whitespace, which would space the rows out).
  const [viewBoxes, setViewBoxes] = useState({
    full: `0 ${CROP_Y} 1360 ${CROP_H}`,
    short: `0 ${CROP_Y} 600 ${CROP_H}`
  });

  useEffect(() => {
    const measure = () => {
      const f = fullMeasureRef.current;
      const s = shortMeasureRef.current;
      if (!f || !s) return;
      const fb = f.getBBox();
      const sb = s.getBBox();
      if (fb.width > 0 && sb.width > 0) {
        setViewBoxes({
          full: `${fb.x} ${CROP_Y} ${fb.width} ${CROP_H}`,
          short: `${sb.x} ${CROP_Y} ${sb.width} ${CROP_H}`
        });
      }
    };
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    } else {
      measure();
    }
  }, []);

  // Parallax: the watermark drifts vertically as the footer moves through view.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <footer ref={ref} className="relative isolate overflow-hidden border-t border-stone-300 dark:border-white/10">
      {/* Off-screen text used only to measure the real glyph bounds */}
      <svg aria-hidden="true" width="10" height="10" className="pointer-events-none absolute left-0 top-0 -z-50 opacity-0">
        <text ref={fullMeasureRef} {...textProps}>{FULL_NAME}</text>
        <text ref={shortMeasureRef} {...textProps}>{SHORT_NAME}</text>
      </svg>

      {/* Dense stack of the name, tightly repeated at full width, drifting with
          parallax. Rows overflow the footer top and bottom and are clipped. */}
      <motion.div
        aria-hidden="true"
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="pointer-events-none absolute inset-x-0 -inset-y-16 flex select-none flex-col justify-center gap-[1px] will-change-transform"
      >
        {Array.from({ length: WATERMARK_ROWS }).map((_, i) => (
          <div key={i} className="leading-none">
            <svg viewBox={viewBoxes.full} preserveAspectRatio="xMidYMid meet" className="hidden h-auto w-full sm:block">
              <text {...textProps} className={FILL_CLASS}>{FULL_NAME}</text>
            </svg>
            <svg viewBox={viewBoxes.short} preserveAspectRatio="xMidYMid meet" className="block h-auto w-full sm:hidden">
              <text {...textProps} className={FILL_CLASS}>{SHORT_NAME}</text>
            </svg>
          </div>
        ))}
      </motion.div>

      {/* Foreground content */}
      <div className="container relative z-10 mx-auto px-6 py-12 md:px-12 md:py-14">
        <nav aria-label="Services" className="mb-10 border-b border-stone-300/60 pb-8 dark:border-white/10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-dark-muted">
            What I help with
          </h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-stone-600 dark:text-dark-muted md:justify-start">
            {SERVICE_LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="transition-colors hover:text-stone-900 dark:hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-600 dark:text-dark-muted">
            <Link to="/privacy-policy" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              Terms of Use
            </Link>
            <a href="mailto:tafara@mutsvedutafara.com" className="transition-colors hover:text-stone-900 dark:hover:text-white">
              tafara@mutsvedutafara.com
            </a>
          </nav>

          <p className="text-sm text-stone-600 dark:text-dark-muted">
            &copy; {currentYear} Tafara Mutsvedu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
