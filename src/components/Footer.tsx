
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center space-x-2 mb-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-merriweather font-bold text-xl text-primary">Resumos Essenciais</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              Seu portal para resumos concisos e informativos dos melhores livros, 
              organizados por categorias e temas, para ajudar você a encontrar conhecimento 
              relevante rapidamente.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Navegação</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-primary transition-colors">Início</Link></li>
                <li><Link to="/pesquisa" className="text-gray-600 hover:text-primary transition-colors">Pesquisa</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Categorias</h3>
              <ul className="space-y-2">
                <li><Link to="/categoria/negocios" className="text-gray-600 hover:text-primary transition-colors">Negócios</Link></li>
                <li><Link to="/categoria/produtividade" className="text-gray-600 hover:text-primary transition-colors">Produtividade</Link></li>
                <li><Link to="/categoria/psicologia" className="text-gray-600 hover:text-primary transition-colors">Psicologia</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Mais Categorias</h3>
              <ul className="space-y-2">
                <li><Link to="/categoria/filosofia" className="text-gray-600 hover:text-primary transition-colors">Filosofia</Link></li>
                <li><Link to="/categoria/lideranca" className="text-gray-600 hover:text-primary transition-colors">Liderança</Link></li>
                <li><Link to="/categoria/saude" className="text-gray-600 hover:text-primary transition-colors">Saúde</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Resumos Essenciais. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
