import { fetchProducts, fetchProductById } from './utils/supabase';
import type { Product } from '../types/product';

export async function getAllProducts(): Promise<Product[]> {
  return await fetchProducts({ sortBy: 'created_at' });
}

export async function getProductById(id: number): Promise<Product | null> {
  return await fetchProductById(id);
}

export async function getProductsByAvailability(status: 'In Stock' | 'Sold Out'): Promise<Product[]> {
  return await fetchProducts({ availability: status, sortBy: 'created_at' });
}

export async function getLatestProducts(limit: number = 4): Promise<Product[]> {
  return await fetchProducts({ sortBy: 'created_at', limit });
}

export async function getNewProducts(): Promise<Product[]> {
  return await fetchProducts({ 
    availability: 'In Stock',
    sortBy: 'created_at',
    ascending: false
  });
}

// New functions for category filtering
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  return await fetchProducts({ 
    category_id: categoryId,
    sortBy: 'created_at',
    ascending: false
  });
}

export async function getProductsBySubcategory(subcategoryId: number): Promise<Product[]> {
  return await fetchProducts({ 
    subcategory_id: subcategoryId,
    sortBy: 'created_at',
    ascending: false
  });
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  return await fetchProducts({ 
    categorySlug: slug,
    sortBy: 'created_at',
    ascending: false
  });
}

export async function getProductsBySubcategorySlug(slug: string): Promise<Product[]> {
  return await fetchProducts({ 
    subcategorySlug: slug,
    sortBy: 'created_at',
    ascending: false
  });
}
