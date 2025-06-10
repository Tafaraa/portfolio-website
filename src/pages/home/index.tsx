import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';
import OptimizedImage from '../../components/ui/OptimizedImage';

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

  // Using CSS classes instead of inline styles

  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimatedElement animation="slide-in" delay={0.2}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-none mb-8 dark:text-dark-text tracking-wider">
                S{oSymbol}FTWARE<br />
                DEVEL{oSymbol}PER
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.5}>
              <div className="w-full md:w-3/4 aspect-video bg-stone-300 dark:bg-dark-surface overflow-hidden mb-8 shadow-md">
                <OptimizedImage 
                  src="/images/profile.webp" 
                  alt="Tafara Mutsvedu" 
                  className="w-full h-full"
                  objectFit="cover"
                  priority={true} /* LCP image, load with priority */
                />
              </div>
            </AnimatedElement>
          </div>
          
          <div className="order-1 md:order-2">
            <AnimatedElement animation="slide-in" delay={0.3}>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-none mb-8 dark:text-dark-text tracking-wider">
                D{aSymbol}T{aSymbol}<br />
                SCIENTIST
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.6}>
              <p className="text-lg md:text-xl mb-8 max-w-lg dark:text-dark-text">
                I support businesses and organizations with innovative solutions at the intersection of software development and data science.
              </p>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.8}>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://github.com/Tafaraa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-stone-600 dark:text-dark-text dark:hover:text-dark-accent transition-colors"
                >
                  GitHub
                </a>
                <a 
                  href="https://www.linkedin.com/in/tafara-mutsvedu-93825621b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-stone-600 dark:text-dark-text dark:hover:text-dark-accent transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 flex justify-center md:justify-start">
        <AnimatedElement animation="slide-up" delay={1.2} once={false}>
          <a 
            href="#about" 
            className="flex items-center space-x-2 text-stone-900 dark:text-dark-text hover:text-stone-600 dark:hover:text-dark-accent transition-colors"
          >
            <ArrowDown size={24} className="animate-bounce" />
            <span>Scroll down</span>
          </a>
        </AnimatedElement>
      </div>
    </section>
  );
};

export default Hero;