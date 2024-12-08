

import Header from "@/components/storeComponents/Header";
import NavigationCat from "@/components/storeComponents/NavigationCat";
import Body from "@/components/storeComponents/Body";
import Footer from "@/components/layout/Footer";
import { footerLink } from "@/assets/DummyData";
import { useState } from "react";

export default function Index() {
    const [navigateTo,setNavigateTo] = useState(null);
    return (
        <div className="bg-white">
            <Header />
            <NavigationCat setNavigateTo={setNavigateTo}/>
            <Body navigateTo={navigateTo}/>
            <Footer content={footerLink}/>
        </div>

    )
}