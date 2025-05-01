import { useState, useEffect } from 'react';
import AnimatedElement from './AnimatedElement';
import { Menu, X, MapPin, GraduationCap, Award, ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SimpleMap from './SimpleMap';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showMap, setShowMap] = useState(false);

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
    { name: 'About', href: '#about' },
    { name: 'Support', href: '#support' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`py-4 sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-dark-surface shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <AnimatedElement animation="fade" delay={0.1}>
            <a href="#home" className="flex items-center text-xl font-medium" aria-label="Go to home section">
              <span className="dark:text-dark-text">{displayText}</span>
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-1 dark:text-dark-text`} aria-hidden="true">|</span>
            </a>
          </AnimatedElement>
          
          <nav className="hidden md:flex items-center space-x-8">
            <AnimatedElement animation="fade" delay={0.2}>
              <button
                className="group flex items-start text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
                onClick={() => setShowMap(true)}
                aria-label="View location on map"
              >
                <MapPin className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600 dark:group-hover:text-dark-accent" aria-hidden="true" />
                <span>Based in Midrand <br />
                South Africa</span>
              </button>
            </AnimatedElement>
            
            <nav className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <AnimatedElement key={link.name} animation="fade" delay={0.4 + index * 0.1}>
                  <a 
                    href={link.href}
                    className="text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
                  >
                    {link.name}
                  </a>
                </AnimatedElement>
              ))}
            </nav>
            <AnimatedElement animation="fade" delay={0.8}>
              <ThemeToggle />
            </AnimatedElement>  
          </nav>
          <div className="md:hidden">
            <button 
              className="text-stone-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent" 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen ? 'true' : 'false'}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-dark-surface">
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
              <button
                className="group flex items-start text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
                onClick={() => setShowMap(true)}
                aria-label="View location on map"
              >
                <MapPin className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600 dark:group-hover:text-dark-accent" aria-hidden="true" />
                <span>Based in Midrand <br />
                South Africa</span>
              </button>
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Map Dialog */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-dark-surface overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold dark:text-dark-text">Location</h2>
              <button 
                className="text-stone-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-dark-accent"
                onClick={() => setShowMap(false)}
                aria-label="Close map"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>
            <div className="w-full h-96 relative overflow-hidden rounded-lg">
              <SimpleMap 
                title="Midrand"
                description="Midrand, Gauteng, South Africa"
                className="w-full h-full"
              />
            </div>
            <div className="mt-6 text-center">
              <p className="text-stone-600 dark:text-dark-muted text-lg">
                <MapPin className="inline-block mr-2" size={20} aria-hidden="true" />
                Midrand, Gauteng, South Africa
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 dark:bg-black/80 p-4">
          <div className="bg-white dark:bg-dark-surface rounded-lg w-full max-w-xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b dark:border-dark-border flex justify-between items-center sticky top-0 bg-white dark:bg-dark-surface z-10">
              <h3 className="text-2xl font-bold dark:text-dark-text">Education & Certifications</h3>
              <button 
                onClick={() => setShowEducation(false)}
                className="text-stone-600 hover:text-stone-900 dark:text-dark-muted dark:hover:text-dark-text transition-colors"
                aria-label="Close education details"
              >
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 relative scroll-smooth dark:bg-dark-surface" id="educationContent">
              <div className="space-y-8">
                {/* Current Education */}
                <div className="border-l-4 border-stone-900 dark:border-dark-accent pl-4">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-5 h-5 mr-2 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Data Science Honors Program</h4>
                  </div>
                  <p className="text-stone-600">Eduvos</p>
                  <p className="text-stone-800">Currently pursuing advanced studies in data science, focusing on machine learning, statistical analysis and big data technologies.</p>
                </div>

                {/* BSc Computer Science */}
                <div className="border-l-4 border-stone-900 pl-4">
                  <div className="flex items-center mb-2">
                    <GraduationCap className="w-5 h-5 mr-2 flex-shrink-0 dark:text-dark-accent" />
                    <h4 className="text-lg font-semibold dark:text-dark-text">BSc in Computer Science</h4>
                  </div>
                  <p className="text-stone-600 dark:text-dark-muted">Eduvos • Graduated 2024</p>
                  <p className="text-stone-800 dark:text-dark-text mb-4">
                    Completed Bachelor of Science in Computer Science with focus on software development,
                    algorithms and computational theory.
                  </p>
                  
                  <div className="bg-stone-50 dark:bg-dark-border/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 dark:text-dark-text">Key Areas:</h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-dark-muted">
                      <li>Software Engineering & Design Patterns</li>
                      <li>Data Structures & Algorithms</li>
                      <li>Database Systems</li>
                      <li>Web Development</li>
                    </ul>
                  </div>
                </div>

                {/* Data Science Certificate */}
                <div className="border-l-4 border-stone-900 dark:border-dark-accent pl-4">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 mr-2 flex-shrink-0 dark:text-dark-accent" />
                    <h4 className="text-lg font-semibold dark:text-dark-text">Data Science Professional Certificate</h4>
                  </div>
                  <p className="text-stone-600 dark:text-dark-muted">ALX Data Science Training Camp • 2023-2024</p>
                  <p className="text-stone-800 dark:text-dark-text mb-4">Intensive training program focused on practical data science applications and machine learning.</p>
                  
                  <div className="bg-stone-50 dark:bg-dark-border/30 p-4 rounded-lg">
                    <h5 className="font-medium mb-2 dark:text-dark-text">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700 dark:text-dark-muted">
                      <li>Advanced Python programming for data analysis</li>
                      <li>Machine learning model development and deployment</li>
                      <li>Big data processing and visualization</li>
                      <li>Statistical analysis and hypothesis testing</li>
                    </ul>
                  </div>

                  <a 
                    href="/images/data-science-certificate.png" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 border-t dark:border-dark-border sticky bottom-0 bg-white dark:bg-dark-surface flex justify-between items-center">
              <button
                onClick={() => setShowEducation(false)}
                className="flex items-center px-4 py-2 text-stone-600 dark:text-dark-muted hover:text-stone-900 dark:hover:text-dark-text transition-colors"
                aria-label="Go back to main view"
              >
                <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                Back
              </button>
              
              <button 
                onClick={() => {
                  const content = document.getElementById('educationContent');
                  if (content) {
                    content.scrollTo({
                      top: content.scrollHeight,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="flex items-center gap-2 text-stone-600 dark:text-dark-muted hover:text-stone-900 dark:hover:text-dark-text transition-colors animate-bounce"
                aria-label="Scroll to bottom of education content"
              >
                <span>Scroll</span>
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;