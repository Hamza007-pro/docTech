/**
 * Handles both local and Supabase Storage image URLs
 * Local paths can be:
 * - From public directory (starting with /)
 * - From assets directory (starting with assets/)
 * - Simple filenames (will be prefixed with correct directory)
 * Supabase Storage URLs start with "http" or "https"
 */
export function getImageUrl(path: string, type: 'product' | 'full' = 'product'): string {
  // Handle Supabase Storage URLs
  if (path.startsWith('http')) {
    return path;
  }
  
  // Handle absolute paths from public directory
  if (path.startsWith('/')) {
    return path;
  }

  // Handle asset paths
  if (path.includes('assets/')) {
    return '/' + path;
  }

  // Handle relative paths with or without directory structure
  if (path.includes('products/') || path.includes('productFull/')) {
    return '/images/' + path;
  }

  // Default paths based on type
  const directory = type === 'full' ? 'productFull' : 'products';
  return `/assets/productsImg/${directory}/${path}`;
}
