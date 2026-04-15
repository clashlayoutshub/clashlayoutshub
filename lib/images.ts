/**
 * Cloudinary image transformation utilities
 * Adds f_auto (automatic format) and q_auto (automatic quality) to Cloudinary URLs
 */

/**
 * Check if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

/**
 * Add Cloudinary transformations to a URL
 * Adds f_auto (automatic format) and q_auto (automatic quality)
 */
export function addCloudinaryTransformations(url: string, options?: {
  width?: number;
  height?: number;
  quality?: 'auto' | 'best' | 'good' | 'eco' | 'low';
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
}): string {
  if (!isCloudinaryUrl(url)) {
    return url;
  }

  const transformations: string[] = [];
  
  // Add automatic format
  transformations.push('f_auto');
  
  // Add automatic quality (default to 'auto')
  transformations.push(`q_${options?.quality || 'auto'}`);
  
  // Add dimensions if provided
  if (options?.width) {
    transformations.push(`w_${options.width}`);
  }
  if (options?.height) {
    transformations.push(`h_${options.height}`);
  }

  // Add format override if specified
  if (options?.format && options.format !== 'auto') {
    transformations.push(`f_${options.format}`);
  }

  // Check if URL already has transformations
  const urlObj = new URL(url);
  const hasTransformations = urlObj.pathname.includes('/upload/') && 
    (urlObj.pathname.includes('/f_') || urlObj.pathname.includes('/q_') || urlObj.pathname.includes('/w_') || urlObj.pathname.includes('/h_'));

  if (hasTransformations) {
    // URL already has transformations, append ours
    const parts = urlObj.pathname.split('/upload/');
    if (parts.length === 2) {
      const beforeUpload = parts[0];
      const afterUpload = parts[1];
      urlObj.pathname = `${beforeUpload}/upload/${transformations.join(',')}/${afterUpload}`;
    }
  } else {
    // No existing transformations, insert ours
    const parts = urlObj.pathname.split('/upload/');
    if (parts.length === 2) {
      const beforeUpload = parts[0];
      const afterUpload = parts[1];
      urlObj.pathname = `${beforeUpload}/upload/${transformations.join(',')}/${afterUpload}`;
    }
  }

  return urlObj.toString();
}

/**
 * Get optimized Cloudinary URL for Next.js Image component
 */
export function getOptimizedImageUrl(url: string, width?: number, height?: number): string {
  return addCloudinaryTransformations(url, {
    width,
    height,
    quality: 'auto',
    format: 'auto',
  });
}
