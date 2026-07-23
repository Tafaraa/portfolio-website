import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedElement from '../ui/AnimatedElement';
import { Menu, X } from 'lucide-react';
import { handleAnchorClick } from '../../utils/scroll';
import ThemeToggle from '../ui/ThemeToggle';
import Education from '../../pages/education';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isEducationOpen, setIsEducationOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    // Text animation variables
    const names = ['Tafara', 'Mutsvedu'];
    let currentNameIndex = 0;
    let isTyping = true;
    let charIndex = 0;
    let timeoutId: number | null = null;

    // Text animation function
    const animateText = () => {
      const currentName = names[currentNameIndex];
      
      if (isTyping) {
        // Typing phase
        if (charIndex < currentName.length) {
          setDisplayText(currentName.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = window.setTimeout(animateText, 150);
        } else {
          // Finished typing, pause before deleting
          timeoutId = window.setTimeout(() => {
            isTyping = false;
            animateText();
          }, 2000);
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setDisplayText(currentName.substring(0, charIndex - 1));
          charIndex--;
          timeoutId = window.setTimeout(animateText, 150);
        } else {
          timeoutId = window.setTimeout(() => {
            isTyping = true;
            currentNameIndex = (currentNameIndex + 1) % names.length;
            animateText();
          }, 1000);
        }
      }
    };

    animateText();

    return () => {
      clearInterval(cursorInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'What I Do', href: '#about' },
    { name: 'Education', onClick: () => setIsEducationOpen(true) },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`py-4 sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-dark-surface shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <AnimatedElement animation="fade" delay={0.1}>
            <a href="#home" onClick={(e) => handleAnchorClick(e, '#home')} className="flex items-center text-xl font-medium focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent" aria-label="Go to home section">
              <span className="dark:text-dark-text">{displayText}</span>
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-1 dark:text-dark-text`} aria-hidden="true">|</span>
            </a>
          </AnimatedElement>
          
          <nav className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <AnimatedElement key={link.name} animation="fade" delay={0.4 + index * 0.1}>
                  {link.href ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={link.onClick}
                      className="text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                    >
                      {link.name}
                    </button>
                  )}
                </AnimatedElement>
              ))}
            </nav>
            <AnimatedElement animation="fade" delay={0.8}>
              <ThemeToggle />
            </AnimatedElement>  
          </nav>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              className="text-stone-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden fixed inset-0 z-50 bg-white dark:bg-dark-surface"
          >
            <div className="container mx-auto px-6 py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold dark:text-dark-text">Menu</h2>
                <button
                  className="text-stone-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.3, delay: 0.05 + index * 0.06, ease: 'easeOut' }}
                  >
                    {link.href ? (
                      <a
                        href={link.href}
                        className="block text-xl font-medium text-center py-3 text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-dark-accent transition-colors border-b border-stone-100 dark:border-dark-border/30 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                        onClick={(e) => {
                          handleAnchorClick(e, link.href);
                          setIsMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          link.onClick?.();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-xl font-medium text-center py-3 text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-dark-accent transition-colors border-b border-stone-100 dark:border-dark-border/30 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                      >
                        {link.name}
                      </button>
                    )}
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Education isOpen={isEducationOpen} onClose={() => setIsEducationOpen(false)} />
    </>
  );
};

export default Header;
