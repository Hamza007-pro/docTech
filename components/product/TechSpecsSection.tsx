import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import * as pdfjs from 'pdfjs-dist';
import { supabase } from '@/lib/supabase';

// Set up the worker
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
  // Dynamic import of worker for client-side only
  import('pdfjs-dist/build/pdf.worker.min').then((worker) => {
    const workerBlob = new Blob([worker.default], { type: 'text/javascript' });
    const workerUrl = URL.createObjectURL(workerBlob);
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
  });
}

interface PDFTextItem {
  str: string;
  transform: number[];
}

interface PDFTextContent {
  items: PDFTextItem[];
}

function isPdfPathValid(path: string | undefined): path is string {
  return typeof path === 'string' && path.length > 0;
}

const TechSpecsSection: React.FC<{ product: Product }> = ({ product }) => {
  const [pdfText, setPdfText] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const resolvePdfUrl = async (pdfPath: string): Promise<string> => {
    console.log('Resolving PDF URL:', pdfPath);

    if (pdfPath.startsWith('http')) {
      return pdfPath;
    }

    try {
      // First check if file exists in storage
      const { data: fileExists, error: fileCheckError } = await supabase.storage
        .from('product-specs')
        .list('', {
          search: pdfPath.split('/').pop()
        });

      if (fileCheckError) {
        throw new Error('Error accessing storage');
      }

      if (fileExists && fileExists.length > 0) {
        // File exists in storage, get signed URL
        const { data: fileData, error: signedUrlError } = await supabase.storage
          .from('product-specs')
          .createSignedUrl(pdfPath, 3600);

        if (signedUrlError) {
          throw new Error('Error generating secure access link');
        }

        if (fileData?.signedUrl) {
          return fileData.signedUrl;
        }
      }

      // Try public URL as fallback
      const publicPath = `/docs/products/${pdfPath.split('/').pop()}`;
      const response = await fetch(publicPath, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('PDF file not found');
      }
      return publicPath;
    } catch (error) {
      console.error('Error resolving PDF URL:', error);
      throw error;
    }
  };

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const pdfPath = product.tech_spec_pdf;
    if (isPdfLoading || !isPdfPathValid(pdfPath)) {
      return;
    }

    setIsPdfLoading(true);
    try {
      const resolvedUrl = await resolvePdfUrl(pdfPath);
      const fileName = pdfPath.split('/').pop() || 'specification.pdf';

      // For download, use fetch to handle potential CORS issues
      const response = await fetch(resolvedUrl);
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to prepare download: ${errorMessage}`);
    } finally {
      setIsPdfLoading(false);
    }
  };

  useEffect(() => {
    const pdfPath = product.tech_spec_pdf;
    if (!isPdfPathValid(pdfPath)) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const extractText = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const resolvedUrl = await resolvePdfUrl(pdfPath); // Now pdfPath is guaranteed to be string
        if (!isMounted) return;
        
        setPdfUrl(resolvedUrl);
        console.log('Loading PDF from:', resolvedUrl);

        // Wait for worker to be ready
        while (!pdfjs.GlobalWorkerOptions.workerSrc) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        const loadingTask = pdfjs.getDocument({
          url: resolvedUrl,
          verbosity: 0
        });

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('PDF loading timeout')), 15000);
        });

        const pdf = await Promise.race([loadingTask.promise, timeoutPromise]) as pdfjs.PDFDocumentProxy;
        if (!isMounted) return;

        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent() as PDFTextContent;
        
        const lineMap = new Map<number, { text: string; x: number }[]>();
        
        textContent.items.forEach((item: PDFTextItem) => {
          const y = Math.round(item.transform[5]);
          const x = Math.round(item.transform[4]);
          
          if (!lineMap.has(y)) {
            lineMap.set(y, []);
          }
          lineMap.get(y)?.push({ text: item.str, x });
        });

        const sortedLines = Array.from(lineMap.entries())
          .sort(([y1], [y2]) => y2 - y1)
          .map(([_, items]) => 
            items
              .sort((a, b) => a.x - b.x)
              .map(item => item.text)
              .join(' ')
          );

        if (isMounted) {
          setPdfText(sortedLines);
        }
      } catch (error) {
        console.error('PDF parsing error:', error);
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          setError(`Failed to load specifications: ${errorMessage}. Please try downloading the PDF instead.`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    extractText();

    return () => {
      isMounted = false;
    };
  }, [product.tech_spec_pdf]);

  const renderContent = () => {
    if (!product.tech_spec_pdf) {
      return (
        <div className="p-4 text-center text-gray-600 bg-gray-100 rounded-lg">
          Technical specifications are not available for this product.
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="p-6 bg-white rounded-lg border-2 border-gray-200">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      );
    }

    return (
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
    );
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Technical Specifications</h2>
        <button
          onClick={handleDownload}
          className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
            isPdfLoading
              ? 'bg-blue-400 cursor-wait text-white'
              : product.tech_spec_pdf
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 cursor-not-allowed text-gray-500'
          }`}
          disabled={isPdfLoading || !product.tech_spec_pdf}
        >
          {isPdfLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              <span>Loading PDF...</span>
            </>
          ) : (
            'Download PDF'
          )}
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default TechSpecsSection;
