import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const [oSymbol, setOSymbol] = useState("O");
  const [aSymbol, setASymbol] = useState("A");
  
  useEffect(() => {
    const oSymbols = ["O", "0", "○", "◎"];
    const aSymbols = ["A", "△", "∆", "▲"];
    let symbolIndex = 0;
    
    const interval = setInterval(() => {
      symbolIndex = (symbolIndex + 1) % oSymbols.length;
      setOSymbol(oSymbols[symbolIndex]);
      setASymbol(aSymbols[symbolIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const letterStyle = {
    display: 'inline-block',
    width: '1.05em',
    textAlign: 'center' as const,
  };

  const titleStyle = {
    letterSpacing: '0.02em',
  };

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-8" style={titleStyle}>
              S<span style={letterStyle}>{oSymbol}</span>FTWARE<br />
              DEVEL<span style={letterStyle}>{oSymbol}</span>PER
            </h1>
            <div className="w-full md:w-3/4 aspect-video bg-stone-300 overflow-hidden mb-8">
              <img 
                src="/images/profile.jpeg" 
                alt="Tafara Mutsvedu" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h1 className="text-6xl md:text-8xl font-bold leading-none mb-8" style={titleStyle}>
              D<span style={letterStyle}>{aSymbol}</span>T<span style={letterStyle}>{aSymbol}</span><br />
              SCIENTIST
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg">
              I support businesses and organizations with innovative solutions at the intersection of software development and data science.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/Tafaraa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-stone-600 transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-stone-600 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex justify-center md:justify-start">
        <a 
          href="#about" 
          className="flex items-center space-x-2 text-stone-900 hover:text-stone-600 transition-colors"
        >
          <ArrowDown size={24} />
          <span>Scroll down</span>
        </a>
      </div>
    </section>
  );
};

export default Hero;