'use client';
import Header from '@/components/store/Header'
import NavigationCategories from '@/components/store/NavigationCategories'
import Footer from '@/components/layout/Footer'
import { footerLink } from '@/assets/DummyData'
import Body from '@/components/store/body';

export default function Index() {
    return (
        <div className="bg-white">
            <Header />
            <NavigationCategories />
            <Body />
            <Footer content={footerLink}/>
        </div>
    )
}
