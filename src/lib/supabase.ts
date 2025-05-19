
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL ou chave não configuradas.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseKey || ''
);

export type SupabaseBook = {
  id: string;
  title: string;
  author: string;
  year: number;
  summary: string;
  for_whom: string;
  quote: string;
  cover_image: string;
  slug: string;
  created_at?: string;
  categories?: string[];
  themes?: string[];
  key_takeaways?: string[];
};
