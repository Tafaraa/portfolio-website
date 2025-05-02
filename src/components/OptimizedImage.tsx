import { useState, useEffect, useMemo } from 'react';
import { isMobileDevice } from '../utils/performance';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  objectFit = 'cover'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const isMobile = useMemo(() => typeof window !== 'undefined' && isMobileDevice(), []);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode on mount and when theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Initial check
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Watch for changes
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (priority) return;

    // Use a smaller rootMargin on mobile devices to save bandwidth
    const rootMargin = isMobile ? '100px' : '200px';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin } // Start loading when image is near viewport
    );

    const currentRef = document.getElementById(`image-${src.replace(/\W/g, '')}`);
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [src, priority, isMobile]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Generate a unique ID for the image element
  const imageId = useMemo(() => `image-${src.replace(/\W/g, '')}`, [src]);

  // Create CSS classes for dimensions
  const getWidthClass = useMemo(() => {
    if (!width) return styles.fullWidth;
    return `${styles.autoWidth} ${styles.customWidth}`;
  }, [width]);

  const getHeightClass = useMemo(() => {
    if (!height) return styles.fullHeight;
    return `${styles.autoHeight} ${styles.customHeight}`;
  }, [height]);

  // Set CSS variables for custom dimensions
  useEffect(() => {
    if (!width && !height) return;
    
    const root = document.documentElement;
    if (width) root.style.setProperty('--img-width', `${width}px`);
    if (height) root.style.setProperty('--img-height', `${height}px`);
    
    return () => {
      if (width) root.style.removeProperty('--img-width');
      if (height) root.style.removeProperty('--img-height');
    };
  }, [width, height]);

  return (
    <div 
      id={imageId}
      className={`${styles.imageContainer} ${getWidthClass} ${getHeightClass} ${className}`}
    >
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading} ${
            objectFit === 'cover' ? styles.objectCover :
            objectFit === 'contain' ? styles.objectContain :
            objectFit === 'fill' ? styles.objectFill :
            objectFit === 'none' ? styles.objectNone :
            styles.objectScaleDown
          }`}
        />
      )}
      {!isLoaded && !priority && (
        <div
          className={`${styles.placeholder} ${isDarkMode ? styles.darkPlaceholder : ''}`}
          aria-hidden="true"
        >
          <div 
            className={`${styles.placeholderInner} ${isDarkMode ? styles.darkPlaceholderInner : styles.lightPlaceholderInner}`} 
          />
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
