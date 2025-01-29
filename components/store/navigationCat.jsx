"use client";
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import useNavigationStore from '@/lib/store/navigationStore';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationCat() {
    const router = useRouter();
    const { navigateTo, setNavigateTo, currentTab, setCurrentTab } = useNavigationStore();

    const tabs = [
        { name: "what's New", href: '#', img:'/svg/svg10.svg', size: 'w-24 h-24' },
        { name: 'UniFi Cloud Gateways', href: '#', img:'/svg/svg1.svg', size: 'w-32 h-24' },
        { name: 'WiFi', href: '#', img:'/svg/svg2.svg', size: 'w-24 h-24' },
        { name: 'Switching', href: '#', img:'/svg/svg3.svg', size: 'w-32 h-24' },
        { name: 'Cloud Keys & Gateways', href: '#', img:'/svg/svg4.svg', size: 'w-32 h-24' },
        { name: 'Camera Security', href: '#', img:'/svg/svg5.svg', size: 'w-32 h-24' },
        { name: 'Door Access', href: '#', img:'/svg/svg6.svg', size: 'w-32 h-24' },
        { name: 'Managed VoIP', href: '#', img:'/svg/svg7.svg', size: 'w-32 h-24' },
        { name: 'New Integrations', href: '#', img:'/svg/svg8.svg', size: 'w-32 h-24' },
        { name: 'Accessories', href: '#', img:'/svg/svg9.svg', size: 'w-32 h-24' },
    ];

    const scrollContainerRef = useRef(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setShowLeftScroll(scrollLeft > 0);
            setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    const handleTabClick = (index) => {
        setCurrentTab(index);
        setNavigateTo(index);
        if (window.location.pathname !== '/store') {
            router.push('/store');
        }
    };

    return (
        <div className="mx-auto max-w-7xl sm:px-4 mt-5 lg:px-8">
            {/* Mobile view */}
            <div className="relative sm:hidden">
                {showLeftScroll && (
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full shadow-md"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
                    </button>
                )}
                
                <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto no-scrollbar -mt-4 z-0"
                >
                    <div className="flex flex-nowrap gap-2 px-4 py-3">
                        {tabs.map((tab, index) => (
                            <div
                                key={tab.name}
                                onClick={() => handleTabClick(index)}
                                className="flex flex-col items-center flex-shrink-0 space-y-1 cursor-pointer w-[10.33%] px-1"
                            >
                                <div className={classNames(
                                    currentTab === index ? 'bg-gray-100' : 'bg-white',
                                    tab.size,
                                    'flex items-center justify-center rounded-lg relative overflow-hidden'
                                )}>
                                    <Image 
                                        src={tab.img} 
                                        alt={tab.name}
                                        fill
                                        className="object-contain p-0"
                                        sizes="(max-width: 80px) 100vw"
                                        priority
                                    />
                                </div>
                                <span className="text-xs text-gray-600 text-center whitespace-nowrap px-1 truncate w-full">
                                    {tab.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {showRightScroll && (
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-1 rounded-full shadow-md"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-600" />
                    </button>
                )}
            </div>

            {/* Desktop view */}
            <div className="hidden sm:block">
                <nav className="flex space-x-6 justify-center" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <button
                            onClick={() => handleTabClick(index)}
                            key={tab.name}
                            className={classNames(
                                currentTab === index ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                'rounded-md py-2 text-sm font-medium text-center text-[12px] grid justify-center'
                            )}
                            aria-current={currentTab === index ? 'page' : undefined}
                        >
                            <img src={tab.img} alt="svg" />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
