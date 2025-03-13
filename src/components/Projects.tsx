import React from 'react';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'AI-Powered Fake News Detector',
      description: 'A sophisticated web application that leverages machine learning and natural language processing to detect misinformation in news articles. Features real-time analysis, user authentication and collaborative voting system.',
      image: '/images/fakenews.png',
      tags: [
        'React',
        'TypeScript',
        'TensorFlow.js',
        'Supabase',
        'Tailwind CSS',
        'Machine Learning'
      ],
      github: 'https://github.com/Tafaraa/fake-news-detector',
      demo: 'https://fakenewsdetectorx.netlify.app',
      status: 'In Development',
    
    }
    ,
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with microservices architecture. Features include real-time patient management, secure payment processing and advanced analytics dashboard. Handles 100+ daily active users with 99.9% uptime.',
      image: '/images/rma.png',
      tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com/Tafaraa',
      demo: 'http://revivalmedicalaesthetics.com/',
      status: 'Live'
    },
    {
      title: 'Machine Learning Model',
      description: 'Advanced predictive analytics system using ensemble learning methods. Achieved 94% accuracy in trend forecasting. Automated model retraining pipeline and real-time prediction API. Reduced processing time by 60% through optimization.',
      image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1774&q=80',
      tags: ['Python', 'TensorFlow', 'Scikit-learn', 'Docker', 'CI/CD', 'AWS'],
      github: 'https://github.com/Tafaraa',
      demo: 'https://ml-model-demo.example.com',
      status: 'In Development'
    },
    {
      title: 'Natural Language Processing Tool',
      description: 'Enterprise-grade NLP solution for automated text analysis. Implements custom transformers for sentiment analysis and named entity recognition. Processes 1M+ documents daily with 95% accuracy. Reduced manual review time by 80%.',
      image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      tags: ['Python', 'NLTK', 'SpaCy', 'FastAPI', 'Docker', 'Azure'],
      github: 'https://github.com/Tafaraa',
      demo: 'https://nlp-tool-demo.example.com',
      status: 'Beta'
    }
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-primary-900 text-primary-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">PROJECTS</h2>
          </div>
          
          <div className="md:col-span-2">
            <p className="text-xl leading-relaxed text-primary-100">
              A showcase of my technical expertise through real-world applications in software development and data science. Each project demonstrates my commitment to clean code, scalable architecture, and impactful solutions.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div key={index} className="group bg-primary-800/50 p-6 rounded-lg">
              <div className="aspect-video overflow-hidden mb-6 rounded-lg relative group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-primary-900/90 px-3 py-1 rounded-full text-sm font-medium">
                  {project.status}
                </div>
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-medium">{project.title}</h3>
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-50 hover:text-primary-200 transition-colors"
                    title="View Source Code"
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-50 hover:text-primary-200 transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <p className="text-primary-200 mb-6 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-700/50 rounded-full text-primary-100 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex space-x-4">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-primary-50 hover:text-primary-200 transition-colors"
                >
                  <span>View Source</span>
                  <ArrowUpRight size={16} />
                </a>
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-primary-50 hover:text-primary-200 transition-colors"
                >
                  <span>Take A Look</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          ))}
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