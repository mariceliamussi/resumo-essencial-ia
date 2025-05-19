
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BookSummary from '@/components/BookSummary';
import { getBookBySlug, Book, books } from '@/data/books';
import BookSummaryCard from '@/components/BookSummaryCard';

const BookPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (slug) {
      const fetchedBook = getBookBySlug(slug);
      
      if (fetchedBook) {
        setBook(fetchedBook);
        
        // Get related books (same category, excluding current book)
        const related = books
          .filter(b => 
            b.id !== fetchedBook.id && 
            b.categories.some(cat => fetchedBook.categories.includes(cat))
          )
          .slice(0, 3);
          
        setRelatedBooks(related);
      }
      
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="container mx-auto px-4 py-12 flex-grow flex items-center justify-center">
          <p className="text-gray-500">Carregando resumo...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="container mx-auto px-4 py-12 flex-grow">
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">Resumo não encontrado</h2>
            <p className="text-gray-600 mb-6">
              O resumo que você está procurando não foi encontrado.
            </p>
            <Link to="/" className="text-primary hover:underline">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Início</Link>
            <span className="mx-2">/</span>
            {book.categories.length > 0 && (
              <>
                <Link 
                  to={`/categoria/${book.categories[0].toLowerCase()}`} 
                  className="hover:text-primary"
                >
                  {book.categories[0]}
                </Link>
                <span className="mx-2">/</span>
              </>
            )}
            <span className="text-gray-500 truncate">{book.title}</span>
          </div>
        </div>
      </div>
      
      {/* Book Summary */}
      <main className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          <BookSummary book={book} />
          
          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div className="mt-16 border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold mb-8">Livros Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBooks.map((relatedBook) => (
                  <BookSummaryCard key={relatedBook.id} book={relatedBook} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookPage;
