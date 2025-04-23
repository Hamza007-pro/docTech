'use server';

import { query } from './db';
import type { Product } from '@/types/product';

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
  try {
    let queryText = `
      SELECT p.*, 
        json_build_object(
          'id', c1.id,
          'name', c1.name,
          'slug', c1.slug,
          'description', c1.description
        ) as category,
        json_build_object(
          'id', c2.id,
          'name', c2.name,
          'slug', c2.slug,
          'description', c2.description
        ) as subcategory
      FROM products p
      LEFT JOIN categories c1 ON p.category_id = c1.id
      LEFT JOIN categories c2 ON p.subcategory_id = c2.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramIndex = 1;

    if (options.availability) {
      queryText += ` AND p.availability = $${paramIndex}`;
      params.push(options.availability);
      paramIndex++;
    }

    if (options.category_id) {
      queryText += ` AND p.category_id = $${paramIndex}`;
      params.push(options.category_id);
      paramIndex++;
    }

    if (options.subcategory_id) {
      queryText += ` AND p.subcategory_id = $${paramIndex}`;
      params.push(options.subcategory_id);
      paramIndex++;
    }

    if (options.categorySlug) {
      queryText += ` AND c1.slug = $${paramIndex}`;
      params.push(options.categorySlug);
      paramIndex++;
    }

    if (options.subcategorySlug) {
      queryText += ` AND c2.slug = $${paramIndex}`;
      params.push(options.subcategorySlug);
      paramIndex++;
    }

    if (options.sortBy) {
      queryText += ` ORDER BY p.${options.sortBy} ${options.ascending ? 'ASC' : 'DESC'}`;
    }

    if (options.limit) {
      queryText += ` LIMIT $${paramIndex}`;
      params.push(options.limit);
    }

    return await query<Product>(queryText, params);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const queryText = `
      SELECT p.*, 
        json_build_object(
          'id', c1.id,
          'name', c1.name,
          'slug', c1.slug,
          'description', c1.description
        ) as category,
        json_build_object(
          'id', c2.id,
          'name', c2.name,
          'slug', c2.slug,
          'description', c2.description
        ) as subcategory
      FROM products p
      LEFT JOIN categories c1 ON p.category_id = c1.id
      LEFT JOIN categories c2 ON p.subcategory_id = c2.id
      WHERE p.id = $1
    `;

    const products = await query<Product>(queryText, [id]);
    if (products.length === 0) return null;

    const product = products[0];

    // Handle tech spec PDF
    if (product.tech_spec_pdf) {
      // If it's already a base64 string starting with data:application/pdf;base64, use it as is
      if (!product.tech_spec_pdf.startsWith('data:application/pdf;base64,')) {
        // If it's a URL or local path, convert it to the correct format
        if (!product.tech_spec_pdf.startsWith('http')) {
          // Remove any existing /docs/products/ prefix to avoid duplication
          const cleanPath = product.tech_spec_pdf.replace(/^\/?(docs\/products\/)?/, '');
          product.tech_spec_pdf = `/docs/products/${cleanPath}`;
        }
      }
      console.log('PDF data type:', product.tech_spec_pdf.startsWith('data:application/pdf;base64,') ? 'base64' : 'url');
    }

    return product;
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    return null;
  }
}

// Export other product-related functions from products.ts as server actions
export async function getAllProducts(): Promise<Product[]> {
  return await fetchProducts({ sortBy: 'created_at' });
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
  try {
    const subcategory = await query<{ id: number, parent_id: number }>(
      'SELECT id, parent_id FROM categories WHERE slug = $1 AND parent_id IS NOT NULL',
      [slug]
    );

    if (!subcategory[0]) {
      throw new Error(`Subcategory not found with slug: ${slug}`);
    }

    return await fetchProducts({ 
      subcategory_id: subcategory[0].id,
      sortBy: 'created_at',
      ascending: false
    });
  } catch (error) {
    console.error(`Error fetching products for subcategory slug ${slug}:`, error);
    return [];
  }
}
