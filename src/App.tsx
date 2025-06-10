import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { ArrowUp } from 'lucide-react';

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
      <Header />
      <main>
        <Hero />
        <Suspense fallback={<div className="py-20 md:py-32"><LoadingSpinner /></div>}>
          <About />
        </Suspense>
        <Suspense fallback={<div className="py-20 md:py-32"><LoadingSpinner /></div>}>
          <Education isOpen={false} onClose={() => {}} />
        </Suspense>
        <Suspense fallback={<div className="py-20 md:py-32"><LoadingSpinner /></div>}>
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
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HelmetProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<MainLayout />} />
          <Route path="/best-software-developer-:location" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/software-developer-:location" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/remote-software-developer" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/hire-remote-fullstack-developer" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/remote-react-developer-usa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/remote-developer-south-africa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/remote-data-scientist-south-africa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/react-developer-south-africa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/fullstack-developer-south-africa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="/data-scientist-south-africa" element={
            <Suspense fallback={<div className="min-h-screen flex flex-col items-center justify-center"><LoadingSpinner size="lg" className="mb-4" /><p className="text-stone-600">Loading content...</p></div>}>
              <LocationLanding />
            </Suspense>
          } />
          <Route path="*" element={<MainLayout />} />
        </Routes>
          </Router>
        </HelmetProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;