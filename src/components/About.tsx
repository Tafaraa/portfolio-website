import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-primary-900 text-primary-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter">ABOUT</h2>
          </div>
          
          <div className="md:col-span-2 space-y-8">
            <p className="text-xl leading-relaxed text-primary-100">
              I'm a passionate Software Developer and Data Scientist with a strong foundation in both fields. 
              As an early graduate, I've focused on building a diverse skill set that allows me to create 
              innovative solutions at the intersection of software development and data science.
            </p>
            
            <p className="text-xl leading-relaxed text-primary-100">
              My journey in technology began with a curiosity about how software systems work and evolved into 
              a deep interest in extracting meaningful insights from data. I enjoy tackling complex problems and 
              transforming raw data into actionable intelligence.
            </p>
            
            <p className="text-xl leading-relaxed text-primary-100">
              I'm constantly learning and expanding my knowledge in emerging technologies and methodologies. 
              My goal is to contribute to projects that make a positive impact through innovative software 
              solutions and data-driven decision making.
            </p>
            
            <div className="pt-8">
              <a 
                href="#" 
                className="inline-block border border-primary-50 px-8 py-4 text-primary-50 hover:bg-primary-50 hover:text-primary-900 transition-colors"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;