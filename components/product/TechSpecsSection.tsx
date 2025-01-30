"use client";

interface Product {
  id: number;
  title: string;
  model: string;
  description: string;
  // ... other properties
}

interface TechSpecsSectionProps {
  product: Product;
}

const TechSpecsSection = ({ product }: TechSpecsSectionProps) => {
  // Generate PDF URL based on product model
  const pdfUrl = `/docs/specs/${product.model.toLowerCase()}.pdf`;

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Technical Specifications - {product.title}</h2>
      <div className="w-full h-[800px] rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          style={{ border: "none" }}
          title={`${product.title} Technical Specifications`}
        />
      </div>
    </div>
  );
};

export default TechSpecsSection;
