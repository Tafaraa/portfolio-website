import { useRef } from 'react';
import { MapPin } from 'lucide-react';

interface SimpleMapProps {
  center: [number, number];
  zoom?: number;
  title?: string;
  description?: string;
  className?: string;
}

const SimpleMap: React.FC<SimpleMapProps> = ({
  center,
  title = 'Location',
  description = 'Midrand, Gauteng, South Africa',
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={mapRef}
      className={`relative overflow-hidden rounded-lg bg-stone-100 dark:bg-dark-surface ${className}`}
    >
      {/* Static map background - could be replaced with a static image */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-dark-surface dark:to-dark-bg">
        {/* Grid lines for map effect */}
        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
          {Array.from({ length: 64 }).map((_, i) => (
            <div 
              key={i} 
              className="border border-stone-200/30 dark:border-dark-border/20"
            />
          ))}
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
