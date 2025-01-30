import { supabase } from './supabase';

const BUCKET_NAME = 'products';

export async function uploadProductImage(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file);

  if (error) {
    throw error;
  }

  return getPublicUrl(path);
}

export function getPublicUrl(path: string) {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return data.publicUrl;
}
