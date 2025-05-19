
import React from 'react';
import { Book } from '@/data/books';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BookSummaryProps {
  book: Book;
}

const BookSummary: React.FC<BookSummaryProps> = ({ book }) => {
  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{book.title}</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
          <p className="text-lg">
            <strong>Autor:</strong> {book.author}
          </p>
          <span className="hidden sm:inline text-gray-400">•</span>
          <p>
            <strong>Ano:</strong> {book.year}
          </p>
        </div>
        
        <div className="mb-4">
          <strong className="block mb-2">Categorias:</strong>
          <div className="flex flex-wrap gap-2">
            {book.categories.map((category, index) => (
              <Link to={`/categoria/${category.toLowerCase()}`} key={index}>
                <Badge 
                  variant="outline" 
                  className={`book-category-${category.toLowerCase()}`}
                >
                  {category}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <strong className="block mb-2">Temas principais:</strong>
          <div className="flex flex-wrap gap-2">
            {book.themes.map((theme, index) => (
              <Badge key={index} variant="secondary">
                {theme}
              </Badge>
            ))}
          </div>
        </div>
      </header>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Síntese</h2>
        <p className="text-gray-700 leading-relaxed">{book.summary}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Principais Aprendizados</h2>
        <ul className="list-disc pl-5 space-y-2">
          {book.keyTakeaways.map((takeaway, index) => (
            <li key={index} className="text-gray-700">{takeaway}</li>
          ))}
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Para quem é indicado</h2>
        <p className="text-gray-700 leading-relaxed">{book.forWhom}</p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Citação Impactante</h2>
        <blockquote className="blockquote">
          {book.quote}
        </blockquote>
      </section>
    </article>
  );
};

export default BookSummary;
