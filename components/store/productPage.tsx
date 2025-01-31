"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useNavigationStore from "@/lib/store/navigationStore";
import TabsMenu from "../product/TabsMenu";
import ProductReview from "../product/productReview";
import TechSpecsSection from "../product/TechSpecsSection";
import { getProductById } from "@/lib/products";
import { Product } from "@/types/product";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const navigateTo = useNavigationStore((state) => state.navigateTo);
  const setNavigateTo = useNavigationStore((state) => state.setNavigateTo);

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Product');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      
      try {
        const data = await getProductById(Number(id));
        if (data) {
          setProduct(data);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to load product');
        console.error('Error loading product:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || 'Product not found'}</div>
      </div>
    );
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 pt-32">
      <div className="lg:grid lg:grid-cols-5 lg:gap-x-8 lg:items-start">
        {/* Product image */}
        <div
          className="lg:col-span-3 flex justify-center rounded-lg p-8"
          style={{ position: "sticky", top: "1rem" }}
        >
          <Image
            src={product.img_full}
            alt={product.image_alt}
            width={500}
            height={500}
            className="object-contain"
            priority
            onError={(e) => {
              console.error('Failed to load full image:', product.img_full);
              const img = e.target as HTMLImageElement;
              img.src = '/images/logo.png';
            }}
          />
        </div>

        {/* Product details */}
        <div className="lg:col-span-2 mt-10 px-4 py-4 sm:px-0 sm:mt-16 lg:p-4 lg:mt-0 border-2 rounded-sm border-blue-500">
          {/* Title and Price */}
          <div className="flex items-center justify-start">
              <Image
                src={product.image_src}
                alt={product.image_alt}
                width={100}
                height={100}
                className="object-contain mr-4"
                priority
                onError={(e) => {
                  console.error('Failed to load thumbnail:', product.image_src);
                  const img = e.target as HTMLImageElement;
                  img.src = '/images/logo.png';
                }}
              />
            <div>
              <h1 className="text-xl text-center font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>
              <p className="text-sm text-gray-400 mt-2">{product.model}</p>
              <p className="text-xl font-semibold text-gray-600 mt-4">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>
          </div>
          {/* Features */}
          <div className="mt-6 space-y-4">
            <hr className="border-t border-gray-300" />
            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              <li>{product.description}</li>
              <li>
                <strong>Shadow Mode High Availability</strong> with automatic
                failover provides uninterrupted connectivity (VRRP)*
              </li>
              <li>
                <strong>12.5 Gbps routing</strong> with IDS/IPS
              </li>
              <li>
                License-free, real-time inspection of encrypted packets with{" "}
                <strong>NeXT AI Inspection</strong> (SSL/TLS decryption)
              </li>
              <li>
                <strong>2× SFP28</strong>, <strong>2× SFP+</strong>, and{" "}
                <strong>2× 2.5 GbE RJ45</strong> ports (two interfaces
                remappable to WAN)
              </li>
              <li>
                <strong>Dual hot-swap PSUs</strong> for power redundancy
              </li>
              <li>
                <strong>1.3&quot; touchscreen</strong> for local management
              </li>
            </ul>
          </div>

          {/* Purchase Options */}
          <div className="mt-8 space-y-4">
            <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
              <h3 className="font-semibold text-lg">Single Unit</h3>
              <p className="text-gray-600">${Number(product.price).toFixed(2)}</p>
            </div>

            <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
              <h3 className="font-semibold text-lg">High Availability Pair</h3>
              <p className="text-gray-600">${(Number(product.price) * 2).toFixed(2)}</p>
            </div>
          </div>

          {/* Footnotes */}
          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>
              * Requires UniFi OS 4.0 and later. Must be paired with another
              EFG.
            </p>
            <p>
              ** Pair with an official SFP28 Module, SFP+ Module, or SFP+ to
              RJ45 Adapter
            </p>
            <p>*** Professional Phone Support available in select regions</p>
          </div>

          <div className="mt-8 flex justify-end space-y-4 space-x-2">
            {/* Quantity Input */}
            <div className="relative flex items-center max-w-[200px]">
              <button
                onClick={handleDecrement}
                disabled={quantity === 1}
                className="absolute top-4 left-0 px-3 py-2 text-gray-600 disabled:text-gray-300 hover:text-gray-900 transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              
              <input
                type="number"
                value={quantity}
                onChange={handleChange}
                min="1"
                className="w-24 h-10 mt-4 pl-10 pr-10 py-2 text-center text-black border rounded-md bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hide-number-arrows"
                aria-label="Quantity"
              />
              <button
                onClick={handleIncrement}
                className="absolute top-4 right-0 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button className="mt-1 w-24 h-10 bg-blue-600 hover:bg-blue-700 text-white font-light text-sm py-2 rounded-lg transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <TabsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'Product' && <ProductReview />}
      {activeTab === 'Technical Specification' && <TechSpecsSection product={product} />}
    </div>
  );
};

export default ProductPage;
