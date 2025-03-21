"use client";
import { useRef, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import useNavigationStore from '@/lib/store/navigationStore';
import { getMainCategories } from '@/lib/categories';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationCat() {
    const router = useRouter();
    const pathname = usePathname();
    const { navigateTo, setNavigateTo, currentTab, setCurrentTab, reset } = useNavigationStore();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollContainerRef = useRef(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError(null);
            try {
                let mainCategories = [];
                try {
                    mainCategories = await getMainCategories();
                } catch (error) {
                    console.error('Failed to fetch from Supabase:', error);
                }

                // Fallback categories if Supabase fetch fails
                const formattedCategories = [
                    {
                        id: 'new',
                        name: "What's New",
                        href: '/store/new',
                        img: '/svg/New.svg',
                        size: 'w-24 h-24'
                    },
                    ...(mainCategories.length > 0 
                        ? mainCategories.map(category => ({
                            name: category.name,
                            href: `/store/category/${category.slug}`,
                            img: `/svg/${category.slug}.svg`,
                            size: 'w-32 h-24',
                            id: category.id
                        }))
                        : [])
                ];
                setCategories(formattedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to load categories');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (error) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-8 text-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl sm:px-4 mt-5 lg:px-8">
                <div className="flex justify-center space-x-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                            <div className="mt-2 w-20 h-4 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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

    const handleTabClick = (index, href) => {
        const newTab = index.toString();
        setCurrentTab(newTab);
        const newNavigateTo = href === '/store/new' ? 0 : index;
        setNavigateTo(newNavigateTo);
        
        // Navigate back to store page when clicking from product page
        // but preserve the selected category
        if (pathname !== '/store') {
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
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                onClick={() => handleTabClick(index, category.href)}
                                className="flex flex-col items-center flex-shrink-0 space-y-1 cursor-pointer w-[10.33%] px-1"
                            >
                                <div className={classNames(
                                    currentTab === index.toString() ? 'bg-gray-100' : 'bg-white',
                                    category.size,
                                    'flex items-center justify-center rounded-lg relative overflow-hidden'
                                )}>
                                     <Image 
                                        src={category.img} 
                                        alt={category.name}
                                        fill
                                        className="object-contain p-0"
                                        sizes="(max-width: 80px) 100vw"
                                        priority
                                    />
                                </div>
                                <span className="text-xs text-gray-600 text-center whitespace-nowrap px-1 truncate w-full">
                                    {category.name}
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
                    {categories.map((category, index) => (
                        <button
                            onClick={() => handleTabClick(index, category.href)}
                            key={category.id}
                            className={classNames(
                                currentTab === index.toString() ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                'rounded-md py-2 text-sm font-medium text-center text-[12px] grid justify-center'
                            )}
                            aria-current={currentTab === index.toString() ? 'page' : undefined}
                        >
                            <img src={category.img} alt={category.name} />
                            {category.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
