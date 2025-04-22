// Type definitions for categories

export interface CategoryType {
  id: number;
  name: string;
  slug?: string;
  description?: string | null;
  parent_id?: number | null;
  created_at?: string;
  updated_at?: string;
  productCount?: number;
  href?: string;
  img?: string;
  size?: string;
}
