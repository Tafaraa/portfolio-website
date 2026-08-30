import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import type { Plugin } from 'vite';
import {
  DEFAULT_OG_IMAGE,
  NAME,
  SITE_URL,
  getPageData
} from '../src/pages/locationLanding/pageData';
import { LANDING_ROUTES } from '../src/pages/locationLanding/routes';
import type { PageDataEntry } from '../src/types';

/**
 * Build-time prerender for the landing routes.
 *
 * The app is a client-rendered SPA, so before this step every route was served
 * the same `index.html`. Google runs JS and coped, but link-preview scrapers
 * (WhatsApp, Slack, LinkedIn, X) and Bing do not: they read the first response
 * only, so all 54 routes shared the homepage title, description and image.
 *
 * This writes a real `dist/<route>/index.html` per route with that page's own
 * head. Netlify serves an existing file in preference to the unforced `/*`
 * SPA rewrite, so these are picked up automatically with no redirect changes.
 * The body is left as the normal SPA shell: React still boots and renders the
 * route exactly as before, and the client-side <SEO> component rewrites the
 * same tags on navigation.
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// JSON-LD sits in a <script> element, where the only sequence that can break
// out is a literal "</script". Escaping the slash keeps the JSON valid.
const escapeJsonLd = (value: string) => value.replace(/<\//g, '<\\/');

const personEntity = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: NAME,
  alternateName: ['Mutsvedu Tafara', 'Tafara'],
  givenName: 'Tafara',
  familyName: 'Mutsvedu',
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.webp`,
  jobTitle: ['Software Engineer', 'Data Scientist', 'AI Engineer'],
  sameAs: ['https://github.com/Tafaraa', 'https://www.linkedin.com/in/tafara-mutsvedu-93825621b']
};

const buildStructuredData = (route: string, page: PageDataEntry) => {
  const pageUrl = `${SITE_URL}${route}`;
  const blocks: Record<string, unknown>[] = [
    { '@context': 'https://schema.org', ...personEntity },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.description,
      provider: personEntity,
      areaServed: page.location || (page.remote ? 'Worldwide (Remote)' : 'South Africa'),
      serviceType: page.subtitle,
      url: pageUrl
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: NAME, item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.title, item: pageUrl }
      ]
    }
  ];

  // Only the long-form pages render a visible FAQ section, and FAQPage markup
  // must describe content that is actually on the page.
  if (page.longForm && page.faqs && page.faqs.length > 0) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }

  return blocks;
};

/** Replace a tag's content attribute in place, or append the tag if absent. */
const setMeta = (html: string, selectorAttr: string, key: string, content: string) => {
  const pattern = new RegExp(`(<meta\\s+${selectorAttr}=["']${key}["'][^>]*content=["'])[^"']*(["'])`, 'i');
  if (pattern.test(html)) return html.replace(pattern, `$1${escapeHtml(content)}$2`);
  return html.replace(
    '</head>',
    `    <meta ${selectorAttr}="${key}" content="${escapeHtml(content)}">\n  </head>`
  );
};

const buildRouteHtml = (template: string, route: string, page: PageDataEntry) => {
  const title = `${page.title} | ${NAME}`;
  const canonical = `${SITE_URL}${route}`;
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  html = setMeta(html, 'name', 'title', title);
  html = setMeta(html, 'name', 'description', page.description);
  html = setMeta(html, 'name', 'keywords', `${page.keywords}, ${NAME}, Mutsvedu Tafara, Tafara, Mutsvedu`);

  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', page.description);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = setMeta(html, 'property', 'og:image', DEFAULT_OG_IMAGE);

  // Twitter tags are authored with property= in this document, and the client
  // SEO component writes name=. Update whichever form is present.
  html = setMeta(html, 'property', 'twitter:title', title);
  html = setMeta(html, 'property', 'twitter:description', page.description);
  html = setMeta(html, 'property', 'twitter:url', canonical);

  html = html.replace(
    /<link rel="canonical"[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`
  );

  // The homepage's JSON-LD describes the homepage. Swap in this route's.
  html = html.replace(
    /(\s*<!-- Structured Data \/ JSON-LD -->)?\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi,
    ''
  );
  const ld = buildStructuredData(route, page)
    .map(
      (block) =>
        `    <script type="application/ld+json">${escapeJsonLd(JSON.stringify(block))}</script>`
    )
    .join('\n');
  html = html.replace('</head>', `${ld}\n  </head>`);

  return html;
};

export const prerenderLandingPages = (): Plugin => ({
  name: 'prerender-landing-pages',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    const outDir = resolveOutDir();
    const templatePath = join(outDir, 'index.html');
    let template: string;
    try {
      template = readFileSync(templatePath, 'utf8');
    } catch {
      // The dashboard build (admin.html) has no index.html; nothing to do.
      return;
    }

    let written = 0;
    for (const route of LANDING_ROUTES) {
      const page = getPageData(route);
      const html = buildRouteHtml(template, route, page);
      const target = join(outDir, route.replace(/^\//, ''), 'index.html');
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, html);
      written += 1;
    }
    this.info?.(`prerendered ${written} landing routes with per-page head tags`);
  }
});

const resolveOutDir = () => join(process.cwd(), 'dist');

export default prerenderLandingPages;
