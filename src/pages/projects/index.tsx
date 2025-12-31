import { useState, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, Github, ChevronDown, ChevronUp, X, ZoomIn } from 'lucide-react';
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
};

const PROJECTS: Project[] = [
  {
    title: 'Dr Metuse – Plastic Surgeon Website',
    description: 'A full management system + marketing website with an admin dashboard to control key site operations: bookings, appointments, blogs, inventory, and more. Includes payment gateway integration and tooling to manage the full workflow end-to-end.',
    image: '/images/drmetuse.webp',
    tags: ['TypeScript', 'React', 'Admin Dashboard', 'Full-Stack', 'Payment Gateway'],
    github: 'https://github.com/tinashechiraya/Dr.-Metuse-Application',
    demo: 'https://drmetuseplasticsurgeon.co.za/',
    color: 'from-rose-500/20 to-amber-500/20'
  },
  {
    title: 'Okra Advisory Website',
    description: 'A consulting business website built for clarity and conversion: polished brand presentation, responsive layout, and performance-focused UX for service discovery and lead generation.',
    image: '/images/okraadvisory.webp',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'MDX'],
    github: 'https://github.com/Tafaraa/okra-advisory',
    demo: 'https://okraadvisory.co.za/',
    color: 'from-emerald-500/20 to-cyan-500/20'
  },
  {
    title: 'BabyEmporium',
    description: 'An e-commerce storefront with an admin dashboard for managing inventory and orders. Designed for a smooth shopping experience while giving admins full operational control.',
    image: '/images/babyemporium.webp',
    tags: ['TypeScript', 'React', 'Admin Dashboard', 'Inventory', 'Orders'],
    github: 'https://github.com/Tafaraa/baby-emporium-v1',
    demo: 'https://babyemporium.netlify.app/',
    color: 'from-blue-500/20 to-purple-500/20'
  },
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with microservices architecture. Features include real-time patient management, secure payment processing and advanced analytics dashboard. Handles 100+ daily active users with 99.9% uptime.',
    image: '/images/rma.webp',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Payfast'],
    github: 'https://github.com/Tafaraa',
    demo: 'http://revivalmedicalaesthetics.com/',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'DollarNation Record Label Web App',
    description: 'A comprehensive web application for DollarNation Record Label featuring artist work, music services showcase, event management with booking system, and merchandise store. Built with modern React and TypeScript, the platform provides a complete digital presence for the record label with responsive design and seamless user experience.',
    image: '/images/dollarnation.webp',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'HTML', 'JavaScript'],
    github: 'https://github.com/Tafaraa',
    demo: 'http://dollarnation.co.za/',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'AI-Powered Developer Skill Analyzer – SkillLens',
    description: 'A smart web application designed to evaluate GitHub repositories and identify developer skill levels, tech stack diversity, and growth trends. Built with a modular backend and a sleek, responsive frontend, SkillLens provides real-time analysis, skill benchmarking, and personalized improvement suggestions. Future updates include automated job matching, collaborative comparisons, and AI-driven learning path recommendations.',
    image: '/images/SkillLens.webp',
    tags: ['React', 'TypeScript', 'FastAPI', 'Vercel', 'Tailwind CSS', 'Data Visualization'],
    github: 'https://github.com/Tafaraa',
    demo: 'https://skill-lens.vercel.app/',
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  {
    title: 'AI-Powered Fake News Detector',
    description: 'A sophisticated web application that leverages machine learning and natural language processing to detect misinformation in news articles. Features real-time analysis, user authentication and collaborative voting system.',
    image: '/images/fakenews.webp',
    tags: ['React', 'TypeScript', 'TensorFlow.js', 'Supabase', 'Tailwind CSS', 'Machine Learning'],
    github: 'https://github.com/Tafaraa/',
    demo: 'https://fakenewsdetectorx.netlify.app/',
    color: 'from-blue-500/20 to-purple-500/20'
  }
];

const Projects = () => {
  const projects = PROJECTS;

  const [showAll, setShowAll] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!lightboxProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxProject(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxProject]);

  const initialVisibleCount = 8;
  const visibleProjects = showAll ? projects : projects.slice(0, initialVisibleCount);

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
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
            className="mb-10 md:mb-14 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white">
              FEATURED WORK
            </h2>
            <p className="mt-4 text-stone-600 dark:text-gray-300 max-w-2xl mx-auto">
              A selection of recent projects with a focus on performance, clean UI, and measurable impact.
            </p>
          </motion.div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={showAll ? 'all' : 'partial'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {visibleProjects.map((project) => (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-2xl overflow-hidden border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_12px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_1px_0_rgba(255,255,255,0.65)_inset,0_22px_60px_rgba(0,0,0,0.18)] transition-shadow"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`absolute -inset-16 bg-gradient-to-br ${project.color ?? 'from-emerald-400/35 via-teal-400/15 to-blue-500/20'} blur-3xl opacity-60`} />
                  </div>
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10 dark:from-white/10 dark:to-black/30" />
                  </div>

                  <div className="relative">
                    <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-dark-surface">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                      <button
                        type="button"
                        onClick={() => setLightboxProject(project)}
                        className="absolute inset-0 z-10 cursor-zoom-in"
                        aria-label={`View ${project.title} image`}
                        title="View image"
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
                          View
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-snug">
                          {project.title}
                        </h3>

                        <div className="flex items-center -mr-2">
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
                            ? 'mt-3 text-sm text-stone-600 dark:text-gray-300 leading-relaxed'
                            : 'mt-3 text-sm text-stone-600 dark:text-gray-300 leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]'
                        }
                      >
                        {project.description}
                      </p>

                      <div className="mt-3">
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

                      <motion.div layout className="mt-5 flex flex-wrap gap-2">
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

          {projects.length > initialVisibleCount && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-stone-900 dark:text-white"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 blur" />
                <span className="absolute inset-0 rounded-full border border-stone-200/70 dark:border-white/10 bg-white/70 dark:bg-gray-950/40 backdrop-blur-xl transition-colors group-hover:bg-white/90 dark:group-hover:bg-gray-950/55" />
                <span className="relative">
                  {showAll ? 'Show less' : `Show more (${projects.length - visibleProjects.length})`}
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