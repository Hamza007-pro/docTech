"use client";

import { useEffect, useState } from 'react';
import CatTabs from './catTabs';
import ProductCard from './productCard';
import { getAllProducts, getProductsByCategory } from '@/lib/products';
import { Product } from '@/types/product';
import useNavigationStore from '@/lib/store/navigationStore';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { navigateTo } = useNavigationStore();

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        let data;
        
        if (navigateTo === 0) {
          data = await getAllProducts();
        } else {
          data = await getProductsByCategory(navigateTo);
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [navigateTo]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl sm:px-4 mt-10 lg:px-8 bg-white min-h-[32vh] flex items-center justify-center">
        <div className="text-gray-500">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl sm:px-4 mt-10 lg:px-8 bg-white min-h-[32vh] flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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

