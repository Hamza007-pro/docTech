import React, { useState } from 'react';
import Header from '@/components/store/Header';
import NavigationCat from '@/components/store/NavigationCat';
import Body from '@/components/store/Body';
import Footer from '@/components/layout/Footer';

import { footerLink } from '@/assets/DummyData';

export default function Store() {
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