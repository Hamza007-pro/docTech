declare module 'pdfjs-dist/build/pdf.worker.entry' {
  const worker: any;
  export default worker;
}

declare global {
  interface Window {
    pdfjsWorker: any;
  }
}
