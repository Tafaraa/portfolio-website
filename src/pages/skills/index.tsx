// No React import needed with modern JSX transform
import AnimatedElement from '../../components/ui/AnimatedElement';
import { BarChart3, Bot, Code2, Database, Gauge, ShoppingCart, Wrench } from 'lucide-react';

const Skills = () => {
  const capabilityCards = [
    {
      title: 'Web Apps',
      description: 'React, TypeScript, responsive UI, portals, and client-facing products.',
      icon: Code2,
      tags: ['React', 'TypeScript', 'UX']
    },
    {
      title: 'Dashboards',
      description: 'Admin panels, reporting views, charts, and workflow tools.',
      icon: BarChart3,
      tags: ['SQL', 'Analytics', 'Charts']
    },
    {
      title: 'E-commerce',
      description: 'Storefronts, inventory, ordering flows, and payment-ready experiences.',
      icon: ShoppingCart,
      tags: ['Orders', 'Inventory', 'Payments']
    },
    {
      title: 'AI/Data',
      description: 'Machine learning prototypes, analysis, automation, and data products.',
      icon: Bot,
      tags: ['Python', 'ML', 'Data']
    },
    {
      title: 'APIs',
      description: 'Backend services, integrations, databases, and practical automation.',
      icon: Database,
      tags: ['Node.js', 'APIs', 'MongoDB']
    },
    {
      title: 'Optimization',
      description: 'Performance, SEO, accessibility, and cleaner conversion flows.',
      icon: Gauge,
      tags: ['SEO', 'Speed', 'QA']
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
    { label: 'Build', value: 'Web apps' },
    { label: 'Ship', value: 'Dashboards' },
    { label: 'Improve', value: 'SEO + UX' }
  ];

  return (
    <section id="skills" className="relative py-12 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-50 to-white dark:from-dark-surface dark:to-dark-card" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/15 via-emerald-400/10 to-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/15 via-rose-400/10 to-amber-300/10 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12 items-start">
          <div className="lg:col-span-4">
            <AnimatedElement animation="slide-in" delay={0.15}>
              <p className="text-xs md:text-sm font-medium tracking-[0.22em] md:tracking-[0.25em] text-stone-500 dark:text-dark-muted">SKILLS</p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.25}>
              <h2 className="mt-3 md:mt-4 text-3xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-dark-text">
                Skills grouped by what they help you ship.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-3 md:mt-5 text-sm md:text-lg text-stone-600 dark:text-dark-muted leading-relaxed">
                A fast scan of the work I can do: build products, connect workflows, analyze data, and improve existing sites.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-5 md:mt-8 grid grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-2 md:gap-3">
                {quickStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl md:rounded-2xl border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-3 md:p-4"
                  >
                    <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] text-stone-500 dark:text-dark-muted">
                      {stat.label}
                    </p>
                    <p className="mt-1 text-xs md:text-sm font-semibold text-stone-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-8">
            <AnimatedElement animation="fade" delay={0.25}>
              <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4">
                {capabilityCards.map(({ icon: Icon, title, description, tags }) => (
                  <div
                    key={title}
                    className="group rounded-xl md:rounded-2xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-3 md:p-5 shadow-[0_8px_20px_rgba(0,0,0,0.05)] md:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.12)]"
                  >
                    <div className="inline-flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-lg bg-stone-900 text-white dark:bg-dark-accent">
                      <Icon className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                    <h3 className="mt-2 md:mt-4 text-sm md:text-xl font-semibold leading-tight text-stone-900 dark:text-white">
                      {title}
                    </h3>
                    <p className="mt-1.5 md:mt-2 text-[11px] md:text-sm leading-snug md:leading-relaxed text-stone-600 dark:text-dark-muted line-clamp-3">
                      {description}
                    </p>
                    <div className="mt-2 md:mt-4 hidden md:flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-stone-200/70 bg-white/60 px-2.5 py-1 text-xs font-medium text-stone-700 dark:border-white/10 dark:bg-dark-surface/40 dark:text-dark-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <div className="mt-4 md:mt-6 rounded-2xl md:rounded-3xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4 md:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                  <Wrench className="w-4 h-4 md:w-5 md:h-5" />
                  <h3 className="text-base md:text-xl font-semibold">Core Stack</h3>
                </div>
                <p className="mt-1 md:mt-2 text-xs md:text-sm text-stone-600 dark:text-dark-muted">
                  The tools behind the work, kept compact for quick scanning.
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
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
