import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationCat(props) {



    const [tabs, setTabs] = useState([
        { name: "what's New", href: '#', img:'/svg/svg10.svg', current: true },
        { name: 'UniFi Cloud Gateways', href: '#', img:'/svg/svg1.svg', current: false },
        { name: 'WiFi', href: '#', img:'/svg/svg2.svg', current: false },
        { name: 'Switching', href: '#', img:'/svg/svg3.svg', current: false },
        { name: 'Cloud Keys & Gateways', href: '#', img:'/svg/svg4.svg', current: false },
        { name: 'Camera Security', href: '#', img:'/svg/svg5.svg', current: false },
        { name: 'Door Access', href: '#', img:'/svg/svg6.svg', current: false },
        { name: 'Managed VoIP', href: '#', img:'/svg/svg7.svg', current: false },
        { name: 'New Integrations', href: '#', img:'/svg/svg8.svg', current: false },
        { name: 'Accessories', href: '#', img:'/svg/svg9.svg', current: false },
      ]);

      const handleTabClick = (index ) => {
        const newTabs = tabs.map((tab, i) => ({
          ...tab,
          current: i === index ? true : false,
        }));
        setTabs(newTabs);
        props.setNavigateTo(index);
      };
    return (
        <div className="mx-auto max-w-7xl sm:px-4 mt-5 lg:px-8 bg-white">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 "
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-6 justify-center" aria-label="Tabs">
                    {tabs.map((tab, index) => (
                        <Link
                            onClick={() => handleTabClick(index)}
                            key={tab.name}
                            href={tab.href}
                            id={tab.name}
                            className={classNames(
                                tab.current ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:text-gray-700',
                                'rounded-md py-2 text-sm font-medium text-center text-[12px] grid justify-center '
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            <Image src={tab.img} alt="svg"/>
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    )
}