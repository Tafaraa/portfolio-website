import React from 'react';
import { MapPin, Navigation, Compass } from 'lucide-react';

interface SimpleMapProps {
  title: string;
  description: string;
  className?: string;
}

const SimpleMap: React.FC<SimpleMapProps> = ({ title, description, className }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={`w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:from-dark-surface dark:to-dark-border relative ${className || ''}`}
      aria-label={`Location information: ${description}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <div className="absolute top-4 left-4 transform -rotate-12">
          <Compass className="w-24 h-24" />
        </div>
        <div className="absolute bottom-4 right-4 transform rotate-45">
          <Navigation className="w-20 h-20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8 transform transition-transform duration-500 ease-out hover:scale-105">
          <div className="relative inline-block mb-6">
            <div className={`absolute -inset-4 bg-stone-300/30 dark:bg-dark-accent/20 rounded-full transform transition-all duration-500 ${isHovered ? 'scale-125 opacity-100' : 'scale-100 opacity-0'}`} />
            <MapPin 
              className="w-16 h-16 text-stone-900 dark:text-dark-accent relative z-10"
              strokeWidth={1.5}
            />
          </div>
          
          <h3 className="text-2xl font-semibold mb-2 text-stone-900 dark:text-dark-text">
            {title}
          </h3>
          <p className="text-stone-600 dark:text-dark-muted text-lg">
            {description}
          </p>

          {/* Interactive Elements */}
          <div className="mt-6 space-y-2">
            <a 
              href="https://goo.gl/maps/YOUR_LOCATION_LINK" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm text-stone-600 dark:text-dark-muted hover:text-stone-900 dark:hover:text-dark-text transition-colors"
            >
              <Navigation className="w-4 h-4 mr-2" />
              Get Directions
            </a>
          </div>
        </div>
      </div>
      
      {/* Map content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-stone-400 dark:text-dark-muted animate-pulse">
          <MapPin size={48} strokeWidth={1.5} />
        </div>
        
        <h4 className="text-xl font-medium mb-2 dark:text-dark-text">{title}</h4>
        <p className="text-stone-600 dark:text-dark-muted mb-4">{description}</p>
        
        {/* Coordinates display */}
        <div className="text-xs text-stone-500 dark:text-dark-muted font-mono bg-white/50 dark:bg-dark-bg/50 px-3 py-1 rounded-full">
          {center[1].toFixed(4)}, {center[0].toFixed(4)}
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;
