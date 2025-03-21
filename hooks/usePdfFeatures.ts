import { useState, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import { supabase } from '@/lib/supabase';

interface Specifications {
  general: { [key: string]: string };
  physical: { [key: string]: string };
  poe: { [key: string]: string };
}

const extractSpecifications = (text: string[]): Specifications => {
  const specs: Specifications = {
    general: {},
    physical: {},
    poe: {}
  };

  let currentSection: keyof Specifications | null = null;

  text.forEach(line => {
    // Detect sections
    if (line.includes('General') || line.includes('Overview')) {
      currentSection = 'general';
      return;
    } else if (line.includes('Physical Specifications') || line.includes('Physical Properties')) {
      currentSection = 'physical';
      return;
    } else if (line.includes('PoE Specifications') || line.includes('Power over Ethernet')) {
      currentSection = 'poe';
      return;
    }

    if (!currentSection || !line.trim()) return;

    // Extract key-value pairs
    const match = line.match(/^(.*?)[:：](.*)/);
    if (match) {
      const [_, key, value] = match;
      const cleanKey = key.trim();
      const cleanValue = value.trim();
      
      if (cleanKey && cleanValue) {
        specs[currentSection][cleanKey] = cleanValue;
      }
    }
  });

  return specs;
};

export const usePdfFeatures = (pdfUrl: string | undefined): {
  specs: Specifications;
  isLoading: boolean;
  error: string | null;
} => {
  const [specs, setSpecs] = useState<Specifications>({
    general: {},
    physical: {},
    poe: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pdfUrl) {
      setIsLoading(false);
      return;
    }

    const loadPdf = async () => {
      try {
        // Set up worker
        if (typeof window !== 'undefined' && !pdfjs.GlobalWorkerOptions.workerSrc) {
          const worker = await import('pdfjs-dist/build/pdf.worker.min');
          const workerBlob = new Blob([worker.default], { type: 'text/javascript' });
          pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(workerBlob);
        }

        // Load PDF
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        
        // Get first page
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        
        // Extract text content
        const textItems = textContent.items as { str: string }[];
        const text = textItems.map(item => item.str);
        
        // Extract specifications
        const extractedSpecs = extractSpecifications(text);
        setSpecs(extractedSpecs);
        setError(null);
      } catch (err) {
        console.error('Error extracting specifications from PDF:', err);
        setError('Failed to load product specifications');
      } finally {
        setIsLoading(false);
      }
    };

    loadPdf();
  }, [pdfUrl]);

  return { specs, isLoading, error };
};
