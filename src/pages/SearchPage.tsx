
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BookSummaryCard from '@/components/BookSummaryCard';
import SearchBar from '@/components/SearchBar';
import { searchBooks, Book } from '@/data/books';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Book[]>([]);
  
  useEffect(() => {
    if (query) {
      const searchResults = searchBooks(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Search Header */}
      <header className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {query ? `Resultados para "${query}"` : 'Pesquisar Resumos'}
          </h1>
          <div className="max-w-md mb-2">
            <SearchBar />
          </div>
          {query && (
            <p className="text-gray-600 mt-4">
              Encontrados {results.length} {results.length === 1 ? 'resultado' : 'resultados'}
            </p>
          )}
        </div>
      </header>
      
      {/* Search Results */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {!query ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Faça uma pesquisa</h2>
              <p className="text-gray-600">
                Digite um termo de pesquisa para encontrar resumos de livros.
              </p>
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {results.map((book) => (
                <BookSummaryCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h2>
              <p className="text-gray-600 mb-6">
                Não encontramos nenhum resumo para "{query}".
              </p>
              <Link to="/" className="text-primary hover:underline">
                Voltar para a página inicial
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
