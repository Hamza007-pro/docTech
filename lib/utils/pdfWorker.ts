let pdfjsWorkerLoaded = false;

export const loadPdfWorker = async () => {
  if (typeof window === 'undefined') return;
  
  if (!pdfjsWorkerLoaded) {
    const PDFWorker = await import('pdfjs-dist/build/pdf.worker.entry');
    // @ts-ignore
    window.pdfjsWorker = PDFWorker;
    pdfjsWorkerLoaded = true;
  }
};
