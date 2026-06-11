import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowRight, MapPin, Code, Database, Brain } from 'lucide-react';
import SEO from '../../components/ui/SEO';
import { PageDataEntry } from '../../types';

const LocationLanding = () => {
  const { location } = useParams();
  const { pathname } = useLocation();

  // Extract the location from the pathname
  const bestDevLocation = pathname.match(/best-software-developer-([^/]+)/)?.[1];
  const regularDevLocation = pathname.match(/software-developer-([^/]+)/)?.[1];
  const remoteLocation = pathname.replace('/', ''); // For exact remote route matches
  const currentLocation = bestDevLocation || regularDevLocation || remoteLocation || location || '';

  const pageData: { [key: string]: PageDataEntry } = {
    // Location-specific pages
    'midrand': {
      title: 'Best Software Developer in Midrand',
      subtitle: 'Full-Stack Development & Data Science Solutions',
      description: 'Looking for a skilled software developer in Midrand? With expertise in React, Python, and Machine Learning, I deliver cutting-edge solutions for businesses in the heart of Gauteng.',
      location: 'Midrand, Gauteng',
      keywords: 'software developer midrand, full stack developer midrand, react developer midrand, python developer midrand, data scientist midrand',
    },
    'johannesburg': {
      title: 'Best Software Developer in Johannesburg',
      subtitle: 'Modern Web Applications & Data Solutions',
      description: 'Johannesburg-based software developer specializing in creating powerful web applications and data-driven solutions. Expert in React, Python, and Machine Learning.',
      location: 'Johannesburg, Gauteng',
      keywords: 'software developer johannesburg, full stack developer johannesburg, react developer johannesburg, python developer johannesburg',
    },
    'zimbabwe': {
      title: 'Best Software Developer in Zimbabwe',
      subtitle: 'Professional Software Solutions',
      description: 'Experienced software developer with roots in Zimbabwe, offering world-class development services. Specializing in web applications, data science, and machine learning solutions.',
      location: 'Zimbabwe',
      keywords: 'software developer zimbabwe, full stack developer zimbabwe, react developer zimbabwe, python developer zimbabwe',
    },
    'gauteng': {
      title: 'Professional Software Developer in Gauteng',
      subtitle: 'Enterprise Software Solutions',
      description: 'Gauteng-based software developer delivering high-quality software solutions. Expert in full-stack development, data science, and enterprise applications.',
      location: 'Gauteng, South Africa',
      keywords: 'software developer gauteng, full stack developer gauteng, react developer gauteng, python developer gauteng',
    },
    // Remote positions
    'remote-software-developer': {
      title: 'Remote Software Developer | Global Development Services',
      subtitle: 'Global Development Services',
      description: 'Professional remote software developer offering worldwide services. Experienced in remote collaboration, modern development practices, and delivering high-quality solutions.',
      remote: true,
      keywords: 'remote software developer, remote full stack developer, remote react developer, remote python developer',
    },
    'hire-remote-fullstack-developer': {
      title: 'Hire Remote Full-Stack Developer',
      subtitle: 'End-to-End Development Solutions',
      description: 'Looking to hire a remote full-stack developer? I offer comprehensive development services, from front-end to back-end, with expertise in modern technologies.',
      remote: true,
      keywords: 'hire remote full stack developer, remote full stack developer, remote react developer, remote python developer',
    },
    'remote-react-developer-usa': {
      title: 'Remote React Developer for USA',
      subtitle: 'React Development Services',
      description: 'Specialized React developer available for US-based companies. Extensive experience in building modern, responsive React applications with best practices.',
      remote: true,
      location: 'Available for US Companies',
      keywords: 'remote react developer usa, remote react developer, react developer usa, react developer',
    },
    'remote-developer-south-africa': {
      title: 'Remote Developer in South Africa',
      subtitle: 'Professional Development Services',
      description: 'South Africa-based remote developer offering professional software development services. Expert in modern web technologies and data-driven solutions.',
      remote: true,
      location: 'South Africa',
      keywords: 'remote developer south africa, remote developer, south africa developer, south africa software developer',
    },
    'remote-data-scientist-south-africa': {
      title: 'Remote Data Scientist in South Africa',
      subtitle: 'Data Science & Analytics Solutions',
      description: 'Professional data scientist based in South Africa, available for remote work. Specialized in machine learning, data analysis, and predictive modeling.',
      remote: true,
      location: 'South Africa',
      keywords: 'remote data scientist south africa, remote data scientist, south africa data scientist, south africa data analyst',
    },
    'react-developer-south-africa': {
      title: 'React Developer in South Africa',
      subtitle: 'Modern React Development',
      description: 'Expert React developer based in South Africa. Specialized in building modern, responsive, and scalable React applications.',
      location: 'South Africa',
      keywords: 'react developer south africa, react developer, south africa react developer, south africa software developer',
    },
    'fullstack-developer-south-africa': {
      title: 'Full-Stack Developer in South Africa',
      subtitle: 'Complete Development Solutions',
      description: 'Experienced full-stack developer in South Africa offering end-to-end development services. Expert in both front-end and back-end technologies.',
      location: 'South Africa',
      keywords: 'fullstack developer south africa, fullstack developer, south africa fullstack developer, south africa software developer',
    },
    'data-scientist-south-africa': {
      title: 'Data Scientist in South Africa',
      subtitle: 'Data Science & ML Solutions',
      description: 'Professional data scientist in South Africa specializing in machine learning, data analysis, and predictive modeling. Turning data into actionable insights.',
      location: 'South Africa',
      keywords: 'data scientist south africa, data scientist, south africa data scientist, south africa data analyst',
    },
    'ai-engineer': {
      title: 'AI Engineer | Artificial Intelligence Solutions',
      subtitle: 'AI-Powered Applications & Machine Learning',
      description: 'Expert AI Engineer specializing in artificial intelligence, machine learning, and AI-powered applications. Experience with TensorFlow.js, natural language processing, and computer vision.',
      keywords: 'ai engineer, artificial intelligence engineer, machine learning engineer, AI developer, TensorFlow.js developer, AI solutions, artificial intelligence solutions',
    },
    'data-engineer': {
      title: 'Data Engineer | Data Pipeline & Analytics Solutions',
      subtitle: 'Data Engineering & Infrastructure',
      description: 'Professional Data Engineer specializing in data pipeline design, ETL processes, data warehousing, and analytics infrastructure. Building scalable data solutions.',
      keywords: 'data engineer, data pipeline engineer, ETL developer, data warehousing, analytics engineer, data infrastructure, big data engineer',
    },
    'website-creation-services': {
      title: 'Website Creation Services | Custom Web Development',
      subtitle: 'Professional Website Development',
      description: 'Professional website creation services including custom web applications, e-commerce platforms, and business websites. Full-stack development with modern technologies.',
      keywords: 'website creation services, web development services, custom website development, e-commerce development, business website development, web application development',
    },
    'freelance-developer': {
      title: 'Freelance Developer | Available for Projects',
      subtitle: 'Flexible Development Services',
      description: 'Experienced freelance developer available for projects worldwide. Specializing in software development, data science, AI engineering, and website creation services.',
      keywords: 'freelance developer, freelance software developer, freelance data scientist, freelance AI engineer, contract developer, remote developer, project-based developer',
    },
    'hire-ai-engineer': {
      title: 'Hire AI Engineer | Artificial Intelligence Expertise',
      subtitle: 'AI Development Services',
      description: 'Looking to hire an AI Engineer? Expert in machine learning, natural language processing, computer vision, and AI-powered applications. Available for permanent and contract positions.',
      keywords: 'hire ai engineer, hire artificial intelligence engineer, hire machine learning engineer, AI engineer for hire, artificial intelligence consultant, AI development services',
    },
    'hire-data-engineer': {
      title: 'Hire Data Engineer | Data Infrastructure Expert',
      subtitle: 'Data Engineering Services',
      description: 'Looking to hire a Data Engineer? Expert in data pipeline design, ETL processes, data warehousing, and analytics infrastructure. Available for permanent and contract positions.',
      keywords: 'hire data engineer, hire data pipeline engineer, hire ETL developer, data engineering consultant, data infrastructure expert, big data engineer for hire',
    },
    'react-developer': {
      title: 'React Developer | Modern Front-End Development',
      subtitle: 'React & TypeScript Development',
      description: 'React developer building fast, responsive, and polished front-end experiences for business websites, dashboards, portals, and web applications.',
      keywords: 'react developer, react development services, typescript developer, frontend developer, react web applications',
    },
    'python-developer': {
      title: 'Python Developer | APIs, Automation & Data Tools',
      subtitle: 'Python Development Services',
      description: 'Python developer available for APIs, automation, data processing, analytics workflows, machine learning prototypes, and backend services.',
      keywords: 'python developer, python api developer, python automation, data tools developer, backend python developer',
    },
    'machine-learning-engineer': {
      title: 'Machine Learning Engineer | AI & Data Products',
      subtitle: 'Machine Learning & AI Development',
      description: 'Machine learning engineer building practical AI and data products, including model prototypes, analytics tools, NLP features, and intelligent web applications.',
      keywords: 'machine learning engineer, AI developer, machine learning developer, NLP developer, data science engineer',
    },
  };

  const formatLocation = (slug: string) =>
    slug
      .split('-')
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

  const fallbackPageData: PageDataEntry = {
    title: `Software Developer in ${formatLocation(currentLocation)}`,
    subtitle: 'Full-Stack Development & Data Solutions',
    description: `Software developer available for projects in ${formatLocation(currentLocation)} and remote teams. I build websites, dashboards, e-commerce systems, APIs, and AI/data tools with React, TypeScript, Python, and modern web technologies.`,
    location: formatLocation(currentLocation),
    keywords: `software developer ${currentLocation.replace(/-/g, ' ')}, full stack developer ${currentLocation.replace(/-/g, ' ')}, react developer ${currentLocation.replace(/-/g, ' ')}, python developer ${currentLocation.replace(/-/g, ' ')}`,
  };

  const currentPageData = pageData[currentLocation] || fallbackPageData;
  const canonicalUrl = pathname;
  const pageUrl = `https://mutsvedutafara.com${pathname}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: currentPageData.title,
    description: currentPageData.description,
    provider: {
      '@type': 'Person',
      name: 'Tafara Mutsvedu',
      url: 'https://mutsvedutafara.com'
    },
    areaServed: currentPageData.location || (currentPageData.remote ? 'Remote' : 'South Africa'),
    serviceType: currentPageData.subtitle,
    url: pageUrl
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mutsvedutafara.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: currentPageData.title,
        item: pageUrl
      }
    ]
  };

  return (
    <>
      <SEO 
        title={`${currentPageData.title} | Tafara Mutsvedu`}
        description={currentPageData.description}
        canonical={canonicalUrl}
        keywords={currentPageData.keywords}
        tags={[currentPageData.subtitle, currentPageData.location || 'Remote software development']}
        structuredData={[serviceSchema, breadcrumbSchema]}
      />
      <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 text-stone-50">
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <div className="space-y-16">
            {/* Header Section */}
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{currentPageData.title}</h1>
              <h2 className="text-2xl md:text-3xl text-stone-300 font-light">{currentPageData.subtitle}</h2>
              <p className="text-lg md:text-xl text-stone-400 leading-relaxed max-w-3xl">
                {currentPageData.description}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50">
                <Code className="w-8 h-8 mb-6 text-blue-400" />
                <h3 className="text-xl font-semibold mb-4">Software Development</h3>
                <ul className="space-y-3 text-stone-300">
                  <li>• Modern Web Applications</li>
                  <li>• Full-Stack Development</li>
                  <li>• React & TypeScript</li>
                  <li>• API Development</li>
                </ul>
              </div>

              <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50">
                <Database className="w-8 h-8 mb-6 text-emerald-400" />
                <h3 className="text-xl font-semibold mb-4">Data Engineering</h3>
                <ul className="space-y-3 text-stone-300">
                  <li>• Data Pipeline Design</li>
                  <li>• Database Architecture</li>
                  <li>• ETL Processes</li>
                  <li>• Data Warehousing</li>
                </ul>
              </div>

              <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50">
                <Brain className="w-8 h-8 mb-6 text-purple-400" />
                <h3 className="text-xl font-semibold mb-4">Machine Learning</h3>
                <ul className="space-y-3 text-stone-300">
                  <li>• Predictive Analytics</li>
                  <li>• Natural Language Processing</li>
                  <li>• Computer Vision</li>
                  <li>• Model Deployment</li>
                </ul>
              </div>
            </div>

            {/* Location & Remote Work Info */}
            <div className="space-y-8">
              {currentPageData.location && (
                <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-stone-300" />
                    <h3 className="text-xl font-semibold">Location</h3>
                  </div>
                  <p className="text-stone-300 text-lg">{currentPageData.location}</p>
                </div>
              )}

              {currentPageData.remote && (
                <div className="bg-stone-800/50 backdrop-blur-sm p-8 rounded-2xl border border-stone-700/50">
                  <h3 className="text-xl font-semibold mb-6">Remote Work Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-3 text-stone-300">
                      <li>• Global Time Zone Coverage</li>
                      <li>• Virtual Collaboration Tools</li>
                    </ul>
                    <ul className="space-y-3 text-stone-300">
                      <li>• Regular Progress Updates</li>
                      <li>• Clear Communication</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="flex justify-center pt-8">
              <Link 
                to="/"
                className="group relative inline-flex items-center gap-2 bg-stone-50 text-stone-900 px-8 py-4 rounded-xl font-medium hover:bg-stone-200 transition-all duration-300"
              >
                View Full Portfolio
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationLanding;
