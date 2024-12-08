import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
export default function CtaSectionTwo(props) {
    return (
        <div className="bg-white mt-10">
            <div className={`mx-auto max-w-7xl px-6 py-10 lg:py-9 lg:h-48 rounded-xl sm:py-32 lg:px-20 bg-cover`} style={{ backgroundImage: `url(${props.content.background})` }}>
            <h5 className="text-lg font-semibold tracking-tight text-gray-400 sm:text-4xl lg:text-[16px]">
                    {props.content.subTitle}
                </h5>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl ">
                    {props.content.title}
                </h2>
                <div className="mt-10 flex items-center gap-x-6">
                    <nav className="flex" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            <li>
                                <div>
                                    <a href="#" className="text-gray-400 hover:text-gray-500">
                                        <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                        <span className="sr-only">Home</span>
                                    </a>
                                </div>
                            </li>
                            {props.content.breadcrumbs.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" href='/index' />
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