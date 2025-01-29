'use client';
import Header from '@/components/store/Header'
import NavigationCat from '@/components/store/navigationCat'
import Footer from '@/components/layout/Footer'
import { footerLink } from '@/assets/DummyData'
import Body from '@/components/store/body';

export default function Index() {
    return (
        <div className="bg-white">
            <Header />
            <NavigationCat />
            <Body />
            <Footer content={footerLink}/>
        </div>
    )
}
