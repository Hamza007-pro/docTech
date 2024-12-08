import Link from 'next/link';
import React from 'react';

const ProductCard = (props) => {
    return (
        <div key={props.product.id} className="group relative bg-gray-100 px-4 py-5 rounded-md">
            <div className="h-14 w-full overflow-hidden   group-hover:opacity-75 lg:h-14 xl:h-52 ">
                {/**
                  <img
                    src={props.product.imageSrc}
                    alt={props.product.imageAlt}
                    className="h-full w-full object-cover object-center"
                />
                 */}
            </div>
            <h3 className="mt-4 text-sm text-gray-700">
                <Link href={props.product.href} className='font-bold text-base'>
                    <span className="absolute inset-0" />
                    {props.product.title}
                </Link>
            </h3>
            <p className="mt-1 text-xs text-gray-500">{props.product.model}</p>
            <p className="mt-5 text-[14px] text-black text-clip" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{props.product.description}</p>
            <div className='flex justify-between mt-8 text-center '>
                <p className="text-lg font-normal text-gray-900 my-auto">{props.product.price}</p>
                <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-normal text-base py-2 px-2 rounded">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;