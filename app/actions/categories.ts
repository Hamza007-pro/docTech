'use server';

import { query } from './db';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  productCount?: number;
}

export async function getMainCategories(): Promise<Category[]> {
  const queryStr = `
    SELECT c.*,
      COUNT(p.id) as "productCount"
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    WHERE c.parent_id IS NULL
    GROUP BY c.id
    ORDER BY c.id
  `;

  try {
    const data = await query<Category & { productCount: number }>(queryStr);
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array instead of throwing to handle gracefully
  }
}

export async function getSubcategories(categoryId: number): Promise<Category[]> {
  const queryStr = `
    SELECT c.*,
      COUNT(p.id) as "productCount"
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    WHERE c.parent_id = $1
    GROUP BY c.id
    ORDER BY c.id
  `;

  try {
    const data = await query<Category & { product_count: number }>(queryStr, [categoryId]);
    return data.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent_id: category.parent_id,
      created_at: category.created_at,
      updated_at: category.updated_at,
      productCount: category.product_count || 0,
    }));
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
}

export async function getCountProductBySubcat(catId: number, subId: number): Promise<number> {
  try {
    let queryStr = '';
    let params: number[] = [];

    if (subId === 0) {
      queryStr = `
        SELECT COUNT(*) as count
        FROM products
        WHERE category_id = $1
      `;
      params = [catId];
    } else {
      queryStr = `
        SELECT COUNT(*) as count
        FROM products
        WHERE category_id = $1 AND subcategory_id = $2
      `;
      params = [catId, subId];
    }

    const result = await query<{ count: string }>(queryStr, params);
    return parseInt(result[0]?.count || '0', 10);
  } catch (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const queryStr = `
    SELECT *
    FROM categories
    WHERE slug = $1
  `;

  try {
    const data = await query<Category>(queryStr, [slug]);
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getCategoriesWithSubcategories(): Promise<{ [key: string]: Category[] }> {
  const queryStr = `
    WITH main_categories AS (
      SELECT *
      FROM categories
      WHERE parent_id IS NULL
    )
    SELECT 
      m.*,
      json_agg(s.*) as subcategories
    FROM main_categories m
    LEFT JOIN categories s ON s.parent_id = m.id
    GROUP BY m.id
  `;

  try {
    const data = await query<Category & { subcategories: Category[] }>(queryStr);
    return data.reduce((acc, category) => {
      acc[category.slug] = category.subcategories || [];
      return acc;
    }, {} as { [key: string]: Category[] });
  } catch (error) {
    console.error("Error fetching categories with subcategories:", error);
    throw error;
  }
}

export async function getCategoryTree(): Promise<Category[]> {
  const mainCategories = await getMainCategories();

  const categoriesWithSubs = await Promise.all(
    mainCategories.map(async (category) => {
      const subcategories = await getSubcategories(category.id);
      return {
        ...category,
        subcategories,
      };
    })
  );

  return categoriesWithSubs;
}
