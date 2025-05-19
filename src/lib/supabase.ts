
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

// Add Supabase database types to help with TypeScript typing
export type Database = {
  public: {
    Tables: {
      books: {
        Row: SupabaseBook;
      };
      categories: {
        Row: {
          id: string;
          name: string;
        };
      };
      themes: {
        Row: {
          id: string;
          name: string;
        };
      };
      book_categories: {
        Row: {
          book_id: string;
          category_id: string;
          categories?: {
            name?: string;
          };
        };
      };
      book_themes: {
        Row: {
          book_id: string;
          theme_id: string;
          themes?: {
            name?: string;
          };
        };
      };
      key_takeaways: {
        Row: {
          id: string;
          book_id: string;
          content: string;
        };
      };
    };
  };
};
