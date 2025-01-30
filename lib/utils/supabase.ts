import { supabase } from '../supabase';
import type { Product } from '@/types/product';
import type { PostgrestError } from '@supabase/supabase-js';

type SupabaseResult<T> = Promise<{
  data: T | null;
  error: PostgrestError | null;
}>;

export async function fetchProducts(options?: { 
  availability?: 'In Stock' | 'Sold Out',
  limit?: number,
  sortBy?: keyof Product,
  ascending?: boolean 
}): Promise<Product[]> {
  let query = supabase.from('products').select('*');

  if (options?.availability) {
    query = query.eq('availability', options.availability);
  }

  if (options?.sortBy) {
    query = query.order(options.sortBy, { ascending: options.ascending ?? false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
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
