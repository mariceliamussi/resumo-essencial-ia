
import React, { useState } from 'react';
import { useBooks } from '@/hooks/useBooks';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import AdminBookForm from '@/components/AdminBookForm';
import { Book } from '@/data/books';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Book as BookIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminPage: React.FC = () => {
  const { books, addBook, editBook, deleteBook, loading } = useBooks();
  const [isEditing, setIsEditing] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const handleAddBook = (newBook: Book) => {
    addBook(newBook);
  };

  const handleEditClick = (book: Book) => {
    setBookToEdit(book);
    setIsEditing(true);
  };

  const handleEditBook = (updatedBook: Book) => {
    if (bookToEdit) {
      editBook(bookToEdit.id, updatedBook);
      setIsEditing(false);
      setBookToEdit(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setBookToEdit(null);
  };

  const handleDeleteClick = (bookId: string) => {
    setBookToDelete(bookId);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
      setBookToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setBookToDelete(null);
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
            <h2 className="text-xl font-semibold mb-6">
              {isEditing ? "Editar Livro" : "Adicionar Novo Livro"}
            </h2>
            <AdminBookForm 
              onSubmit={isEditing ? handleEditBook : handleAddBook} 
              initialData={bookToEdit}
              isEditing={isEditing}
              onCancel={handleCancelEdit}
            />
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
          {loading ? (
            <div className="py-10 text-center text-muted-foreground">Carregando livros...</div>
          ) : books.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">Nenhum livro cadastrado</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Ano</TableHead>
                    <TableHead>Categorias</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Ações</TableHead>
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
                      <TableCell className="space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditClick(book)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteClick(book.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isto irá permanentemente excluir este livro
              e todos os dados relacionados a ele.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default AdminPage;
