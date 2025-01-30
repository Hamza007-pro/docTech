export type AvailabilityStatus = 'In Stock' | 'Sold Out';

export interface Product {
    id: number;
    title: string;
    model: string;
    description: string;
    price: number;
    availability: AvailabilityStatus;
    image_src: string;
    img_full: string;
    image_alt: string;
    is_new: boolean;
    clients?: string;
    features: string[];
    created_at?: string;
    updated_at?: string;
}
