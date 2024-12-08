import Link from "next/link";

export default function Footer(props:any) {
  return (
    <footer className="bg-gray-100 mt-28" aria-labelledby="footer-heading">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="mx-auto max-w-7xl px-6  sm:pt-24 lg:pt-10 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
              <ul role="list" className="mt-2 space-y-4">
                {props.content.Company.map((item:any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm  text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Training</h3>
              <ul role="list" className="mt-2 space-y-4">
                {props.content.Training.map((item:any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm  text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Buy Now</h3>
              <ul role="list" className="mt-2 space-y-4">
                {props.content.Buy_Now.map((item:any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 md:mt-0">
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Tools</h3>
              <ul role="list" className="mt-2 space-y-4">
                {props.content.Tools.map((item:any) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-sm  text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 xl:mt-0">
          <h3 className="text-sm font-semibold leading-6 text-gray-900">Subscribe to our newsletter</h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="mt-6 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="lg:mt-5 border-t border-gray-900/10 pt-8 pb-5 sm:mt-20 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          {props.content.social.map((item:any) => (
            <Link key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} DocTech, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  );
}