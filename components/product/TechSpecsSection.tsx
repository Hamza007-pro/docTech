import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import * as pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const TechSpecsSection: React.FC<{ product: Product }> = ({ product }) => {
  const [pdfText, setPdfText] = useState<string[]>(['Loading specifications...']);

  useEffect(() => {
    if (!product.tech_spec_pdf) return;

    const extractText = async () => {
      try {
        const pdf = await pdfjs.getDocument(product.tech_spec_pdf).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        
        // Group items by their vertical position to maintain line breaks
        const lineMap = new Map<number, { text: string; x: number }[]>();
        
        textContent.items.forEach((item: any) => {
          const y = Math.round(item.transform[5]); // Vertical position
          const x = Math.round(item.transform[4]); // Horizontal position
          
          if (!lineMap.has(y)) {
            lineMap.set(y, []);
          }
          lineMap.get(y)?.push({ text: item.str, x });
        });

        // Sort by vertical position (top to bottom) and horizontal position (left to right)
        const sortedLines = Array.from(lineMap.entries())
          .sort(([y1], [y2]) => y2 - y1) // Reverse vertical order
          .map(([_, items]) => 
            items
              .sort((a, b) => a.x - b.x) // Sort by horizontal position
              .map(item => item.text)
              .join(' ')
          );

        setPdfText(sortedLines);
      } catch (error) {
        setPdfText(['Failed to load specifications.']);
        console.error('PDF parsing error:', error);
      }
    };

    extractText();
  }, [product.tech_spec_pdf]);

  if (!product.tech_spec_pdf) {
    return (
      <div className="mt-8 p-4 text-center text-gray-600 bg-gray-100 rounded-lg">
        Technical specifications are not available for this product.
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
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
      <div className="prose max-w-none p-6 bg-white rounded-lg border-2 border-gray-200">
        {pdfText.map((line, index) => (
          <div 
            key={index} 
            className="text-black font-sans"
            style={{ 
              minHeight: '1.5em',
              whiteSpace: 'pre-wrap'
            }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechSpecsSection;
