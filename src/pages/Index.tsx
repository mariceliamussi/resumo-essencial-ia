
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import BookSummaryCard from '@/components/BookSummaryCard';
import { books, categories } from '@/data/books';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  // Get featured books (first 3)
  const featuredBooks = books.slice(0, 3);
  
  // Group books by category (first 4 per category)
  const booksByCategory = categories.map(category => {
    const categoryBooks = books
      .filter(book => book.categories.includes(category))
      .slice(0, 4);
    return {
      category,
      books: categoryBooks
    };
  });

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Resumos de Livros Essenciais para Seu Crescimento
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Descubra ideias poderosas e insights transformadores em resumos concisos e bem estruturados.
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Books */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Resumos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.map((book) => (
              <BookSummaryCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Books by Category */}
      {booksByCategory.map((categoryGroup, index) => (
        categoryGroup.books.length > 0 && (
          <section key={index} className={`py-12 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">{categoryGroup.category}</h2>
                <Link 
                  to={`/categoria/${categoryGroup.category.toLowerCase()}`}
                  className="text-primary hover:underline"
                >
                  Ver todos →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryGroup.books.map((book) => (
                  <BookSummaryCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          </section>
        )
      ))}
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Encontre o Conhecimento que Precisa</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Mais de 100 resumos de livros organizados por temas e categorias para ajudar no seu desenvolvimento pessoal e profissional.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
