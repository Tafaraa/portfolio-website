import React from 'react';

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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter text-stone-900">SKILLS</h2>
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-medium mb-8 text-stone-900">Technical Proficiency</h3>
                
                <div className="space-y-8">
                  {technicalSkills.map((skill) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-stone-900">{skill.name}</span>
                        <span className="text-stone-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-stone-900 h-full rounded-full relative group-hover:bg-stone-800 transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-stone-700 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-medium mb-8 text-stone-900">Additional Skills</h3>
                
                <div className="flex flex-wrap gap-3">
                  {otherSkills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-4 py-2 border border-stone-900 text-stone-900 rounded-lg font-medium hover:bg-stone-900 hover:text-stone-50 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="mt-12">
                  <h3 className="text-2xl font-medium mb-8 text-stone-900">Education</h3>
                  
                  <div className="border-l-2 border-stone-900 pl-6">
                    <h4 className="text-xl font-medium text-stone-900">Computer Science Graduate & Data Science student</h4>
                    <p className="text-stone-600 mb-2">Eduvos</p>
                    <p className="mb-2 text-stone-800">BSc. Graduate pursuing Honors</p>
                    <p className="text-stone-700">
                      Completed my degree with a focus on software development and currently a data science student, 
                      pursuing honors.
                    </p>
                  </div>
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