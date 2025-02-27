import { supabase } from '../supabase';
import type { Product } from '@/types/product';
import type { PostgrestError } from '@supabase/supabase-js';

type SupabaseResult<T> = Promise<{
  data: T | null;
  error: PostgrestError | null;
}>;

interface FetchProductsOptions {
  availability?: 'In Stock' | 'Sold Out';
  sortBy?: string;
  ascending?: boolean;
  limit?: number;
  category_id?: number;
  subcategory_id?: number;
  categorySlug?: string;
  subcategorySlug?: string;
}

export async function fetchProducts(options: FetchProductsOptions = {}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories!category_id(*),
      subcategory:categories!subcategory_id(*)
    `);

  if (options.availability) {
    query = query.eq('availability', options.availability);
  }

  if (options.category_id) {
    query = query.eq('category_id', options.category_id);
  }

  if (options.subcategory_id) {
    query = query.eq('subcategory_id', options.subcategory_id);
  }

  if (options.categorySlug) {
    query = query.eq('categories.slug', options.categorySlug);
  }

  if (options.subcategorySlug) {
    query = query.eq('subcategory.slug', options.subcategorySlug);
  }

  if (options.sortBy) {
    query = query.order(options.sortBy, {
      ascending: options.ascending ?? true
    });
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data;
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}
