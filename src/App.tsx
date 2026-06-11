import { useEffect, useState, useRef, lazy, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SEO from './components/ui/SEO';
import { ThemeProvider } from './contexts/ThemeContext';
import { ArrowUp } from 'lucide-react';
import JulieChatWidget from './components/ui/JulieChatWidget';

// Lazy load non-critical components
const About = lazy(() => import('./pages/about'));
const Education = lazy(() => import('./pages/education'));
const Skills = lazy(() => import('./pages/skills'));
const Projects = lazy(() => import('./pages/projects'));
const Contact = lazy(() => import('./pages/contact'));
const Support = lazy(() => import('./pages/support'));
const LocationLanding = lazy(() => import('./pages/locationLanding'));
const Hero = lazy(() => import('./pages/home'));

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
      const sections = ['projects', 'about', 'skills', 'contact', 'support'];
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
        title="Tafara Mutsvedu | Software Developer, Data Scientist & AI Engineer in South Africa"
        description="Tafara Mutsvedu builds fast websites, admin dashboards, e-commerce stores, AI prototypes, and data tools for businesses in South Africa and remote teams worldwide."
        keywords="Tafara Mutsvedu, software developer south africa, data scientist midrand, AI engineer, data engineer, react developer johannesburg, python developer south africa, machine learning expert, full stack developer gauteng, hire developer south africa, software development midrand, data science consultant, web development johannesburg, website creation services, AI-powered applications, freelance developer, permanent developer jobs, Tafara, Mutsvedu, developer portfolio, South African developer, remote developer, React developer, Python developer, data scientist, machine learning engineer, artificial intelligence developer, data engineering services, SkillLens, revivalmedicalaesthetics.com, dollarnation.co.za, fakenewsdetectorx.netlify.app"
        canonical="/"
        tags={["software development", "data science", "machine learning", "AI engineering", "data engineering", "website creation services", "React", "Python", "South Africa", "Midrand", "Johannesburg", "freelance", "permanent jobs", "AI applications", "e-commerce development"]}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Tafara Mutsvedu',
            url: 'https://mutsvedutafara.com',
            image: 'https://mutsvedutafara.com/images/profile.webp',
            jobTitle: ['Software Developer', 'Data Scientist', 'AI Engineer'],
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
              'E-commerce Development',
              'Dashboard Development'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Tafara Mutsvedu Software Development',
            url: 'https://mutsvedutafara.com',
            areaServed: ['South Africa', 'Zimbabwe', 'Remote'],
            serviceType: [
              'Website development',
              'Full-stack web application development',
              'E-commerce development',
              'Dashboard development',
              'AI and data tool development'
            ]
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Tafara Mutsvedu Portfolio',
            url: 'https://mutsvedutafara.com',
            description: 'Portfolio for Tafara Mutsvedu, a software developer, data scientist, and AI engineer.'
          }
        ]}
      />
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-20 md:py-32"><LoadingSpinner /></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="py-20 md:py-32"><LoadingSpinner /></div>}>
          <Education isOpen={false} onClose={() => {}} />
        </Suspense>
        <Suspense fallback={<div className="py-20 text-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
          <Skills />
        </Suspense>
        <Suspense fallback={<div className="py-20 text-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
          <Projects />
          <Support />
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
const LazyLoadingFallback = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <LoadingSpinner size="lg" className="mb-4" />
    <p className="text-stone-600">Loading content...</p>
  </div>
);

// Wrapper for lazy-loaded components
const LazyRoute = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<LazyLoadingFallback />}>
    {children}
  </Suspense>
);

function App() {
  // Landing page routes
  const landingRoutes = [
    "/best-software-developer-:location",
    "/software-developer-:location",
    "/remote-software-developer",
    "/hire-remote-fullstack-developer",
    "/remote-react-developer-usa",
    "/remote-developer-south-africa",
    "/remote-data-scientist-south-africa",
    "/react-developer-south-africa",
    "/fullstack-developer-south-africa",
    "/data-scientist-south-africa",
    "/ai-engineer",
    "/data-engineer",
    "/website-creation-services",
    "/freelance-developer",
    "/hire-ai-engineer",
    "/hire-data-engineer",
    "/react-developer",
    "/python-developer",
    "/machine-learning-engineer"
  ];

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<MainLayout />} />
              
              {/* Generate landing page routes dynamically */}
              {landingRoutes.map(path => (
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
              
              <Route path="*" element={<MainLayout />} />
            </Routes>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
