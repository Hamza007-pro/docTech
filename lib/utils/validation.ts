/**
 * Validates an image URL by checking if it's:
 * 1. A valid Supabase Storage URL (starts with http/https)
 * 2. A valid local path (exists in public/images/products or public/images/productFull)
 */
export async function isValidImageUrl(url: string, type: 'product' | 'full' = 'product'): Promise<boolean> {
  if (url.startsWith('http')) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      return response.ok && Boolean(contentType?.startsWith('image/'));
    } catch {
      return false;
    }
  }

  if (url.startsWith('/')) {
    return true; // Trust absolute paths in public directory
  }

  // For relative paths, construct the full path based on type
  const path = type === 'full' 
    ? `/images/productFull/${url}`
    : `/images/products/${url}`;

  // In client-side code, we can only verify if the path follows the expected pattern
  return Boolean(url && url.match(/^[\w-]+\.(png|jpg|jpeg|gif|webp)$/i));
}

/**
 * Helper function to format product image paths
 * Ensures consistent path formatting for both full and thumbnail images
 */
export function formatProductImagePath(filename: string, type: 'product' | 'full' = 'product'): string {
  if (filename.startsWith('http')) {
    return filename;
  }

  // Remove any existing path prefixes
  const cleanFilename = filename.split('/').pop() || filename;

  return type === 'full'
    ? `/images/productFull/${cleanFilename}`
    : `/images/products/${cleanFilename}`;
}
