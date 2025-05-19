
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { BookOpen } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="mb-6 flex justify-center">
            <BookOpen className="h-24 w-24 text-gray-300" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Página não encontrada</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            A página que você está procurando pode ter sido removida ou está temporariamente indisponível.
          </p>
          <Link 
            to="/" 
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
