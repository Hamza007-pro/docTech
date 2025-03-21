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
  try {
    // Fetch product data
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories!category_id(*),
        subcategory:categories!subcategory_id(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    if (!product) return null;

    // If there's a tech_spec_pdf field, handle it
    if (product.tech_spec_pdf) {
      // If it's not already a full URL, get a signed URL
      if (!product.tech_spec_pdf.startsWith('http')) {
        try {
          // First, check if the file exists
          const { data: fileExists } = await supabase.storage
            .from('product-specs')
            .list('', {
              search: product.tech_spec_pdf.split('/').pop()
            });

          if (fileExists && fileExists.length > 0) {
            const { data: fileData } = await supabase.storage
              .from('product-specs')
              .createSignedUrl(product.tech_spec_pdf, 3600); // URL valid for 1 hour

            if (fileData?.signedUrl) {
              product.tech_spec_pdf = fileData.signedUrl;
            }
          } else {
            // If file doesn't exist in storage, try using as public URL
            product.tech_spec_pdf = `/docs/products/${product.tech_spec_pdf.split('/').pop()}`;
          }
        } catch (storageError) {
          console.error('Error getting PDF signed URL:', storageError);
          // Fallback to public path if storage fails
          product.tech_spec_pdf = `/docs/products/${product.tech_spec_pdf.split('/').pop()}`;
        }
      }
    }

    return product;
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    return null;
  }
}
