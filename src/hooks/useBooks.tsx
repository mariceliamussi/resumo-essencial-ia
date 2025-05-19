import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/data/books';
import { toast } from '@/components/ui/use-toast';
import { supabase, SupabaseBook } from '@/lib/supabase';

// Função para converter do formato do Supabase para o formato da aplicação
const supabaseToAppBook = async (book: SupabaseBook): Promise<Book> => {
  // Buscar categorias relacionadas
  const { data: categoryData } = await supabase
    .from('book_categories')
    .select('categories(name)')
    .eq('book_id', book.id);
  
  // Corrigindo o tipo e o acesso aos dados das categorias
  const categories = categoryData?.map(item => {
    // Verificando se categories existe e tem a propriedade name
    return item.categories?.name || '';
  }) || [];
  
  // Buscar temas relacionados
  const { data: themeData } = await supabase
    .from('book_themes')
    .select('themes(name)')
    .eq('book_id', book.id);
  
  // Corrigindo o tipo e o acesso aos dados dos temas
  const themes = themeData?.map(item => {
    // Verificando se themes existe e tem a propriedade name
    return item.themes?.name || '';
  }) || [];
  
  // Buscar pontos-chave
  const { data: keyTakeawaysData } = await supabase
    .from('key_takeaways')
    .select('content')
    .eq('book_id', book.id);
  
  const keyTakeaways = keyTakeawaysData?.map(item => item.content) || [];
  
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    summary: book.summary,
    forWhom: book.for_whom,
    quote: book.quote,
    coverImage: book.cover_image,
    slug: book.slug,
    categories,
    themes,
    keyTakeaways
  };
};

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const { data: booksData, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      const formattedBooks = await Promise.all(
        (booksData || []).map(book => supabaseToAppBook(book as SupabaseBook))
      );

      setBooks(formattedBooks);
    } catch (err) {
      console.error('Erro ao buscar livros:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      toast({
        title: "Erro ao carregar livros",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = useCallback(async (newBook: Book) => {
    try {
      // 1. Verificar se o slug já existe
      const { data: existingBook } = await supabase
        .from('books')
        .select('slug')
        .eq('slug', newBook.slug)
        .single();
      
      if (existingBook) {
        toast({
          title: "Erro ao adicionar livro",
          description: "Um livro com este slug já existe.",
          variant: "destructive",
        });
        return false;
      }

      // 2. Inserir o livro principal
      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .insert({
          title: newBook.title,
          author: newBook.author,
          year: newBook.year,
          summary: newBook.summary,
          for_whom: newBook.forWhom,
          quote: newBook.quote,
          cover_image: newBook.coverImage,
          slug: newBook.slug
        })
        .select()
        .single();

      if (bookError) throw new Error(bookError.message);
      
      // 3. Processar categorias
      for (const categoryName of newBook.categories) {
        // Verificar se a categoria existe, caso não, criar
        let { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', categoryName)
          .single();
          
        if (!categoryData) {
          const { data: newCategory } = await supabase
            .from('categories')
            .insert({ name: categoryName })
            .select()
            .single();
            
          categoryData = newCategory;
        }
        
        // Criar relação entre livro e categoria
        if (categoryData) {
          await supabase.from('book_categories').insert({
            book_id: bookData.id,
            category_id: categoryData.id
          });
        }
      }
      
      // 4. Processar temas
      for (const themeName of newBook.themes) {
        // Verificar se o tema existe, caso não, criar
        let { data: themeData } = await supabase
          .from('themes')
          .select('id')
          .eq('name', themeName)
          .single();
          
        if (!themeData) {
          const { data: newTheme } = await supabase
            .from('themes')
            .insert({ name: themeName })
            .select()
            .single();
            
          themeData = newTheme;
        }
        
        // Criar relação entre livro e tema
        if (themeData) {
          await supabase.from('book_themes').insert({
            book_id: bookData.id,
            theme_id: themeData.id
          });
        }
      }
      
      // 5. Adicionar pontos-chave
      for (const takeaway of newBook.keyTakeaways) {
        await supabase.from('key_takeaways').insert({
          book_id: bookData.id,
          content: takeaway
        });
      }
      
      // 6. Recarregar livros após adicionar
      fetchBooks();
      
      toast({
        title: "Livro adicionado com sucesso!",
        description: `"${newBook.title}" foi adicionado à biblioteca.`,
      });
      
      return true;
    } catch (err) {
      console.error("Erro ao adicionar livro:", err);
      toast({
        title: "Erro ao adicionar livro",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
      return false;
    }
  }, [fetchBooks]);

  const editBook = useCallback(async (bookId: string, updatedBook: Book) => {
    try {
      // 1. Verificar se o slug já existe (exceto para o mesmo livro)
      const { data: existingBook } = await supabase
        .from('books')
        .select('slug')
        .eq('slug', updatedBook.slug)
        .neq('id', bookId)
        .single();
      
      if (existingBook) {
        toast({
          title: "Erro ao atualizar livro",
          description: "Um livro com este slug já existe.",
          variant: "destructive",
        });
        return false;
      }

      // 2. Atualizar o livro principal
      const { error: bookError } = await supabase
        .from('books')
        .update({
          title: updatedBook.title,
          author: updatedBook.author,
          year: updatedBook.year,
          summary: updatedBook.summary,
          for_whom: updatedBook.forWhom,
          quote: updatedBook.quote,
          cover_image: updatedBook.coverImage,
          slug: updatedBook.slug
        })
        .eq('id', bookId);

      if (bookError) throw new Error(bookError.message);
      
      // 3. Remover relações antigas
      await supabase.from('book_categories').delete().eq('book_id', bookId);
      await supabase.from('book_themes').delete().eq('book_id', bookId);
      await supabase.from('key_takeaways').delete().eq('book_id', bookId);
      
      // 4. Processar categorias
      for (const categoryName of updatedBook.categories) {
        let { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('name', categoryName)
          .single();
          
        if (!categoryData) {
          const { data: newCategory } = await supabase
            .from('categories')
            .insert({ name: categoryName })
            .select()
            .single();
            
          categoryData = newCategory;
        }
        
        if (categoryData) {
          await supabase.from('book_categories').insert({
            book_id: bookId,
            category_id: categoryData.id
          });
        }
      }
      
      // 5. Processar temas
      for (const themeName of updatedBook.themes) {
        let { data: themeData } = await supabase
          .from('themes')
          .select('id')
          .eq('name', themeName)
          .single();
          
        if (!themeData) {
          const { data: newTheme } = await supabase
            .from('themes')
            .insert({ name: themeName })
            .select()
            .single();
            
          themeData = newTheme;
        }
        
        if (themeData) {
          await supabase.from('book_themes').insert({
            book_id: bookId,
            theme_id: themeData.id
          });
        }
      }
      
      // 6. Adicionar pontos-chave
      for (const takeaway of updatedBook.keyTakeaways) {
        await supabase.from('key_takeaways').insert({
          book_id: bookId,
          content: takeaway
        });
      }
      
      // 7. Recarregar livros após atualização
      fetchBooks();
      
      toast({
        title: "Livro atualizado com sucesso!",
        description: `"${updatedBook.title}" foi atualizado.`,
      });
      
      return true;
    } catch (err) {
      console.error("Erro ao atualizar livro:", err);
      toast({
        title: "Erro ao atualizar livro",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
      return false;
    }
  }, [fetchBooks]);

  const deleteBook = useCallback(async (bookId: string) => {
    try {
      const { error } = await supabase
        .from('books')
        .delete()
        .eq('id', bookId);

      if (error) throw new Error(error.message);
      
      // As tabelas relacionadas serão excluídas automaticamente devido ao ON DELETE CASCADE
      
      // Recarregar livros após exclusão
      fetchBooks();
      
      toast({
        title: "Livro excluído com sucesso!",
      });
      
      return true;
    } catch (err) {
      console.error("Erro ao excluir livro:", err);
      toast({
        title: "Erro ao excluir livro",
        description: err instanceof Error ? err.message : 'Erro desconhecido',
        variant: "destructive",
      });
      return false;
    }
  }, [fetchBooks]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { 
    books, 
    loading, 
    error, 
    addBook, 
    editBook, 
    deleteBook,
    refresh: fetchBooks
  };
};
