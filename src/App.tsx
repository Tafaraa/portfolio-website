import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Support from './components/Support';
import Footer from './components/Footer';
import LocationLanding from './components/LocationLanding';
import { ArrowUp } from 'lucide-react';

const MainLayout = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [dotPosition, setDotPosition] = useState({ x: -100, y: -100 });
  const [currentSection, setCurrentSection] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setCursorPosition({ x: e.clientX, y: e.clientY });
        setDotPosition({ x: e.clientX, y: e.clientY });
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

    setCursorPosition({ x: -100, y: -100 });
    setDotPosition({ x: -100, y: -100 });

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
    <div className={`min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900 font-sans section-${currentSection} main-portfolio`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Support />
        <Contact />
      </main>
      <Footer />
      
      <div
        className="custom-cursor opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          transform: `translate3d(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px, 0)`,
        }}
      />
      <div
        className="cursor-dot opacity-0 transition-opacity duration-300 hidden md:block"
        style={{
          transform: `translate3d(${dotPosition.x - 2}px, ${dotPosition.y - 2}px, 0)`,
        }}
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 bg-stone-900/60 backdrop-blur-sm text-stone-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 ${
          showScrollButton ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/best-software-developer-:location" element={<LocationLanding />} />
          <Route path="/software-developer-:location" element={<LocationLanding />} />
          <Route path="/remote-software-developer" element={<LocationLanding />} />
          <Route path="/hire-remote-fullstack-developer" element={<LocationLanding />} />
          <Route path="/remote-react-developer-usa" element={<LocationLanding />} />
          <Route path="/remote-developer-south-africa" element={<LocationLanding />} />
          <Route path="/remote-data-scientist-south-africa" element={<LocationLanding />} />
          <Route path="/react-developer-south-africa" element={<LocationLanding />} />
          <Route path="/fullstack-developer-south-africa" element={<LocationLanding />} />
          <Route path="/data-scientist-south-africa" element={<LocationLanding />} />
          <Route path="*" element={<MainLayout />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;