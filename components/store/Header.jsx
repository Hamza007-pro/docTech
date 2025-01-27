/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon,UserCircleIcon, ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { user, navigation, userNavigation, mobileNavigation, mobileMenuSections } from '@/data/dummyData'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Header() {
    const [enabled, setEnabled] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(null)
    const [activeTab, setActiveTab] = useState('UniFi')
    return (
        <div>
            <Disclosure as="header" className="bg-white ">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                            <div className="relative flex h-14 justify-between">
                                {/* Logo section */}
                                <div className="relative z-10 flex px-2 lg:px-0">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Image width={100} height={100} className="h-8 w-auto" src="/images/logo2.png" alt="" />
                                    </div>
                                </div>

                                {/* Mobile icons */}
                                <div className="flex items-center gap-2 sm:hidden px-2">
                                    <button
                                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                                        className="p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <Menu as="div" className="relative">
                                        <Menu.Button className="p-2 text-gray-400 hover:text-gray-500">
                                            {user ? (
                                                <Image
                                                    className="h-6 w-6 rounded-full"
                                                    src={user.imageUrl}
                                                    alt=""
                                                    width={24}
                                                    height={24}
                                                />
                                            ) : (
                                                <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Menu.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {user ? (
                                                    <>
                                                        <div className="flex justify-center pb-3">
                                                            <div className="flex-shrink-0">
                                                                <Image
                                                                    className="h-10 w-10 rounded-full bg-gray-100"
                                                                    src={user.imageUrl}
                                                                    alt=""
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="text-center pb-3">
                                                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                            <div className="text-xs text-gray-500">{user.email}</div>
                                                        </div>
                                                        
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Your Profile
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Settings
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <a
                                                                    href="#"
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block px-4 py-2 text-sm text-gray-700'
                                                                    )}
                                                                >
                                                                    Sign out
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="flex justify-center pb-3">
                                                            <div className="flex-shrink-0">
                                                                <Image
                                                                    className="h-10 w-10 rounded-full bg-gray-100"
                                                                    src="/images/logo2.png"
                                                                    alt=""
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block w-full px-4 py-2 text-sm text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md'
                                                                    )}
                                                                >
                                                                    Log in
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item>
                                                            {({ active }) => (
                                                                <button
                                                                    className={classNames(
                                                                        active ? 'bg-gray-100' : '',
                                                                        'block w-full px-4 py-2 mt-2 text-sm text-center text-gray-700'
                                                                    )}
                                                                >
                                                                    Sign Up
                                                                </button>
                                                            )}
                                                        </Menu.Item>
                                                    </>
                                                )}

                                                <div className="border-t border-gray-200 mt-2 pt-2">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <div className="px-4 py-2 text-xs text-gray-500">
                                                                <a href="#" className="hover:text-gray-700">Terms and Conditions</a>
                                                                {' · '}
                                                                <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                </div>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>

                                {/* Desktop search and navigation - hidden on mobile */}
                                <div className="relative z-0 hidden sm:flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                    <div className=" w-full sm:max-w-xs lg:max-w-[25rem]">
                                        <label htmlFor="search" className="sr-only">
                                            Search UniFi Products
                                        </label>
                                        {/* Desktop search input */}
                                        <div className="relative z-10">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full rounded-3xl h-[30px] placeholder:text-center border-0 bg-[#F6F6F8] py-1.5 pl-10 pr-3 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Search UniFi Products"
                                                type="search"
                                            />
                                        </div>
                                    </div>
                                    <Switch
                                        checked={enabled}
                                        onChange={setEnabled}
                                        className={classNames(
                                            enabled ? 'bg-[#F6F6F8]' : 'bg-[#F6F6F8]',
                                            'relative hidden sm:inline-flex h-[30px] ml-5 w-28 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                                        )}
                                    >
                                        <span className="sr-only">Use setting</span>
                                        <span className='absolute left-2'>UniFi</span>
                                        <span className='absolute right-2'>UISP</span>
                                        <span
                                            className={classNames(
                                                enabled ? 'translate-x-[50px] text-blue-700' : 'translate-x-0 text-blue-700',
                                                'pointer-events-none relative inline-block h-[26px] w-14 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                            )}
                                        >

                                            <span
                                                className={classNames(
                                                    enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                                                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                                )}
                                                aria-hidden="true"
                                            >
                                                <span>UniFi</span>
                                            </span>
                                            <span
                                                className={classNames(
                                                    enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                                                    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                                                )}
                                                aria-hidden="true"
                                            >
                                                <span>UISP</span>
                                            </span>
                                        </span>
                                    </Switch>
                                </div>

                                {/* Desktop right icons - hidden on mobile */}
                                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                                    <button
                                        type="button"
                                        className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none "
                                    >
                                        <span className="sr-only">View notifications</span>
                                        
                                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                    <hr className="h-5 w-px my-auto mx-1 bg-[#F6F6F8]" />
                                    <button
                                        type="button"
                                        className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none "
                                    >
                                        <span className="sr-only">View notifications</span>

                                        <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                </div>
                            </div>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Disclosure.Panel className="fixed inset-0 z-50 bg-white lg:hidden" aria-label="Global">
                                {/* Close button at the top */}
                                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
                                    <div className="flex-shrink-0">
                                        <Image width={100} height={100} className="h-8 w-auto" src="/images/logo2.png" alt="" />
                                    </div>
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500">
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </Disclosure.Button>
                                </div>

                                {/* Menu content */}
                                <div className="h-full overflow-y-auto">
                                    {/* Top navigation tabs */}
                                    <div className="grid grid-cols-3 px-4 py-2 border-b bg-white">
                                        {mobileNavigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveTab(item.name);
                                                }}
                                                className={classNames(
                                                    activeTab === item.name ? 'text-blue-600 bg-[#F6F6F8]' : 'text-gray-900',
                                                    'text-center px-3 py-2 text-sm font-medium rounded-md'
                                                )}
                                                aria-current={activeTab === item.name ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>

                                    {/* Collapsible sections */}
                                    <div className="border-t border-gray-200 bg-white">
                                        {mobileMenuSections.map((section) => (
                                            <Disclosure key={section.name}>
                                                {({ open }) => (
                                                    <>
                                                        <Disclosure.Button 
                                                            className={classNames(
                                                                open ? 'bg-[#F6F6F8]' : '',
                                                                'flex w-full items-center justify-between px-4 py-3 text-gray-900 hover:bg-[#F6F6F8]'
                                                            )}
                                                        >
                                                            <span className="text-sm font-medium">{section.name}</span>
                                                            <ChevronDownIcon
                                                                className={classNames(
                                                                    open ? 'rotate-180' : '',
                                                                    'h-5 w-5 transition-transform'
                                                                )}
                                                            />
                                                        </Disclosure.Button>
                                                        <Disclosure.Panel className="px-4 pb-2 bg-[#F6F6F8]">
                                                            <div className="space-y-1">
                                                                {section.items.map((item) => (
                                                                    <Disclosure.Button
                                                                        key={item.name}
                                                                        as="a"
                                                                        href={item.href}
                                                                        onClick={() => setActiveItem(item.name)}
                                                                        className={classNames(
                                                                            activeItem === item.name ? 'bg-[#F6F6F8]' : '',
                                                                            'block w-full py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-white rounded-md px-2'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Disclosure.Button>
                                                                ))}
                                                            </div>
                                                        </Disclosure.Panel>
                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </div>

                                    {/* Location selector */}
                                    <div className="border-t border-gray-200 px-4 py-3 bg-[#F6F6F8]">
                                        <div className="flex items-center">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <GlobeAltIcon className="h-5 w-5 mr-2" />
                                                United States
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
                
            </Disclosure>

            {/* Mobile search input when expanded */}
            {isSearchOpen && (
                <div className="absolute left-0 right-0 z-50 top-[3rem] px-4 sm:hidden">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            id="mobile-search"
                            name="mobile-search"
                            className="block w-full rounded-3xl h-[30px] placeholder:text-center border-0 bg-[#F6F6F8] py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                            placeholder="Search UniFi Products"
                            type="search"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}