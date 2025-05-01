import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import styles from './LocationCard.module.css';

interface LocationCardProps {
  title: string;
  description: string;
  className?: string;
  googleMapsUrl?: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ 
  title, 
  description, 
  className,
  googleMapsUrl = 'https://maps.google.com'
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div 
      className={`w-full rounded-lg overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 dark:from-dark-surface dark:to-dark-border relative shadow-lg ${className || ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className={`w-full h-full ${styles.backgroundPattern}`} />
      </div>

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="flex flex-col items-center text-center">
          {/* Location Icon with Pulse Effect */}
          <div className="relative mb-6">
            <div className={`
              absolute inset-0 rounded-full
              ${isHovered ? 'animate-ping' : ''}
              bg-stone-400/30 dark:bg-dark-accent/20
            `} />
            <div className="relative">
              <MapPin 
                className="w-12 h-12 text-stone-900 dark:text-dark-accent"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl font-semibold mb-3 text-stone-900 dark:text-dark-text">
            {title}
          </h3>
          <p className="text-stone-600 dark:text-dark-muted text-lg max-w-md mx-auto">
            {description}
          </p>

          {/* Get Directions Button */}
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full
              text-stone-700 dark:text-dark-text
              bg-white/50 dark:bg-dark-bg/50
              hover:bg-white/80 dark:hover:bg-dark-bg/80
              transition-all duration-300
              ${isHovered ? 'transform -translate-y-1' : ''}
            `}
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
