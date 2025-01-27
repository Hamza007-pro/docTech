"use client";
import Header from "../../components/store/Header";
import NavigationCat from "../../components/store/NavigationCat";
import Body from "../../components/store/Body";
import Footer from "../../components/layout/Footer";
import { footerLink } from "@/assets/DummyData";
import { useState } from "react";

export default function Index() {
    const [navigateTo,setNavigateTo] = useState(0);
    return (
        <div className="bg-white">
            <Header />
            <NavigationCat setNavigateTo={setNavigateTo}/>
            <Body navigateTo={navigateTo}/>
            <Footer content={footerLink}/>
        </div>

    )
}