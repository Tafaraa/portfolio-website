import React from 'react';
import { FileDown } from 'lucide-react';

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
            I’m a software engineer and data scientist with a genuine passion for building purposeful tech. 
            From intuitive web apps to data-driven insights, I thrive at the intersection of creativity and logic—where ideas come alive through code.
            </p>
            
            <p className="text-xl leading-relaxed text-primary-100">
            My journey began with a curiosity for how tech shapes the world and evolved into a mission to build tools that solve real-world challenges. 
            Whether launching projects as an entrepreneur or collaborating with others, I’m energized by turning ideas into solutions that make life better.
            </p>
            
            <p className="text-xl leading-relaxed text-primary-100">
            I’m always learning, improving, and pushing the boundaries of what’s possible with software and data. 
            I aim to be part of teams and initiatives that drive positive change—locally and globally—through smart, scalable tech.
            </p>
            
            <div className="pt-8">
              <a 
                href="/resume.pdf" 
                download="Tafara_Mutsvedu_Resume.pdf"
                className="inline-flex items-center gap-2 border border-primary-50 px-8 py-4 text-primary-50 hover:bg-primary-50 hover:text-primary-900 transition-colors"
              >
                <FileDown size={20} />
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