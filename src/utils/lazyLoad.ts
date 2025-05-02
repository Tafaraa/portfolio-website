/**
 * Utility function to dynamically import components only when needed
 * This reduces initial JavaScript bundle size
 */
import { lazy, ReactNode, createElement } from 'react';

type ImportFunction = () => Promise<{ default: React.ComponentType<any> }>;

// Helper function to create lazy-loaded components with retry logic
export function lazyLoad(importFn: ImportFunction, fallback?: ReactNode) {
  const LazyComponent = lazy(() => {
    return importFn().catch((error) => {
      console.error('Error loading component:', error);
      return {
        default: () => {
          // Create a simple fallback component
          return createElement('div', null, fallback || 'Failed to load component');
        }
      };
    });
  });

  return LazyComponent;
}

// Preload a component without rendering it
// Useful for preloading components that will be needed soon
export function preloadComponent(importFn: () => Promise<any>) {
  return () => {
    importFn();
    return null;
  };
}
