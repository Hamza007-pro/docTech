import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function CtaSectionThree(props) {
    return (
        <div className="bg-white mt-10 shadow-sm">
            {
                props.content.map((item,index) => (
                    <div key={item.id || index} className={`mx-auto max-w-7xl px-6 py-10 lg:py-30 rounded-xl sm:py-32 lg:px-20 bg-cover`} style={{ backgroundImage: `url(${item.background})` }}>
                        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl ">
                            {item.title}
                        </h2>
                        <div className="mt-10 flex items-center gap-x-6">
                            <nav className="flex pl-20" aria-label="Breadcrumb">
                                <ol role="list" className="flex items-center space-x-4">
                                    {item.breadcrumbs.map((page) => (
                                        <li key={page.name}>
                                            <div className="flex items-center">
                                               
                                                <Link
                                                    href={page.href}
                                                    className="ml-4 text-[16px] font-semibold text-blue-600 hover:text-gray-500"
                                                    aria-current={page.current ? 'page' : undefined}
                                                >
                                                    {page.name}
                                                </Link>
                                                <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-blue-600" aria-hidden="true" href='/index' />
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}