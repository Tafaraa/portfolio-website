import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

const siteUrl = 'https://www.mutsvedutafara.com';

/**
 * Imperatively manages the document head.
 *
 * This deliberately does NOT use react-helmet-async: v2 renders nothing under
 * React 18 + StrictMode in this app, which left every route falling back to the
 * static index.html head (so every landing page canonicalised to the homepage).
 * A direct DOM approach is reliable for a client-only SPA and keeps per-page
 * title/description/canonical/OG/structured-data correct.
 */
const upsertMeta = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel: string, href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const SEO = ({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  author = 'Tafara Mutsvedu',
  tags = [],
  structuredData,
  noIndex = false
}: SEOProps) => {
  const defaultImage = `${siteUrl}/og.webp`;
  const fullCanonical = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${siteUrl}${canonical.startsWith('/') ? canonical : `/${canonical}`}`
    : siteUrl;
  const fullOgImage = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : `${siteUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`
    : defaultImage;

  const jsonLd = structuredData ? (Array.isArray(structuredData) ? structuredData : [structuredData]) : [];
  const serializedLd = JSON.stringify(jsonLd);
  const tagsKey = tags.join('|');

  useEffect(() => {
    document.title = title;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    if (keywords) upsertMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    upsertMeta('meta[name="author"]', 'name', 'author', author);
    upsertMeta(
      'meta[name="robots"]',
      'name',
      'robots',
      noIndex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    upsertLink('canonical', fullCanonical);

    // Open Graph
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', ogType);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', fullCanonical);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', fullOgImage);
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'Tafara Mutsvedu');

    // Twitter
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', twitterCard);
    upsertMeta('meta[name="twitter:url"]', 'name', 'twitter:url', fullCanonical);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', fullOgImage);

    // Page-specific JSON-LD (kept separate from the static index.html blocks).
    const added: HTMLScriptElement[] = [];
    document.head.querySelectorAll('script[data-seo="1"]').forEach((node) => node.remove());
    jsonLd.forEach((item) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', '1');
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
      added.push(script);
    });

    return () => {
      added.forEach((node) => node.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    title,
    description,
    keywords,
    author,
    fullCanonical,
    ogType,
    fullOgImage,
    twitterCard,
    serializedLd,
    tagsKey,
    noIndex
  ]);

  return null;
};

export default SEO;
