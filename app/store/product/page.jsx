"use client";

import React from "react";
import Header from '../../../components/store/Header';
import NavigationCategories from '../../../components/store/NavigationCategories';
import Footer from '../../../components/layout/Footer';
import { footerLink } from '../../../assets/DummyData.js';
import ProductPage from "../../../components/store/productPage";

export default function Page() {
  return (
    <div className="bg-white">
      <Header />
      <NavigationCategories />
      <ProductPage />
      <Footer content={footerLink}/>
    </div>
  );
}
