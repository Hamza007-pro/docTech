import { supabase } from "./supabase";

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

// Get all main categories (those without parent_id)
export async function getMainCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      *,
      productCount:products!products_category_id_fkey(count)
    `
    )
    .is("parent_id", null)
    .order("id");

  if (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }

  return data || [];
}

export async function getSubcategories(
  categoryId: number
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
        *,
        productCount:products!subcategory_id(count)
      `
    )
    .eq("parent_id", categoryId)
    .order("id");

  if (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }

  return (
    data?.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      parent_id: category.parent_id,
      created_at: category.created_at,
      updated_at: category.updated_at,
      productCount: category.productCount[0]?.count || 0,
    })) || []
  );
}

export async function getCountProductBySubcat(catId: number, subId: number) {
  try {
    let query = supabase
      .from("products")
      .select("*", { 
        count: "exact", 
        head: true 
      });

    if (subId === 0) {
      // Get count for entire category
      query = query.eq("category_id", catId);
    } else {
      // Get count for specific subcategory
      query = query
        .eq("category_id", catId)
        .eq("subcategory_id", subId);
    }

    const { count, error } = await query;

    if (error) {
      console.error("Error fetching product count:", error);
      return 0; // Always return number for UI consistency
    }

    return count ?? 0;
  } catch (error) {
    console.error("Unexpected error:", error);
    return 0;
  }
}

// Get category by slug
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching category:", error);
    return null;
  }

  return data;
}

// Get all categories with their subcategories
export async function getCategoriesWithSubcategories(): Promise<{
  [key: string]: Category[];
}> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      slug,
      description,
      parent_id,
      subcategories:categories!parent_id(*)
    `
    )
    .is("parent_id", null);

  if (error) {
    console.error("Error fetching categories with subcategories:", error);
    throw error;
  }

  return (
    data?.reduce((acc, category) => {
      acc[category.slug] = category.subcategories;
      return acc;
    }, {} as { [key: string]: Category[] }) || {}
  );
}

// Get complete category tree
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
