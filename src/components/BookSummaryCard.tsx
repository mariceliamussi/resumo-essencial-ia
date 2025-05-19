
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/data/books';
import { Badge } from '@/components/ui/badge';

interface BookSummaryCardProps {
  book: Book;
}

const BookSummaryCard: React.FC<BookSummaryCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/livro/${book.slug}`}>
        <div className="h-48 bg-gray-200 relative">
          <img 
            src={book.coverImage} 
            alt={`Capa do livro ${book.title}`} 
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
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
        <Link to={`/livro/${book.slug}`}>
          <h3 className="font-bold text-lg mb-1 line-clamp-2 hover:text-primary transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-3">
          {book.author}, {book.year}
        </p>
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {book.summary}
        </p>
        <Link 
          to={`/livro/${book.slug}`}
          className="text-primary font-medium hover:underline text-sm"
        >
          Ler resumo completo →
        </Link>
      </div>
    </div>
  );
};

export default BookSummaryCard;
