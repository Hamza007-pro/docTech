import Link from "next/link";
import React from "react";
import Image from "next/image";

const ProductCard = (props) => {
  return (
    <div
      key={props.product.id}
      className="group relative bg-[#F6F6F8] px-2 py-5 rounded-md shadow-sm hover:shadow-[0px_9px_28px_4px_#e2e8f0] transition-shadow duration-300"
    >
      <div className="flex gap-2 mb-4">
        {props.product.isNew && (
          <div className=" bg-green-300 text-green-900 px-1 rounded-sm text-xs">
            New
          </div>
        )}
        {props.product.clients && (
          <span className="bg-purple-300 text-purple-600 px-1 rounded-sm text-xs ">
            {props.product.clients}+ Clients
          </span>
        )}
        {props.product.features?.map((feature, index) => (
          <span key={index} className="bg-purple-300 text-purple-600 px-1 rounded-sm text-xs">
            {feature}
          </span>
        ))}
      </div>
      <div className="h-10 w-full overflow-hidden group-hover:opacity-75 lg:h-32 xl:h-32 ">
        <Image
          src={props.product.imageSrc}
          alt={props.product.imageAlt}
          className="object-center bg-cover mx-auto"
          width={200}
          height={150}
        />
      </div>
      <h3 className="mt-4 px-3 text-sm text-gray-700">
        <Link 
          href={`/store/product?id=${props.product.id}`}
          className="font-bold text-base"
        >
          <span className="absolute inset-0" />
          {props.product.title}
        </Link>
      </h3>
      <p className="mt-1 text-xs px-3 text-gray-500">{props.product.model}</p>
      <p
        className="mt-5 text-[14px] px-3 text-black text-clip"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {props.product.description}
      </p>
      <div className="flex justify-between px-3 mt-8 text-center ">
        <p className="text-lg font-normal text-gray-900 my-auto">
          {props.product.price}
        </p>
        <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-normal text-base py-2 px-2 rounded">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
