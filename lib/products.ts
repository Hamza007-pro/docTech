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
