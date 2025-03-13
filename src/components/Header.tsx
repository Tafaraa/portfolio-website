import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, GraduationCap, Award, ArrowLeft, ExternalLink, ChevronDown } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGFmYXJhMSIsImEiOiJjbTg2M3VpbXMwMGZrMmtyN3FtYjU4ZXI4In0.TwzZ3wayEFkdjWO_ZNwkWw';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

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

  useEffect(() => {
    if (showMap) {
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [28.1325, -25.9981], // Midrand coordinates
        zoom: 2,
      });

      // Add marker for Midrand
      new mapboxgl.Marker()
        .setLngLat([28.1325, -25.9981])
        .addTo(map);

      // Zoom animation sequence
      const zoomSequence = [
        { zoom: 2, center: [0, 0], duration: 0 }, // World view
        { zoom: 4, center: [25, 0], duration: 2000 }, // Africa
        { zoom: 6, center: [28, -30], duration: 2000 }, // South Africa
        { zoom: 12, center: [28.1325, -25.9981], duration: 2000 }, // Midrand
      ];

      let currentStep = 0;
      const animate = () => {
        if (currentStep < zoomSequence.length) {
          const step = zoomSequence[currentStep];
          map.easeTo({
            zoom: step.zoom,
            center: step.center,
            duration: step.duration,
          });
          currentStep++;
          setTimeout(animate, step.duration);
        }
      };

      setTimeout(animate, 1000);

      return () => map.remove();
    }
  }, [showMap]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-stone-100 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center">
            <a href="#home" className="text-xl font-medium">
              {displayText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity ml-1`}>|</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-12">
              <button 
                onClick={() => setShowEducation(true)}
                className="text-sm text-left hover:text-stone-600 transition-colors group flex items-start"
              >
                <GraduationCap className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600" />
                Currently a data science <br />
                honors student
              </button>
              
              <button 
                onClick={() => setShowMap(true)}
                className="text-sm text-left hover:text-stone-600 transition-colors group flex items-start"
              >
                <MapPin className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600" />
                Based in Midrand <br />
                South Africa
              </button>
              
              <nav className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    className="text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>
            
            <button 
              className="md:hidden text-stone-900 focus:outline-none" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-stone-100 fixed w-full top-[72px] z-40">
          <div className="container mx-auto px-6 py-6">
            <nav className="flex flex-col space-y-6">
              <button 
                onClick={() => {
                  setShowEducation(true);
                  setIsMenuOpen(false);
                }}
                className="text-sm text-left hover:text-stone-600 transition-colors group flex items-start"
              >
                <GraduationCap className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600" />
                Currently a data science <br />
                honors student
              </button>
              
              <button 
                onClick={() => {
                  setShowMap(true);
                  setIsMenuOpen(false);
                }}
                className="text-sm text-left hover:text-stone-600 transition-colors group flex items-start"
              >
                <MapPin className="w-4 h-4 mt-1 mr-2 group-hover:text-stone-600" />
                Based in Midrand <br />
                South Africa
              </button>
              
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-stone-900 hover:text-stone-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-xl font-medium">Location</h3>
              <button 
                onClick={() => setShowMap(false)}
                className="text-stone-600 hover:text-stone-900"
              >
                <X size={24} />
              </button>
            </div>
            <div id="map" className="w-full h-[60vh]"></div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {showEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-2xl font-bold">Education & Certifications</h3>
              <button 
                onClick={() => setShowEducation(false)}
                className="text-stone-600 hover:text-stone-900"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 relative scroll-smooth" id="educationContent">
              <div className="space-y-8">
                {/* Current Education */}
                <div className="border-l-4 border-stone-900 pl-4">
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
                    <GraduationCap className="w-5 h-5 mr-2 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">BSc in Computer Science</h4>
                  </div>
                  <p className="text-stone-600">Eduvos • Graduated 2024</p>
                  <p className="text-stone-800 mb-4">
                    Completed Bachelor of Science in Computer Science with focus on software development,
                    algorithms and computational theory.
                  </p>
                  
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Key Areas:</h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700">
                      <li>Software Engineering & Design Patterns</li>
                      <li>Data Structures & Algorithms</li>
                      <li>Database Systems</li>
                      <li>Web Development</li>
                    </ul>
                  </div>
                </div>

                {/* Data Science Certificate */}
                <div className="border-l-4 border-stone-900 pl-4">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 mr-2 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Data Science Professional Certificate</h4>
                  </div>
                  <p className="text-stone-600">ALX Data Science Training Camp • 2023-2024</p>
                  <p className="text-stone-800 mb-4">Intensive training program focused on practical data science applications and machine learning.</p>
                  
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-stone-700">
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
                    className="inline-flex items-center mt-4 text-stone-900 hover:text-stone-600 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 border-t sticky bottom-0 bg-white flex justify-between items-center">
              <button
                onClick={() => setShowEducation(false)}
                className="flex items-center px-4 py-2 text-stone-600 hover:text-stone-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
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
                className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors animate-bounce"
              >
                <span>Scroll</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;