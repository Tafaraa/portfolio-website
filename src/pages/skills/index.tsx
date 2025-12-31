// No React import needed with modern JSX transform
import AnimatedElement from '../../components/ui/AnimatedElement';
import { Brain, Code2, Database, Wrench } from 'lucide-react';

const Skills = () => {
  const technicalSkills = [
    { name: 'Python', level: 90 },
    { name: 'JavaScript/TypeScript', level: 85 },
    { name: 'React', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'SQL', level: 85 },
    { name: 'Machine Learning', level: 80 },
    { name: 'Data Analysis', level: 85 },
    { name: 'Git/GitHub', level: 90 },
  ];

  const otherSkills = [
    'Data Visualization',
    'Statistical Analysis',
    'Deep Learning',
    'RESTful APIs',
    'Docker',
    'AWS',
    'MongoDB',
    'TensorFlow',
    'PyTorch',
    'Pandas',
    'NumPy',
    'Scikit-learn',
  ];

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-stone-50 to-white dark:from-dark-surface dark:to-dark-card" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/15 via-emerald-400/10 to-blue-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/15 via-rose-400/10 to-amber-300/10 blur-3xl" />

      <div className="container relative mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <AnimatedElement animation="slide-in" delay={0.15}>
              <p className="text-sm font-medium tracking-[0.25em] text-stone-500 dark:text-dark-muted">SKILLS</p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.25}>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-dark-text">
                A toolkit built for shipping.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-5 text-lg text-stone-600 dark:text-dark-muted leading-relaxed">
                Strong fundamentals across full-stack development and data science, with an emphasis on clean UX, performance, and maintainable systems.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                    <Code2 className="w-4 h-4" />
                    Engineering
                  </div>
                  <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">Web, APIs, systems</p>
                </div>
                <div className="rounded-2xl border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                    <Brain className="w-4 h-4" />
                    Data
                  </div>
                  <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">ML, analytics</p>
                </div>
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedElement animation="fade" delay={0.25}>
                <div className="group relative rounded-3xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute -inset-16 bg-gradient-to-br from-stone-200/30 via-emerald-200/10 to-blue-200/20 blur-3xl" />
                  </div>
                  <div className="relative">
                    <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                      <Wrench className="w-5 h-5" />
                      <h3 className="text-xl font-semibold">Core Proficiency</h3>
                    </div>
                    <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">
                      Depth where it matters most.
                    </p>

                    <div className="mt-6 space-y-6">
                      {technicalSkills.map((skill) => (
                        <div key={skill.name} className="group/skill">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-stone-900 dark:text-white">
                              {skill.name}
                            </span>
                            <span className="text-xs font-medium text-stone-500 dark:text-dark-muted">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="mt-2 h-2 rounded-full bg-stone-200/80 dark:bg-dark-border overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-700 dark:from-dark-accent dark:via-dark-accent/90 dark:to-dark-accent/70 transition-[width] duration-700 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement animation="fade" delay={0.32}>
                <div className="rounded-3xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-white">
                    <Database className="w-5 h-5" />
                    <h3 className="text-xl font-semibold">Additional Skills</h3>
                  </div>
                  <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">
                    Tools, frameworks, and platforms I use regularly.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {otherSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-2 rounded-full text-sm font-medium border border-stone-200/70 dark:border-white/10 bg-white/60 dark:bg-dark-surface/40 text-stone-800 dark:text-dark-text hover:bg-white/90 dark:hover:bg-dark-surface/60 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl border border-stone-200/70 dark:border-white/10 bg-gradient-to-br from-stone-50/70 via-white/40 to-white/10 dark:from-dark-surface/50 dark:via-gray-950/30 dark:to-gray-950/10 p-5">
                    <h4 className="text-base font-semibold text-stone-900 dark:text-white">
                      Education
                    </h4>
                    <p className="mt-2 text-sm text-stone-600 dark:text-dark-muted">
                      Computer Science Graduate & Data Science student
                    </p>
                    <div className="mt-3 text-sm text-stone-700 dark:text-dark-text">
                      <p className="font-medium">Eduvos</p>
                      <p className="mt-1">BSc. Graduate pursuing Honors</p>
                      <p className="mt-2 text-stone-600 dark:text-dark-muted">
                        Completed my degree with a focus on software development and currently a data science student,
                        pursuing honors.
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;