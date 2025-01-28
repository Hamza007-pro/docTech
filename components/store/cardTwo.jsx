import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'

export default function Card(props) {
    return (
        <div className="mx-auto mt-5 lg:mt-5 h-[380px] sm:h-[490px] flex overflow-x-auto pb-4 lg:grid lg:max-w-none lg:auto-rows-fr lg:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-6 lg:px-0 scrollbar-hide">
            {props.content.map((post) => (
                <article
                    key={post.name}
                    className="min-w-[70vw] sm:min-w-0 relative isolate flex flex-col lg:pt-5 overflow-hidden rounded-xl bg-gray-900 px-4 sm:px-6 pt-36 sm:pt-48 mr-4 sm:mr-8 lg:mx-0 snap-center"
                >
                    <Image 
                        src={post.background} 
                        alt="" 
                        className="absolute inset-0 -z-10 h-full w-full object-cover" 
                        width={100} 
                        height={100}
                    />
                    <span className="text-xs sm:text-sm font-normal tracking-tight text-[#F5A623] lg:text-[20px]">
                        {post.name}
                    </span>
                    <h2 className="text-xl sm:text-4xl lg:text-3xl font-semibold tracking-tight text-white">
                        {post.Title}
                    </h2>
                    <h5 className="text-sm sm:text-lg font-normal tracking-tight text-gray-400 mt-2 sm:mt-4">
                        {post.subTitle}
                    </h5>
                    <nav className="flex mt-2 sm:mt-5" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-2 sm:space-x-4">
                            {post.breadcrumbs.map((page) => (
                                <li key={page.name}>
                                    <div className="flex items-center">
                                        <ChevronRightIcon 
                                            className="h-5 w-5 sm:h-7 sm:w-7 flex-shrink-0 text-gray-400" 
                                            aria-hidden="true" 
                                        />
                                        <Link
                                            href={page.href}
                                            className="ml-2 sm:ml-4 text-sm sm:text-lg font-medium text-blue-600 hover:text-gray-500"
                                            aria-current={page.current ? 'page' : undefined}
                                        >
                                            {page.name}
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </article>
            ))}
        </div>
    )
}