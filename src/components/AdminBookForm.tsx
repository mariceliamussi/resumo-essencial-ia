
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Book, categories } from '@/data/books';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Check, ChevronsUpDown, Plus, X } from 'lucide-react';
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem, 
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const bookFormSchema = z.object({
  title: z.string().min(3, { message: 'Título deve ter pelo menos 3 caracteres' }),
  author: z.string().min(2, { message: 'Autor deve ter pelo menos 2 caracteres' }),
  year: z.coerce.number().min(1000, { message: 'Ano inválido' }).max(new Date().getFullYear(), { message: 'Ano não pode ser no futuro' }),
  categories: z.array(z.string()).min(1, { message: 'Selecione pelo menos uma categoria' }),
  themes: z.array(z.string()).min(1, { message: 'Adicione pelo menos um tema' }),
  summary: z.string().min(100, { message: 'Resumo deve ter pelo menos 100 caracteres' }),
  keyTakeaways: z.array(z.string()).min(3, { message: 'Adicione pelo menos 3 pontos-chave' }).max(7, { message: 'Máximo de 7 pontos-chave' }),
  forWhom: z.string().min(20, { message: 'Esta seção deve ter pelo menos 20 caracteres' }),
  quote: z.string().min(5, { message: 'A citação deve ter pelo menos 5 caracteres' }),
  coverImage: z.string().default('/placeholder.svg'),
  slug: z.string().min(3, { message: 'Slug deve ter pelo menos 3 caracteres' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug deve conter apenas letras minúsculas, números e hífens' }),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

interface AdminBookFormProps {
  onSubmit: (data: Book) => void;
}

const AdminBookForm: React.FC<AdminBookFormProps> = ({ onSubmit }) => {
  const [themeInput, setThemeInput] = React.useState('');
  const [keyTakeawayInput, setKeyTakeawayInput] = React.useState('');
  
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      year: new Date().getFullYear(),
      categories: [],
      themes: [],
      summary: '',
      keyTakeaways: [],
      forWhom: '',
      quote: '',
      coverImage: '/placeholder.svg',
      slug: '',
    },
  });

  const addTheme = () => {
    if (themeInput.trim()) {
      const currentThemes = form.getValues().themes || [];
      if (!currentThemes.includes(themeInput.trim())) {
        form.setValue('themes', [...currentThemes, themeInput.trim()]);
      }
      setThemeInput('');
    }
  };

  const removeTheme = (theme: string) => {
    const currentThemes = form.getValues().themes || [];
    form.setValue('themes', currentThemes.filter(t => t !== theme));
  };

  const addKeyTakeaway = () => {
    if (keyTakeawayInput.trim()) {
      const currentTakeaways = form.getValues().keyTakeaways || [];
      if (currentTakeaways.length < 7 && !currentTakeaways.includes(keyTakeawayInput.trim())) {
        form.setValue('keyTakeaways', [...currentTakeaways, keyTakeawayInput.trim()]);
      }
      setKeyTakeawayInput('');
    }
  };

  const removeKeyTakeaway = (takeaway: string) => {
    const currentTakeaways = form.getValues().keyTakeaways || [];
    form.setValue('keyTakeaways', currentTakeaways.filter(t => t !== takeaway));
  };

  const handleFormSubmit = (data: BookFormValues) => {
    const bookData: Book = {
      ...data,
      id: String(Date.now()), // ID temporário que será substituído pelo hook useBooks
    };
    onSubmit(bookData);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do Livro</FormLabel>
                <FormControl>
                  <Input placeholder="Título do livro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Autor</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do autor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano de Publicação</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug (URL)</FormLabel>
                <FormControl>
                  <Input placeholder="titulo-do-livro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Capa (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="/placeholder.svg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorias</FormLabel>
              <div className="space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {field.value?.length > 0
                        ? `${field.value.length} categoria(s) selecionada(s)`
                        : "Selecione as categorias"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoria..." />
                      <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category}
                            value={category}
                            onSelect={() => {
                              const isSelected = field.value?.includes(category);
                              const newCategories = isSelected
                                ? field.value?.filter(
                                    (item) => item !== category
                                  )
                                : [...(field.value || []), category];
                              form.setValue('categories', newCategories, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                field.value?.includes(category) ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {field.value?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {field.value.map(category => (
                      <div key={category} className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                        {category}
                        <button 
                          type="button"
                          onClick={() => form.setValue(
                            'categories', 
                            field.value?.filter(c => c !== category) || [],
                            { shouldValidate: true }
                          )}
                          className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="themes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temas</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tema"
                    value={themeInput}
                    onChange={(e) => setThemeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTheme();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addTheme}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {field.value?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {field.value.map(theme => (
                      <div key={theme} className="flex items-center bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm">
                        {theme}
                        <button 
                          type="button"
                          onClick={() => removeTheme(theme)}
                          className="ml-1 text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Síntese do Livro</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Escreva um resumo conciso do livro (1-2 parágrafos)"
                  {...field}
                  rows={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keyTakeaways"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Principais Aprendizados (3-7 itens)</FormLabel>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar aprendizado chave"
                    value={keyTakeawayInput}
                    onChange={(e) => setKeyTakeawayInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addKeyTakeaway();
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addKeyTakeaway}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {field.value?.length > 0 ? (
                  <div className="space-y-2">
                    {field.value.map((takeaway, index) => (
                      <div key={index} className="flex items-center gap-2 rounded-md border px-3 py-2">
                        <span className="flex-1">{takeaway}</span>
                        <button 
                          type="button"
                          onClick={() => removeKeyTakeaway(takeaway)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : null}
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="forWhom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Para quem é indicado</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descreva o público que mais se beneficiaria deste livro"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citação Impactante</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Uma citação marcante do livro"
                  {...field}
                  rows={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Adicionar Livro</Button>
      </form>
    </Form>
  );
};

export default AdminBookForm;
