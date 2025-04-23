import { useState, useEffect } from "react";
import { Product } from "../../types/product";
import * as pdfjs from 'pdfjs-dist';

// Set up the worker
if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
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

interface PDFPageContent {
  pageNumber: number;
  text: string[];
}

function isPdfPathValid(path: string | undefined): path is string {
  return typeof path === 'string' && path.length > 0;
}

const TechSpecsEnhanced: React.FC<{ product: Product }> = ({ product }) => {
  const [pdfPages, setPdfPages] = useState<PDFPageContent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLines, setFilteredLines] = useState<string[]>([]);

  // Cache management
  const cacheKey = `pdf-cache-${product.id}`;
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

  const loadFromCache = () => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > cacheExpiry) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    return data;
  };

  const saveToCache = (data: PDFPageContent[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  };

  const resolvePdfUrl = async (pdfPath: string): Promise<string> => {
    if (pdfPath.startsWith('http')) return pdfPath;
    
    try {
      const publicPath = `/docs/products/${pdfPath.split('/').pop()}`;
      const response = await fetch(publicPath, { method: 'HEAD' });
      if (!response.ok) throw new Error('PDF file not found');
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

  const extractPageText = async (page: pdfjs.PDFPageProxy): Promise<string[]> => {
    const textContent = await page.getTextContent() as PDFTextContent;
    const lineMap = new Map<number, { text: string; x: number }[]>();
    
    textContent.items.forEach((item: PDFTextItem) => {
      const y = Math.round(item.transform[5]);
      const x = Math.round(item.transform[4]);
      if (!lineMap.has(y)) lineMap.set(y, []);
      lineMap.get(y)?.push({ text: item.str, x });
    });

    return Array.from(lineMap.entries())
      .sort(([y1], [y2]) => y2 - y1)
      .map(([_, items]) => 
        items
          .sort((a, b) => a.x - b.x)
          .map(item => item.text)
          .join(' ')
      );
  };

  useEffect(() => {
    const pdfPath = product.tech_spec_pdf;
    if (!isPdfPathValid(pdfPath)) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const loadPDF = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Try to load from cache first
        const cachedData = loadFromCache();
        if (cachedData) {
          setPdfPages(cachedData);
          setTotalPages(cachedData.length);
          setIsLoading(false);
          return;
        }

        const resolvedUrl = await resolvePdfUrl(pdfPath);
        if (!isMounted) return;

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

        setTotalPages(pdf.numPages);
        const pagesContent: PDFPageContent[] = [];

        // Load all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          if (!isMounted) return;
          const page = await pdf.getPage(i);
          const text = await extractPageText(page);
          pagesContent.push({ pageNumber: i, text });
        }

        if (isMounted) {
          setPdfPages(pagesContent);
          saveToCache(pagesContent);
        }
      } catch (error) {
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

    loadPDF();

    return () => {
      isMounted = false;
    };
  }, [product.tech_spec_pdf, product.id]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredLines([]);
      return;
    }

    const searchRegex = new RegExp(searchTerm, 'i');
    const results = pdfPages.flatMap(page => 
      page.text.filter(line => searchRegex.test(line))
    );
    setFilteredLines(results);
  }, [searchTerm, pdfPages]);

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Technical Specifications</h2>
        <div className="flex items-center gap-4">
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                ←
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                →
              </button>
            </div>
          )}
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
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search specifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="prose max-w-none p-6 bg-white rounded-lg border-2 border-gray-200">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        ) : searchTerm ? (
          filteredLines.map((line, index) => (
            <div 
              key={index}
              className="text-black font-sans bg-yellow-50"
              style={{ 
                minHeight: '1.5em',
                whiteSpace: 'pre-wrap',
                padding: '0.25em'
              }}
            >
              {line}
            </div>
          ))
        ) : (
          pdfPages
            .find(page => page.pageNumber === currentPage)
            ?.text.map((line, index) => (
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
            ))
        )}
      </div>
    </div>
  );
};

export default TechSpecsEnhanced;
