/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BarsArrowDownIcon } from '@heroicons/react/20/solid'

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function CatTabs() {

    const [tabs, setTabs] = useState([
        { name: 'All', href: '#', current: true, Qts: 18 },
        { name: 'Flagship', href: '#', current: false, Qts: 5 },
        { name: 'In-Wall', href: '#', current: false, Qts: 10 },
        { name: 'Mega Capacity', href: '#', current: false, Qts: 9 },
        { name: 'Flexible & Outdoor', href: '#', current: false, Qts: 10 },
        { name: 'Buiding Bridge', href: '#', current: false, Qts: 9 },
    ]);

    const handleTabClick = (index) => {
        const newTabs = tabs.map((tab, i) => ({
            ...tab,
            current: i === index ? true : false,
        }));
        setTabs(newTabs);
    };
    return (
        <div className=' justify-between lg:flex'>
            <div className='lg:flex'>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        defaultValue={tabs.find((tab) => tab.current).name}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1 mr-3">
                    <nav className="flex " aria-label="Tabs">
                        {tabs.map((tab, index) => (
                            <Link
                                onClick={() => handleTabClick(index)}
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    tab.current ? 'bg-white text-blue-700' : 'text-gray-600 hover:text-gray-800',
                                    'rounded-3xl px-3 py-1 text-sm font-normal'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                            >
                                {tab.name} ({tab.Qts})
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1">
                    <nav className="flex space-x-2" aria-label="Tabs">
                        <Link
                            href='#'
                            className={classNames(
                                'text-gray-600 hover:text-gray-800',
                                'rounded-3xl px-3 py-1 text-sm font-normal'
                            )}
                            aria-current={'page'}
                        >
                            Related Add-Ons
                        </Link>
                    </nav>
                </div>
            </div>
            <div className='lg:flex'>
                <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1 mr-3">
                    <nav className="flex space-x-2" aria-label="Tabs">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className={classNames(
                                    'text-gray-600 hover:text-gray-800',
                                    'rounded-3xl px-3 py-1 text-sm font-normal flex justify-around'
                                )}>
                                    <BarsArrowDownIcon className=" h-5 w-5 text-gray-900 mr-1" />
                                    Recommended
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Recommanded
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Highest Price
                                                </Link>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <Link
                                                    href="#"
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm'
                                                    )}
                                                >
                                                    Lowest Price
                                                </Link>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </nav>
                </div>
                <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1">
                    <nav className="flex space-x-2" aria-label="Tabs">
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className={classNames(
                                    'text-gray-600 hover:text-gray-800',
                                    'rounded-3xl px-3 py-1 text-sm font-normal flex justify-around'
                                )}>
                                    <AdjustmentsHorizontalIcon className=" h-5 w-5 text-gray-900 mr-1" />
                                    Filter
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                            <div className="relative flex items-start px-4 py-2 text-sm">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="comments" className=" text-sm text-gray-900">
                                                        PoE
                                                    </label>

                                                </div>
                                            </div>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <div className="relative flex items-start px-4 py-2 text-sm">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="comments" className=" text-sm text-gray-900">
                                                        WiFi Integrated
                                                    </label>

                                                </div>
                                            </div>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <div className="relative flex items-start px-4 py-2 text-sm mt-5">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="comments"
                                                        aria-describedby="comments-description"
                                                        name="comments"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="comments" className=" text-sm text-gray-900">
                                                        In Stock
                                                    </label>

                                                </div>
                                            </div>
                                        </Menu.Item>
                                        <form method="POST" action="#">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        type="submit"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-blue-400' : 'text-blue-400',
                                                            'block w-full px-4 py-2 text-left font-medium'
                                                        )}
                                                    >
                                                        Reset Filter
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </form>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default CatTabs