import { ArrowRight, FileDown } from 'lucide-react';
import AnimatedElement from '../../components/ui/AnimatedElement';

const About = () => {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden bg-primary-900 text-primary-50">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500/25 via-accent-emerald/15 to-primary-200/10 blur-3xl" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-accent-rose/20 via-accent-amber/10 to-primary-400/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <AnimatedElement animation="slide-in" delay={0.1}>
              <p className="text-sm font-medium tracking-[0.25em] text-primary-200/90">
                ABOUT
              </p>
            </AnimatedElement>

            <AnimatedElement animation="slide-in" delay={0.2}>
              <h2 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Building products at the intersection of software and data.
              </h2>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.35}>
              <p className="mt-6 text-lg text-primary-100 leading-relaxed max-w-xl">
                I support businesses and organizations with modern, performance-focused web applications and data-driven systems that are easy to use and built to scale.
              </p>
            </AnimatedElement>

            <AnimatedElement animation="fade" delay={0.45}>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="/resume.pdf"
                  download="Tafara_Mutsvedu_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-50 text-primary-900 px-7 py-3.5 font-medium transition-colors hover:bg-white"
                >
                  <FileDown size={18} />
                  Download CV
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-100/40 bg-white/5 px-7 py-3.5 font-medium text-primary-50 hover:bg-white/10 transition-colors"
                >
                  View work
                  <ArrowRight size={18} />
                </a>
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-7">
            <AnimatedElement animation="fade" delay={0.25}>
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-transparent to-black/20" />

                <div className="relative space-y-6">
                  <p className="text-lg sm:text-xl leading-relaxed text-primary-100">
                    I'm a software engineer and data scientist who crafts innovative solutions to complex problems. My work spans from creating intuitive web applications to extracting valuable insights from data, blending technical expertise with creative problem-solving.
                  </p>

                  <p className="text-lg sm:text-xl leading-relaxed text-primary-100">
                    With a background rooted in computer science and a keen interest in emerging technologies, I've built a career transforming concepts into practical applications. I excel in collaborative environments and enjoy tackling challenges that require both analytical thinking and innovative approaches.
                  </p>

                  <p className="text-lg sm:text-xl leading-relaxed text-primary-100">
                    Professional growth drives me to continuously expand my technical skills while delivering exceptional results. I focus on creating scalable, efficient solutions that generate real value for businesses and users alike, with a commitment to quality that shows in everything I build.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {['Full-Stack Engineering', 'Data Science', 'Performance-First UX', 'Clean UI'].map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-primary-50/90"
                      >
                        {pill}
                      </span>
                    ))}
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

export default About;