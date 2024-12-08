/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { Bars3Icon, BellIcon, XMarkIcon,UserCircleIcon, ShoppingCartIcon} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Switch } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'


const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Header() {
    const [enabled, setEnabled] = useState(false)
    return (
        <div>
            <Disclosure as="header" className="bg-white ">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
                            <div className="relative flex h-14 justify-between">
                                <div className="relative z-10 flex px-2 lg:px-0">
                                    <div className="flex flex-shrink-0 items-center">
                                        <Image width={100} height={100} className="h-8 w-auto" src="/images/logo2.png" alt="" />
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 mr-5">
                                                    categories
                                                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                                                        {navigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <Link
                                                                        href={item.href}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                            'block px-4 py-2 text-sm'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>

                                </div>
                                <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                                    <div className=" w-full sm:max-w-xs lg:max-w-[25rem]">
                                        <label htmlFor="search" className="sr-only">
                                            Search UniFi Products
                                        </label>
                                        <div className="relative">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </div>
                                            <input
                                                id="search"
                                                name="search"
                                                className="block w-full rounded-3xl h-[30px] placeholder:text-center border-0 bg-[#F6F6F8] py-1.5 pl-10 pr-3 text-gray-900  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                            'relative inline-flex h-[30px] ml-5 w-28 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none  '
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
                                <div className="relative z-10 flex items-center lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
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

                        <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                            'block rounded-md py-2 px-3 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="flex items-center px-4">
                                    <div className="flex-shrink-0">
                                        <Image className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-gray-800">{user.name}</div>
                                        <div className="text-sm font-medium text-gray-500">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
                
            </Disclosure>
        </div>
    )
}