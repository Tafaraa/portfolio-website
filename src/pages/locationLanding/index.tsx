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
  MapPin,
  MessageCircle,
  Sparkles,
  Workflow
} from 'lucide-react';
import SEO from '../../components/ui/SEO';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { LandingFaq, PageDataEntry } from '../../types';

// ---------------------------------------------------------------------------
// One consistent identity + voice across every landing page ("one language").
// ---------------------------------------------------------------------------
const NAME = 'Tafara Mutsvedu';
const ROLE = 'Software Engineer & Data Scientist — specialising in AI engineering';
const SITE_URL = 'https://mutsvedutafara.com';
const WHATSAPP_NUMBER_E164 = '27606249151';

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
    a: 'Both. A lot of my work now is AI engineering — LLM features, automations and chatbots — on top of websites, stores, dashboards and full-stack systems.'
  },
  {
    q: "Can you help if I'm starting from zero?",
    a: "That's honestly the best time to bring me in. I'll get you online, set up the tools, and train your team so you're not stuck depending on me forever."
  },
  {
    q: 'Are you open to full-time or contract roles?',
    a: "Yes — I'm open to full-time and contract work alongside client projects. Download the CV or send a message and let's talk."
  }
];

const LocationLanding = () => {
  const { location } = useParams();
  const { pathname } = useLocation();

  // Extract the location from the pathname
  const bestDevLocation = pathname.match(/best-software-developer-([^/]+)/)?.[1];
  const regularDevLocation = pathname.match(/software-developer-([^/]+)/)?.[1];
  const remoteLocation = pathname.replace('/', ''); // For exact remote route matches
  const currentLocation = bestDevLocation || regularDevLocation || remoteLocation || location || '';

  const pageData: { [key: string]: PageDataEntry } = {
    // ---- Location pages -------------------------------------------------
    midrand: {
      title: 'Software Engineer & Data Scientist in Midrand',
      subtitle: 'Websites, AI workflows and data tools — built in Midrand',
      description:
        'Based in Midrand and building the digital side of businesses across Gauteng: websites, online stores, AI workflows and data dashboards. Software engineering and data science, with a heavy focus on AI.',
      location: 'Midrand, Gauteng',
      audience: 'both',
      keywords:
        'software engineer midrand, software developer midrand, data scientist midrand, ai engineer midrand, web developer midrand, react developer midrand, python developer midrand'
    },
    johannesburg: {
      title: 'Software Engineer & Data Scientist in Johannesburg',
      subtitle: 'Web, AI and data work for Joburg businesses',
      description:
        'Johannesburg software engineer and data scientist building websites, online stores, AI workflows and dashboards. I help businesses get online, automate the admin, and make sense of their data.',
      location: 'Johannesburg, Gauteng',
      audience: 'both',
      keywords:
        'software engineer johannesburg, software developer johannesburg, data scientist johannesburg, ai engineer johannesburg, web developer johannesburg, react developer johannesburg'
    },
    zimbabwe: {
      title: 'Software Engineer & Data Scientist for Zimbabwe',
      subtitle: 'Global-standard web, AI and data — built for Zimbabwean businesses',
      description:
        'Zimbabwean software engineer and data scientist building websites, online stores, AI workflows and dashboards for businesses at home and abroad. Get online, sell, and automate the busywork.',
      location: 'Zimbabwe',
      audience: 'both',
      keywords:
        'software engineer zimbabwe, software developer zimbabwe, data scientist zimbabwe, ai engineer zimbabwe, web developer zimbabwe, ecommerce zimbabwe'
    },
    gauteng: {
      title: 'Software Engineer & Data Scientist in Gauteng',
      subtitle: 'Web, AI and data for businesses across Gauteng',
      description:
        'Gauteng-based software engineer and data scientist. I build websites, e-commerce, AI workflows and dashboards, then hand them over so your team can run them.',
      location: 'Gauteng, South Africa',
      audience: 'both',
      keywords:
        'software engineer gauteng, software developer gauteng, data scientist gauteng, ai engineer gauteng, web developer gauteng'
    },

    // ---- Remote / hire pages -------------------------------------------
    'remote-software-developer': {
      title: 'Remote Software Engineer & Data Scientist',
      subtitle: 'AI, web and data work for teams anywhere',
      description:
        'Remote software engineer and data scientist available worldwide. Clean communication, real delivery, and a strong focus on AI engineering, web apps and data products.',
      remote: true,
      audience: 'recruiter',
      keywords:
        'remote software engineer, remote software developer, remote data scientist, remote ai engineer, remote react developer, remote python developer'
    },
    'hire-remote-fullstack-developer': {
      title: 'Hire a Remote Full-Stack Engineer',
      subtitle: 'End-to-end: front-end, back-end, AI and data',
      description:
        'Looking to hire a remote full-stack engineer? I ship from front-end to back-end, plus AI workflows and data tooling — with the communication to make remote actually work.',
      remote: true,
      audience: 'recruiter',
      keywords:
        'hire remote full stack developer, hire remote software engineer, remote full stack engineer, remote react developer, remote python developer'
    },
    'remote-react-developer-usa': {
      title: 'Remote React Developer for US Teams',
      subtitle: 'Modern React & TypeScript, US-friendly hours',
      description:
        'React developer available for US companies. Fast, responsive, well-tested React and TypeScript front-ends — plus AI features and data dashboards when you need them.',
      remote: true,
      location: 'Available for US companies',
      audience: 'recruiter',
      keywords:
        'remote react developer usa, react developer usa, remote react engineer, react typescript developer, hire react developer'
    },
    'remote-developer-south-africa': {
      title: 'Remote Software Engineer in South Africa',
      subtitle: 'South Africa based, working worldwide',
      description:
        'South Africa-based remote software engineer and data scientist. Websites, AI workflows, dashboards and full-stack systems for local and international teams.',
      remote: true,
      location: 'South Africa',
      audience: 'both',
      keywords:
        'remote developer south africa, remote software engineer south africa, remote data scientist south africa, south africa developer'
    },
    'remote-data-scientist-south-africa': {
      title: 'Remote Data Scientist in South Africa',
      subtitle: 'Machine learning, analysis and dashboards',
      description:
        'Data scientist in South Africa available remotely. Machine learning, predictive modelling, analysis and dashboards that turn data into decisions — with AI engineering to ship it into real products.',
      remote: true,
      location: 'South Africa',
      audience: 'both',
      keywords:
        'remote data scientist south africa, data scientist south africa, machine learning south africa, ai engineer south africa, data analyst south africa'
    },

    // ---- Role pages -----------------------------------------------------
    'react-developer-south-africa': {
      title: 'React Developer in South Africa',
      subtitle: 'Modern, fast React & TypeScript front-ends',
      description:
        'React developer in South Africa building fast, responsive and scalable front-ends for websites, dashboards and web apps — with AI features baked in where they help.',
      location: 'South Africa',
      audience: 'both',
      keywords:
        'react developer south africa, react engineer south africa, typescript developer south africa, frontend developer south africa'
    },
    'fullstack-developer-south-africa': {
      title: 'Full-Stack Developer in South Africa',
      subtitle: 'Front-end, back-end, AI and data — one person',
      description:
        'Full-stack developer in South Africa handling the whole build: front-end, back-end, databases, AI workflows and data tooling. End-to-end, no hand-offs.',
      location: 'South Africa',
      audience: 'both',
      keywords:
        'fullstack developer south africa, full stack engineer south africa, react node developer, python developer south africa'
    },
    'data-scientist-south-africa': {
      title: 'Data Scientist in South Africa',
      subtitle: 'Machine learning, analysis and AI products',
      description:
        'Data scientist in South Africa specialising in machine learning, analysis and AI engineering. I build models and dashboards, then ship them into products people actually use.',
      location: 'South Africa',
      audience: 'both',
      keywords:
        'data scientist south africa, machine learning engineer south africa, ai engineer south africa, data analyst south africa'
    },
    'data-scientist': {
      title: 'Data Scientist | Machine Learning & AI',
      subtitle: 'From messy data to decisions and shipped products',
      description:
        'Data scientist working across machine learning, analysis and AI engineering. Models, predictive analytics and dashboards — built into real products, not left in a notebook.',
      audience: 'both',
      keywords:
        'data scientist, machine learning engineer, ai engineer, predictive analytics, data analysis, data science consultant'
    },
    'software-engineer': {
      title: 'Software Engineer | Web, AI & Data',
      subtitle: 'Full-stack engineering with an AI and data edge',
      description:
        'Software engineer building websites, web apps, AI workflows and data tools. Clean, maintainable code and systems that hold up in the real world.',
      audience: 'both',
      keywords:
        'software engineer, full stack software engineer, ai software engineer, web developer, react developer, python developer'
    },
    'react-developer': {
      title: 'React Developer | Modern Front-End Development',
      subtitle: 'React & TypeScript that feels fast and polished',
      description:
        'React developer building fast, responsive front-ends for business websites, dashboards, portals and web apps — with AI features and data views where they add value.',
      audience: 'both',
      keywords:
        'react developer, react engineer, typescript developer, frontend developer, react web applications'
    },
    'python-developer': {
      title: 'Python Developer | APIs, Automation & AI',
      subtitle: 'Back-ends, automation, data and AI in Python',
      description:
        'Python developer for APIs, automation, data pipelines, machine learning and AI features. The engine-room work that makes products and workflows run.',
      audience: 'both',
      keywords:
        'python developer, python api developer, python automation, ai python developer, data engineer python, backend python developer'
    },
    'machine-learning-engineer': {
      title: 'Machine Learning Engineer | AI & Data Products',
      subtitle: 'Models and AI features shipped into real products',
      description:
        'Machine learning engineer building practical AI and data products — model prototypes, NLP and LLM features, analytics tools and intelligent web apps.',
      audience: 'both',
      keywords:
        'machine learning engineer, ml engineer, ai engineer, nlp developer, llm engineer, data science engineer'
    },
    'data-engineer': {
      title: 'Data Engineer | Pipelines & Analytics Infrastructure',
      subtitle: 'Pipelines, ETL and data that stays reliable',
      description:
        'Data engineer building pipelines, ETL, warehousing and analytics infrastructure so your data is clean, reliable and ready for dashboards and AI.',
      audience: 'both',
      keywords:
        'data engineer, data pipeline engineer, etl developer, data warehousing, analytics engineer, data infrastructure'
    },
    'hire-data-engineer': {
      title: 'Hire a Data Engineer',
      subtitle: 'Reliable pipelines and analytics-ready data',
      description:
        'Hiring a data engineer? Expert in pipelines, ETL, warehousing and analytics infrastructure. Available for permanent and contract work, local or remote.',
      audience: 'recruiter',
      keywords:
        'hire data engineer, hire etl developer, data engineering consultant, data infrastructure expert, big data engineer for hire'
    },

    // ---- AI-focused pages ----------------------------------------------
    'ai-engineer': {
      title: 'AI Engineer | LLMs, Automation & AI Products',
      subtitle: 'AI that ships — not AI that stays in a demo',
      description:
        'AI engineer building LLM features, AI assistants, automations and machine learning into real products. I take AI from idea to something your business or users actually use every day.',
      audience: 'both',
      highlights: ['LLM & GenAI features', 'AI assistants & chatbots', 'Workflow automation', 'ML & data products'],
      keywords:
        'ai engineer, artificial intelligence engineer, llm engineer, generative ai engineer, machine learning engineer, ai developer, ai solutions',
      faqs: [
        {
          q: 'What kind of AI work do you actually do?',
          a: 'LLM and GenAI features, AI assistants and chatbots, document/data automation, and classic machine learning — always built into a product or workflow, not left as a demo.'
        },
        {
          q: 'Can you add AI to a product I already have?',
          a: 'Definitely. A lot of the work is layering AI onto an existing site, app or process — a smart assistant, automated admin, or an ML feature — without rebuilding everything.'
        }
      ]
    },
    'hire-ai-engineer': {
      title: 'Hire an AI Engineer',
      subtitle: 'LLMs, automation and machine learning, shipped',
      description:
        'Hiring an AI engineer? I build LLM and GenAI features, AI assistants, automation and machine learning into products that ship. Available for permanent and contract roles, local or remote.',
      audience: 'recruiter',
      highlights: ['LLM / GenAI', 'AI assistants', 'Automation', 'Machine learning'],
      keywords:
        'hire ai engineer, hire llm engineer, hire generative ai engineer, ai engineer for hire, ai consultant, machine learning engineer for hire'
    },
    'ai-consultant': {
      title: 'AI Consultant for Business',
      subtitle: 'Figure out where AI actually helps — then build it',
      description:
        'AI consultant who also does the building. I help you find where AI and automation genuinely save time or make money, then set it up and train your team to run it.',
      audience: 'business',
      highlights: ['Where AI fits', 'Automation setup', 'Team training', 'No hype'],
      keywords:
        'ai consultant, ai consultant south africa, ai automation consultant, business ai consultant, ai strategy, ai for small business',
      faqs: [
        {
          q: "We're not technical — is AI even worth it for us?",
          a: "Often yes, and often smaller than you'd think. I'll point out the boring, repetitive stuff AI can quietly take off your plate, and I'll be honest when it's not worth it."
        }
      ]
    },
    'ai-workflow-automation': {
      title: 'AI Workflow Automation',
      subtitle: 'Let the boring admin run itself',
      description:
        'AI workflow automation that handles quotes, bookings, follow-ups, data entry and reporting in the background. Hook up the tools you already use and stop doing the repetitive stuff by hand.',
      audience: 'business',
      highlights: ['Automated admin', 'Tool integrations', 'AI assistants', 'Custom workflows'],
      keywords:
        'ai workflow automation, business process automation, workflow automation south africa, ai automation, zapier alternative, automate admin work',
      faqs: [
        {
          q: 'What can actually be automated?',
          a: 'Quotes and invoices, bookings and reminders, lead follow-ups, data entry between tools, reports, and a lot of inbox/admin work. If you do it the same way every time, it can usually be automated.'
        }
      ]
    },
    'ai-automation-for-business': {
      title: 'AI & Automation for Business',
      subtitle: 'Practical AI that saves your team hours',
      description:
        'AI and automation for real businesses — not buzzwords. I set up the automations and AI assistants that cut admin, then train your team so it sticks. Get online, sell, and stop drowning in busywork.',
      audience: 'business',
      highlights: ['Cut admin time', 'AI assistants', 'Online & selling', 'Team trained'],
      keywords:
        'ai for business, ai automation for business, automation for small business, ai tools for business, digital transformation south africa'
    },
    'ai-chatbot-developer': {
      title: 'AI Chatbot Developer',
      subtitle: 'Assistants that answer, book and qualify — 24/7',
      description:
        'AI chatbot developer building smart assistants for websites and WhatsApp that answer questions, qualify leads and book appointments around the clock — connected to your real data.',
      audience: 'business',
      highlights: ['Website & WhatsApp bots', 'Lead qualifying', 'Booking flows', 'Connected to your data'],
      keywords:
        'ai chatbot developer, chatbot development, whatsapp chatbot, customer support chatbot, llm chatbot, ai assistant developer'
    },
    'llm-engineer': {
      title: 'LLM Engineer | Generative AI Features',
      subtitle: 'RAG, assistants and GenAI features that hold up',
      description:
        'LLM engineer building generative AI features — assistants, retrieval (RAG), summarisation and automation — wired into products with the guardrails to run in production.',
      audience: 'recruiter',
      highlights: ['LLM apps & RAG', 'AI assistants', 'Prompt & eval', 'Production-ready'],
      keywords:
        'llm engineer, generative ai engineer, rag developer, ai application developer, genai engineer, prompt engineer'
    },

    // ---- Client / business pages ---------------------------------------
    'website-creation-services': {
      title: 'Website Creation Services',
      subtitle: 'Websites and stores that bring in real enquiries',
      description:
        'Website creation for businesses: sharp, fast sites and online stores that show up on Google and actually bring in enquiries and sales — with room to add AI and automation as you grow.',
      audience: 'business',
      highlights: ['Business websites', 'Online stores', 'Local SEO', 'Room to scale'],
      keywords:
        'website creation services, web development services, custom website development, business website, ecommerce development, web application development'
    },
    'get-your-business-online': {
      title: 'Get Your Business Online',
      subtitle: 'From zero to a proper online presence',
      description:
        'New to the digital side of things? I get your business online properly — a site or store that looks legit, ranks on Google and brings in enquiries — then layer on payments, bookings and automation.',
      audience: 'business',
      highlights: ['Look legit online', 'Show up on Google', 'Take payments', 'Grow into automation'],
      keywords:
        'get your business online, small business website, online presence, digital presence, get online south africa, business website design',
      faqs: [
        {
          q: 'I have nothing yet — where do we even start?',
          a: "With a quick chat about what you do and who you serve. From there I'll get you a simple, sharp online presence and grow it as you grow. No jargon."
        }
      ]
    },
    'ecommerce-website-developer': {
      title: 'E-commerce Website Developer',
      subtitle: 'Sell online — storefront, payments and orders',
      description:
        'E-commerce developer building online stores with inventory, card payments, WhatsApp ordering and an admin dashboard to run it all. Everything you need to start taking money online.',
      audience: 'business',
      highlights: ['Storefront & inventory', 'Card payments', 'WhatsApp ordering', 'Admin dashboard'],
      keywords:
        'ecommerce website developer, online store developer, ecommerce south africa, shopify alternative, payfast integration, sell online'
    },
    'small-business-website': {
      title: 'Websites for Small Businesses',
      subtitle: 'Affordable, sharp and built to bring in work',
      description:
        'Websites for small businesses that punch above their weight: clean design, fast load, local SEO and clear calls to action — built to bring in enquiries, not just sit there.',
      audience: 'business',
      highlights: ['Clean & fast', 'Local SEO', 'Clear CTAs', 'Easy to update'],
      keywords:
        'small business website, affordable website design, website for small business south africa, local business website, startup website'
    },
    'freelance-developer': {
      title: 'Freelance Software Engineer & Data Scientist',
      subtitle: 'Available for projects worldwide',
      description:
        'Freelance software engineer and data scientist available for projects worldwide — websites, AI workflows, dashboards and full-stack systems, delivered without the agency overhead.',
      audience: 'both',
      keywords:
        'freelance developer, freelance software engineer, freelance data scientist, freelance ai engineer, contract developer, project-based developer'
    }
  };

  const formatLocation = (slug: string) =>
    slug
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

  const fallbackPageData: PageDataEntry = {
    title: `Software Engineer & Data Scientist in ${formatLocation(currentLocation)}`,
    subtitle: 'Web, AI and data — built for your business',
    description: `Software engineer and data scientist available in ${formatLocation(
      currentLocation
    )} and for remote teams. I build websites, online stores, AI workflows, dashboards and full-stack systems with React, TypeScript and Python.`,
    location: formatLocation(currentLocation),
    audience: 'both',
    keywords: `software engineer ${currentLocation.replace(/-/g, ' ')}, software developer ${currentLocation.replace(
      /-/g,
      ' '
    )}, data scientist ${currentLocation.replace(/-/g, ' ')}, ai engineer ${currentLocation.replace(/-/g, ' ')}`
  };

  const currentPageData = pageData[currentLocation] || fallbackPageData;
  const canonicalUrl = pathname;
  const pageUrl = `${SITE_URL}${pathname}`;
  const audience = currentPageData.audience ?? 'both';
  const eyebrow =
    currentPageData.eyebrow ||
    (currentPageData.location ? `${ROLE} • ${currentPageData.location}` : currentPageData.remote ? `${ROLE} • Remote` : ROLE);
  const highlights =
    currentPageData.highlights && currentPageData.highlights.length > 0
      ? currentPageData.highlights
      : ['AI workflows', 'Websites & e-commerce', 'Dashboards & data', 'Full-stack systems'];
  const faqs = [...(currentPageData.faqs ?? []), ...defaultFaqs].slice(0, 5);

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
        structuredData={[personSchema, serviceSchema, breadcrumbSchema, faqSchema]}
      />

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900 dark:from-dark-bg dark:to-dark-surface dark:text-dark-text">
        {/* Ambient gradient blobs */}
        <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/20 via-emerald-400/15 to-blue-400/15 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/15 via-rose-400/10 to-amber-300/15 blur-3xl" />

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
          <section className="container mx-auto px-6 pt-14 pb-10 md:px-12 md:pt-24 md:pb-16">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200/70 bg-white/70 px-4 py-1.5 text-xs font-medium text-stone-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-dark-text md:text-sm">
                {currentPageData.location ? <MapPin size={14} /> : <Sparkles size={14} />}
                <span>{eyebrow}</span>
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:mt-7 md:text-6xl">
                {currentPageData.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg font-medium text-stone-700 dark:text-dark-text md:mt-5 md:text-2xl">
                {currentPageData.subtitle}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 dark:text-dark-muted md:mt-4 md:text-lg">
                {currentPageData.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2 md:mt-7">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-200/70 bg-white/60 px-3 py-1 text-xs font-medium text-stone-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-dark-text md:text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-9">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-gray-950 dark:hover:bg-white/90"
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
                  Chat on WhatsApp
                </a>
                <a
                  href="/resume.pdf"
                  download="Tafara_Mutsvedu_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-900/20 px-6 py-3 text-sm font-medium text-stone-900 transition-colors hover:bg-stone-900 hover:text-white dark:border-white/20 dark:text-dark-text dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <Download size={18} />
                  Download CV
                </a>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">What I can build for you</h2>
            <p className="mt-2 max-w-2xl text-sm text-stone-600 dark:text-dark-muted md:text-base">
              Same person, whole stack — from the website out front to the AI quietly working in the back.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-8 md:gap-4 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, points }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-stone-200/70 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-gray-950/40"
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
          </section>

          {/* Who this is for */}
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <div className="grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2">
              <div
                className={`rounded-2xl border p-6 backdrop-blur-xl md:p-8 ${
                  audience === 'recruiter'
                    ? 'order-2 border-stone-200/70 bg-white/70 dark:border-white/10 dark:bg-gray-950/40'
                    : 'order-1 border-stone-900/10 bg-stone-900 text-white dark:border-white/10 dark:bg-white/5'
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] opacity-70">For businesses</p>
                <h3 className="mt-2 text-xl font-bold md:text-2xl">Get online, sell, and automate the busywork.</h3>
                <p className={`mt-3 text-sm leading-relaxed md:text-base ${audience === 'recruiter' ? 'text-stone-600 dark:text-dark-muted' : 'text-white/85'}`}>
                  Whether you're starting from nothing or fixing something that isn't working, I'll build it, automate it,
                  and train your team to run it — so you're not stuck depending on me forever.
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

              <div
                className={`rounded-2xl border p-6 backdrop-blur-xl md:p-8 ${
                  audience === 'recruiter'
                    ? 'order-1 border-stone-900/10 bg-stone-900 text-white dark:border-white/10 dark:bg-white/5'
                    : 'order-2 border-stone-200/70 bg-white/70 dark:border-white/10 dark:bg-gray-950/40'
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
              </div>
            </div>
          </section>

          {/* Proof */}
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Recent work</h2>
                <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted md:text-base">
                  Real, live builds — not mock-ups.
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
                  className="group rounded-2xl border border-stone-200/70 bg-white/70 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-gray-950/40"
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
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-14">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Questions people usually ask</h2>
            <div className="mt-6 max-w-3xl divide-y divide-stone-200/70 overflow-hidden rounded-2xl border border-stone-200/70 bg-white/70 backdrop-blur-xl dark:divide-white/10 dark:border-white/10 dark:bg-gray-950/40">
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
          </section>

          {/* CTA band */}
          <section className="container mx-auto px-6 py-10 md:px-12 md:py-16">
            <div className="overflow-hidden rounded-3xl border border-stone-900/10 bg-stone-900 p-8 text-white dark:border-white/10 dark:bg-white/5 md:p-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold tracking-tight md:text-4xl">Let's build the next one.</h2>
                <p className="mt-3 text-sm text-white/80 md:text-lg">
                  Tell me what you're trying to do — get online, sell, automate, or hire. I'll tell you straight if I'm
                  the right fit.
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
          </section>

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
