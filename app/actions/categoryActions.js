'use server';

import { query } from './db';

export async function getMainCategories() {
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
    const data = await query(queryStr);
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty array instead of throwing to handle gracefully
  }
}

export async function getSubcategories(categoryId) {
  console.log("getSubcategories called with categoryId:", categoryId, "(type: " + typeof categoryId + ")");
  
  // Simple direct query to get subcategories
  const queryStr = `
    SELECT * FROM categories WHERE parent_id = $1
  `;

  try {
    console.log("Executing direct query with categoryId:", categoryId);
    const data = await query(queryStr, [categoryId]);
    console.log("Direct query result:", JSON.stringify(data));
    
    return data || [];
  } catch (error) {
    console.error("Error fetching subcategories for categoryId", categoryId, ":", error);
    return [];
  }
}

export async function getCategoryBySlug(slug) {
  const queryStr = `
    SELECT *
    FROM categories
    WHERE slug = $1
  `;

  try {
    const data = await query(queryStr, [slug]);
    return data[0] || null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getCountProductBySubcat(catId, subId) {
  try {
    let queryStr = '';
    let params = [];

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

    const result = await query(queryStr, params);
    return parseInt(result[0]?.count || '0', 10);
  } catch (error) {
    console.error("Error fetching product count:", error);
    return 0;
  }
}

// Debug function to check all categories
export async function getAllCategories() {
  const queryStr = `
    SELECT * FROM categories ORDER BY id
  `;

  try {
    const data = await query(queryStr);
    return data || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}

// New function to get subcategories by parent slug
export async function getSubcategoriesByParentSlug(parentSlug) {
  console.log("getSubcategoriesByParentSlug called with parentSlug:", parentSlug);
  
  try {
    // First get the parent category ID
    const parentQueryStr = `
      SELECT id FROM categories WHERE slug = $1
    `;
    
    console.log("Getting parent ID for slug:", parentSlug);
    const parentResult = await query(parentQueryStr, [parentSlug]);
    
    if (!parentResult || parentResult.length === 0) {
      console.log("No parent category found with slug:", parentSlug);
      return [];
    }
    
    const parentId = parentResult[0].id;
    console.log("Found parent ID:", parentId, "for slug:", parentSlug);
    
    // Now get the subcategories
    const queryStr = `
      SELECT c.*,
        COUNT(p.id) as "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      WHERE c.parent_id = $1
      GROUP BY c.id
      ORDER BY c.id
    `;

    console.log("Executing subcategory query with parentId:", parentId);
    const data = await query(queryStr, [parentId]);
    console.log("Query result for parentSlug", parentSlug, ":", JSON.stringify(data));
    
    if (!data || data.length === 0) {
      console.log("No subcategories found for parentSlug:", parentSlug);
      return [];
    }
    
    const mappedData = data.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent_id: category.parent_id,
      created_at: category.created_at,
      updated_at: category.updated_at,
      productCount: category.productcount || 0,
    }));
    
    console.log("Returning mapped subcategories for parentSlug", parentSlug, ":", JSON.stringify(mappedData));
    return mappedData;
  } catch (error) {
    console.error("Error fetching subcategories for parentSlug", parentSlug, ":", error);
    throw error;
  }
}
