import { useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Github, ChevronDown, ChevronUp, X, ZoomIn, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '../../components/ui/OptimizedImage';

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  color?: string;
  status?: string;
  result?: string;
};

const PROJECTS: Project[] = [
  {
    title: 'Dr Metuse – Plastic Surgeon Website',
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
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with microservices architecture. Features include real-time patient management, secure payment processing and advanced analytics dashboard. Handles 100+ daily active users with 99.9% uptime.',
    image: '/images/rma.webp',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Payfast'],
    github: 'https://github.com/Tafaraa',
    demo: 'http://revivalmedicalaesthetics.com/',
    color: 'from-emerald-500/20 to-teal-500/20',
    status: 'Medical platform',
    result: 'Patient workflows, payments, and analytics for daily operational use.'
  },
  {
    title: 'DollarNation Record Label Web App',
    description: 'A comprehensive web application for DollarNation Record Label featuring artist work, music services showcase, event management with booking system, and merchandise store. Built with modern React and TypeScript, the platform provides a complete digital presence for the record label with responsive design and seamless user experience.',
    image: '/images/dollarnation.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'JavaScript'],
    github: 'https://github.com/Tafaraa',
    demo: 'http://dollarnation.co.za/',
    color: 'from-emerald-500/20 to-teal-500/20',
    status: 'Creative platform',
    result: 'Artist showcase, services, bookings, events, and merchandise in one place.'
  },
  {
    title: 'AI-Powered Developer Skill Analyzer – SkillLens',
    description: 'A smart web application designed to evaluate GitHub repositories and identify developer skill levels, tech stack diversity, and growth trends. Built with a modular backend and a sleek, responsive frontend, SkillLens provides real-time analysis, skill benchmarking, and personalized improvement suggestions. Future updates include automated job matching, collaborative comparisons, and AI-driven learning path recommendations.',
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

const PROJECT_FILTERS = ['All', 'Client Sites', 'E-commerce', 'AI/Data', 'Dashboards'];

const Projects = () => {
  const projects = PROJECTS;

  const [showAll, setShowAll] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [detailProject, setDetailProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Client Sites') {
      return ['Client system', 'Business website', 'Medical platform', 'Creative platform'].includes(project.status ?? '');
    }
    if (selectedFilter === 'E-commerce') {
      return project.status === 'E-commerce' || project.tags.some((tag) => ['Orders', 'Inventory', 'Payfast', 'Payment Gateway'].includes(tag));
    }
    if (selectedFilter === 'AI/Data') {
      return project.status === 'AI product' || project.status === 'ML app' || project.tags.some((tag) => ['Machine Learning', 'Data Visualization', 'TensorFlow.js'].includes(tag));
    }
    if (selectedFilter === 'Dashboards') {
      return project.tags.some((tag) => ['Admin Dashboard', 'Data Visualization'].includes(tag));
    }
    return true;
  });

  const activeProject = filteredProjects[activeProjectIndex] ?? filteredProjects[0] ?? projects[0];

  useEffect(() => {
    if (!lightboxProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxProject]);

  useEffect(() => {
    if (!detailProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDetailProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [detailProject]);

  const openProjectPreview = (project: Project) => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      setDetailProject(project);
      return;
    }

    setLightboxProject(project);
  };

  useEffect(() => {
    setActiveProjectIndex(0);
    setShowAll(false);
  }, [selectedFilter]);

  useEffect(() => {
    if (activeProjectIndex <= filteredProjects.length - 1) return;
    setActiveProjectIndex(0);
  }, [activeProjectIndex, filteredProjects.length]);

  useEffect(() => {
    if (lightboxProject || filteredProjects.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveProjectIndex((index) => (index + 1) % filteredProjects.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [filteredProjects.length, lightboxProject]);

  const goToPreviousProject = () => {
    setActiveProjectIndex((index) => (index - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const goToNextProject = () => {
    setActiveProjectIndex((index) => (index + 1) % filteredProjects.length);
  };

  const initialVisibleCount = 8;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, initialVisibleCount);

  return (
    <section id="projects" className="relative py-12 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white dark:from-dark-surface dark:to-dark-card opacity-80" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-400/25 via-teal-400/15 to-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-400/20 via-rose-400/15 to-amber-300/20 blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 md:mb-14 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 dark:text-white">
              FEATURED WORK
            </h2>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-stone-600 dark:text-gray-300 max-w-2xl mx-auto">
              Recent builds that show the kind of problems I can solve: websites, systems, dashboards, e-commerce, and AI/data tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mb-5 md:mb-8 flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center"
          >
            {PROJECT_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                aria-pressed={selectedFilter === filter}
                className={`shrink-0 rounded-full border px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? 'border-stone-900 bg-stone-900 text-white shadow-lg shadow-stone-900/15 dark:border-white dark:bg-white dark:text-gray-950'
                    : 'border-stone-200/80 bg-white/70 text-stone-700 hover:border-stone-900 hover:text-stone-900 dark:border-white/10 dark:bg-gray-950/40 dark:text-gray-300 dark:hover:border-white dark:hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>

          {activeProject && (
            <motion.div
              key={`${selectedFilter}-${activeProject.title}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-6 md:mb-14 rounded-2xl md:rounded-[1.5rem] border border-stone-200/70 bg-white/70 p-2 md:p-3 shadow-[0_18px_60px_rgba(0,0,0,0.12)] md:shadow-[0_24px_90px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/40"
            >
              <div className="grid gap-0 md:gap-5 overflow-hidden rounded-xl md:rounded-[1.2rem] bg-stone-950 text-white lg:grid-cols-[1.1fr_0.9fr]">
                <div className="relative min-h-[10rem] md:min-h-[19rem] overflow-hidden lg:min-h-[26rem]">
                  <div className={`absolute -inset-24 bg-gradient-to-br ${activeProject.color ?? 'from-emerald-500/20 to-blue-500/20'} blur-3xl`} />
                  <div className="absolute inset-0 transition-transform duration-[1800ms] ease-out hover:scale-105">
                    <OptimizedImage
                      src={activeProject.image}
                      alt={activeProject.title}
                      className="h-full w-full opacity-90"
                      objectFit="cover"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                  <div className="absolute left-3 top-3 md:left-4 md:top-4 inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-white/15 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-semibold backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    Project spotlight
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex flex-wrap items-center gap-1.5 md:gap-2">
                    {(activeProject.tags.slice(0, 4)).map((tag) => (
                      <span key={tag} className="rounded-full bg-white/15 px-2 md:px-3 py-1 text-[10px] md:text-xs font-medium backdrop-blur">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between p-4 sm:p-8">
                  <div>
                    <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] md:tracking-[0.25em] text-white/60">
                      {activeProject.status}
                    </p>
                    <h3 className="mt-2 md:mt-4 text-xl md:text-3xl font-bold leading-tight sm:text-4xl">
                      {activeProject.title}
                    </h3>
                    <p className="mt-2 md:mt-5 text-sm md:text-base leading-snug md:leading-relaxed text-white/75 line-clamp-2 md:line-clamp-none">
                      {activeProject.result ?? activeProject.description}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-8">
                    <div className="flex flex-row gap-2 md:gap-3">
                      <a
                        href={activeProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-full bg-white px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-semibold text-stone-950 transition-colors hover:bg-stone-100"
                      >
                        Open
                        <ExternalLink size={15} />
                      </a>
                      <button
                        type="button"
                        onClick={() => setLightboxProject(activeProject)}
                        className="inline-flex flex-1 items-center justify-center gap-1.5 md:gap-2 rounded-full border border-white/20 bg-white/10 px-3 md:px-5 py-2 md:py-3 text-xs md:text-sm font-semibold text-white transition-colors hover:bg-white/15"
                      >
                        Preview
                        <ZoomIn size={15} />
                      </button>
                    </div>

                    <div className="mt-4 md:mt-6 flex items-center justify-between gap-4">
                      <div className="text-xs md:text-sm text-white/55">
                        {String(activeProjectIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={goToPreviousProject}
                          className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition-colors hover:bg-white/15"
                          aria-label="Show previous project"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={goToNextProject}
                          className="inline-flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 transition-colors hover:bg-white/15"
                          aria-label="Show next project"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-5 flex gap-2 overflow-x-auto pb-1">
                      {filteredProjects.map((project, index) => (
                        <button
                          key={project.title}
                          type="button"
                          onClick={() => setActiveProjectIndex(index)}
                          className={`h-2.5 shrink-0 rounded-full transition-all ${
                            index === activeProjectIndex ? 'w-10 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'
                          }`}
                          aria-label={`Show ${project.title}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${selectedFilter}-${showAll ? 'all' : 'partial'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 [perspective:1200px]"
            >
              {visibleProjects.map((project) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
                  className="group relative rounded-xl md:rounded-2xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_8px_18px_rgba(0,0,0,0.06)] md:shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_28px_70px_rgba(0,0,0,0.22)] transition-shadow [transform-style:preserve-3d]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute -inset-16 bg-gradient-to-br ${project.color ?? 'from-emerald-400/35 via-teal-400/15 to-blue-500/20'} blur-3xl opacity-60`} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10 dark:from-white/10 dark:to-black/30" />
                  </div>

                  <div className="relative">
                    <div className="relative aspect-square md:aspect-video overflow-hidden bg-stone-100 dark:bg-dark-surface">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                      <button
                        type="button"
                        onClick={() => openProjectPreview(project)}
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        aria-label={`View ${project.title} details`}
                        title="View project"
                      />
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                        <OptimizedImage
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full"
                          objectFit="cover"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur px-3 py-1.5 text-white text-xs font-medium">
                          <ZoomIn className="w-4 h-4" />
                          <span className="hidden md:inline">View</span>
                        </div>
                      </div>
                      {project.status && (
                        <div className="absolute left-1.5 top-1.5 md:left-3 md:top-3 rounded-full bg-white/90 px-1.5 md:px-3 py-0.5 md:py-1 text-[8px] md:text-xs font-semibold text-stone-900 shadow-sm backdrop-blur dark:bg-gray-950/80 dark:text-white">
                          {project.status}
                        </div>
                      )}
                    </div>

                    <div className="p-2 md:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-[11px] md:text-lg font-bold text-stone-900 dark:text-white leading-tight md:leading-snug line-clamp-2">
                          {project.title}
                        </h3>

                        <div className="hidden md:flex items-center -mr-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-stone-600 hover:text-stone-900 dark:text-gray-300 dark:hover:text-white transition-colors hover:bg-stone-100 dark:hover:bg-dark-border/50 rounded-full"
                            aria-label={`Open ${project.title} source code`}
                            title="View Source"
                          >
                            <Github size={18} />
                          </a>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-stone-600 hover:text-stone-900 dark:text-gray-300 dark:hover:text-white transition-colors hover:bg-stone-100 dark:hover:bg-dark-border/50 rounded-full"
                            aria-label={`Open ${project.title} live demo`}
                            title="Take a Look"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>

                      <p
                        className={
                          expandedDescriptions[project.title]
                            ? 'hidden md:block mt-3 text-sm text-stone-600 dark:text-gray-300 leading-relaxed'
                            : 'hidden md:block mt-3 text-sm text-stone-600 dark:text-gray-300 leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]'
                        }
                      >
                        {project.description}
                      </p>

                      {project.result && (
                        <div className="hidden md:block mt-4 rounded-lg border border-stone-200/70 bg-stone-50/80 p-3 text-sm font-medium leading-relaxed text-stone-800 dark:border-white/10 dark:bg-white/5 dark:text-white">
                          Result: {project.result}
                        </div>
                      )}

                      <div className="hidden md:block mt-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedDescriptions((prev) => ({
                              ...prev,
                              [project.title]: !prev[project.title]
                            }))
                          }
                          aria-expanded={!!expandedDescriptions[project.title]}
                          className="text-sm font-medium text-stone-900/80 hover:text-stone-900 dark:text-white/80 dark:hover:text-white transition-colors underline underline-offset-4"
                        >
                          {expandedDescriptions[project.title] ? 'View less' : 'View more'}
                        </button>
                      </div>

                      <motion.div layout className="hidden md:flex mt-5 flex-wrap gap-2">
                        {(expandedDescriptions[project.title] ? project.tags : project.tags.slice(0, 4)).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium text-stone-700 dark:text-white bg-stone-100/80 dark:bg-dark-surface/60 rounded-full border border-stone-200/70 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                        {!expandedDescriptions[project.title] && project.tags.length > 4 && (
                          <span className="px-3 py-1 text-xs font-medium text-stone-700 dark:text-white bg-stone-100/80 dark:bg-dark-surface/60 rounded-full border border-stone-200/70 dark:border-white/10">
                            +{project.tags.length - 4}
                          </span>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length > initialVisibleCount && (
            <div className="mt-6 md:mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-stone-900 dark:text-white"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 blur" />
                <span className="absolute inset-0 rounded-full border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl transition-colors group-hover:bg-white/90 dark:group-hover:bg-gray-950/55" />
                <span className="relative">
                  {showAll ? 'Show less' : `Show more (${filteredProjects.length - visibleProjects.length})`}
                </span>
                <span className="relative">
                  {showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </button>
            </div>
          )}

          <div className="mt-16 text-center">
            <a 
              href="https://github.com/Tafaraa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full border border-stone-900/15 dark:border-white/15 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl text-stone-900 dark:text-white hover:bg-white/90 dark:hover:bg-gray-950/55 transition-colors whitespace-nowrap md:w-auto min-w-0 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
            >
              <span>View More on GitHub</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detailProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-3 flex items-end md:hidden"
            onClick={() => setDetailProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${detailProject.title} project details`}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.2 }}
              className="max-h-[88vh] w-full overflow-y-auto rounded-2xl border border-white/10 bg-white text-stone-900 shadow-[0_25px_80px_rgba(0,0,0,0.45)] dark:bg-gray-950 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video overflow-hidden rounded-t-2xl bg-stone-100 dark:bg-dark-surface">
                <OptimizedImage
                  src={detailProject.image}
                  alt={detailProject.title}
                  className="h-full w-full"
                  objectFit="cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {detailProject.status && (
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-900">
                    {detailProject.status}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setDetailProject(null)}
                  className="absolute right-3 top-3 rounded-full bg-black/45 p-2 text-white backdrop-blur"
                  aria-label="Close project details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-2xl font-bold leading-tight">{detailProject.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-gray-300">
                  {detailProject.description}
                </p>

                {detailProject.result && (
                  <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm font-medium leading-relaxed text-stone-800 dark:border-white/10 dark:bg-white/5 dark:text-white">
                    Result: {detailProject.result}
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {detailProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <a
                    href={detailProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-4 py-3 text-sm font-semibold text-white dark:bg-white dark:text-gray-950"
                  >
                    Live site
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={detailProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-900 dark:border-white/15 dark:text-white"
                  >
                    Source
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-3 sm:p-6 flex items-center justify-center"
            onClick={() => setLightboxProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxProject.title} image preview`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
                <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-white truncate">
                      {lightboxProject.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightboxProject(null)}
                    className="shrink-0 inline-flex items-center justify-center rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Close image preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-black/20">
                  <div className="w-full max-h-[75vh]">
                    <OptimizedImage
                      src={lightboxProject.image}
                      alt={lightboxProject.title}
                      className="w-full h-full"
                      objectFit="contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
