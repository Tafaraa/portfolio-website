import { GraduationCap, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EducationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Education = ({ isOpen, onClose }: EducationModalProps) => {
  const education = [
    {
      degree: 'Data Science Honors',
      institution: 'Eduvos',
      year: '2024',
      description: 'Currently studying Data Science, focusing on advanced analytics, machine learning, and statistical modeling.',
      achievements: [
        'Advanced Machine Learning',
        'Big Data Analytics',
        'Statistical Computing'
      ],
      current: true
    },
    {
      degree: 'BSc in Computer Science',
      institution: 'Eduvos',
      year: '2021 - 2024',
      description: 'Graduated with focus on software development, algorithms, and data structures.',
      achievements: [
        'Academic Excellence',
        'First Class',
        'Software Engineering'
      ]
    },
    {
      degree: 'Data Science Specialization',
      institution: 'ALX',
      year: '2023 - 2024',
      description: 'Comprehensive training in data science fundamentals and advanced applications.',
      achievements: [
        'Machine Learning with Python',
        'Data Analysis and Visualization',
        'Statistical Analysis and Modeling'
      ],
      certificateLink: '/images/data-science-certificate.webp'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-[95%] sm:w-[90%] md:w-[85%] max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl pointer-events-auto p-4 sm:p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tighter text-stone-900 dark:text-white">
                  EDUCATION
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-dark-border rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6 text-stone-600 dark:text-gray-300" />
                </button>
              </div>

              <div className="space-y-6">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="bg-stone-50 dark:bg-gray-800/50 rounded-lg p-4 sm:p-6 md:p-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-stone-100 dark:bg-gray-700 rounded-full">
                            <GraduationCap className="w-6 h-6 text-stone-900 dark:text-white" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-2 text-stone-900 dark:text-white">
                                {item.degree}
                                {item.current && (
                                  <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary-500/10 text-primary-500 dark:bg-primary-400/20 dark:text-primary-300 rounded">
                                    Current
                                  </span>
                                )}
                              </h3>
                              <p className="text-stone-600 dark:text-gray-300 mb-4">
                                {item.institution} • {item.year}
                              </p>
                            </div>
                            {item.certificateLink && (
                              <a 
                                href={item.certificateLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
                              >
                                View Certificate
                              </a>
                            )}
                          </div>
                          <p className="text-stone-700 dark:text-gray-200 mb-6">
                            {item.description}
                          </p>
                          <div className="space-y-3">
                            {item.achievements.map((achievement, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-stone-600 dark:text-gray-300" />
                                <span className="text-stone-700 dark:text-gray-200">
                                  {achievement}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Education;
