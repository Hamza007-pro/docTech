import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function CtaSection(props) {
    return (
        <div className="bg-white">
            <style jsx>{`
                .cta-section {
                    background-image: url(${props.content.mobileBackground});
                }
                @media (min-width: 641px) {
                    .cta-section {
                        background-image: url(${props.content.background});
                    }
                }
            `}</style>
            <div 
                className={`cta-section mx-auto max-w-7xl px-6 py-10 lg:py-14 rounded-xl sm:py-32 lg:px-20 bg-cover bg-center min-h-[400px] flex flex-col justify-start`}
            >
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium tracking-tight text-[#F5A623] sm:text-4xl lg:text-[22px]">
                        {props.content.name}
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                        {props.content.title}
                    </h2>
                    <h5 className="text-base font-semibold tracking-tight text-gray-400 sm:text-4xl lg:text-[16px]">
                        {props.content.subTitle}
                    </h5>
                </div>
                <div className="mt-10 flex items-center gap-x-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            {/* Home Link */}
                            <li>
                                <Link 
                                    href="#" 
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    <span className="sr-only">Home</span>
                                </Link>
                            </li>
                            {/* Breadcrumb Items */}
                            {props.content.breadcrumbs.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon 
                                            className="h-5 w-5 flex-shrink-0 text-gray-400" 
                                            aria-hidden="true" 
                                        />
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
    )
}