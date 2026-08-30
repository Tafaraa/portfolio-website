import { PageDataEntry } from '../../types';

export const NAME = 'Tafara Mutsvedu';
export const ROLE = 'Software Engineer & Data Scientist, specialising in AI engineering';
export const SITE_URL = 'https://www.mutsvedutafara.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-v4.png`;

export { LANDING_ROUTES } from './routes';

// Mirrors the slug handling in the LocationLanding component: the two
// "software-developer-<place>" URL shapes collapse onto a bare place key, and
// everything else is the path with its leading slash removed.
export const resolvePageKey = (pathname: string): string => {
  const bestDev = pathname.match(/best-software-developer-([^/]+)/)?.[1];
  const regularDev = pathname.match(/software-developer-([^/]+)/)?.[1];
  return bestDev || regularDev || pathname.replace('/', '') || '';
};

export const formatLocation = (slug: string) =>
  slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const buildFallbackPageData = (currentLocation: string): PageDataEntry => ({
  title: `Software Engineer & Data Scientist in ${formatLocation(currentLocation)}`,
  subtitle: 'Web, AI and data, built for your business',
  description: `Software engineer and data scientist available in ${formatLocation(
    currentLocation
  )} and for remote teams. I build websites, online stores, AI workflows, dashboards and full-stack systems with React, TypeScript and Python.`,
  location: formatLocation(currentLocation),
  audience: 'both',
  keywords: `software engineer ${currentLocation.replace(/-/g, ' ')}, software developer ${currentLocation.replace(
    /-/g,
    ' '
  )}, data scientist ${currentLocation.replace(/-/g, ' ')}, ai engineer ${currentLocation.replace(/-/g, ' ')}`
});

export const getPageData = (pathname: string): PageDataEntry => {
  const key = resolvePageKey(pathname);
  return pageData[key] || buildFallbackPageData(key);
};

export const pageData: { [key: string]: PageDataEntry } = {
  // ---- Location pages -------------------------------------------------
  midrand: {
    title: 'Software Engineer & Data Scientist in Midrand',
    subtitle: 'Websites, AI workflows and data tools, built in Midrand',
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
    subtitle: 'Global-standard web, AI and data, built for Zimbabwean businesses',
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
      'Looking to hire a remote full-stack engineer? I ship from front-end to back-end, plus AI workflows and data tooling, with the communication to make remote actually work.',
    remote: true,
    audience: 'recruiter',
    keywords:
      'hire remote full stack developer, hire remote software engineer, remote full stack engineer, remote react developer, remote python developer'
  },
  'remote-react-developer-usa': {
    title: 'Remote React Developer for US Teams',
    subtitle: 'Modern React & TypeScript, US-friendly hours',
    description:
      'React developer available for US companies. Fast, responsive, well-tested React and TypeScript front-ends, plus AI features and data dashboards when you need them.',
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
      'Data scientist in South Africa available remotely. Machine learning, predictive modelling, analysis and dashboards that turn data into decisions, with AI engineering to ship it into real products.',
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
      'React developer in South Africa building fast, responsive and scalable front-ends for websites, dashboards and web apps, with AI features baked in where they help.',
    location: 'South Africa',
    audience: 'both',
    keywords:
      'react developer south africa, react engineer south africa, typescript developer south africa, frontend developer south africa'
  },
  'fullstack-developer-south-africa': {
    title: 'Full-Stack Developer in South Africa',
    subtitle: 'Front-end, back-end, AI and data, one person',
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
      'Data scientist working across machine learning, analysis and AI engineering. Models, predictive analytics and dashboards, built into real products, not left in a notebook.',
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
      'React developer building fast, responsive front-ends for business websites, dashboards, portals and web apps, with AI features and data views where they add value.',
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
      'Machine learning engineer building practical AI and data products, model prototypes, NLP and LLM features, analytics tools and intelligent web apps.',
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
    subtitle: 'AI that ships, not AI that stays in a demo',
    description:
      'AI engineer building LLM features, AI assistants, automations and machine learning into real products. I take AI from idea to something your business or users actually use every day.',
    audience: 'both',
    highlights: ['LLM & GenAI features', 'AI assistants & chatbots', 'Workflow automation', 'ML & data products'],
    keywords:
      'ai engineer, artificial intelligence engineer, llm engineer, generative ai engineer, machine learning engineer, ai developer, ai solutions',
    faqs: [
      {
        q: 'What kind of AI work do you actually do?',
        a: 'LLM and GenAI features, AI assistants and chatbots, document/data automation, and classic machine learning, always built into a product or workflow, not left as a demo.'
      },
      {
        q: 'Can you add AI to a product I already have?',
        a: 'Definitely. A lot of the work is layering AI onto an existing site, app or process (a smart assistant, automated admin, or an ML feature) without rebuilding everything.'
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
    subtitle: 'Figure out where AI actually helps, then build it',
    description:
      'AI consultant who also does the building. I help you find where AI and automation genuinely save time or make money, then set it up and train your team to run it.',
    audience: 'business',
    highlights: ['Where AI fits', 'Automation setup', 'Team training', 'No hype'],
    keywords:
      'ai consultant, ai consultant south africa, ai automation consultant, business ai consultant, ai strategy, ai for small business',
    faqs: [
      {
        q: "We're not technical, is AI even worth it for us?",
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
      'AI and automation for real businesses, not buzzwords. I set up the automations and AI assistants that cut admin, then train your team so it sticks. Get online, sell, and stop drowning in busywork.',
    audience: 'business',
    highlights: ['Cut admin time', 'AI assistants', 'Online & selling', 'Team trained'],
    keywords:
      'ai for business, ai automation for business, automation for small business, ai tools for business, digital transformation south africa'
  },
  'ai-chatbot-developer': {
    title: 'AI Chatbot Developer',
    subtitle: 'Assistants that answer, book and qualify, 24/7',
    description:
      'AI chatbot developer building smart assistants for websites and WhatsApp that answer questions, qualify leads and book appointments around the clock, connected to your real data.',
    audience: 'business',
    highlights: ['Website & WhatsApp bots', 'Lead qualifying', 'Booking flows', 'Connected to your data'],
    keywords:
      'ai chatbot developer, chatbot development, whatsapp chatbot, customer support chatbot, llm chatbot, ai assistant developer'
  },
  'llm-engineer': {
    title: 'LLM Engineer | Generative AI Features',
    subtitle: 'RAG, assistants and GenAI features that hold up',
    description:
      'LLM engineer building generative AI features such as assistants, retrieval (RAG), summarisation and automation, wired into products with the guardrails to run in production.',
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
      'Website creation for businesses: sharp, fast sites and online stores that show up on Google and actually bring in enquiries and sales, with room to add AI and automation as you grow.',
    audience: 'business',
    highlights: ['Business websites', 'Online stores', 'Local SEO', 'Room to scale'],
    keywords:
      'website creation services, web development services, custom website development, business website, ecommerce development, web application development'
  },
  'get-your-business-online': {
    title: 'Get Your Business Online',
    subtitle: 'From zero to a proper online presence',
    description:
      'New to the digital side of things? I get your business online properly, a site or store that looks legit, ranks on Google and brings in enquiries, then layer on payments, bookings and automation.',
    audience: 'business',
    highlights: ['Look legit online', 'Show up on Google', 'Take payments', 'Grow into automation'],
    keywords:
      'get your business online, small business website, online presence, digital presence, get online south africa, business website design',
    faqs: [
      {
        q: 'I have nothing yet, where do we even start?',
        a: "With a quick chat about what you do and who you serve. From there I'll get you a simple, sharp online presence and grow it as you grow. No jargon."
      }
    ]
  },
  'ecommerce-website-developer': {
    title: 'E-commerce Website Developer',
    subtitle: 'Sell online, storefront, payments and orders',
    description:
      'E-commerce developer building online stores with inventory, card payments, WhatsApp ordering and an admin dashboard to run it all. Everything you need to start taking money online.',
    audience: 'business',
    highlights: ['Storefront & inventory', 'Card payments', 'WhatsApp ordering', 'Admin dashboard'],
    keywords:
      'ecommerce website developer, online store developer, ecommerce south africa, shopify alternative, payfast integration, sell online'
  },
  usa: {
    title: 'Remote Software Developer for US Businesses',
    subtitle: 'Web apps, AI workflows and dashboards with clear USD pricing',
    description:
      'A South African software engineer for US companies that need focused delivery without adding another full agency. I build React products, internal tools, AI workflows and conversion-focused websites.',
    location: 'United States',
    remote: true,
    audience: 'business',
    highlights: ['USD planning ranges', 'Async delivery', 'React and TypeScript', 'Direct developer access'],
    keywords:
      'remote software developer usa, contract react developer usa, ai automation developer usa, offshore software developer south africa',
    marketHeading: 'Built for a practical remote engagement',
    marketSummary:
      'You work directly with the person designing and building the system. Scope, milestones and weekly decisions stay visible from the start.',
    marketPoints: [
      'Written updates that keep distributed teams moving',
      'Overlap planned around your US time zone',
      'USD proposals with hosting and monthly support shown separately'
    ]
  },
  europe: {
    title: 'Remote Software Developer for European Businesses',
    subtitle: 'Reliable web and automation delivery across European time zones',
    description:
      'Remote software development for European businesses that need a website, portal, dashboard or AI workflow. I work from South Africa with useful overlap into UK and European business hours.',
    location: 'Europe',
    remote: true,
    audience: 'business',
    highlights: ['EUR display option', 'CET and UK overlap', 'Privacy-aware builds', 'Clear handover'],
    keywords:
      'remote software developer europe, contract react developer europe, ai automation consultant europe, south african developer europe',
    marketHeading: 'A clean fit for European remote teams',
    marketSummary:
      'The work is structured for review, handover and long-term ownership. Privacy requirements and data boundaries are discussed before implementation.',
    marketPoints: [
      'Working hours that overlap with the UK, Ireland and Central Europe',
      'Interfaces prepared for multilingual content when required',
      'EUR planning display while the signed proposal remains in USD'
    ]
  },
  uae: {
    title: 'Software Developer for UAE Businesses',
    subtitle: 'Web platforms and automation for growing service businesses',
    description:
      'Remote software development for UAE businesses that need polished customer journeys and stronger internal systems. I build websites, booking flows, portals, dashboards and practical automations.',
    location: 'United Arab Emirates',
    remote: true,
    audience: 'business',
    highlights: ['Service business systems', 'Booking and payments', 'Mobile-first UX', 'Remote delivery'],
    keywords:
      'software developer uae, web developer dubai remote, ai automation consultant uae, custom business software uae',
    marketHeading: 'Useful for fast-moving service operations',
    marketSummary:
      'The strongest fit is a business that has demand but still relies on spreadsheets, inboxes and manual follow-up to deliver the work.',
    marketPoints: [
      'Lead, booking and payment journeys designed together',
      'Admin tools that reduce repeated customer service work',
      'English-first builds with multilingual support available'
    ]
  },
  'saudi-arabia': {
    title: 'AI Automation Developer for Saudi Businesses',
    subtitle: 'Practical automation, portals and dashboards for operations teams',
    description:
      'Remote AI automation and software development for Saudi businesses. I turn repeatable admin into reliable workflows and build the portals and dashboards teams need to manage the result.',
    location: 'Saudi Arabia',
    remote: true,
    audience: 'business',
    highlights: ['AI workflow design', 'Internal portals', 'Operations dashboards', 'Team handover'],
    keywords:
      'ai automation developer saudi arabia, software developer saudi arabia remote, business automation consultant saudi',
    marketHeading: 'Start with one costly workflow',
    marketSummary:
      'A focused first automation is easier to measure, safer to launch and clearer for the team than a broad AI transformation project.',
    marketPoints: [
      'Map the current process before choosing technology',
      'Keep human approval where mistakes carry real cost',
      'Document the workflow so your team can operate it'
    ]
  },
  qatar: {
    title: 'Software Developer for Qatar Businesses',
    subtitle: 'Customer platforms and internal tools built around real workflows',
    description:
      'Remote software development for Qatar-based service firms and operations teams. I build fast websites, client portals, dashboards and automations with direct communication throughout.',
    location: 'Qatar',
    remote: true,
    audience: 'business',
    highlights: ['Client portals', 'Reporting dashboards', 'Workflow automation', 'Direct communication'],
    keywords:
      'software developer qatar, remote web developer qatar, ai automation qatar, custom portal developer qatar',
    marketHeading: 'Good systems make service easier to deliver',
    marketSummary:
      'The goal is a simpler path from enquiry to delivery, with less status chasing and a clearer view of what the team needs to do next.',
    marketPoints: [
      'Client-facing journeys and internal workflow designed together',
      'Mobile-friendly tools for teams working across locations',
      'Hosting, maintenance and future improvements priced clearly'
    ]
  },
  mauritius: {
    title: 'Software Developer for Mauritius Businesses',
    subtitle: 'Web, data and automation with close time-zone overlap',
    description:
      'Software development for Mauritius businesses in professional services, tourism, retail and online commerce. I build customer websites, booking tools, dashboards and business automations remotely.',
    location: 'Mauritius',
    remote: true,
    audience: 'business',
    highlights: ['Close time-zone overlap', 'Booking systems', 'Business dashboards', 'E-commerce'],
    keywords:
      'software developer mauritius, web developer mauritius remote, ecommerce developer mauritius, ai automation mauritius',
    marketHeading: 'Regional delivery without a distant handoff',
    marketSummary:
      'South Africa and Mauritius share a workable day, which makes discovery, reviews and launch support straightforward.',
    marketPoints: [
      'Booking and enquiry flows for service and tourism businesses',
      'Dashboards that replace recurring spreadsheet reporting',
      'E-commerce and payment integrations scoped around your market'
    ]
  },
  botswana: {
    title: 'Software Developer for Botswana Businesses',
    subtitle: 'Websites and systems for regional growth',
    description:
      'Remote software development for Botswana businesses that want a stronger online presence and less manual admin. I build websites, portals, dashboards and automation with practical handover.',
    location: 'Botswana',
    remote: true,
    audience: 'business',
    highlights: ['Regional time zone', 'B2B lead systems', 'Admin portals', 'Team training'],
    keywords:
      'software developer botswana, web developer botswana, business automation botswana, custom software botswana',
    marketHeading: 'Designed for businesses growing beyond manual tools',
    marketSummary:
      'A solid first project should either bring in better enquiries or remove a repeated operational bottleneck. The calculator keeps those two goals easy to compare.',
    marketPoints: [
      'B2B websites that explain complex services clearly',
      'Internal portals for documents, clients and operational status',
      'Training and documentation included in the delivery plan'
    ]
  },
  namibia: {
    title: 'Software Developer for Namibia Businesses',
    subtitle: 'Digital tools for tourism, logistics and professional services',
    description:
      'Remote software development for Namibian businesses that need better lead generation, bookings or operational visibility. I build websites, portals, dashboards and connected workflows.',
    location: 'Namibia',
    remote: true,
    audience: 'business',
    highlights: ['Tourism and bookings', 'Operations tools', 'Fast business websites', 'Regional support'],
    keywords:
      'software developer namibia, web developer namibia, booking system developer namibia, business automation namibia',
    marketHeading: 'Make the customer journey and the back office agree',
    marketSummary:
      'A polished website is only useful when the enquiry, booking or request reaches a process the team can manage reliably.',
    marketPoints: [
      'Booking and enquiry flows designed for mobile visitors',
      'Operational dashboards for status, volume and follow-up',
      'Separate choices for hosting, maintenance and growth support'
    ]
  },
  'small-business-website': {
    title: 'Websites for Small Businesses',
    subtitle: 'Affordable, sharp and built to bring in work',
    description:
      'Websites for small businesses that punch above their weight: clean design, fast load, local SEO and clear calls to action, built to bring in enquiries, not just sit there.',
    audience: 'business',
    highlights: ['Clean & fast', 'Local SEO', 'Clear CTAs', 'Easy to update'],
    keywords:
      'small business website, affordable website design, website for small business south africa, local business website, startup website'
  },
  'freelance-developer': {
    title: 'Freelance Software Engineer & Data Scientist',
    subtitle: 'Available for projects worldwide',
    description:
      'Freelance software engineer and data scientist available for projects worldwide, websites, AI workflows, dashboards and full-stack systems, delivered without the agency overhead.',
    audience: 'both',
    keywords:
      'freelance developer, freelance software engineer, freelance data scientist, freelance ai engineer, contract developer, project-based developer'
  },

  // ---- IT support / everyday tech help --------------------------------
  // Written for people who do not search "software engineer". They search
  // "my email is not working", "someone to fix my spreadsheet", "IT guy near
  // me". Same person, same skills, language they actually use.
  'it-support-for-small-business': {
    title: 'IT Support for Small Businesses',
    subtitle: 'One person who sorts out the tech, in plain English',
    description:
      'IT support for small businesses that do not have an IT department. Email that will not work, spreadsheets that keep breaking, new staff to set up, files nobody can find. I fix the day-to-day tech and explain it without the jargon.',
    location: 'South Africa',
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Email problems', 'Spreadsheet help', 'Accounts & backups', 'No jargon'],
    keywords:
      'it support for small business, small business it support south africa, it support near me, it help for small business, outsourced it support, it services small business, computer help small business',
    marketHeading: 'The stuff that quietly costs you a whole morning',
    marketSummary:
      'Most small businesses do not need an IT department. They need one reliable person to call when something stops working, and someone who will explain what happened afterwards.',
    marketPoints: [
      'Email, accounts and file access sorted properly the first time',
      'Fixes explained in normal words, so you know what changed',
      'A standing person to call instead of asking a friend of a friend'
    ],
    faqs: [
      {
        q: 'What sort of problems do you actually help with?',
        a: "Email not sending or receiving, mail going to spam, setting up a business email address on your own domain, spreadsheets that have grown out of control, moving your files somewhere everyone can reach them, setting up a new employee's accounts, and getting off paper or WhatsApp and into something organised."
      },
      {
        q: 'We are only four people. Are we too small for you?',
        a: 'No. Small businesses are most of my work. A two-person operation with a broken inbox loses just as much time as a fifty-person one, and the fix is usually quicker and cheaper.'
      }
    ]
  },
  'best-it-specialist': {
    title: 'Looking for the Best IT Specialist?',
    subtitle: 'Someone who fixes it, explains it, and answers the phone',
    description:
      'Looking for a good IT specialist? I help businesses and individuals with email problems, spreadsheets, accounts, backups and getting organised systems in place, then explain it in plain English so it does not happen again.',
    location: 'South Africa',
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Email fixed', 'Spreadsheets sorted', 'Straight answers', 'Same-day where possible'],
    keywords:
      'best it specialist, it specialist near me, it specialist south africa, good it person, it technician, it expert for small business, it consultant south africa, computer specialist',
    marketHeading: 'What makes an IT person worth keeping',
    marketSummary:
      'Not the acronyms. It is whether they pick up, whether the problem stays fixed, and whether you understand what happened well enough to avoid it next time.',
    marketPoints: [
      'You get a straight answer, including when the answer is "you do not need me for this"',
      'The fix is written down, so you are not dependent on my memory',
      'The same person handles the small fixes and the bigger systems later'
    ],
    faqs: [
      {
        q: 'Are you an IT specialist or a software developer?',
        a: "Both, and that combination is usually the useful part. I fix the everyday things (email, accounts, spreadsheets, backups), and when a problem keeps coming back because a process is being held together by hand, I can build the system that actually solves it."
      },
      {
        q: 'Someone told me I need a whole IT company. Do I?',
        a: 'Usually not, at least not yet. Under about twenty people, one dependable person is normally faster, cheaper and easier to reach than a support desk with a ticket queue. I will tell you honestly if you have outgrown that.'
      }
    ]
  },
  'it-specialist-johannesburg': {
    title: 'IT Specialist in Johannesburg',
    subtitle: 'Email, spreadsheets and business systems, sorted',
    description:
      'IT specialist working with Johannesburg businesses on the everyday tech: email problems, spreadsheets, accounts, backups, and moving off manual admin onto a proper system. Remote for most things, in person around Gauteng when it needs hands.',
    location: 'Johannesburg, Gauteng',
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Joburg & Gauteng', 'Email problems', 'Spreadsheet help', 'Systems that stick'],
    keywords:
      'it specialist johannesburg, it support johannesburg, it services johannesburg, it company johannesburg small business, email support johannesburg, it technician johannesburg, computer support johannesburg',
    marketHeading: 'Local when it matters, remote when it is faster',
    marketSummary:
      'Most email and spreadsheet problems are solved faster over a screen share than by waiting half a day for someone to drive out. I work whichever way gets you back to work soonest.',
    marketPoints: [
      'Same-day remote help for anything stopping you from working',
      'On-site around Johannesburg and Gauteng when the job needs it',
      'Fixed quotes for the bigger jobs, before anything starts'
    ]
  },
  'it-support-midrand': {
    title: 'IT Support in Midrand',
    subtitle: 'A local person for the everyday tech problems',
    description:
      'IT support in Midrand and the surrounding Gauteng area. Business email setup and email problems, spreadsheet help, staff accounts, backups, and building the systems that replace all the manual admin.',
    location: 'Midrand, Gauteng',
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Based in Midrand', 'Email & accounts', 'Spreadsheet help', 'On-site available'],
    keywords:
      'it support midrand, it specialist midrand, it services midrand, computer support midrand, email setup midrand, it company midrand, tech support midrand gauteng',
    marketHeading: 'Based in Midrand, working across Gauteng',
    marketSummary:
      'Being nearby means a real conversation about how your business actually runs, not a ticket number and a script.',
    marketPoints: [
      'On-site visits around Midrand, Centurion, Sandton and Pretoria',
      'Remote support for anything that does not need hands on a machine',
      'Documented handover, so your team is not stuck waiting on me'
    ]
  },
  'computer-help-for-small-business': {
    title: 'Computer and Tech Help for Small Businesses',
    subtitle: 'Ask the question however it comes out. I will translate.',
    description:
      'Practical computer and tech help for small businesses and people who would rather not deal with any of it. Email, printers, files, spreadsheets, accounts, backups and passwords, sorted by someone who explains things without making you feel silly.',
    location: 'South Africa',
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['No silly questions', 'Plain English', 'Remote or on-site', 'Fixed properly'],
    keywords:
      'computer help for small business, tech help small business, computer support near me, help with computers, technology help for business owners, tech support for non technical people, someone to help with computer problems',
    marketHeading: 'You do not have to know what it is called',
    marketSummary:
      '"The thing where the emails come in has stopped" is a perfectly good description of the problem. Working out what it is called is my job, not yours.',
    marketPoints: [
      'Describe it in your own words, on the phone or over WhatsApp',
      'I tell you what is wrong and what it costs before doing anything',
      'You get a short written note afterwards, in normal language'
    ],
    faqs: [
      {
        q: 'I feel silly asking. Is this too basic?',
        a: "There is no such thing as too basic here. Half of what I get asked is something that takes five minutes once you know where to look, and nobody is born knowing where to look."
      },
      {
        q: 'Can you help me personally, not just my business?',
        a: 'Yes. Email, backups, passwords, a laptop that has become unusable, photos you are worried about losing. Same help, smaller scale.'
      }
    ]
  },

  // ---- Email ----------------------------------------------------------
  'fix-email-problems': {
    title: 'Email Not Working? Get It Fixed',
    subtitle: 'Not sending, not receiving, or going to the wrong place',
    description:
      'Email problems fixed properly: mail not sending or not arriving, messages landing in spam, a mailbox that has stopped syncing, or email that broke after a domain or provider change. I find the actual cause instead of guessing.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Not sending', 'Not receiving', 'Going to spam', 'Fixed remotely'],
    keywords:
      'fix email problems, email not working, email not sending, email not receiving, business email problems, email support south africa, someone to fix my email, email troubleshooting, email stopped working',
    marketHeading: 'Email breaks for a handful of boring reasons',
    marketSummary:
      'Almost every case comes down to DNS records, a mailbox that is full, a password or app change, or a domain that was moved without the mail settings following it. The trick is checking in the right order rather than changing things at random.',
    marketPoints: [
      'I check the records and the mailbox before touching any settings',
      'You get told what actually broke it, not just that it is working again',
      'Nothing gets changed on your domain without you knowing what and why'
    ],
    faqs: [
      {
        q: 'My email just stopped one day. Nobody changed anything.',
        a: "Something almost always changed, just not by you: a hosting or domain renewal lapsed, a provider tightened its rules, a password reset elsewhere, or a mailbox quietly filled up. That is normal, and it is usually quick to find once someone knows where to look."
      },
      {
        q: 'Do you need my password?',
        a: "Often not. A lot of it is checked from the outside using your domain's public records. Where access is genuinely needed, we do it with you present or on a temporary account, and you change the password afterwards."
      },
      {
        q: 'Can you fix it without moving me to a new provider?',
        a: 'Yes. Moving providers is a decision, not a fix. I will get the current setup working first, and only mention moving if the current one is genuinely the cause.'
      }
    ]
  },
  'business-email-setup': {
    title: 'Business Email Setup on Your Own Domain',
    subtitle: 'From yourname@gmail.com to yourname@yourbusiness.co.za',
    description:
      'Professional business email set up on your own domain, so you stop sending quotes from a Gmail or Hotmail address. Mailboxes for your team, working on phones and laptops, with the records in place so your mail actually arrives.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Your own domain', 'Works on phones', 'Nothing lost', 'Set up properly'],
    keywords:
      'business email setup, professional email address, company email setup, email on my own domain, set up business email south africa, custom domain email, google workspace setup, microsoft 365 email setup',
    marketHeading: 'A proper email address is the cheapest credibility you can buy',
    marketSummary:
      'Clients notice. A quote from info@yourbusiness.co.za reads differently to the same quote from a free address, and it costs very little to change.',
    marketPoints: [
      'Domain, mailboxes and the SPF, DKIM and DMARC records done together',
      'Your existing mail and contacts brought across, not abandoned',
      'Everyone set up on their phone and laptop before I call it done'
    ],
    faqs: [
      {
        q: 'Will I lose my old emails?',
        a: 'No. Existing mail and contacts get copied across before anything is switched over, and the old mailbox stays reachable until you are happy the new one is working.'
      },
      {
        q: 'Google Workspace or Microsoft 365, which one?',
        a: 'Whichever fits how you already work. If your team lives in Gmail and Google Sheets, Workspace is less disruption. If everything is Outlook, Word and Excel, go 365. Both are fine, and I will not push you to the more expensive one for its own sake.'
      },
      {
        q: 'I already have a domain from my website person. Does that work?',
        a: 'Yes, that is the normal situation. I just need access to where the domain is managed, and your website keeps working exactly as it does now.'
      }
    ]
  },
  'emails-going-to-spam': {
    title: 'Emails Going to Spam? Here Is the Fix',
    subtitle: 'Get your mail into the inbox, not the junk folder',
    description:
      'If your business email keeps landing in customers\u2019 spam folders, the cause is nearly always missing or wrong SPF, DKIM and DMARC records. I set them up correctly, check what your domain is sending, and get your mail delivering again.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['SPF, DKIM, DMARC', 'Delivery checked', 'Quotes that arrive', 'Fixed remotely'],
    keywords:
      'emails going to spam, email going to junk folder, business email in spam, email deliverability, spf dkim dmarc setup, why do my emails go to spam, fix email spam problem, email not reaching customers',
    marketHeading: 'You are losing work you never hear about',
    marketSummary:
      'When a quote lands in spam, the customer does not tell you it went to spam. They just go quiet, and you assume they went elsewhere.',
    marketPoints: [
      'Your domain checked against what the big providers actually test for',
      'SPF, DKIM and DMARC set up so your mail is trusted',
      'A simple explanation of what was wrong and what changed'
    ],
    faqs: [
      {
        q: 'It only happens with some customers. Why?',
        a: 'Different mail providers apply different rules. Gmail, Outlook and corporate filters all score mail slightly differently, so a domain with missing records often gets through in some places and gets binned in others. Fixing the records fixes it across the board.'
      },
      {
        q: 'What is SPF, DKIM and DMARC in plain English?',
        a: 'Three small entries on your domain that tell the world "these are the systems allowed to send email as us". Without them, a filter has no way to tell your quote apart from someone pretending to be you, so it plays it safe and hides it.'
      }
    ]
  },

  // ---- Spreadsheets and getting off them ------------------------------
  'excel-spreadsheet-help': {
    title: 'Excel and Spreadsheet Help',
    subtitle: 'Fix it, clean it up, and stop it breaking every month',
    description:
      'Help with Excel and Google Sheets: formulas that stopped working, files that have grown unmanageable, reports that take a whole day, and the monthly copy-and-paste routine nobody wants to do. Fixed, tidied and automated where it makes sense.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Broken formulas', 'Messy data cleaned', 'Reports automated', 'Excel & Sheets'],
    keywords:
      'excel help, excel spreadsheet help, google sheets help, spreadsheet expert, fix my spreadsheet, excel formula help, someone to help with excel, spreadsheet consultant south africa, excel automation',
    marketHeading: 'The spreadsheet is not the problem. The routine around it is.',
    marketSummary:
      'Most spreadsheet pain is not one broken formula. It is the two hours every month of exporting, pasting, checking and re-checking, which is exactly the part that can be automated.',
    marketPoints: [
      'Broken formulas and #REF errors traced and fixed, not patched over',
      'Messy data cleaned up so the numbers can be trusted',
      'The monthly routine automated so the report builds itself'
    ],
    faqs: [
      {
        q: 'My spreadsheet is a mess. Will you judge it?',
        a: "No. Every spreadsheet that has been useful for a few years looks like that. It grew because the business grew, which is a good sign, not a bad one."
      },
      {
        q: 'Can you work with Google Sheets as well as Excel?',
        a: 'Yes, both, and moving between them. Sheets is often the better home for anything more than one person touches, because you stop emailing versions around.'
      },
      {
        q: 'How do I send it to you safely?',
        a: 'Share the file or a copy with sensitive columns removed, whichever you prefer. If the data is confidential, I am happy to work on a copy with names stripped out.'
      }
    ]
  },
  'google-sheets-automation': {
    title: 'Google Sheets Automation',
    subtitle: 'Stop doing the same spreadsheet job every week',
    description:
      'Google Sheets automation for the reports and admin you rebuild by hand: pulling data in automatically, updating dashboards, sending the weekly summary, and connecting Sheets to the other tools you already use.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Reports that build themselves', 'Connected to your tools', 'Fewer manual errors', 'Hours back'],
    keywords:
      'google sheets automation, automate google sheets, google sheets expert, sheets apps script developer, automate spreadsheet reports, connect google sheets to, spreadsheet automation south africa',
    marketHeading: 'If you do it the same way every time, it can be automated',
    marketSummary:
      'The test is simple. If you could write down the steps for a new employee, the steps can be handed to a script instead, and the script does not forget a row.',
    marketPoints: [
      'Data pulled in automatically instead of exported and pasted',
      'Summaries and reports sent on a schedule, without anyone remembering',
      'Fewer copy-and-paste mistakes in the numbers people decide on'
    ]
  },
  'move-from-spreadsheets-to-a-system': {
    title: 'Move From Spreadsheets to a Proper System',
    subtitle: 'When the spreadsheet has quietly become the whole business',
    description:
      'Outgrown your spreadsheets? I move businesses off Excel and Google Sheets onto a proper system, keeping your data, your process and your language, so your team can work at the same time without breaking each other\u2019s work.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Nothing retyped', 'One version, everyone', 'Built around your process', 'Team trained'],
    keywords:
      'move from spreadsheets to a system, replace spreadsheets with software, spreadsheet to database, outgrown excel, excel to web application, spreadsheet to system migration, custom business system south africa, stop using spreadsheets',
    marketHeading: 'You will know when it is time',
    marketSummary:
      'Two people cannot edit it at once. Somebody keeps a private copy. Nobody is certain which file is current. The person who built it is the only one who understands it. That is the point where a spreadsheet has become a risk rather than a tool.',
    marketPoints: [
      'Your existing data comes across, nothing gets retyped by hand',
      'Built around how you already work, so it does not need re-learning',
      'Your team trained and given documentation, not left dependent on me'
    ],
    faqs: [
      {
        q: 'Do we have to change how we work?',
        a: "As little as possible. The aim is to keep your process and your wording, and take away the version confusion, the retyping and the fear of one wrong click. If I do suggest a change, it is because the current step exists only to work around the spreadsheet."
      },
      {
        q: 'What happens to years of history in the old files?',
        a: 'It comes with you. Historical data is imported and checked against the originals, and the old files stay exactly as they are as a backup.'
      },
      {
        q: 'Can we do it in stages?',
        a: 'Usually the best way. Start with the one sheet causing the most pain, run it alongside the old process until everyone trusts it, then move the next piece. Nothing has to happen in a single weekend.'
      },
      {
        q: 'What if you disappear afterwards?',
        a: "Then you must still be able to run it, which is why handover is part of the job rather than an extra. Your team gets training and written documentation, and you own the system and the data outright."
      }
    ]
  },
  'replace-spreadsheets-with-software': {
    title: 'Replace Spreadsheets With Software That Fits',
    subtitle: 'Custom, not off-the-shelf that almost works',
    description:
      'Replace the spreadsheets holding your business together with software built around your actual process. Shared access, no version confusion, proper records, and reporting that does not need a morning of copy-and-paste first.',
    location: 'South Africa',
    remote: true,
    audience: 'business',
    longForm: true,
    serviceSet: 'it',
    faqsReplaceDefaults: true,
    highlights: ['Built for your process', 'Shared, not emailed', 'Real reporting', 'You own it'],
    keywords:
      'replace spreadsheets with software, custom business software south africa, spreadsheet replacement system, internal business system, custom database application, small business management system, alternative to excel for business',
    marketHeading: 'Off-the-shelf or built for you',
    marketSummary:
      'If a standard package covers what you need, buy it, and I will say so. Custom earns its cost when your process is the thing that makes you competitive and every package would have you work around it.',
    marketPoints: [
      'An honest answer first on whether existing software already covers you',
      'Fixed quote and staged delivery, so you see it working as it is built',
      'You own the system and the data, with no lock-in to me'
    ]
  }
};
