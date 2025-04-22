// Category type definitions

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  productCount?: number;
  subcategories?: Category[];
}

// UI-specific category interface
export interface UICategory extends Partial<Category> {
  name: string;
  href: string;
  img: string;
  size: string;
  id: number;
}
