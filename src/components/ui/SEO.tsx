import { Helmet } from 'react-helmet-async';

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
}

const SEO = ({ 
  title, 
  description, 
  canonical, 
  keywords, 
  ogImage, 
  ogType = "website",
  twitterCard = "summary_large_image",
  author = "Tafara Mutsvedu",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  structuredData
}: SEOProps) => {
  const siteUrl = 'https://mutsvedutafara.com';
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
  const jsonLd = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : [];

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="application-name" content="Tafara Mutsvedu Portfolio" />
      <meta name="creator" content={author} />
      <meta name="publisher" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      <link rel="alternate" hrefLang="en-ZA" href={fullCanonical} />
      <link rel="alternate" hrefLang="x-default" href={siteUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:type" content="image/webp" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Tafara Mutsvedu Portfolio" />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@tafaramutsvedu" />
      <meta name="twitter:site" content="@tafaramutsvedu" />
      <meta name="twitter:label1" content="Services" />
      <meta name="twitter:data1" content="Web development, dashboards, AI and data tools" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#f8fafc" />
      <meta name="color-scheme" content="light dark" />
      
      {/* Language and Region */}
      <meta property="og:locale:alternate" content="en_ZA" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Security Headers */}
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
