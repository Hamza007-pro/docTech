"use client";

import { useEffect, useState } from 'react';
import CatTabs from './catTabs';
import ProductCard from './productCard';
import { 
  getAllProducts, 
  getProductsByCategory,
  getProductsByCategorySlug,
  getProductsBySubcategorySlug 
} from '@/app/actions/products';
import { Product } from '@/types/product';
import useNavigationStore from '@/app/store/navigationStore';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { navigateTo, currentTab } = useNavigationStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        let data: Product[] = [];
        
        if (currentTab !== 'all') {
          // Handle specific subcategory
          data = await getProductsBySubcategorySlug(currentTab);
        }
        else {
          // Handle "All" case - get all products in current category
          if (navigateTo === 0) {
            data = await getAllProducts();
          } else {
            // Get products for selected category
            data = await getProductsByCategory(navigateTo);
          }
        }
        
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products');
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [navigateTo, currentTab]);



  return (
    <div className="mx-auto max-w-7xl sm:px-4 mt-10 lg:px-8 bg-white min-h-[32vh]">
      <CatTabs />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 lg:gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
