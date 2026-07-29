import { useEffect, useState, useRef, lazy, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SectionSkeleton from './components/ui/SectionSkeleton';
import CookieConsent from './components/ui/CookieConsent';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SEO from './components/ui/SEO';
import { ThemeProvider } from './contexts/ThemeContext';
import { ArrowUp } from 'lucide-react';
import JulieChatWidget from './components/ui/JulieChatWidget';

// Lazy load non-critical components
const About = lazy(() => import('./pages/about'));
const Projects = lazy(() => import('./pages/projects'));
const Contact = lazy(() => import('./pages/contact'));
const LocationLanding = lazy(() => import('./pages/locationLanding'));
const Hero = lazy(() => import('./pages/home'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const NotFound = lazy(() => import('./pages/notFound'));
const DashboardHandoff = lazy(() => import('./components/ui/DashboardHandoff'));

const MainLayout = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
        }
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${e.clientX - 2}px, ${e.clientY - 2}px, 0)`;
        }
      });
    };

    const updateCurrentSection = () => {
      const sections = ['projects', 'about', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > window.innerHeight);
      updateCurrentSection();
    };

    // Initialize cursor position off-screen
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(-100px, -100px, 0)`;
    }
    if (dotRef.current) {
      dotRef.current.style.transform = `translate3d(-100px, -100px, 0)`;
    }

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('scroll', handleScroll);

    const showCursor = () => {
      const cursor = document.querySelector('.custom-cursor');
      const dot = document.querySelector('.cursor-dot');
      if (cursor && dot) {
        cursor.classList.add('opacity-100');
        dot.classList.add('opacity-100');
      }
    };
    window.addEventListener('mousemove', showCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', showCursor);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-dark-bg dark:to-dark-surface text-stone-900 dark:text-dark-text font-sans section-${currentSection} main-portfolio`}>
      <SEO
        title="Tafara Mutsvedu | Software Engineer, AI and Data Systems"
        description="South African software engineer building production software, intelligent automation and decision ready data systems for businesses that need reliable execution."
        keywords="Tafara Mutsvedu, software engineer South Africa, production software engineer, AI systems engineer, data systems engineer, intelligent automation, business process automation, custom business software, operational software, AI workflow automation, data engineering South Africa, React developer Johannesburg, Python developer South Africa, machine learning engineer, full stack developer Gauteng, software consultant, contract software engineer, remote software engineer, dashboard development, web application development, ecommerce systems, team training, Tafara, Mutsvedu"
        canonical="/"
        tags={["software development", "data science", "machine learning", "AI engineering", "data engineering", "website creation services", "React", "Python", "South Africa", "Midrand", "Johannesburg", "freelance", "permanent jobs", "AI applications", "e-commerce development"]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://www.mutsvedutafara.com/#person',
            name: 'Tafara Mutsvedu',
            alternateName: ['Mutsvedu Tafara', 'Tafara'],
            givenName: 'Tafara',
            familyName: 'Mutsvedu',
            url: 'https://www.mutsvedutafara.com',
            image: 'https://www.mutsvedutafara.com/images/profile.webp',
            jobTitle: ['Software Engineer', 'Data Scientist', 'AI Engineer'],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Midrand',
              addressRegion: 'Gauteng',
              addressCountry: 'ZA'
            },
            sameAs: [
              'https://github.com/Tafaraa',
              'https://www.linkedin.com/in/tafara-mutsvedu-93825621b'
            ],
            knowsAbout: [
              'React',
              'TypeScript',
              'Python',
              'Data Science',
              'Machine Learning',
              'AI Workflow Automation',
              'Business Process Automation',
              'E-commerce Development',
              'Dashboard Development'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Tafara Mutsvedu Software Development',
            url: 'https://www.mutsvedutafara.com',
            areaServed: ['South Africa', 'Zimbabwe', 'Remote'],
            serviceType: [
              'Website and online store development',
              'AI workflow and business process automation',
              'Team training and system handover',
              'Dashboard and data analytics development',
              'E-commerce and payment integration',
              'SEO, performance and UX improvement'
            ],
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'What Tafara can do for your business',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Get your business online',
                    description:
                      'A website or online store that looks legit, ranks on Google, and brings in real enquiries.'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'AI workflows and automation',
                    description:
                      'Automations and chatbots that handle quotes, bookings, follow-ups and admin in the background.'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Team training and handover',
                    description:
                      'Setup plus a proper walkthrough and docs so your team can run the system without depending on the developer.'
                  }
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Dashboards and data',
                    description:
                      'Dashboards and reporting that make business decisions based on numbers instead of gut feel.'
                  }
                }
              ]
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Tafara Mutsvedu',
            alternateName: ['Tafara Mutsvedu Portfolio', 'Mutsvedu Tafara', 'Tafara Mutsvedu Developer'],
            url: 'https://www.mutsvedutafara.com',
            description: 'Official site of Tafara Mutsvedu, software engineer specialising in production software, intelligent automation and decision ready data systems.',
            author: { '@id': 'https://www.mutsvedutafara.com/#person' },
            publisher: { '@id': 'https://www.mutsvedutafara.com/#person' }
          }
        ]}
      />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<SectionSkeleton cards={0} />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton cards={3} />}>
          <Projects />
          <Contact />
        </Suspense>
      </main>
      <Footer />
      
      <div
        ref={cursorRef}
        className="custom-cursor opacity-0 transition-opacity duration-300 hidden md:block"
      />
      <div
        ref={dotRef}
        className="cursor-dot opacity-0 transition-opacity duration-300 hidden md:block"
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 bg-stone-900/60 dark:bg-dark-surface/80 backdrop-blur-sm text-stone-50 dark:text-dark-text p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-stone-900 dark:hover:bg-dark-border focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent ${
          showScrollButton ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <ArrowUp size={24} aria-hidden="true" />
      </button>

      <JulieChatWidget />
    </div>
  );
};

// Reusable loading component for lazy-loaded routes
const LazyLoadingFallback = () => <SectionSkeleton fullPage cards={3} />;

// Wrapper for lazy-loaded components
const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LazyLoadingFallback />}>
    {children}
  </Suspense>
);

const LANDING_ROUTES = [
  '/best-software-developer-midrand',
  '/best-software-developer-johannesburg',
  '/best-software-developer-zimbabwe',
  '/software-developer-gauteng',
  '/software-developer-pretoria',
  '/software-developer-cape-town',
  '/software-developer-durban',
  '/software-developer-usa',
  '/software-developer-europe',
  '/software-developer-uae',
  '/software-developer-saudi-arabia',
  '/software-developer-qatar',
  '/software-developer-mauritius',
  '/software-developer-botswana',
  '/software-developer-namibia',
  '/remote-software-developer',
  '/hire-remote-fullstack-developer',
  '/remote-react-developer-usa',
  '/remote-developer-south-africa',
  '/remote-data-scientist-south-africa',
  '/react-developer-south-africa',
  '/fullstack-developer-south-africa',
  '/data-scientist-south-africa',
  '/ai-engineer',
  '/data-engineer',
  '/website-creation-services',
  '/freelance-developer',
  '/hire-ai-engineer',
  '/hire-data-engineer',
  '/react-developer',
  '/python-developer',
  '/machine-learning-engineer',
  '/software-engineer',
  '/data-scientist',
  '/ai-consultant',
  '/ai-workflow-automation',
  '/ai-automation-for-business',
  '/ai-chatbot-developer',
  '/llm-engineer',
  '/get-your-business-online',
  '/ecommerce-website-developer',
  '/small-business-website'
] as const;

function App() {
  useEffect(() => {
    // Tell the HTML intro loader the app shell has mounted. The loader still
    // honours its own minimum on-screen time before it fades out.
    (window as unknown as { __appReady?: () => void }).__appReady?.();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              
              {/* Generate landing page routes dynamically */}
              {LANDING_ROUTES.map(path => (
                <Route 
                  key={path}
                  path={path} 
                  element={
                    <LazyRoute>
                      <LocationLanding />
                    </LazyRoute>
                  } 
                />
              ))}
              
              <Route path="/privacy-policy" element={<LazyRoute><PrivacyPolicy /></LazyRoute>} />
              <Route path="/terms" element={<LazyRoute><Terms /></LazyRoute>} />
              {/* The dashboard is its own document (admin.html), not a route
                  in this bundle. This entry only ever runs for a browser still
                  held by a pre-split service worker. */}
              <Route path="/admin" element={<LazyRoute><DashboardHandoff /></LazyRoute>} />

              <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
            </Routes>
            <CookieConsent />
          </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
