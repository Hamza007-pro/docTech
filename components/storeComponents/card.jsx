import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
export default function Card(props) {
    return (
        <div className="mx-auto lg:mt-5 h-[490px] grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {props.content.map((post) => (
                <article
                    key={post.name}
                    className="relative isolate flex flex-col lg:pt-5  overflow-hidden rounded-2xl bg-gray-900 px-8  sm:pt-48"
                >
                    <Image src={post.background} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" width={100} height={100}/>
                    <span className="text-sm font-normal tracking-tight text-[#F5A623] sm:text-4xl lg:text-[20px] ">{post.name}</span>
                    <h2 className="lg:text-3xl font-semibold tracking-tight text-white sm:text-4xl ">{post.Title}</h2>
                    <h5 className="lg:text-lg font-normal tracking-tight text-gray-400 sm:text-4xl mt-4">
                        {post.subTitle}
                    </h5>
                    <nav className="flex mt-5" aria-label="Breadcrumb">
                        <ol role="list" className="flex items-center space-x-4">
                            {
                                post.breadcrumbs.map((page) => (
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
                                ))
                            }
                        </ol>
                    </nav>

                </article>
            ))}
        </div>
    )
}