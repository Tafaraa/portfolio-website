// No React import needed with modern JSX transform
import AnimatedElement from '../../components/ui/AnimatedElement';

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
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <AnimatedElement animation="slide-in" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-stone-900 dark:text-dark-text">SKILLS</h2>
            </AnimatedElement>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <AnimatedElement animation="fade" delay={0.3}>
                  <h3 className="text-2xl font-medium mb-8 text-stone-900 dark:text-dark-text">Technical Proficiency</h3>
                </AnimatedElement>
                
                <div className="space-y-8">
                  {technicalSkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-stone-900 dark:text-dark-text">{skill.name}</span>
                        <span className="text-stone-600 dark:text-dark-muted">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-stone-200 dark:bg-dark-border h-2 rounded-full overflow-hidden">
                        <div 
                          className={`bg-stone-900 dark:bg-dark-accent h-full rounded-full relative group-hover:bg-stone-800 dark:group-hover:bg-dark-accent/80 transition-all duration-300 w-[${skill.level}%]`}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-stone-700 dark:bg-dark-text rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <AnimatedElement animation="fade" delay={0.4}>
                  <h3 className="text-2xl font-medium mb-8 text-stone-900 dark:text-dark-text">Additional Skills</h3>
                </AnimatedElement>
                
                <div className="flex flex-wrap gap-3">
                  {otherSkills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 border border-stone-900 dark:border-dark-text text-stone-900 dark:text-dark-text rounded-lg font-medium hover:bg-stone-900 dark:hover:bg-dark-border hover:text-stone-50 dark:hover:text-dark-text transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-12">
                  <AnimatedElement animation="fade" delay={0.5}>
                    <h3 className="text-2xl font-medium mb-8 text-stone-900 dark:text-dark-text">Education</h3>
                  </AnimatedElement>
                  
                  <AnimatedElement animation="slide-in" delay={0.6}>
                    <div className="border-l-2 border-stone-900 dark:border-dark-accent pl-6">
                      <h4 className="text-xl font-medium text-stone-900 dark:text-dark-text">Computer Science Graduate & Data Science student</h4>
                      <p className="text-stone-600 dark:text-dark-muted mb-2">Eduvos</p>
                      <p className="mb-2 text-stone-800 dark:text-dark-text">BSc. Graduate pursuing Honors</p>
                      <p className="text-stone-700 dark:text-dark-muted">
                        Completed my degree with a focus on software development and currently a data science student, 
                        pursuing honors.
                      </p>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;