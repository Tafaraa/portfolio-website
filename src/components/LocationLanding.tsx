import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LocationLanding = () => {
  const { location } = useParams();
  const { pathname } = useLocation();

  // Extract the location from the pathname for "best-software-developer-" routes
  const bestDevLocation = pathname.match(/best-software-developer-([^/]+)/)?.[1];
  const regularDevLocation = pathname.match(/software-developer-([^/]+)/)?.[1];
  const currentLocation = bestDevLocation || regularDevLocation || location;

  const pageData = {
    // Location-specific pages
    'midrand': {
      title: 'Best Software Developer in Midrand',
      subtitle: 'Full-Stack Development & Data Science Solutions',
      description: 'Looking for a skilled software developer in Midrand? With expertise in React, Python, and Machine Learning, I deliver cutting-edge solutions for businesses in the heart of Gauteng.',
      location: 'Midrand, Gauteng',
    },
    'johannesburg': {
      title: 'Best Software Developer in Johannesburg',
      subtitle: 'Modern Web Applications & Data Solutions',
      description: 'Johannesburg-based software developer specializing in creating powerful web applications and data-driven solutions. Expert in React, Python, and Machine Learning.',
      location: 'Johannesburg, Gauteng',
    },
    'zimbabwe': {
      title: 'Best Software Developer in Zimbabwe',
      subtitle: 'Professional Software Solutions',
      description: 'Experienced software developer with roots in Zimbabwe, offering world-class development services. Specializing in web applications, data science, and machine learning solutions.',
      location: 'Zimbabwe',
    },
    'gauteng': {
      title: 'Professional Software Developer in Gauteng',
      subtitle: 'Enterprise Software Solutions',
      description: 'Gauteng-based software developer delivering high-quality software solutions. Expert in full-stack development, data science, and enterprise applications.',
      location: 'Gauteng, South Africa',
    },
    // Remote positions
    'remote-software-developer': {
      title: 'Remote Software Developer',
      subtitle: 'Global Development Services',
      description: 'Professional remote software developer offering worldwide services. Experienced in remote collaboration, modern development practices, and delivering high-quality solutions.',
      remote: true,
    },
    'hire-remote-fullstack-developer': {
      title: 'Hire Remote Full-Stack Developer',
      subtitle: 'End-to-End Development Solutions',
      description: 'Looking to hire a remote full-stack developer? I offer comprehensive development services, from front-end to back-end, with expertise in modern technologies.',
      remote: true,
    },
    'remote-react-developer-usa': {
      title: 'Remote React Developer for USA',
      subtitle: 'React Development Services',
      description: 'Specialized React developer available for US-based companies. Extensive experience in building modern, responsive React applications with best practices.',
      remote: true,
      location: 'Available for US Companies',
    },
    'remote-developer-south-africa': {
      title: 'Remote Developer in South Africa',
      subtitle: 'Professional Development Services',
      description: 'South Africa-based remote developer offering professional software development services. Expert in modern web technologies and data-driven solutions.',
      remote: true,
      location: 'South Africa',
    },
    'remote-data-scientist-south-africa': {
      title: 'Remote Data Scientist in South Africa',
      subtitle: 'Data Science & Analytics Solutions',
      description: 'Professional data scientist based in South Africa, available for remote work. Specialized in machine learning, data analysis, and predictive modeling.',
      remote: true,
      location: 'South Africa',
    },
    'react-developer-south-africa': {
      title: 'React Developer in South Africa',
      subtitle: 'Modern React Development',
      description: 'Expert React developer based in South Africa. Specialized in building modern, responsive, and scalable React applications.',
      location: 'South Africa',
    },
    'fullstack-developer-south-africa': {
      title: 'Full-Stack Developer in South Africa',
      subtitle: 'Complete Development Solutions',
      description: 'Experienced full-stack developer in South Africa offering end-to-end development services. Expert in both front-end and back-end technologies.',
      location: 'South Africa',
    },
    'data-scientist-south-africa': {
      title: 'Data Scientist in South Africa',
      subtitle: 'Data Science & ML Solutions',
      description: 'Professional data scientist in South Africa specializing in machine learning, data analysis, and predictive modeling. Turning data into actionable insights.',
      location: 'South Africa',
    },
  };

  // Get the page data based on the current location
  const data = pageData[currentLocation as keyof typeof pageData] || {
    title: 'Software Developer',
    subtitle: 'Professional Development Services',
    description: 'Expert software developer specializing in modern web technologies and data science solutions.',
    location: 'South Africa',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-stone-800 text-stone-50">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{data.title}</h1>
        <h2 className="text-2xl md:text-3xl text-stone-300 mb-8">{data.subtitle}</h2>
        <p className="text-lg md:text-xl text-stone-400 mb-12 leading-relaxed">
          {data.description}
        </p>
        
        <div className="space-y-8">
          <div className="flex flex-wrap gap-4">
            <div className="bg-stone-700/50 p-6 rounded-lg flex-1 min-w-[250px]">
              <h3 className="text-xl font-semibold mb-3">Technical Expertise</h3>
              <ul className="space-y-2 text-stone-300">
                <li>✓ Full-Stack Development</li>
                <li>✓ React & Modern JavaScript</li>
                <li>✓ Python & Data Science</li>
                <li>✓ Machine Learning Solutions</li>
              </ul>
            </div>
            
            <div className="bg-stone-700/50 p-6 rounded-lg flex-1 min-w-[250px]">
              <h3 className="text-xl font-semibold mb-3">Services</h3>
              <ul className="space-y-2 text-stone-300">
                <li>✓ Custom Web Applications</li>
                <li>✓ Data Analysis & Visualization</li>
                <li>✓ AI/ML Implementation</li>
                <li>✓ Technical Consultation</li>
              </ul>
            </div>
          </div>

          {data.remote && (
            <div className="bg-stone-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Remote Work Capabilities</h3>
              <ul className="space-y-2 text-stone-300">
                <li>✓ Flexible Communication</li>
                <li>✓ Global Time Zone Adaptation</li>
                <li>✓ Virtual Collaboration Tools</li>
                <li>✓ Regular Progress Updates</li>
              </ul>
            </div>
          )}

          {data.location && (
            <div className="bg-stone-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Location</h3>
              <p className="text-stone-300">{data.location}</p>
            </div>
          )}
          
          <div className="flex justify-center pt-8">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-stone-50 text-stone-900 px-8 py-4 rounded-lg font-medium hover:bg-stone-200 transition-colors"
            >
              View Full Portfolio
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationLanding;