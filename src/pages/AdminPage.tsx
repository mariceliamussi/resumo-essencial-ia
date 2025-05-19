
import React from 'react';
import { useBooks } from '@/hooks/useBooks';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AdminBookForm from '@/components/AdminBookForm';
import { Book } from '@/data/books';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book as BookIcon } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { books, addBook } = useBooks();

  const handleAddBook = (newBook: Book) => {
    addBook(newBook);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center mb-8 gap-3">
          <BookIcon className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Área Administrativa</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-8">
          <div className="lg:col-span-8 bg-card border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Adicionar Novo Livro</h2>
            <AdminBookForm onSubmit={handleAddBook} />
          </div>
          
          <div className="lg:col-span-4">
            <div className="bg-card border rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Total de livros:</span>
                  <span className="font-medium">{books.length}</span>
                </li>
                <li className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Categorias:</span>
                  <span className="font-medium">
                    {new Set(books.flatMap(book => book.categories)).size}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-muted-foreground">Autores:</span>
                  <span className="font-medium">
                    {new Set(books.map(book => book.author)).size}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Livros Cadastrados</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Categorias</TableHead>
                  <TableHead>Slug</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.year}</TableCell>
                    <TableCell>{book.categories.join(', ')}</TableCell>
                    <TableCell className="font-mono text-sm">{book.slug}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
