import React from 'react'
import CatTabs from './catTabs'
import ProductCard from './productCard'

const products = [
  {
    id: 1,
    title: "Dream Machine Pro",
    model: "UDM-Pro",
    description: "Enterprise-grade, rack-mount UniFi Cloud Gateway with full UniFi application support, 10 Gbps performance, and an integrated switch.",
    price: "$379.00",
    availability: "In Stock"
  },
  {
    id: 2,
    title: "Dream Machine Special Edition",
    model: "UDM-SE (180W)",
    description: "Enterprise-grade, rack-mount UniFi Cloud Gateway with full UniFi application support, 10 Gbps performance, and an integrated PoE switch.",
    price: "$499.00",
    availability: "In Stock"
  },
  {
    id: 3,
    title: "Dream Wall",
    model: "UDW (420W)",
    description: "Wall-mountable UniFi Cloud Gateway with a built-in WiFi 6 access point, PoE switching, and full UniFi application support.",
    price: "$999.00",
    availability: "In Stock"
  },
  {
    id: 4,
    title: "UniFi Express",
    model: "UX",
    description: "Impressively compact UniFi Cloud Gateway and WiFi 6 access point that runs UniFi Network. Powers an entire network or simply meshes as an access point.",
    price: "$149.00",
    availability: "In Stock"
  },
  {
    id: 5,
    title: "Dream Router",
    model: "UDR (40W)",
    description: "Desktop UniFi Cloud Gateway with an integrated WiFi 6 access point and PoE switch.",
    price: "$199.00",
    availability: "Sold Out"
  },
  {
    id: 6,
    title: "Cloud Gateway Ultra",
    model: "UCG-Ultra",
    description: "Powerful and compact multi-WAN UniFi Cloud Gateway with a full suite of advanced routing and security features.",
    price: "$129.00",
    availability: "Sold Out"
  }
]
function ProductList() {
  return (
    <div className="mx-auto max-w-7xl sm:px-4 mt-10 lg:px-8 bg-white min-h-[32vh]">
      <CatTabs />
      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8 lg:gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList