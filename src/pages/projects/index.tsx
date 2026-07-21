import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, ChevronsDown, ChevronUp, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import OptimizedImage from '../../components/ui/OptimizedImage';

type Project = {
  title: string;
  summary: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  color?: string;
  status?: string;
  result?: string;
  live?: boolean;
  offlineNote?: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Dr Metuse – Plastic Surgeon Website',
    summary: 'Marketing website plus a full clinic management system. Bookings, blogs, inventory and payments all run from one admin dashboard.',
    description: 'A full management system + marketing website with an admin dashboard to control key site operations: bookings, appointments, blogs, inventory, and more. Includes payment gateway integration and tooling to manage the full workflow end-to-end.',
    image: '/images/drmetuse.webp',
    tags: ['TypeScript', 'React', 'Admin Dashboard', 'Full-Stack', 'Payment Gateway'],
    github: 'https://github.com/tinashechiraya/Dr.-Metuse-Application',
    demo: 'https://drmetuseplasticsurgeon.co.za/',
    color: 'from-rose-500/20 to-amber-500/20',
    status: 'Client system',
    result: 'Bookings, content, payments, and operations managed from one dashboard.'
  },
  {
    title: 'Okra Advisory Website',
    summary: "A consulting firm's website built for credibility and conversion. Clean brand presentation with clear paths to enquiry.",
    description: 'A consulting business website built for clarity and conversion: polished brand presentation, responsive layout, and performance-focused UX for service discovery and lead generation.',
    image: '/images/okraadvisory.webp',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    github: 'https://github.com/Tafaraa/okra-advisory',
    demo: 'https://okraadvisory.co.za/',
    color: 'from-emerald-500/20 to-cyan-500/20',
    status: 'Business website',
    result: 'Clear service discovery and a polished first impression for consulting leads.'
  },
  {
    title: 'BabyEmporium',
    summary: 'An online baby store with WhatsApp ordering for quick checkout. Admins manage stock and orders from a simple dashboard.',
    description: 'An e-commerce storefront with an admin dashboard for managing inventory and orders, plus WhatsApp ordering for quick customer orders. Designed for a smooth shopping experience while giving admins full operational control.',
    image: '/images/babyemporium.webp',
    tags: ['TypeScript', 'React', 'Admin Dashboard', 'Inventory', 'Orders'],
    github: 'https://github.com/Tafaraa/baby-emporium-v1',
    demo: 'https://www.babyemporium.co.zw/',
    color: 'from-blue-500/20 to-purple-500/20',
    status: 'E-commerce',
    result: 'Storefront, inventory flow, orders, and WhatsApp customer ordering.'
  },
  {
    title: 'Revival Medical Aesthetics',
    summary: 'A clinic booking platform with secure card payments. Patient records, schedule and payments in one admin view.',
    description: 'A booking and management platform for a medical aesthetics clinic. Clients book consultations and appointments online, pay securely by card, and the clinic runs the whole day from one admin dashboard: patient records, schedule, and payments in one place.',
    image: '/images/rma.webp',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Payfast', 'Admin Dashboard'],
    github: 'https://github.com/Tafaraa',
    demo: 'https://revivalmedicalaesthetics.com/',
    color: 'from-emerald-500/20 to-teal-500/20',
    status: 'Medical platform',
    result: 'Online bookings, card payments, patient records, and clinic operations from one dashboard.',
    live: false,
    offlineNote: "The live site is paused while the owner sorts out hosting. The build is done and working, and I can give you a private walkthrough anytime."
  },
  {
    title: 'DollarNation Record Label Web App',
    summary: "A record label's full digital home. Artist showcase, events, bookings and merchandise in one web app.",
    description: 'A comprehensive web application for DollarNation Record Label featuring artist work, music services showcase, event management with booking system, and merchandise store.',
    image: '/images/dollarnation.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'JavaScript'],
    github: 'https://github.com/Tafaraa',
    demo: 'http://dollarnation.co.za/',
    color: 'from-emerald-500/20 to-teal-500/20',
    status: 'Creative platform',
    result: 'Artist showcase, services, bookings, events, and merchandise in one place.'
  },
  {
    title: 'SkillLens – AI Developer Skill Analyzer',
    summary: 'AI that reads GitHub repositories and maps developer skill. Real-time analysis, benchmarks and growth suggestions.',
    description: 'A smart web application designed to evaluate GitHub repositories and identify developer skill levels, tech stack diversity, and growth trends. Provides real-time analysis, skill benchmarking, and personalized improvement suggestions.',
    image: '/images/SkillLens.webp',
    tags: ['React', 'TypeScript', 'FastAPI', 'Vercel', 'Tailwind CSS', 'Data Visualization'],
    github: 'https://github.com/Tafaraa',
    demo: 'https://skill-lens.vercel.app/',
    color: 'from-emerald-500/20 to-teal-500/20',
    status: 'AI product',
    result: 'Turns repository activity into skill insights, benchmarks, and growth signals.'
  },
  {
    title: 'AI-Powered Fake News Detector',
    summary: 'A machine learning app that flags misinformation in news articles. Real-time analysis with accounts and community voting.',
    description: 'A sophisticated web application that leverages machine learning and natural language processing to detect misinformation in news articles. Features real-time analysis, user authentication and collaborative voting system.',
    image: '/images/fakenews.webp',
    tags: ['React', 'TypeScript', 'TensorFlow.js', 'Supabase', 'Tailwind CSS', 'Machine Learning'],
    github: 'https://github.com/Tafaraa/',
    demo: 'https://fakenewsdetectorx.netlify.app/',
    color: 'from-blue-500/20 to-purple-500/20',
    status: 'ML app',
    result: 'Real-time article analysis with authentication and collaborative voting.'
  }
];

const ProjectLinks = ({ project }: { project: Project }) => (
  <div className="flex flex-row gap-2 md:gap-3">
    {project.live === false ? (
      <span
        className="inline-flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-full bg-white/20 px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white/70"
        title="The live site is temporarily offline"
      >
        Site offline
      </span>
    ) : (
      <a
        href={project.demo}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-stone-950 transition-colors hover:bg-stone-100"
      >
        Visit site
        <ExternalLink size={15} />
      </a>
    )}
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 md:px-5 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-white transition-colors hover:bg-white/15"
    >
      Source
      <Github size={15} />
    </a>
  </div>
);

const Projects = () => {
  const projects = PROJECTS;
  const total = projects.length;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const allProjectsRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: allProjectsScrollProgress } = useScroll({
    target: allProjectsRef,
    offset: ['start end', 'end start']
  });
  const parallaxY = useTransform(allProjectsScrollProgress, [0, 1], ['-7%', '7%']);

  // Preload every project image so nothing pops in blank mid-scroll
  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll position maps 1:1 to horizontal progress. Measured fresh on every
  // scroll event, so it survives layout shifts, reverses when scrolling up,
  // and always resumes exactly where the visitor left off.
  useEffect(() => {
    const update = () => {
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!wrapper || !track) return;

      const rect = wrapper.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const position = progress * (total - 1);

      track.style.transform = `translate3d(${(-position * 100).toFixed(4)}vw, 0, 0)`;
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      // Fade + scale each panel based on its distance from centre stage
      for (let i = 0; i < total; i++) {
        const distance = Math.min(1, Math.abs(position - i));
        const imageEl = imageRefs.current[i];
        const textEl = textRefs.current[i];
        if (imageEl) {
          imageEl.style.opacity = String(1 - distance * 0.85);
          const inner = imageEl.firstElementChild as HTMLElement | null;
          if (inner) inner.style.transform = `scale(${1 + distance * 0.08})`;
        }
        if (textEl) {
          textEl.style.opacity = String(1 - distance);
          textEl.style.transform = `translateY(${distance * 32}px)`;
        }
      }

      const index = Math.round(position);
      if (index !== currentRef.current) {
        currentRef.current = index;
        setCurrent(index);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [total]);

  const wrapperTop = () => {
    const wrapper = wrapperRef.current;
    return wrapper ? window.scrollY + wrapper.getBoundingClientRect().top : 0;
  };

  const scrollToProject = (i: number) => {
    window.scrollTo({ top: wrapperTop() + i * window.innerHeight, behavior: 'smooth' });
  };

  const skipSection = () => {
    document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAllProjects = () => {
    setShowAll(true);
    requestAnimationFrame(() => {
      document.getElementById('all-projects')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <>
      {/* Pinned stage: swiping/scrolling down moves sideways through every project, then releases into normal scroll */}
      <div
        id="projects"
        ref={wrapperRef}
        className="relative bg-stone-950"
        style={{ height: `${total * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Progress bar across the very top */}
          <div
            ref={progressBarRef}
            className="absolute left-0 top-0 z-20 h-1 w-full origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 [transform:scaleX(0)]"
          />

          {/* Top bar: section label + view all */}
          <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 pt-5 md:px-12 md:pt-7">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 md:text-sm">
              Featured work
            </h2>
            <button
              type="button"
              onClick={openAllProjects}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-colors hover:bg-white/20 md:px-5 md:py-2.5 md:text-sm"
            >
              View all projects
              <ChevronDown size={15} />
            </button>
          </div>

          {/* The horizontal track */}
          <div ref={trackRef} className="flex h-full will-change-transform">
            {projects.map((project, index) => (
              <div key={project.title} className="relative flex h-screen w-screen shrink-0 items-center overflow-hidden">
                <div className={`pointer-events-none absolute -inset-32 bg-gradient-to-br ${project.color ?? 'from-emerald-500/20 to-blue-500/20'} blur-3xl`} />

                <div className="container relative mx-auto grid grid-cols-1 items-center gap-5 px-6 pt-14 pb-36 md:gap-10 md:px-12 md:pt-0 md:pb-0 lg:grid-cols-[1.15fr_0.85fr]">
                  <div
                    ref={(el) => { imageRefs.current[index] = el; }}
                    className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
                  >
                    <div className="aspect-video">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full"
                        objectFit="cover"
                        priority={index === 0}
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {project.live === false && (
                      <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-amber-500/95 px-3 py-1 text-xs font-semibold text-stone-950">
                        <span className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                        Offline
                      </div>
                    )}
                  </div>

                  <div ref={(el) => { textRefs.current[index] = el; }}>
                    <p className="flex items-baseline gap-3 text-xs font-medium uppercase tracking-[0.25em] text-white/50 md:text-sm">
                      <span className="text-xl font-bold text-white/80 md:text-2xl">{String(index + 1).padStart(2, '0')}</span>
                      <span>/ {String(total).padStart(2, '0')}</span>
                      {project.status && <span className="ml-2">{project.status}</span>}
                    </p>
                    <h3 className="mt-2 text-xl font-bold leading-tight text-white sm:text-2xl md:mt-4 md:text-4xl lg:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75 md:mt-5 md:text-lg">
                      {project.summary}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 md:mt-5">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.live === false && project.offlineNote && (
                      <div className="mt-3 hidden max-w-xl items-start gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-4 py-3 text-xs text-amber-100 sm:flex md:mt-5 md:text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                        <span>{project.offlineNote}</span>
                      </div>
                    )}

                    <div className="mt-5 max-w-md md:mt-7">
                      <ProjectLinks project={project} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom controls: one centered pill, clear of the chat launcher (bottom-left)
              and the scroll-to-top button (bottom-right) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 flex justify-center pb-20 md:pb-6">
            <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-stone-950/60 px-3.5 py-2 backdrop-blur-xl md:gap-4 md:px-5 md:py-2.5">
              <div className="text-xs font-medium text-white/60 md:text-sm">
                {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>

              <div className="flex items-center gap-1.5 md:gap-2">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    onClick={() => scrollToProject(i)}
                    className={`h-2 rounded-full transition-all md:h-2.5 ${
                      i === current ? 'w-7 bg-white md:w-9' : 'w-2 bg-white/30 hover:bg-white/60 md:w-2.5'
                    }`}
                    aria-label={`Go to ${p.title}`}
                    aria-current={i === current}
                  />
                ))}
              </div>

              <div className="hidden items-center gap-1.5 sm:flex">
                <button
                  type="button"
                  onClick={() => scrollToProject(Math.max(0, current - 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:h-9 md:w-9"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToProject(Math.min(total - 1, current + 1))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 md:h-9 md:w-9"
                  aria-label="Next project"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={skipSection}
                className="group inline-flex animate-pulse items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/60 backdrop-blur transition-all hover:animate-none hover:bg-white/20 hover:text-white md:px-4 md:py-2 md:text-sm"
                aria-label="Skip to the all projects section"
              >
                Skip
                <ChevronsDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* All projects: normal-flow section right after the horizontal stage */}
      <section
        id="all-projects"
        ref={allProjectsRef}
        className="relative isolate overflow-hidden bg-stone-100 py-20 md:py-28"
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-6 -inset-y-[18%] -z-20 overflow-hidden will-change-transform md:-inset-x-12"
          style={{ y: prefersReducedMotion ? 0 : parallaxY }}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet="/images/projects-parallax-bg.webp" />
            <img
              src="/images/projects-parallax-bg-mobile.webp"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </motion.div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(250,250,249,0.78),rgba(250,250,249,0.46)_48%,rgba(250,250,249,0.82))]" aria-hidden="true" />
        <div className="container relative mx-auto px-6 md:px-12">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-700/70 md:text-sm">
              Beyond the spotlight
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-stone-950 md:text-5xl">
              Explore the full build archive.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-stone-600 md:text-base">
              More client platforms, experiments, data products, and engineering work live here.
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 rounded-full border border-stone-900/15 bg-white/75 px-6 py-3 text-sm font-semibold text-stone-900 shadow-[0_16px_50px_rgba(28,25,23,0.12)] backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-white"
            >
              {showAll ? 'Hide all projects' : 'View all projects'}
              {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                key="all-projects-grid"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="mt-10 grid grid-cols-1 gap-4 rounded-3xl border border-white/10 bg-stone-950/90 p-4 shadow-[0_28px_90px_rgba(28,25,23,0.24)] backdrop-blur-xl sm:grid-cols-2 sm:p-5 lg:grid-cols-3 md:gap-6 md:p-6">
                  {projects.map((p, i) => (
                    <motion.article
                      key={p.title}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
                    >
                      <button
                        type="button"
                        onClick={() => scrollToProject(i)}
                        className="relative block aspect-video w-full overflow-hidden text-left"
                        aria-label={`Spotlight ${p.title}`}
                      >
                        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                          <OptimizedImage
                            src={p.image}
                            alt={p.title}
                            className="h-full w-full"
                            objectFit="cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        {p.status && (
                          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-stone-900 md:text-xs">
                            {p.status}
                          </span>
                        )}
                        {p.live === false && (
                          <span className="absolute right-3 top-3 rounded-full bg-amber-500/95 px-2.5 py-1 text-[10px] font-semibold text-stone-950 md:text-xs">
                            Offline
                          </span>
                        )}
                      </button>
                      <div className="p-4 md:p-5">
                        <h3 className="text-base font-bold leading-tight text-white md:text-lg">{p.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-white/70 md:text-sm line-clamp-3">
                          {p.summary}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/75 md:text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4">
                          <ProjectLinks project={p} />
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 text-center md:mt-12">
            <a
              href="https://github.com/Tafaraa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-stone-950 bg-stone-950 px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_50px_rgba(28,25,23,0.2)] transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
            >
              <span>View More on GitHub</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
