
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BookSummaryCard from '@/components/BookSummaryCard';
import { getBooksByCategory, Book } from '@/data/books';
import SearchBar from '@/components/SearchBar';

const getCategoryColor = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'negocios': 'text-blue-800',
    'produtividade': 'text-green-800',
    'psicologia': 'text-purple-800',
    'filosofia': 'text-yellow-800',
    'lideranca': 'text-red-800',
    'saude': 'text-emerald-800'
  };
  
  return categoryMap[category.toLowerCase()] || 'text-gray-800';
};

const getCategoryName = (slug: string): string => {
  const categoryMap: Record<string, string> = {
    'negocios': 'Negócios',
    'produtividade': 'Produtividade',
    'psicologia': 'Psicologia',
    'filosofia': 'Filosofia',
    'lideranca': 'Liderança',
    'saude': 'Saúde'
  };
  
  return categoryMap[slug.toLowerCase()] || 'Categoria';
};

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (category) {
      const categoryName = getCategoryName(category);
      const fetchedBooks = getBooksByCategory(categoryName);
      setBooks(fetchedBooks);
      setLoading(false);
    }
  }, [category]);
  
  const categoryName = category ? getCategoryName(category) : '';
  const categoryColorClass = category ? getCategoryColor(category) : '';

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Category Header */}
      <header className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${categoryColorClass}`}>
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl">
            Explore nossos resumos de livros na categoria {categoryName.toLowerCase()} para 
            encontrar insights valiosos e conhecimentos transformadores.
          </p>
          <div className="max-w-md">
            <SearchBar />
          </div>
        </div>
      </header>
      
      {/* Books Grid */}
      <section className="py-12 flex-grow">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-500">Carregando resumos...</p>
          ) : books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookSummaryCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-2">Nenhum resumo encontrado</h2>
              <p className="text-gray-600">
                Não encontramos nenhum resumo na categoria {categoryName.toLowerCase()}.
              </p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
