// No React import needed with modern JSX transform
import AnimatedElement from '../../components/ui/AnimatedElement';
import {
  ArrowRight,
  BarChart3,
  FileDown,
  Gauge,
  GraduationCap,
  Globe,
  ShoppingCart,
  Workflow,
  Wrench
} from 'lucide-react';

const Skills = () => {
  const serviceCards = [
    {
      title: 'Get your business online',
      description:
        "A website or store that makes you look legit and actually brings in enquiries — not just a pretty page nobody ever finds.",
      icon: Globe,
      tags: ['Websites', 'Branding', 'Local SEO']
    },
    {
      title: 'AI workflows & automation',
      description:
        'Hook up the tools you already use so quotes, bookings, follow-ups and admin run themselves quietly in the background.',
      icon: Workflow,
      tags: ['Automation', 'Integrations', 'Chatbots']
    },
    {
      title: 'Train your team',
      description:
        "I set the system up, then show your people how to actually run it — so you're not stuck depending on me forever.",
      icon: GraduationCap,
      tags: ['Workshops', 'Handover', 'Docs']
    },
    {
      title: 'Sell online',
      description:
        'Storefronts, inventory, card payments and WhatsApp ordering — everything you need to start taking money online.',
      icon: ShoppingCart,
      tags: ['E-commerce', 'Payments', 'Orders']
    },
    {
      title: 'Dashboards & data',
      description:
        "See what's really happening in your business at a glance, and make calls on numbers instead of gut feel.",
      icon: BarChart3,
      tags: ['Dashboards', 'Reporting', 'Analytics']
    },
    {
      title: 'Fix & level up',
      description:
        'Already have a site? I make it faster, rank it higher and easier to use so it stops leaking customers.',
      icon: Gauge,
      tags: ['SEO', 'Speed', 'UX']
    }
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

  const quickStats = [
    { label: 'For businesses', value: 'Get online & automate' },
    { label: 'For teams', value: 'Trained to run it' },
    { label: 'For recruiters', value: 'Full-time ready' }
  ];

  return (
    <section id="skills" className="relative py-12 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-50 to-white dark:from-dark-surface dark:to-dark-card" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/15 via-emerald-400/10 to-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/15 via-rose-400/10 to-amber-300/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <AnimatedElement animation="slide-in" delay={0.15}>
              <p className="text-xs md:text-sm font-medium tracking-[0.22em] md:tracking-[0.25em] text-stone-500 dark:text-dark-muted">
                WHAT I CAN DO FOR YOU
              </p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.25}>
              <h2 className="mt-3 md:mt-4 text-3xl md:text-[2.75rem] font-bold leading-[1.05] tracking-tight text-stone-900 dark:text-dark-text">
                The digital side of your business — built, automated, and handed over so your team can run it.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-3 md:mt-5 text-sm md:text-lg text-stone-600 dark:text-dark-muted leading-relaxed">
                Two kinds of people usually land here: businesses that want to get online, sell, and stop drowning in admin — and recruiters checking if I'm the real deal. You both get the same thing: someone who ships work that holds up.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-5 md:mt-8 grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2 md:gap-3">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl md:rounded-2xl border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-3 md:p-4"
                  >
                    <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.14em] text-stone-500 dark:text-dark-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs md:text-sm font-semibold text-stone-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.55}>
              <a
                href="#contact"
                className="mt-5 md:mt-7 hidden lg:inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-stone-700 dark:bg-white dark:text-gray-950 dark:hover:bg-white/90"
              >
                Tell me what you need
                <ArrowRight size={16} />
              </a>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-8">
            <AnimatedElement animation="fade" delay={0.25}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {serviceCards.map(({ icon: Icon, title, description, tags }) => (
                  <div
                    key={title}
                    className="group relative rounded-2xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4 md:p-6 shadow-[0_8px_20px_rgba(0,0,0,0.05)] md:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-300/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  >
                    <div className="pointer-events-none absolute -inset-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/15 via-emerald-400/10 to-blue-400/10 blur-3xl" />
                    </div>
                    <div className="relative">
                      <div className="inline-flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl bg-stone-900 text-white dark:bg-dark-accent">
                        <Icon className="h-5 w-5 md:h-6 md:w-6" />
                      </div>
                      <h3 className="mt-3 md:mt-4 text-base md:text-xl font-semibold leading-tight text-stone-900 dark:text-white">
                        {title}
                      </h3>
                      <p className="mt-1.5 md:mt-2 text-[13px] md:text-sm leading-relaxed text-stone-600 dark:text-dark-muted">
                        {description}
                      </p>
                      <div className="mt-3 md:mt-4 flex flex-wrap gap-1.5 md:gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-stone-200/70 bg-white/60 px-2.5 py-1 text-[11px] md:text-xs font-medium text-stone-700 dark:border-white/10 dark:bg-dark-surface/40 dark:text-dark-text"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                    <Wrench className="w-4 h-4 md:w-5 md:h-5" />
                    <h3 className="text-base md:text-xl font-semibold">The stack behind it</h3>
                  </div>
                  <p className="mt-1 md:mt-2 text-xs md:text-sm text-stone-600 dark:text-dark-muted">
                    Tools I build with — here for the recruiters and the curious.
                  </p>

                  <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:flex md:flex-wrap gap-1.5 md:gap-2">
                    {coreStack.map((skill) => (
                      <span
                        key={skill}
                        className="truncate rounded-full border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-dark-surface/40 px-2.5 md:px-3 py-1.5 md:py-2 text-center text-[11px] md:text-sm font-medium text-stone-800 dark:text-dark-text"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl md:rounded-3xl border border-stone-900/10 dark:border-white/10 bg-stone-900 dark:bg-white/5 p-4 md:p-6 text-white">
                  <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                    Recruiters & hiring managers
                  </p>
                  <p className="mt-2 md:mt-3 text-sm md:text-base leading-relaxed text-white/85">
                    BSc Computer Science, shipping real client work in React, TypeScript, Python and data. Open to full-time and contract roles.
                  </p>
                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <a
                      href="/resume.pdf"
                      download="Tafara_Mutsvedu_Resume.pdf"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-stone-900 transition-colors hover:bg-white/90"
                    >
                      <FileDown size={16} />
                      Download CV
                    </a>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      Get in touch
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
