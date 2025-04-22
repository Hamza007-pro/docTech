interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
  readonly webkitRelativePath: string;
  arrayBuffer(): Promise<ArrayBuffer>;
  slice(start?: number, end?: number, contentType?: string): File;
  stream(): ReadableStream;
  text(): Promise<string>;
}
