"use client";

import React from "react";
import Header from '@/components/store/Header';
import NavigationCat from '@/components/store/navigationCat';
import Footer from '@/components/layout/Footer';
import { footerLink } from '@/assets/DummyData';
import ProductPage from "@/components/store/productPage";

export default function Page() {
  return (
    <div className="bg-white">
      <Header />
      <NavigationCat />
      <ProductPage />
      <Footer content={footerLink}/>
    </div>
  );
}
