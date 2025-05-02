/**
 * Performance optimization utilities
 */

// Debounce function to limit how often a function can be called
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit the rate at which a function is executed
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Detect if the user prefers reduced motion
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Detect if the device is likely a mobile device
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize animations based on device capabilities
export function getOptimizedAnimationSettings() {
  const isReducedMotion = prefersReducedMotion();
  const isMobile = isMobileDevice();
  
  return {
    // Disable animations completely if user prefers reduced motion
    enabled: !isReducedMotion,
    // Use simpler animations on mobile devices
    simplified: isMobile,
    // Reduce animation duration on mobile devices
    duration: isMobile ? 0.3 : 0.5,
    // Reduce or eliminate delay on mobile devices
    delay: isMobile ? 0 : 0.2
  };
}
