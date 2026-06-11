import { ArrowRight, BarChart3, CheckCircle2, Code2, FileDown, Gauge } from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';

const capabilities = [
  {
    icon: Code2,
    title: 'Build',
    description: 'Fast websites, dashboards, portals, and full-stack apps that feel polished on every screen.'
  },
  {
    icon: BarChart3,
    title: 'Analyze',
    description: 'Data workflows, reporting, machine learning experiments, and practical business insight.'
  },
  {
    icon: Gauge,
    title: 'Improve',
    description: 'Performance, UX clarity, SEO, and conversion-focused refinements for existing products.'
  }
];

const proofPoints = [
  'Production client websites',
  'Admin dashboards and order workflows',
  'E-commerce and payment integrations',
  'AI and data science prototypes'
];

const About = () => {
  return (
    <section id="about" className="relative py-10 md:py-24 overflow-hidden bg-primary-900 text-primary-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/25 via-accent-emerald/15 to-primary-200/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-accent-rose/20 via-accent-amber/10 to-primary-400/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-start">
          <div className="lg:col-span-4">
            <AnimatedElement animation="slide-in" delay={0.1}>
              <p className="text-xs md:text-sm font-medium tracking-[0.2em] md:tracking-[0.25em] text-primary-200/90">
                QUICK SNAPSHOT
              </p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.2}>
              <h2 className="mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                I turn ideas into usable software, data tools, and cleaner digital experiences.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-3 md:mt-5 text-sm md:text-lg text-primary-100 leading-relaxed max-w-xl">
                Skip the long bio: I build modern web products, connect them to real business workflows, and use data to make better decisions faster.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-5 md:mt-7 flex flex-row lg:flex-col xl:flex-row gap-2 md:gap-3">
                <a
                  href="#projects"
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
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {capabilities.map(({ icon: Icon, title, description }) => (
                  <a
                    key={title}
                    href={title === 'Analyze' ? '#skills' : '#projects'}
                    className="group rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-primary-200/40"
                  >
                    <span className="mb-2 md:mb-5 inline-flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-900 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-4 w-4 md:h-[22px] md:w-[22px]" />
                    </span>
                    <h3 className="text-sm md:text-xl font-semibold text-white">{title}</h3>
                    <p className="mt-1.5 md:mt-3 text-[11px] md:text-sm leading-snug md:leading-relaxed text-primary-100 line-clamp-3">
                      {description}
                    </p>
                  </a>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.4}>
              <div className="mt-3 md:mt-5 grid gap-3 md:gap-4 lg:grid-cols-[1fr_auto]">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 md:p-5 backdrop-blur-xl">
                  <p className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary-200/90">
                    Done recently
                  </p>
                  <div className="mt-3 md:mt-4 grid grid-cols-2 gap-2 md:gap-3">
                    {proofPoints.map((point) => (
                      <div key={point} className="flex items-start gap-2 md:gap-3 text-xs md:text-base text-primary-50">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent-emerald" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group rounded-lg border border-primary-100/30 bg-primary-50 p-3 md:p-5 text-primary-900 transition-all duration-300 hover:-translate-y-1 hover:bg-white lg:w-56"
                >
                  <p className="text-xs md:text-sm font-medium uppercase tracking-[0.18em] md:tracking-[0.2em] text-primary-900/70">
                    Need help?
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

            <AnimatedElement animation="fade" delay={0.5}>
              <div className="mt-3 md:mt-5 flex flex-wrap gap-1.5 md:gap-2">
                {['React', 'TypeScript', 'Python', 'Dashboards', 'E-commerce', 'Machine Learning', 'SEO'].map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-primary-50/90"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
