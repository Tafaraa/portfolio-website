import { useState } from 'react';
import { ArrowUpRight, ExternalLink, Github, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from './OptimizedImage';

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

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'AI-Powered Fake News Detector',
      description: 'A sophisticated web application that leverages machine learning and natural language processing to detect misinformation in news articles. Features real-time analysis, user authentication and collaborative voting system.',
      image: '/images/fakenews.webp',
      tags: [
        'React',
        'TypeScript',
        'TensorFlow.js',
        'Supabase',
        'Tailwind CSS',
        'Machine Learning'
      ],
      github: 'https://github.com/Tafaraa/',
      demo: 'https://fakenewsdetector.vercel.app/',
      color: 'from-blue-500/20 to-purple-500/20'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with microservices architecture. Features include real-time patient management, secure payment processing and advanced analytics dashboard. Handles 100+ daily active users with 99.9% uptime.',
      image: '/images/rma.webp',
      tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/Tafaraa',
      demo: 'http://revivalmedicalaesthetics.com/',
      color: 'from-emerald-500/20 to-teal-500/20'
    }
  ];

  const [activeProject, setActiveProject] = useState(0);

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };



  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white dark:from-dark-surface dark:to-dark-card opacity-80" />

      <div className="container relative mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-16 text-stone-900 dark:text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          FEATURED WORK
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">

          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${projects[activeProject].color} blur-3xl opacity-20 dark:opacity-10`} />
              
              <div className="relative bg-white/90 dark:bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-stone-100 dark:border-gray-800">
                <div className="md:grid md:grid-cols-2 gap-0">
                  <div className="relative h-full overflow-hidden">
                    <motion.div
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      <OptimizedImage
                        src={projects[activeProject].image}
                        alt={projects[activeProject].title}
                        className="w-full h-full transition-transform duration-500"
                        objectFit="cover"
                        width={600}
                        height={400}
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                          {projects[activeProject].title}
                        </h3>
                        <div className="flex space-x-1">
                          <a
                            href={projects[activeProject].github}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-stone-600 hover:text-stone-900 dark:text-gray-300 dark:hover:text-white transition-colors hover:bg-stone-100 dark:hover:bg-dark-border/50 rounded-full"
                            title="View Source"
                          >
                            <Github size={20} />
                          </a>
                          <a
                            href={projects[activeProject].demo}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2 text-stone-600 hover:text-stone-900 dark:text-gray-300 dark:hover:text-white transition-colors hover:bg-stone-100 dark:hover:bg-dark-border/50 rounded-full"
                            title="Take a Look"
                          >
                            <ExternalLink size={20} />
                          </a>
                        </div>
                      </div>

                      <p className="text-lg text-stone-600 dark:text-gray-300 mb-8">
                        {projects[activeProject].description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {projects[activeProject].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-4 py-1.5 text-sm font-medium text-stone-700 dark:text-white bg-stone-100 dark:bg-dark-surface/80 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-gray-700">
                        <button
                          onClick={prevProject}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-stone-700 hover:text-stone-900 dark:text-white transition-all shadow-sm hover:shadow"
                          aria-label="Previous project"
                        >
                          <ArrowLeft size={20} />
                          <span className="font-medium">Previous</span>
                        </button>
                        <button
                          onClick={nextProject}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-stone-700 hover:text-stone-900 dark:text-white transition-all shadow-sm hover:shadow"
                          aria-label="Next project"
                        >
                          <span className="font-medium">Next</span>
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Project indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeProject 
                    ? 'bg-stone-800 dark:bg-white w-10 shadow-md' 
                    : 'bg-stone-300 dark:bg-gray-600 w-3 hover:bg-stone-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com/Tafaraa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 border border-primary-50 px-8 py-4 text-primary-50 hover:bg-primary-50 hover:text-primary-900 transition-colors"
          >
            <span>View More on GitHub</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;