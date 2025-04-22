'use server';

import { writeFile } from 'fs/promises';
import { mkdir } from 'fs/promises';
import path from 'path';

// Constants for file storage paths
const PRODUCTS_DIR = 'public/images/products';
const DOCS_DIR = 'public/docs/products';

// Ensure directories exist
async function ensureDir(dirPath: string) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (error) {
    if ((error as any).code !== 'EEXIST') {
      throw error;
    }
  }
}

async function bufferFromFile(file: File | Buffer): Promise<Buffer> {
  if (Buffer.isBuffer(file)) {
    return file;
  }
  return Buffer.from(await file.arrayBuffer());
}

export async function uploadProductImage(file: File | Buffer, filepath: string): Promise<string> {
  try {
    // Ensure filepath is safe
    const safePath = path.normalize(filepath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), PRODUCTS_DIR, safePath);
    
    // Ensure directory exists
    await ensureDir(path.dirname(fullPath));
    
    // Create buffer from file
    const buffer = await bufferFromFile(file);
    
    // Write file
    await writeFile(fullPath, buffer);
    
    return getPublicUrl(PRODUCTS_DIR, safePath);
  } catch (error) {
    console.error('Error uploading product image:', error);
    throw error;
  }
}

export async function uploadProductDoc(file: File | Buffer, filepath: string): Promise<string> {
  try {
    // Ensure filepath is safe
    const safePath = path.normalize(filepath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), DOCS_DIR, safePath);
    
    // Ensure directory exists
    await ensureDir(path.dirname(fullPath));
    
    // Create buffer from file
    const buffer = await bufferFromFile(file);
    
    // Write file
    await writeFile(fullPath, buffer);
    
    return getPublicUrl(DOCS_DIR, safePath);
  } catch (error) {
    console.error('Error uploading product document:', error);
    throw error;
  }
}

function getPublicUrl(baseDir: string, filepath: string): string {
  // Convert file path to public URL - always use forward slashes for URLs
  const relativePath = path.relative('public', path.join(baseDir, filepath));
  return `/${relativePath.replace(/\\/g, '/')}`;
}
