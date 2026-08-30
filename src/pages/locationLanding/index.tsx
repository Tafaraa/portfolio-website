import { useParams, Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Code2,
  Database,
  Download,
  FileSpreadsheet,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Workflow
} from 'lucide-react';
import OptimizedImage from '../../components/ui/OptimizedImage';
import SEO from '../../components/ui/SEO';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { LandingFaq } from '../../types';
import { NAME, ROLE, SITE_URL, buildFallbackPageData, pageData, resolvePageKey } from './pageData';

// ---------------------------------------------------------------------------
// One consistent identity + voice across every landing page ("one language").
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER_E164 = '27606249151';
const PHONE_LINK = 'tel:+27606249151';

const buildWhatsAppLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(text)}`;

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
  sameAs: [
    'https://github.com/Tafaraa',
    'https://www.linkedin.com/in/tafara-mutsvedu-93825621b'
  ]
};

const services = [
  {
    icon: Workflow,
    title: 'AI engineering & workflows',
    points: ['LLM features & AI assistants', 'Automations that cut admin', 'Smart chatbots & integrations']
  },
  {
    icon: Code2,
    title: 'Web & e-commerce',
    points: ['Fast business websites', 'Online stores & payments', 'Booking & admin systems']
  },
  {
    icon: BarChart3,
    title: 'Data science & dashboards',
    points: ['Models & predictive analysis', 'Reporting dashboards', 'Turning data into decisions']
  },
  {
    icon: Database,
    title: 'Full-stack apps & APIs',
    points: ['Portals & internal tools', 'REST APIs & databases', 'Systems built to run daily']
  }
];

// The same work, described the way a non-technical owner searches for it:
// "my email isn't working", "someone to fix my spreadsheet", "an IT guy".
const itServices = [
  {
    icon: Mail,
    title: 'Email that just works',
    points: [
      'Business email on your own domain',
      'Fix email not sending or receiving',
      'Stop your mail landing in spam'
    ]
  },
  {
    icon: FileSpreadsheet,
    title: 'Spreadsheets sorted',
    points: [
      'Fix broken Excel and Google Sheets',
      'Formulas, reports and clean-ups',
      'Automate the copy-and-paste work'
    ]
  },
  {
    icon: Database,
    title: 'Off spreadsheets, onto a system',
    points: [
      'Move your sheets into a real system',
      'Nothing lost, nothing retyped',
      'Everyone works off one version'
    ]
  },
  {
    icon: ShieldCheck,
    title: 'Everyday IT support',
    points: [
      'Accounts, backups and passwords',
      'New staff set up properly',
      'A person who answers when you call'
    ]
  }
];

const proofProjects = [
  {
    title: 'Dr Metuse',
    blurb: 'Clinic website + admin system running bookings, content and payments.',
    href: 'https://drmetuseplasticsurgeon.co.za/'
  },
  {
    title: 'BabyEmporium',
    blurb: 'Online store with inventory, orders and WhatsApp ordering built in.',
    href: 'https://www.babyemporium.co.zw/'
  },
  {
    title: 'SkillLens',
    blurb: 'An AI tool that turns GitHub activity into clear skill insights.',
    href: 'https://skill-lens.vercel.app/'
  }
];

const defaultFaqs: LandingFaq[] = [
  {
    q: 'Do you work with clients outside South Africa?',
    a: 'Yep. I work remote with clients worldwide and in person around Gauteng. Time zones have never been the hard part.'
  },
  {
    q: 'Do you only build websites, or AI and automation too?',
    a: 'Both. A lot of my work now is AI engineering (LLM features, automations and chatbots) on top of websites, stores, dashboards and full-stack systems.'
  },
  {
    q: "Can you help if I'm starting from zero?",
    a: "That's honestly the best time to bring me in. I'll get you online, set up the tools, and train your team so you're not stuck depending on me forever."
  },
  {
    q: 'Are you open to full-time or contract roles?',
    a: "Yes, I'm open to full-time and contract work alongside client projects. Download the CV or send a message and let's talk."
  }
];

// Shown at the bottom of the IT-support pages instead of the developer/recruiter
// defaults above. These are the questions people actually ask on the first call.
const itSupportFaqs: LandingFaq[] = [
  {
    q: 'I am not technical at all. Is that a problem?',
    a: "Not even slightly. Most people I help are not technical, and that is the point of hiring someone. You describe the problem in your own words, I ask a few plain questions, and I explain what I am doing without the jargon."
  },
  {
    q: 'Do you have to come to my office?',
    a: 'Usually no. Email, spreadsheet and account problems are almost always fixed remotely, and I can do it while you carry on working. If something genuinely needs hands on a machine, I will say so, and I can come out around Gauteng.'
  },
  {
    q: 'How much does it cost?',
    a: "Small fixes are usually a quick once-off. Bigger jobs, like moving a business off spreadsheets, get a fixed quote before anything starts, so there is no surprise invoice. If the job is small enough that you do not need me, I will tell you that too."
  },
  {
    q: 'How quickly can you look at it?',
    a: 'Send a WhatsApp or give me a call. Anything that is stopping you working, like email being down, I look at the same day wherever I can.'
  }
];

const LocationLanding = () => {
  const { location } = useParams();
  const { pathname } = useLocation();

  const currentLocation = resolvePageKey(pathname) || location || '';


  const currentPageData = pageData[currentLocation] || buildFallbackPageData(currentLocation);
  const canonicalUrl = pathname;
  const pageUrl = `${SITE_URL}${pathname}`;
  const audience = currentPageData.audience ?? 'both';
  const showLongFormSections = currentPageData.longForm === true;
  const eyebrow =
    currentPageData.eyebrow ||
    (currentPageData.location
      ? `${ROLE} in ${currentPageData.location}`
      : currentPageData.remote
        ? `${ROLE}. Available remotely`
        : ROLE);
  const highlights =
    currentPageData.highlights && currentPageData.highlights.length > 0
      ? currentPageData.highlights
      : ['AI workflows', 'Websites & e-commerce', 'Dashboards & data', 'Full-stack systems'];
  const decisionPoints =
    currentPageData.marketPoints && currentPageData.marketPoints.length > 0
      ? currentPageData.marketPoints.slice(0, 3)
      : highlights.slice(0, 3);
  const faqFallbacks = currentPageData.faqsReplaceDefaults ? itSupportFaqs : defaultFaqs;
  const faqs = [...(currentPageData.faqs ?? []), ...faqFallbacks].slice(0, 5);
  const isItPage = currentPageData.serviceSet === 'it';
  const serviceCards = isItPage ? itServices : services;

  const whatsappLink = buildWhatsAppLink(
    `Hi Tafara, I came from your "${currentPageData.title}" page. I'd like to talk about a project.`
  );

  // -- Structured data ------------------------------------------------------
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: currentPageData.title,
    description: currentPageData.description,
    provider: personEntity,
    areaServed: currentPageData.location || (currentPageData.remote ? 'Worldwide (Remote)' : 'South Africa'),
    serviceType: currentPageData.subtitle,
    url: pageUrl
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Tafara Mutsvedu', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: currentPageData.title, item: pageUrl }
    ]
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
  const personSchema = { '@context': 'https://schema.org', ...personEntity };

  return (
    <>
      <SEO
        title={`${currentPageData.title} | ${NAME}`}
        description={currentPageData.description}
        canonical={canonicalUrl}
        keywords={`${currentPageData.keywords}, Tafara Mutsvedu, Mutsvedu Tafara, Tafara, Mutsvedu`}
        tags={[currentPageData.subtitle, currentPageData.location || 'Remote']}
        structuredData={[
          personSchema,
          serviceSchema,
          breadcrumbSchema,
          ...(showLongFormSections ? [faqSchema] : [])
        ]}
      />

      <div className="site-atmosphere relative min-h-screen overflow-hidden text-stone-900 dark:text-dark-text">
        {/* Top bar */}
        <header className="relative z-10 border-b border-stone-200/60 backdrop-blur-md dark:border-white/10">
          <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">
            <Link to="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
              {NAME}
            </Link>
            <div className="flex items-center gap-3 md:gap-5">
              <Link
                to="/"
                className="hidden text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white sm:inline"
              >
                Portfolio
              </Link>
              <a
                href="/#contact"
                className="hidden text-sm font-medium text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white sm:inline"
              >
                Contact
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="relative z-10">
          {/* Hero */}
          <section className="container mx-auto px-6 pb-14 pt-12 md:px-12 md:pb-20 md:pt-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2.5 border-l-2 border-sky-500 bg-white/50 py-1 pl-3 pr-4 text-xs font-medium uppercase tracking-[0.18em] text-stone-600 backdrop-blur dark:bg-white/[0.03] dark:text-dark-muted md:text-[13px]">
                  {currentPageData.location ? (
                    <MapPin size={14} className="text-sky-600 dark:text-sky-400" />
                  ) : (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500/60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                    </span>
                  )}
                  <span>{eyebrow}</span>
                </div>

                <h1 className="mt-5 text-4xl font-bold leading-[1.02] tracking-tight md:mt-7 md:text-6xl">
                  {currentPageData.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg font-semibold text-stone-700 dark:text-dark-text md:mt-5 md:text-2xl">
                  {currentPageData.subtitle}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-dark-muted md:mt-4 md:text-lg">
                  {currentPageData.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 md:mt-7">
                  {highlights.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-200/70 bg-white/60 py-1 pl-2.5 pr-3.5 text-xs font-medium text-stone-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-dark-text md:text-sm"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 md:mt-9">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-stone-700 dark:bg-white dark:text-gray-950 dark:hover:bg-white/90"
                  >
                    Start a project
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="/#projects"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/20 bg-white/60 px-6 py-3 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-dark-text dark:hover:bg-white/10"
                  >
                    View the main portfolio
                    <ArrowUpRight size={18} />
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-emerald-500"
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </a>
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/20 bg-white/60 px-6 py-3 text-sm font-semibold text-stone-900 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-dark-text dark:hover:bg-white/10"
                  >
                    <Phone size={18} />
                    Call Tafara
                  </a>
                </div>

                {audience === 'recruiter' && (
                  <a
                    href="/resume.pdf"
                    download="Tafara_Mutsvedu_Resume.pdf"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-950 dark:text-dark-muted dark:hover:text-white"
                  >
                    <Download size={16} />
                    Download my CV
                  </a>
                )}
              </div>

              <aside className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
                <div className="hero-portrait-frame relative aspect-[4/5] overflow-hidden bg-stone-300 dark:bg-dark-surface">
                  <OptimizedImage
                    src="/images/profile.webp"
                    alt="Tafara Mutsvedu"
                    className="h-full w-full"
                    objectFit="cover"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/55 to-transparent px-6 pb-6 pt-24 text-white">
                    <p className="text-lg font-bold">Tafara Mutsvedu</p>
                    <p className="mt-1 text-sm text-white/75">South Africa based. Working worldwide.</p>
                  </div>
                </div>
                <div className="relative mx-4 -mt-5 rounded-2xl border border-white/70 bg-white/90 p-5 shadow-[0_20px_60px_rgba(28,25,23,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-stone-950/90">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                    A practical fit
                  </p>
                  <ul className="mt-3 space-y-2">
                    {decisionPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-sm leading-relaxed text-stone-600 dark:text-dark-muted"
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>

          {showLongFormSections && currentPageData.marketHeading && (
            <section className="container mx-auto px-6 py-6 md:px-12 md:py-10">
              <div className="grid gap-6 rounded-3xl border border-stone-200/70 bg-white/70 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-dark-surface/60 md:grid-cols-[1.1fr_1fr] md:p-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Working in {currentPageData.location}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
                    {currentPageData.marketHeading}
                  </h2>
                  <p className="mt-3 leading-relaxed text-stone-600 dark:text-dark-muted">
                    {currentPageData.marketSummary}
                  </p>
                </div>
                <ul className="space-y-3">
                  {currentPageData.marketPoints?.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 rounded-xl border border-stone-200/70 bg-stone-50/80 p-4 text-sm text-stone-700 dark:border-white/10 dark:bg-white/5 dark:text-dark-text"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Services */}
          {showLongFormSections && <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {isItPage ? 'What I can help you with' : 'What I can build for you'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-dark-muted md:text-base">
              {isItPage
                ? 'One person for the everyday fixes and the bigger system behind them.'
                : 'One developer handles the public site and the tools behind it.'}
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-4">
              {serviceCards.map(({ icon: Icon, title, points }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-stone-200/70 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-dark-surface/60"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-dark-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold md:text-lg">{title}</h3>
                  <ul className="mt-2 space-y-1.5 text-sm text-stone-600 dark:text-dark-muted">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>}

          {/* Who this is for */}
          {showLongFormSections && <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <div className={`grid grid-cols-1 gap-3 md:gap-4 ${isItPage ? '' : 'lg:grid-cols-2'}`}>
              <div
                className={`rounded-2xl border p-6 backdrop-blur-xl md:p-8 ${
                  audience === 'recruiter'
                    ? 'order-2 border-stone-200/70 bg-white/70 dark:border-white/10 dark:bg-dark-surface/60'
                    : 'order-1 border-stone-900/10 bg-stone-900 text-white dark:border-white/10 dark:bg-white/5'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">For businesses</p>
                <h3 className="mt-2 text-xl font-bold md:text-2xl">
                  {isItPage
                    ? 'Tell me what is broken. I will tell you what it takes.'
                    : 'Get online, sell, and automate the busywork.'}
                </h3>
                <p className={`mt-3 text-sm leading-relaxed md:text-base ${audience === 'recruiter' ? 'text-stone-600 dark:text-dark-muted' : 'text-white/85'}`}>
                  {isItPage
                    ? "You do not need the right words for it. Describe the problem however it comes out, and I will work out what it is, what it costs, and whether you even need me for it."
                    : "Whether you're starting from nothing or fixing something that isn't working, I'll build it, automate it, and train your team to run it, so you're not stuck depending on me forever."}
                </p>
                <a
                  href="/#contact"
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${
                    audience === 'recruiter' ? 'text-stone-900 dark:text-white' : 'text-white'
                  }`}
                >
                  Tell me what you need
                  <ArrowRight size={16} />
                </a>
              </div>

              {!isItPage && <div
                className={`rounded-2xl border p-6 backdrop-blur-xl md:p-8 ${
                  audience === 'recruiter'
                    ? 'order-1 border-stone-900/10 bg-stone-900 text-white dark:border-white/10 dark:bg-white/5'
                    : 'order-2 border-stone-200/70 bg-white/70 dark:border-white/10 dark:bg-dark-surface/60'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">For recruiters</p>
                <h3 className="mt-2 text-xl font-bold md:text-2xl">Software engineer & data scientist, ready to hire.</h3>
                <p className={`mt-3 text-sm leading-relaxed md:text-base ${audience === 'recruiter' ? 'text-white/85' : 'text-stone-600 dark:text-dark-muted'}`}>
                  BSc Computer Science, shipping real client work in React, TypeScript, Python, data and AI. Open to
                  full-time and contract roles, local or remote.
                </p>
                <a
                  href="/resume.pdf"
                  download="Tafara_Mutsvedu_Resume.pdf"
                  className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${
                    audience === 'recruiter' ? 'text-white' : 'text-stone-900 dark:text-white'
                  }`}
                >
                  Download CV
                  <Download size={16} />
                </a>
              </div>}
            </div>
          </section>}

          {/* Proof */}
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Recent work</h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted md:text-base">
                  Real, live builds, not mock-ups.
                </p>
              </div>
              <Link
                to="/"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-stone-900 hover:opacity-80 dark:text-white sm:inline-flex"
              >
                See full portfolio
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 md:mt-8 md:gap-4">
              {proofProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-stone-200/70 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-dark-surface/60"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold md:text-lg">{project.title}</h3>
                    <ArrowUpRight className="h-5 w-5 text-stone-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stone-900 dark:group-hover:text-white" />
                  </div>
                  <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">{project.blurb}</p>
                </a>
              ))}
            </div>
          </section>

          {/* FAQ */}
          {showLongFormSections && <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Questions people usually ask</h2>
            <div className="mt-6 max-w-3xl divide-y divide-stone-200/70 overflow-hidden rounded-2xl border border-stone-200/70 bg-white/70 backdrop-blur-xl dark:divide-white/10 dark:border-white/10 dark:bg-dark-surface/60">
              {faqs.map((faq) => (
                <details key={faq.q} className="group px-5 py-4 md:px-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold md:text-base">
                    {faq.q}
                    <span className="text-stone-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-dark-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>}

          {/* CTA band */}
          {showLongFormSections && <section className="container mx-auto px-6 py-10 md:px-12 md:py-16">
            <div className="overflow-hidden rounded-3xl border border-stone-900/10 bg-stone-900 p-8 text-white dark:border-white/10 dark:bg-white/5 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
                  {isItPage ? 'Send me the problem.' : "Let's build the next one."}
                </h2>
                <p className="mt-3 text-sm text-white/80 md:text-lg">
                  {isItPage
                    ? "A WhatsApp or a call is enough to start. Describe it however it comes out, and I'll tell you straight what it takes, what it costs, or that you don't need me for it."
                    : "Tell me what you're trying to do, get online, sell, automate, or hire. I'll tell you straight if I'm the right fit."}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-white/90"
                  >
                    Start a project
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
                  >
                    <MessageCircle size={18} />
                    WhatsApp me
                  </a>
                </div>
              </div>
            </div>
          </section>}

          {/* Footer */}
          <footer className="border-t border-stone-200/60 dark:border-white/10">
            <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center md:px-12">
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  <Bot size={18} />
                  {NAME}
                </p>
                <p className="mt-1 text-sm text-stone-500 dark:text-dark-muted">{ROLE}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <Link to="/" className="text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white">
                  Portfolio
                </Link>
                <a
                  href="https://github.com/Tafaraa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white"
                >
                  LinkedIn
                </a>
                <a href="/#contact" className="text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-white">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default LocationLanding;
