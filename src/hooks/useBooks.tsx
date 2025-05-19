
import { useState, useCallback } from 'react';
import { Book, books as initialBooks } from '@/data/books';
import { toast } from '@/components/ui/use-toast';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const addBook = useCallback((newBook: Book) => {
    // Verificar se o slug já existe
    const slugExists = books.some(book => book.slug === newBook.slug);
    
    if (slugExists) {
      toast({
        title: "Erro ao adicionar livro",
        description: "Um livro com este slug já existe.",
        variant: "destructive",
      });
      return false;
    }

    setBooks(prevBooks => [...prevBooks, { ...newBook, id: String(prevBooks.length + 1) }]);
    
    toast({
      title: "Livro adicionado com sucesso!",
      description: `"${newBook.title}" foi adicionado à biblioteca.`,
    });
    
    return true;
  }, [books]);

  return { books, addBook };
};
