
export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  categories: string[];
  themes: string[];
  summary: string;
  keyTakeaways: string[];
  forWhom: string;
  quote: string;
  coverImage: string;
  slug: string;
}

export const categories = [
  "Negócios",
  "Produtividade",
  "Psicologia",
  "Filosofia",
  "Liderança",
  "Saúde",
];

export const books: Book[] = [
  {
    id: "1",
    title: "Atômico: Mudanças Pequenas, Resultados Impressionantes",
    author: "James Clear",
    year: 2018,
    categories: ["Produtividade", "Psicologia"],
    themes: ["Hábitos", "Autodisciplina", "Produtividade", "Desenvolvimento pessoal"],
    summary: "James Clear apresenta uma abordagem revolucionária para a formação de bons hábitos e abandono dos maus, oferecendo um framework prático baseado na ideia de pequenas melhorias de 1% ao dia. O autor explica como pequenas mudanças, quando acumuladas, podem levar a resultados impressionantes, utilizando insights da neurociência e psicologia comportamental.",
    keyTakeaways: [
      "Pequenas mudanças de 1% acumulam-se em grandes resultados ao longo do tempo",
      "Os hábitos seguem um ciclo de quatro etapas: deixa, desejo, resposta e recompensa",
      "Para criar hábitos sustentáveis, torne-os óbvios, atrativos, fáceis e satisfatórios",
      "O ambiente tem mais influência na formação de hábitos do que a motivação",
      "A identidade é mais importante que os resultados na mudança de comportamento"
    ],
    forWhom: "Recomendado para qualquer pessoa que queira melhorar sua vida através da formação de melhores hábitos, especialmente profissionais ocupados que buscam implementar mudanças sustentáveis sem depender de motivação ou força de vontade.",
    quote: "Você não sobe ao nível das suas metas. Você cai ao nível dos seus sistemas.",
    coverImage: "/placeholder.svg",
    slug: "atomico-mudancas-pequenas-resultados-impressionantes"
  },
  {
    id: "2",
    title: "Deep Work: Regras para o Sucesso em um Mundo Distraído",
    author: "Cal Newport",
    year: 2016,
    categories: ["Produtividade", "Negócios"],
    themes: ["Foco", "Concentração", "Produtividade", "Trabalho profundo"],
    summary: "Cal Newport argumenta que a capacidade de concentração profunda é cada vez mais rara e valiosa na nossa economia. O livro divide-se entre a argumentação sobre por que o trabalho profundo é importante e como desenvolver esta habilidade. O autor apresenta estratégias concretas para eliminar distrações e criar rotinas que permitem períodos de concentração intensa.",
    keyTakeaways: [
      "O trabalho profundo é a capacidade de focar sem distrações em uma tarefa cognitivamente exigente",
      "Esta habilidade está se tornando cada vez mais rara e mais valiosa na economia atual",
      "O trabalho raso (emails, reuniões, redes sociais) consome a maior parte do tempo profissional",
      "Para praticar o trabalho profundo, é necessário eliminar distrações e criar rotinas específicas",
      "Descansar completamente da tecnologia é essencial para recarregar a capacidade de concentração"
    ],
    forWhom: "Ideal para profissionais do conhecimento, acadêmicos, escritores e qualquer pessoa que precise realizar trabalho criativo e intelectualmente desafiador em um mundo repleto de distrações digitais.",
    quote: "O trabalho profundo não é apenas satisfatório para o trabalhador, mas gera valor significativo, é difícil de replicar e é, ao mesmo tempo, raro.",
    coverImage: "/placeholder.svg",
    slug: "deep-work-regras-para-o-sucesso"
  },
  {
    id: "3",
    title: "Essencialismo: A Disciplina da Busca por Menos",
    author: "Greg McKeown",
    year: 2014,
    categories: ["Produtividade", "Liderança"],
    themes: ["Foco", "Priorização", "Simplicidade", "Produtividade"],
    summary: "Greg McKeown apresenta uma abordagem sistemática para identificar o que é absolutamente essencial e eliminar tudo o mais, permitindo que façamos menos, mas melhor. O livro argumenta contra o mito de que podemos 'ter tudo' e 'fazer tudo', propondo um caminho mais deliberado e seletivo para direcionar tempo, energia e atenção.",
    keyTakeaways: [
      "O essencialismo é uma disciplina sistemática para discernir o que é absolutamente essencial",
      "Realize menos coisas, mas com maior qualidade e impacto",
      "Aprenda a dizer 'não' de forma graciosa e elimine o não-essencial",
      "O poder da escolha seletiva supera a armadilha da sobrecarga",
      "Crie margens e buffers para lidar com o inesperado e manter o foco"
    ],
    forWhom: "Recomendado para líderes, gerentes e profissionais sobrecarregados que buscam maior clareza, maior impacto e uma abordagem mais consciente para suas carreiras e vidas.",
    quote: "O essencialismo não é sobre fazer mais coisas em menos tempo. É sobre fazer apenas as coisas certas.",
    coverImage: "/placeholder.svg",
    slug: "essencialismo-a-disciplina-da-busca-por-menos"
  },
  {
    id: "4",
    title: "O Poder do Hábito",
    author: "Charles Duhigg",
    year: 2012,
    categories: ["Psicologia", "Negócios"],
    themes: ["Hábitos", "Mudança de comportamento", "Neurociência", "Produtividade"],
    summary: "Charles Duhigg explora a ciência por trás da formação de hábitos e como podemos transformá-los para mudar nossas vidas. Dividido em três partes, o livro examina os hábitos individuais, organizacionais e sociais, revelando como eles funcionam e como podemos reprogramá-los através do loop de hábito: deixa, rotina e recompensa.",
    keyTakeaways: [
      "Os hábitos seguem um ciclo de três partes: deixa, rotina e recompensa",
      "Para mudar um hábito, identifique a deixa e mantenha a mesma recompensa, mudando apenas a rotina",
      "Os hábitos-chave ou 'keystone habits' desencadeiam uma série de mudanças positivas em outras áreas",
      "A crença e o senso de comunidade são essenciais para mudanças de hábitos duradouras",
      "As organizações podem transformar-se ao focar na mudança de hábitos culturais específicos"
    ],
    forWhom: "Indicado para qualquer pessoa interessada em entender e mudar seus próprios hábitos, bem como líderes que desejam transformar o comportamento de suas organizações e equipes.",
    quote: "O hábito é uma escolha que fazemos deliberadamente em algum momento e depois paramos de fazer, mas continuamos executando todos os dias.",
    coverImage: "/placeholder.svg",
    slug: "o-poder-do-habito"
  },
  {
    id: "5",
    title: "Pense de Novo",
    author: "Adam Grant",
    year: 2021,
    categories: ["Psicologia", "Liderança"],
    themes: ["Pensamento crítico", "Flexibilidade mental", "Aprendizado", "Tomada de decisão"],
    summary: "Adam Grant explora a importância de questionar nossas próprias opiniões e abrir nossas mentes para repensar e desaprender. O livro argumenta que a capacidade de reconsiderar e abandonar conhecimentos e crenças obsoletas é uma habilidade essencial num mundo em rápida mudança, tanto para o sucesso individual quanto para o progresso coletivo.",
    keyTakeaways: [
      "A inteligência não está em saber tudo, mas na capacidade de desaprender e reaprender",
      "O modo 'cientista' de pensar (buscar verdade em vez de validação) é mais eficaz que os modos 'pregador', 'político' ou 'promotor'",
      "Cultivar a humildade intelectual ajuda a reconhecer os limites do nosso conhecimento",
      "Conversas construtivas com pessoas que pensam diferente ampliam nossa perspectiva",
      "Criar uma cultura de aprendizagem requer valorizar a flexibilidade mental sobre a consistência"
    ],
    forWhom: "Perfeito para líderes, educadores, profissionais do conhecimento e qualquer pessoa interessada em melhorar sua tomada de decisões e adaptabilidade em um mundo de incertezas e rápidas mudanças.",
    quote: "A marca da sabedoria não é acertar todas as respostas, mas questionar todas as respostas.",
    coverImage: "/placeholder.svg",
    slug: "pense-de-novo"
  },
  {
    id: "6",
    title: "Mindset: A Nova Psicologia do Sucesso",
    author: "Carol S. Dweck",
    year: 2006,
    categories: ["Psicologia", "Desenvolvimento pessoal"],
    themes: ["Crescimento pessoal", "Mentalidade", "Aprendizado", "Resiliência"],
    summary: "Carol Dweck apresenta sua revolucionária pesquisa sobre os dois tipos de mindset que moldam nossas vidas: o fixo e o de crescimento. Enquanto pessoas com mindset fixo acreditam que suas qualidades são imutáveis, aquelas com mindset de crescimento entendem que habilidades podem ser desenvolvidas através de dedicação e trabalho árduo.",
    keyTakeaways: [
      "No mindset fixo, acredita-se que inteligência e talento são qualidades inatas e imutáveis",
      "No mindset de crescimento, entende-se que habilidades podem ser desenvolvidas com esforço e persistência",
      "O elogio ao processo (esforço, estratégias) é mais eficaz que o elogio a traços fixos (inteligência, talento)",
      "Fracassos são oportunidades de crescimento, não definições de capacidade",
      "É possível mudar de um mindset fixo para um mindset de crescimento com consciência e prática"
    ],
    forWhom: "Essencial para pais, educadores, líderes e qualquer pessoa interessada em desenvolver seu potencial e o dos outros através de uma mentalidade mais produtiva e resiliente.",
    quote: "O mindset de crescimento se baseia na crença de que suas qualidades básicas são coisas que você pode cultivar por meio de seus esforços.",
    coverImage: "/placeholder.svg",
    slug: "mindset-a-nova-psicologia-do-sucesso"
  }
];

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find(book => book.slug === slug);
};

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter(book => book.categories.includes(category));
};

export const searchBooks = (query: string): Book[] => {
  const lowerQuery = query.toLowerCase();
  return books.filter(book => {
    return (
      book.title.toLowerCase().includes(lowerQuery) ||
      book.author.toLowerCase().includes(lowerQuery) ||
      book.themes.some(theme => theme.toLowerCase().includes(lowerQuery)) ||
      book.categories.some(category => category.toLowerCase().includes(lowerQuery))
    );
  });
};
