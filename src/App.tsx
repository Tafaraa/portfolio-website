import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [dotPosition, setDotPosition] = useState({ x: -100, y: -100 });
  const [currentSection, setCurrentSection] = useState('');

  useEffect(() => {
    // Update page title based on current section
    const titles = {
      '': 'Tafara Mutsvedu | Software Developer & Data Scientist',
      'projects': 'Projects | Tafara Mutsvedu Portfolio',
      'about': 'About | Tafara Mutsvedu Portfolio',
      'skills': 'Skills | Tafara Mutsvedu Portfolio',
      'contact': 'Contact | Tafara Mutsvedu Portfolio'
    };
    document.title = titles[currentSection as keyof typeof titles];

    // Update meta description based on current section
    const descriptions = {
      '': 'Experienced Software Developer and Data Scientist specializing in machine learning, web development, and data analysis.',
      'projects': 'View my portfolio of software development and data science projects, including web applications and machine learning solutions.',
      'about': 'Learn about my journey as a Software Developer and Data Scientist, my education, and professional experience.',
      'skills': 'Explore my technical skills in software development, data science, and machine learning technologies.',
      'contact': 'Get in touch with me for collaboration, opportunities, or questions about my work.'
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

    // Initialize cursor position off-screen
    setCursorPosition({ x: -100, y: -100 });
    setDotPosition({ x: -100, y: -100 });

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('scroll', updateCurrentSection);

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
      window.removeEventListener('scroll', updateCurrentSection);
      window.removeEventListener('mousemove', showCursor);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900 font-sans section-${currentSection}`}>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      
      {/* Custom cursor elements */}
      <div
        className="custom-cursor opacity-0 transition-opacity duration-300"
        style={{
          transform: `translate3d(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px, 0)`,
        }}
      />
      <div
        className="cursor-dot opacity-0 transition-opacity duration-300"
        style={{
          transform: `translate3d(${dotPosition.x - 2}px, ${dotPosition.y - 2}px, 0)`,
        }}
      />
    </div>
  );
}

export default App;