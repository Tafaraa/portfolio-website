import { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';
import OptimizedImage from '../../components/ui/OptimizedImage';

const Hero = () => {
  const [oSymbol, setOSymbol] = useState("O");
  const [eSymbol, setESymbol] = useState("E");
  const [aSymbol, setASymbol] = useState("A");
  
  useEffect(() => {
    const symbols = {
      o: ["O", "0", "Q", "Ø"],
      e: ["E", "Ξ", "Σ", "Ε"],
      a: ["A", "Λ", "Δ", "Α"]
    };
    
    let symbolIndex = 0;
    
    const interval = setInterval(() => {
      symbolIndex = (symbolIndex + 1) % symbols.o.length;
      setOSymbol(symbols.o[symbolIndex]);
      setESymbol(symbols.e[symbolIndex]);
      setASymbol(symbols.a[symbolIndex]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimatedElement animation="slide-in" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-8 dark:text-dark-text tracking-wider overflow-hidden whitespace-nowrap">
                S<span className="font-mono">{oSymbol}</span>FTWARE<br />
                <span className="font-mono">{eSymbol}</span>NGIN<span className="font-mono">{eSymbol}</span><span className="font-mono">{eSymbol}</span>R
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
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-8 dark:text-dark-text tracking-wider overflow-hidden whitespace-nowrap">
                D<span className="font-mono">{aSymbol}</span>T<span className="font-mono">{aSymbol}</span><br />
                SCIENTIST
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.6}>
              <p className="text-lg md:text-xl mb-6 max-w-lg dark:text-dark-text">
                I build fast websites, dashboards, admin systems, and data-powered tools for businesses that need clean digital products that actually work.
              </p>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.8}>
              <div className="mb-8 flex flex-wrap gap-2">
                {['Web apps', 'Dashboards', 'E-commerce', 'AI/Data tools'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-stone-300/80 bg-white/60 px-3 py-1 text-sm font-medium text-stone-700 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-dark-text"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.9}>
              <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-stone-50 transition-colors hover:bg-stone-700 dark:bg-dark-text dark:text-dark-bg dark:hover:bg-white"
                >
                  View projects
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-stone-900/20 px-6 py-3 text-stone-900 transition-colors hover:bg-stone-900 hover:text-stone-50 dark:border-white/20 dark:text-dark-text dark:hover:bg-white/10"
                >
                  Start a project
                </a>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={1}>
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
