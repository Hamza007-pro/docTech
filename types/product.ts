export type AvailabilityStatus = 'In Stock' | 'Sold Out';

/**
 * Product interface representing a product in the store
 * @property {string} image_src - Product thumbnail image path. Can be:
 *   - A full URL starting with http/https for Supabase Storage
 *   - A path relative to /assets/productsImg/ (e.g., "product1.png")
 * @property {string} img_full - Full-size product image path. Can be:
 *   - A full URL starting with http/https for Supabase Storage
 *   - A path relative to /assets/productsImg/ (e.g., "product1-full.png")
 */
export interface Product {
    /** Optional path to technical specification PDF document */
    tech_spec_pdf?: string;
    id: number;
    title: string;
    model: string;
    description: string;
    price: number;
    availability: AvailabilityStatus;
    /** Product thumbnail image path */
    image_src: string;
    /** Full-size product image path */
    img_full: string;
    /** Alt text for product images */
    image_alt: string;
    is_new: boolean;
    clients?: string;
    features: string[];
    created_at?: string;
    updated_at?: string;
}
