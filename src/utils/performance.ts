/**
 * Performance optimization utilities
 */

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
