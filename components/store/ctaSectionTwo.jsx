import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function CtaSectionTwo(props) {
    return (
        <div className="bg-white mt-10">
            <div className="mx-auto max-w-7xl px-6 py-10 lg:py-9 h-96 lg:h-48 rounded-xl sm:py-32 lg:px-20 relative">
                {/* Mobile Background */}
                <div 
                    className="md:hidden absolute inset-0 bg-cover rounded-xl z-0" 
                    style={{ backgroundImage: `url(${props.content.mobileBackground})` }}
                ></div>
                {/* Desktop Background */}
                <div 
                    className="hidden md:block absolute inset-0 bg-cover rounded-xl z-0" 
                    style={{ backgroundImage: `url(${props.content.background})` }}
                ></div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center">
                    <h5 className="text-lg font-semibold tracking-tight text-gray-400 sm:text-4xl lg:text-[16px]">
                        {props.content.subTitle}
                    </h5>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mt-2">
                        {props.content.title}
                    </h2>
                    <div className="mt-6 flex items-center gap-x-6">
                        <nav className="flex" aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-4">
                                <li key="home">
                                    <div>
                                        <a href="#" className="text-gray-400 hover:text-gray-500">
                                            <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                            <span className="sr-only">Home</span>
                                        </a>
                                    </div>
                                </li>
                                {props.content.breadcrumbs.map((page, index) => (
                                    <li key={page.name + '-' + index}>
                                        <div className="flex items-center">
                                            <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                            <Link
                                                href={page.href}
                                                className="ml-4 text-sm font-medium text-blue-600 hover:text-gray-500"
                                                aria-current={page.current ? 'page' : undefined}
                                            >
                                                {page.name}
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}