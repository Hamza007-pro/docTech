import { Product } from "@/types/product";
import { useState } from "react";
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import type { LoadError } from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface TechSpecsSectionProps {
  product: Product;
}

const TechSpecsSection: React.FC<TechSpecsSectionProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  if (!product.tech_spec_pdf) {
    return (
      <div className="mt-8 p-4 text-center text-gray-600 bg-gray-100 rounded-lg">
        Technical specifications are not available for this product.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Technical Specifications</h2>
        <a
          href={product.tech_spec_pdf}
          download
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </a>
      </div>

      {/* PDF Viewer */}
      <div className="w-full border-2 border-gray-200 rounded-lg overflow-hidden" style={{ height: '750px' }}>
        <div className="h-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="text-gray-600">Loading PDF...</div>
            </div>
          )}
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={product.tech_spec_pdf}
              plugins={[defaultLayoutPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
              onDocumentLoad={() => setIsLoading(false)}
              renderError={(error: LoadError) => {
                const errorMessage = typeof error === 'string' ? error : 'Failed to load PDF';
                console.error('PDF Error:', errorMessage);
                setError(errorMessage);
                return (
                  <div className="p-4 bg-red-50 absolute inset-0 flex items-center justify-center">
                    <p className="text-red-600">Failed to load PDF</p>
                  </div>
                );
              }}
            />
          </Worker>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 mb-2">Error: {error}</p>
          <p className="text-gray-600">
            You can still{" "}
            <a
              href={product.tech_spec_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              view the PDF in a new tab
            </a>{" "}
            or download it using the button above.
          </p>
        </div>
      )}

      {/* Quick Specs Summary */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Quick Specifications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">Model</h4>
            <p className="text-gray-600">{product.model}</p>
          </div>
          {product.features.map((feature, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900">Feature {index + 1}</h4>
              <p className="text-gray-600">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechSpecsSection;
