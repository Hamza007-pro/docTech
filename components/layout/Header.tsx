"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu,X,Globe,UserCircle2 } from 'lucide-react';
import { navigation } from '@/assets/DummyData';
import { Dialog } from '@headlessui/react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-b from-slate-950 from-50% lg:absolute lg:z-[99] lg:w-full">
    <nav className="mx-auto flex lg:max-w-[70%] items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-2 mx-5">
            <Link href="#" className="-m-1.5 p-1.5">
                <Image width={100} height={100} className="h-8 w-auto" src="/images/logo.png" alt="" />
            </Link>
        </div>
        <div className="flex lg:hidden">
            <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
            >
                <span className="sr-only">Open main menu</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
                <Link key={item.name} href={item.href} className=" py-1 text-sm font-normal leading-6 text-white">
                    {item.name}
                </Link>
            ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:ml-20">
            <button
                type="button"
                className="rounded px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 mx-2"
            >
                Support
            </button>
            <Link
                type="button"
                className="rounded bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-inset"
                href='/store'
            >
                Store
            </Link>
            <Globe width={20} height={20} color='white' className='mx-2 my-auto' />
            <UserCircle2 width={20} height={20} color='white' className=' my-auto' />
        </div>
    </nav>
    <div className='mx-auto flex max-w-[70%] py-3 lg:px-8 max-md:hidden'>
        <div className='px-5 mr-10'>
            <span className='text-blue-600'>Introduction</span>
            <h3 className='text-white my-2'>How it work</h3>
            <h3 className='text-white my-2'>What&apos;s New</h3>
        </div>
        <hr className="h-20 w-px my-auto  bg-gray-500 border-0 dark:bg-gray-700" />
        <div className='px-5 ml-10'>
            <span className='text-gray-400 text-sm font-medium'>Links</span>
            <h3 className='text-white my-2'>Design Center</h3>
            <h3 className='text-white my-2'>Professional Support</h3>
        </div>
        <div className='px-5 ml-10'>
            <span className='text-black text-sm '>&apos;</span>
            <h3 className='text-white my-2'>Large Project assistance</h3>
            <h3 className='text-white my-2'>USIP Carrier Platform</h3>
        </div>
    </div>
    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">DocTech</span>
                            <Image
                                width={100} height={100} className="h-8 w-auto" src="/images/logo.png" alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
    
</header>
  );
}