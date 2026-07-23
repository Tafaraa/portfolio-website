import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';
import OptimizedImage from '../../components/ui/OptimizedImage';
import { handleAnchorClick } from '../../utils/scroll';

const highlights = [
  { value: 'Websites', label: 'that bring enquiries' },
  { value: 'AI workflows', label: 'that kill the admin' },
  { value: 'Dashboards', label: 'that show the truth' }
];

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
    <section id="home" className="hero-atmosphere relative isolate flex min-h-screen flex-col justify-between overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <AnimatedElement animation="fade" delay={0.15}>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-dark-muted">
                Tafara Mutsvedu, South Africa
              </p>
            </AnimatedElement>
            <AnimatedElement animation="slide-in" delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none mb-8 dark:text-dark-text tracking-wider overflow-hidden whitespace-nowrap">
                S<span className="font-mono">{oSymbol}</span>FTWARE<br />
                <span className="font-mono">{eSymbol}</span>NGIN<span className="font-mono">{eSymbol}</span><span className="font-mono">{eSymbol}</span>R
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.5}>
              <div className="hero-portrait-frame mb-8 aspect-video w-full overflow-hidden bg-stone-300 shadow-2xl dark:bg-dark-surface md:w-3/4">
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
              <div
                className="hero-taglines mb-8 divide-y divide-stone-300/70 border-y border-stone-300/70 dark:divide-white/10 dark:border-white/10"
                aria-label="What I build"
              >
                {highlights.map(({ value, label }, index) => (
                  <div
                    key={value}
                    className="hero-tag"
                    style={{ '--i': index } as CSSProperties}
                  >
                    <span className="hero-tag-value">{value}</span>
                    <span className="hero-tag-label">{label}</span>
                    <span aria-hidden="true" className="hero-tag-rule" />
                  </div>
                ))}
                <p className="sr-only">
                  Websites that bring enquiries. AI workflows that kill the admin. Dashboards that show the truth.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade" delay={0.85}>
              <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#projects"
                  onClick={(e) => handleAnchorClick(e, '#projects')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-stone-50 transition-colors hover:bg-stone-700 dark:bg-dark-text dark:text-dark-bg dark:hover:bg-white"
                >
                  See the work
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, '#contact')}
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

      <div className="container relative z-10 mx-auto flex justify-center px-6 md:justify-start md:px-12">
        <AnimatedElement animation="slide-up" delay={1.2} once={false}>
          <a
            href="#about"
            onClick={(e) => handleAnchorClick(e, '#about')}
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
