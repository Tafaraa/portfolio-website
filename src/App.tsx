import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Support from './components/Support';
import Footer from './components/Footer';
import { ArrowUp } from 'lucide-react';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [dotPosition, setDotPosition] = useState({ x: -100, y: -100 });
  const [currentSection, setCurrentSection] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Update page title based on current section
    const titles = {
      '': 'Tafara Mutsvedu | Software Developer & Data Scientist',
      'projects': 'Projects | Tafara Mutsvedu Portfolio',
      'about': 'About | Tafara Mutsvedu Portfolio',
      'skills': 'Skills | Tafara Mutsvedu Portfolio',
      'contact': 'Contact | Tafara Mutsvedu Portfolio',
      'support': 'Support | Tafara Mutsvedu Portfolio'
    };
    document.title = titles[currentSection as keyof typeof titles];

    // Update meta description based on current section
    const descriptions = {
      '': 'Experienced Software Developer and Data Scientist specializing in machine learning, web development, and data analysis.',
      'projects': 'View my portfolio of software development and data science projects, including web applications and machine learning solutions.',
      'about': 'Learn about my journey as a Software Developer and Data Scientist, my education, and professional experience.',
      'skills': 'Explore my technical skills in software development, data science, and machine learning technologies.',
      'contact': 'Get in touch with me for collaboration, opportunities, or questions about my work.',
      'support': 'Support my work through various platforms and enjoy an interactive memory game.'
    };
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[currentSection as keyof typeof descriptions]);
    }
  }, [currentSection]);

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

    // Initialize cursor position off-screen
    setCursorPosition({ x: -100, y: -100 });
    setDotPosition({ x: -100, y: -100 });

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('scroll', handleScroll);

    // Show cursor only when mouse moves
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900 font-sans section-${currentSection}`}>
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
      
      {/* Custom cursor elements - hidden on mobile */}
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

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-stone-900/60 backdrop-blur-sm text-stone-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500 ${
          showScrollButton ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}

export default App;