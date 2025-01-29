"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useNavigationStore from "@/lib/store/navigationStore";
import { products } from "./productList";
import { useState } from "react";
import TabsMenu from "../product/TabsMenu";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  // Use Zustand store for navigateTo state
  const navigateTo = useNavigationStore((state) => state.navigateTo);
  const setNavigateTo = useNavigationStore((state) => state.setNavigateTo);

  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleChange = (e) => {
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
            src={product.imgFull}
            alt={product.imageAlt}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        {/* Product details */}
        <div className="lg:col-span-2 mt-10 px-4 py-4 sm:px-0 sm:mt-16 lg:p-4 lg:mt-0 border-2 rounded-sm border-blue-500">
          {/* Title and Price */}
          <div className="flex items-center justify-start">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={100}
              height={100}
              className="object-contain mr-4"
            />
            <div>
              <h1 className="text-xl text-center font-bold tracking-tight text-gray-900">
                {product.title}
              </h1>
              <p className="text-sm text-gray-400 mt-2">{product.model}</p>
              <p className="text-xl font-semibold text-gray-600 mt-4">
                $1,999.00
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
              <p className="text-gray-600">$1,999.00</p>
            </div>

            <div className="border rounded-lg p-4 hover:border-blue-500 cursor-pointer">
              <h3 className="font-semibold text-lg">High Availability Pair</h3>
              <p className="text-gray-600">$3,998.00</p>
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
      <TabsMenu />
    </div>
  );
};

export default ProductPage;
