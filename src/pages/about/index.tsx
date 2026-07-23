import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileDown,
  Gauge,
  Globe,
  GraduationCap,
  ShoppingCart,
  Workflow,
  Wrench
} from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';
import { handleAnchorClick } from '../../utils/scroll';

const services = [
  {
    title: 'Get your business online',
    description: 'A website or store that makes you look legit and actually brings in enquiries.',
    icon: Globe,
    tags: ['Websites', 'Branding', 'Local SEO']
  },
  {
    title: 'AI workflows & automation',
    description: 'Quotes, bookings, follow-ups and admin running themselves in the background.',
    icon: Workflow,
    tags: ['Automation', 'Integrations', 'Chatbots']
  },
  {
    title: 'Sell online',
    description: 'Storefronts, inventory, card payments and WhatsApp ordering, ready to take money.',
    icon: ShoppingCart,
    tags: ['E-commerce', 'Payments', 'Orders']
  },
  {
    title: 'Dashboards & data',
    description: "See what's really happening in your business and decide on numbers, not gut feel.",
    icon: BarChart3,
    tags: ['Dashboards', 'Reporting', 'Analytics']
  },
  {
    title: 'Train your team',
    description: "I set it up, then show your people how to run it, no developer dependency.",
    icon: GraduationCap,
    tags: ['Workshops', 'Handover', 'Docs']
  },
  {
    title: 'Fix & level up',
    description: 'Already have a site? I make it faster, rank it higher, and stop it leaking customers.',
    icon: Gauge,
    tags: ['SEO', 'Speed', 'UX']
  }
];

const proofPoints = [
  'Production client websites',
  'Admin dashboards & order flows',
  'E-commerce & card payments',
  'AI workflows & automation'
];

const coreStack = [
  'React',
  'TypeScript',
  'Python',
  'Node.js',
  'SQL',
  'Machine Learning',
  'Data Analysis',
  'REST APIs',
  'MongoDB',
  'TensorFlow',
  'Pandas',
  'Git/GitHub'
];

// Typed out in the mobile progress pill as the visitor moves through the section
const SECTION_STEPS = [
  'Get your business online',
  'AI workflows & automation',
  'Sell online',
  'Dashboards & data',
  'Train your team',
  'Fix & level up'
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [pillVisible, setPillVisible] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [typed, setTyped] = useState('');

  // Track how far through the section the visitor is; drives the bar + typed label
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0
        ? Math.min(1, Math.max(0, -rect.top / scrollable))
        : Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      setPillVisible(rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.6);
      setStepIndex(Math.min(SECTION_STEPS.length - 1, Math.floor(progress * SECTION_STEPS.length)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Typewriter: retype the label whenever the visitor reaches the next step
  useEffect(() => {
    const label = SECTION_STEPS[stepIndex];
    setTyped('');
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(label.slice(0, i));
      if (i >= label.length) window.clearInterval(timer);
    }, 45);
    return () => window.clearInterval(timer);
  }, [stepIndex]);

  return (
    <section ref={sectionRef} id="about" className="relative py-12 md:py-28 overflow-hidden bg-primary-900 text-primary-50">
      {/* Keep old #skills deep links and nav anchors working after the section merge */}
      <span id="skills" className="absolute top-0" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/25 via-accent-emerald/15 to-primary-200/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-accent-rose/20 via-accent-amber/10 to-primary-400/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <AnimatedElement animation="slide-in" delay={0.1}>
              <p className="text-xs md:text-sm font-medium tracking-[0.2em] md:tracking-[0.25em] text-primary-200/90">
                WHAT I CAN DO FOR YOU
              </p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.2}>
              <h2 className="mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                I build the digital side of businesses, and make their data actually useful.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-3 md:mt-5 text-sm md:text-lg text-primary-100 leading-relaxed max-w-xl">
                Businesses get online, sell, and stop drowning in admin. Recruiters get someone who ships work that holds up, full-time too.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-5 md:mt-7 rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 backdrop-blur-xl">
                <p className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary-200/90">
                  Done recently
                </p>
                <div className="mt-3 md:mt-4 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 md:gap-3">
                  {proofPoints.map((point) => (
                    <div key={point} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-primary-50">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-emerald" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.55}>
              <div className="mt-5 md:mt-7 flex flex-row lg:flex-col xl:flex-row gap-2 md:gap-3">
                <a
                  href="#projects"
                  onClick={(e) => handleAnchorClick(e, '#projects')}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-primary-50 text-primary-900 px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base font-medium transition-colors hover:bg-white"
                >
                  See proof
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/resume.pdf"
                  download="Tafara_Mutsvedu_Resume.pdf"
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full border border-primary-100/40 bg-white/5 px-4 md:px-7 py-2.5 md:py-3.5 text-sm md:text-base font-medium text-primary-50 hover:bg-white/10 transition-colors"
                >
                  <FileDown size={16} />
                  Download CV
                </a>
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-8">
            <AnimatedElement animation="fade" delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-4">
                {services.map(({ icon: Icon, title, description, tags }) => (
                  <div
                    key={title}
                    className="group rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-primary-200/40"
                  >
                    <span className="mb-2 md:mb-4 inline-flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-900 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-4 w-4 md:h-[22px] md:w-[22px]" />
                    </span>
                    <h3 className="text-sm md:text-lg font-semibold text-white leading-tight">{title}</h3>
                    <p className="mt-1.5 md:mt-2 text-[11px] md:text-sm leading-snug md:leading-relaxed text-primary-100">
                      {description}
                    </p>
                    <div className="mt-2 md:mt-3 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-2 md:px-2.5 py-0.5 md:py-1 text-[10px] md:text-xs font-medium text-primary-50/90"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.4}>
              <div className="mt-3 md:mt-5 grid gap-3 md:gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 backdrop-blur-xl">
                  <div className="flex items-center gap-2 text-white">
                    <Wrench className="w-4 h-4 md:w-5 md:h-5" />
                    <h3 className="text-base md:text-xl font-semibold">The stack behind it</h3>
                  </div>
                  <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                    {coreStack.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 md:px-3 py-1 md:py-1.5 text-[11px] md:text-sm font-medium text-primary-50/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  onClick={(e) => handleAnchorClick(e, '#contact')}
                  className="group rounded-lg border border-primary-100/30 bg-primary-50 p-3 md:p-5 text-primary-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                >
                  <p className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary-900/70">
                    Recruiters & businesses
                  </p>
                  <p className="mt-1.5 md:mt-3 text-lg md:text-2xl font-bold leading-tight">
                    Let's build the next one.
                  </p>
                  <span className="mt-3 md:mt-5 inline-flex items-center gap-2 text-sm md:text-base font-medium">
                    Start a project
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Mobile-only progress pill: typewriter label + section progress bar,
          centered at the bottom, clear of the chat launcher and scroll-to-top button */}
      <div
        className={`fixed bottom-5 left-1/2 z-30 -translate-x-1/2 md:hidden transition-all duration-300 ${
          pillVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
        aria-hidden="true"
      >
        <div className="rounded-2xl border border-white/15 bg-primary-900/85 px-4 py-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.4)] backdrop-blur-xl">
          <p className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium tracking-wide text-primary-50">
            <span className="text-accent-emerald">▸</span>
            <span>{typed}</span>
            <span className="animate-pulse text-primary-200">|</span>
          </p>
          <div className="mt-1.5 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <div
              ref={fillRef}
              className="h-full origin-left rounded-full bg-gradient-to-r from-primary-400 via-accent-emerald to-primary-200 transition-transform duration-150 [transform:scaleX(0)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
