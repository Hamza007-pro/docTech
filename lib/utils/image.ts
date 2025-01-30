/**
 * Handles both local and Supabase Storage image URLs
 * Local paths start with "/" and are relative to the public directory
 * Supabase Storage URLs start with "http" or "https"
 */
export function getImageUrl(path: string, type: 'product' | 'full' = 'product'): string {
  if (path.startsWith('http')) {
    return path;
  }
  
  if (path.startsWith('/')) {
    return path;
  }

  // Default fallback paths in public directory
  return type === 'full' 
    ? `/images/productFull/${path}` 
    : `/images/products/${path}`;
}
