/**
 * Image optimization utilities
 */

// Calculate the optimal image size based on the container size
export function getOptimalImageSize(
  containerWidth: number,
  containerHeight: number,
  pixelRatio = window.devicePixelRatio || 1
): { width: number; height: number } {
  // Calculate optimal dimensions based on device pixel ratio
  // Round up to nearest 100 to create sensible breakpoints
  const optimalWidth = Math.ceil((containerWidth * pixelRatio) / 100) * 100;
  const optimalHeight = Math.ceil((containerHeight * pixelRatio) / 100) * 100;
  
  return {
    width: optimalWidth,
    height: optimalHeight
  };
}

// Generate srcset for responsive images
export function generateSrcSet(
  imagePath: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string {
  // Extract file extension
  const extension = imagePath.split('.').pop();
  const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
  
  // Generate srcset string
  return widths
    .map(width => `${basePath}-${width}w.${extension} ${width}w`)
    .join(', ');
}

// Determine if an image should be lazy loaded
export function shouldLazyLoad(
  elementPosition: number,
  viewportHeight: number,
  threshold = 1.5
): boolean {
  // If element is within viewport or within threshold of viewport height, don't lazy load
  return elementPosition > viewportHeight * threshold;
}

// Get appropriate image format based on browser support
export function getOptimalImageFormat(): 'avif' | 'webp' | 'jpg' {
  // Check for AVIF support
  const avifSupport = 
    document.createElement('canvas')
    .toDataURL('image/avif').indexOf('data:image/avif') === 0;
  
  if (avifSupport) return 'avif';
  
  // Check for WebP support
  const webpSupport = 
    document.createElement('canvas')
    .toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (webpSupport) return 'webp';
  
  // Fallback to JPEG
  return 'jpg';
}
