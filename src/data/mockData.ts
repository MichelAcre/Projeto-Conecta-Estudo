import { Discipline, ContentItem, QuizQuestion, UserProfile, PeerComment } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4hmUWw6rrApD4bpTymGVSGCCdxPO_VITbCUz4Sb8ydXcbGVhWkxxx5UqWqLGOj-C1fnX8slA_hwfMekMz3ZQravORB_35QSVKoWn_EtQ1ybfrkxrJCf0-zcJ9f-ZFvoAHpBfVVa7tm1quQThpz3rkVNtwCyaJ0qcm4fAxecgLkf4nMPiYjzzajiR7LZQrdK-gHLKpAZzKN_T3gSydeeFXSP-c7k4Lotvuc48ZfLXybtx7aSCCmlY3',
  userSofia: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwDOQoGv8RMC8cc_V27gdPDwTj2jxlJRo5P3PO1S-zaPR-RZl0xBZjuAq6gHQZnIEL4KsjwOfImXnhF8_oXiVBtYT-tTjp6AZmoVab6T6hFPP6LEakcCKk7SufVufupPffNqSeec4GxMx5bfmXVdWhVh-JUO584NQlxWsiwtxmCfyEZK71f7c-DLDue9nBsYIUEGjH-llBiNH2d8T5SLDqh3vsrD3IA4v2UlUmD80J-BfPg6L8z9NB',
  profLucas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7sK_dO1PT5RLgQwIy1OoOUmLq6x05ipnMs8Z6JWruD6nOsQjqSivb_4Cm6IyMmk19mTxKmoB64s5YW3RBrO2KzY6hTHLxZUVtw8liibCZ31LRi6XU-Cw1acxN75qd5o-0fPorQALiryTcHOAd-B1iT3jfZvkXGKep-c_aBK50N38fK-KQaztyJGVwTgbuHk4x5hFx5WVO9nnUZi1J-3jqvdlgy0OOczbGpLSLuF7Y18WzsJ4NHnMC',
  mitochondria: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASsneegZFht7TnzUeervGl7rb8l-cJX39Sf74j0qA9z9wJTzx561GT8L_UCRbElCsMZM0gQ_fqu2qWLSLgRFU62jvLJ5jWTJXcx3YsPFnaJRFtZoE-sufAMc-huZoOxgQ5soRtCHa5c0nr8ggJ4hih9KhhzJrxFw9uWyktuS-XvXyqFXHoPK2eq_h6pgTe4mVHphagjsAx__Z4fSxM_843FSXQDMJHDV6bB85x4wTaD61o2ETX95Ow',
  students: {
    anaClara: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl0la9sHfrAWwDrsebEAqx0IUKpSRqN5O38C6Q6MblY4cyC-PyvliCkHfDH3uUTBnGKf2nGnvrHhdok8OZeGjVIi8kgwC_xx4JWYDs0pnU4WFsOB4U6Lkxf0UTn1B0BQtI4T2hhGeupkee345A1ZI9iSQOhiunmcibjz-E_qC-HKbCCCoe0QD83qe1DRgn8BRu2dVlEjwKE2CPDJZ-q4sWEQiJlfzdVz7i8_DAf3lqlG81cF8DeTPx',
    gabrielSampaio: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzamK1Xw_aV6UNxiETgRVUdb5wc7vAEZVcnRzmFSjWnT3-xudkg38DyLmfg9z0twMDOZA0R2PmAHH_6CvWZWR7haGA22catbgSjJzRiiEYMkTFJ3TAInSmiWjOo029r1JpBOCzeafa_6nEB-jQrR-jKd78yoTRXssDdG04Z2ZCEux3bQC4nvFypz3QjRlpX0_yj8Hsoc3Zc84HwGSj8hb-DpE0Tmc2E7xJs_jMAbY9qBnEakmp3B4g',
    marianaRamos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChPh-WOZU5C8JhSkZABhlSBSJRRvbzbd2z4g2VECQ7HO2H1gR0DYAaxm_ooO6LxDk7D_ZLaJF1sWNXkO2lCqtquImCits_ArOBCI0CQKbTjg9_l-5ptcjB0kx-6WsqRWJdGSbNq6vC_7VXMwzm3o6Bjh2dRn1G7No6UKPAXqtZ-P_GgLX5bZ3c_njn3C6rtZF-bok_x7RJZq7byC_jfGJor6P1bo1ePEqoL3ZxcM-1z91ioB8cXZdX',
    marianaFontes: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5mpTyhep_isqtrIpmLClxbQyoOD-5Lu_aomVeRHJUrqi8UIFqomDYc-4nHLDGlLa73TQgyMjM1e5w6xi9nu-iZBK10vRHzbUySFW44JWzCaekxpFijqYUTURR2c7K95Vp-Y_QY56HbG-Mc8YEZ9wGyr9g0oE7HRGXArEnn39uYDO94W7lp-_O8NOVVFw72XUw3qFScsCyH1cw_uxcFCwUBeaT46pACgixvzOlG9uXJ1LBGDyYJiku',
    rodrigoPrado: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Tu1hhJ4ImV06gwNAeEoNg2_JmQgaaF-eYdlT0Rw2juFWgBbS_TWOtikUBS6Uw_IsbMs1yEGCOiOrEAQaGy4jbUldRHNwoQ0Ees876wKSY_KtGt1jncTcpGmX4CPQ1PX8iLMXofs1Sm3RNC2-AulaVc14Vswl78Ry14nsiIRY1TaXDGrJtXuc97_dWeaBOzHLSYh66PA6EYhjWwv6x99qnShJ3Tmve6bLQzvWivg34-Mc54KNFLDS',
    peer1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCauwgGnTQ9keSilq-NnRKh2GCfiNrnJ5uGjV8UmBujQPnhLBsJxTpp6EN3pDGkgYkrzKucmG7giCr1pAKaMlbmZ985TacIJjW39sSaB8U_v2FOYaac0yM0vhl9vvBpcUC2saL4VrP9tDttCynrFLgcRUYuosMlsVS3eb5q0Yd21BiotrL3qNyILXvfUeJ9r1G7_RDJFopeNep269WPWnA5r00jK-1-3E4eHwLVfjUlF7UCpTS-C1Gy',
    peer2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrsb5eALVHv5Huj3t2bGS__td4b0Klhje8vp0iWKoDlf3BQcDDAlq84CYRZUPJkGQve5h5e7izh-2F9HyzK_1rnYhLhStX8J0Q4a5D9bW3xCL9Ivu1LhX1_WVPrVxm2oDcIvyvnh1WyGt_ZleW7ZzqHAc8QmMf5HjCqKQ4q48H6Bg6tOEd-7ItQ_Qe3aMCvm9sUGAkL2FkuR-pRNLrieVYFYzHZl5waXHa2ExF1Xhbjdp__s0zPWzr',
    peer3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIJBeBwABInScG0FvHeLSyDkfTTcP_MDJ5nuiFbiluel5BgGnAX6aN9bzd-5BVupKMXKOTjA9IOheRnXxrEwoQ-zlgRMjrb5ninlDhAs-0w98_bkJOjSlcFnmC54eX2kERInubJmF0-EmibKtT5spa6edK004Ge2gnkC50tfSX_170TXxKaMJjRWqlH3s_cHl16lMUoEyKeLliS0xd5efipd0wO_81rdT363nxdEoOQ9jX6i1YdY3a',
    peer4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEej0QbufLDT3Kh5zglYQVFK_WIRR8lHJbUFgaO8-SRRtD_7TH3yoNQjcwNn_AEwQd3uAM-03sVCjCFGH30efEKEz1gFBIpTGhVbLfNYDK9jIKymGmbmf6wVdvXZncmv1Nic-K1BZuzd-XcV3SCyHaeGZPA2pAGi_NVsNl2DqH7qX7LTOlq8Bxqghu5x6gxzvQmdoLe6gOWjFZJfFI4MzWC5nBXaAbq6RHYtnf_YuYR3vcCwFrmfRW',
    peer5: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjBj9-OLFsVVTEAVgAwkcDhSaPJyorjuSYWQkY2Vndql3NBdIPLjXDu-XaJfSAVeVjpfZcS_7ykaqxQF5lLFL4a1tNswkJFbFpkX-kIiqy_o80VkDbueYCQU-4lCacXv5AQ_yniXnMbgkYYu1IrsnDhPXLa6DlubigSKQx8LL8MAHPsnE27SzGy7EKv-5JUhHmjF8U8hRjRDxy0z4GT9A8jjr8xTTlbfXg6WG7Ca-fA20AlLUBhqJG',
    peer6: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7Zn2QNw5-3mF_Taput2IxC_8h4dsstZwlzApWvc6wm3qpMymCz7oEZdLocrOt7uV5wOvrfEQTP_d11IDdTUpeXXuanGcHoN-8jfkUf2SCHTACxzCqkkax6TtcTBO0OsnTM9pdjQFFmos-wn1z6UeLqZOsegGqV87ypwIqqXy072iPQvYbhS1E6GsrJ7L_gPjYm8-HeVrClPLXJcyRfHLCQ7fFFjIIymsY_5g131xnjJZaj3ErIH8Q'
  }
};

export const INITIAL_USER: UserProfile = {
  name: 'Sofia Mendes',
  email: 'sofia.mendes@escola.br',
  avatar: ASSETS.userSofia,
  streakDays: 7,
  level: 5,
  xpToday: 1450,
  totalXp: 18920,
  focusMinutesToday: 45,
  focusMinutesGoal: 60,
  studyArea: 'Ensino Médio / Pré-Vestibular',
  isLoggedIn: true
};

export const DISCIPLINES_DATA: Discipline[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    icon: 'square_foot',
    topics: 'Álgebra, Geometria e Estatística',
    category: 'exatas',
    activeRooms: 18,
    onlineCount: 342,
    progress: 72,
    colorClass: 'text-[#111ae4]',
    bgLightClass: 'bg-[#e0e0ff]',
    isFavorite: true
  },
  {
    id: 'biologia',
    name: 'Biologia',
    icon: 'eco',
    topics: 'Genética, Ecologia e Fisiologia',
    category: 'biologicas',
    activeRooms: 14,
    onlineCount: 219,
    progress: 85,
    colorClass: 'text-[#007d55]',
    bgLightClass: 'bg-[#6ffbbe]/30',
    isFavorite: true
  },
  {
    id: 'historia',
    name: 'História',
    icon: 'account_balance',
    topics: 'Brasil, Idade Média e Atualidades',
    category: 'humanas',
    activeRooms: 9,
    onlineCount: 158,
    progress: 60,
    colorClass: 'text-[#a73a00]',
    bgLightClass: 'bg-[#ffdbc8]',
    isFavorite: false
  },
  {
    id: 'fisica',
    name: 'Física',
    icon: 'science',
    topics: 'Mecânica, Termodinâmica e Óptica',
    category: 'exatas',
    activeRooms: 12,
    onlineCount: 184,
    progress: 65,
    colorClass: 'text-[#0053db]',
    bgLightClass: 'bg-[#dbe1ff]',
    isFavorite: true
  },
  {
    id: 'quimica',
    name: 'Química',
    icon: 'biotech',
    topics: 'Química Orgânica, Soluções e Eletroquímica',
    category: 'exatas',
    activeRooms: 8,
    onlineCount: 130,
    progress: 54,
    colorClass: 'text-[#7f2b00]',
    bgLightClass: 'bg-[#ffdbc8]',
    isFavorite: false
  }
];

export const CONTENTS_DATA: ContentItem[] = [
  {
    id: 'c1',
    title: 'Guia Completo: Funções Trigonométricas e Gráficos',
    description: 'Análise detalhada de amplitude, período, fase e simetria de seno, cosseno e tangente com 30 exercícios resolvidos passo a passo.',
    subject: 'Matemática',
    subjectCategory: 'exatas',
    category: 'resumos',
    format: 'Guia PDF • 18 págs',
    authorName: 'Ana Clara',
    authorRole: 'Top Colaboradora',
    authorAvatar: ASSETS.students.anaClara,
    rating: 5.0,
    downloads: 510,
    progress: 80,
    progressLabel: '80% lido',
    progressIcon: 'auto_stories',
    isFavorite: true,
    studyRoomTopic: 'Trigonometria e Ciclo Trigonométrico'
  },
  {
    id: 'c2',
    title: 'Linha do Tempo: Era Vargas e Revoluções no Brasil',
    description: 'Governo Provisório (1930), Revolução Constitucionalista, Estado Novo e a política trabalhista em diagramação cronológica direta.',
    subject: 'História',
    subjectCategory: 'humanas',
    category: 'resumos',
    format: 'Infográfico & Linha',
    authorName: 'Gabriel Sampaio',
    authorRole: 'Comunidade',
    authorAvatar: ASSETS.students.gabrielSampaio,
    rating: 4.8,
    downloads: 285,
    progress: 65,
    progressLabel: '65% concluído',
    progressIcon: 'history_edu',
    isFavorite: false,
    studyRoomTopic: 'Era Vargas e Brasil Contemporâneo'
  },
  {
    id: 'c3',
    title: 'Leis da Termodinâmica & Ciclo de Carnot',
    description: 'Conceitos fundamentais de entropia, entalpia, trabalho de um gás e máquinas térmicas com fórmulas essenciais.',
    subject: 'Física',
    subjectCategory: 'exatas',
    category: 'flashcards',
    format: 'Deck de 45 Cards',
    authorName: 'Mariana Ramos',
    authorRole: 'Criadora Ativa',
    authorAvatar: ASSETS.students.marianaRamos,
    rating: 4.7,
    downloads: 194,
    progress: 30,
    progressLabel: '30% revisado',
    progressIcon: 'style',
    isFavorite: false,
    studyRoomTopic: 'Termodinâmica e Máquinas Térmicas'
  },
  {
    id: 'c4',
    title: 'Resumo Completo: Leis de Newton & Dinâmica',
    description: 'Princípios fundamentais da mecânica clássica, inércia, força resultante, atrito e diagramas de corpo livre com exemplos resolvidos.',
    subject: 'Física',
    subjectCategory: 'exatas',
    category: 'resumos',
    format: 'Resumo Oficial • 18 min leitura',
    authorName: 'Prof. Lucas Silveira',
    authorRole: 'Monitor Nível 4 • Eng. Mecânica',
    authorAvatar: ASSETS.profLucas,
    rating: 4.9,
    downloads: 820,
    progress: 65,
    progressLabel: '65% concluído',
    progressIcon: 'trending_up',
    isFavorite: true,
    studyRoomTopic: 'Mecânica Clássica & Exercícios'
  },
  {
    id: 'c5',
    title: 'Mapas Mentais: Mitose e Meiose',
    description: 'Fases da divisão celular (prófase, metáfase, anáfase, telófase e crossing-over) em esquemas visuais com alto impacto mnemônico.',
    subject: 'Biologia',
    subjectCategory: 'biologicas',
    category: 'mapas',
    format: '14 slides ilustrados',
    authorName: 'Mariana Costa',
    authorRole: 'Monitora Bio',
    authorAvatar: ASSETS.students.peer1,
    rating: 4.9,
    downloads: 412,
    progress: 90,
    progressLabel: '90% revisado',
    progressIcon: 'psychology',
    isFavorite: true,
    studyRoomTopic: 'Genética e Divisão Celular'
  }
];

export const BIOLOGY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    statement: 'Qual organela celular é responsável pela produção de energia celular (ATP) através da respiração celular aeróbica e possui DNA próprio?',
    subject: 'Biologia Celular',
    topic: 'Citologia • Organelas Celulares',
    difficulty: 'Média',
    illustrationUrl: ASSETS.mitochondria,
    options: [
      { id: 'A', letter: 'A', text: 'Complexo de Golgi' },
      { id: 'B', letter: 'B', text: 'Mitocôndria' },
      { id: 'C', letter: 'C', text: 'Retículo Endoplasmático Rugoso' },
      { id: 'D', letter: 'D', text: 'Lisossomos' }
    ],
    correctOptionId: 'B',
    explanation: 'As mitocôndrias são as usinas energéticas da célula eucariótica onde ocorre o Ciclo de Krebs e a Fosforilação Oxidativa, gerando a maior parte do ATP.',
    hint: 'Lembre-se da teoria da endossimbiose serial: esta organela possui dupla membrana e DNA circular similar a bactérias ancestrais.'
  },
  {
    id: 2,
    statement: 'Qual das seguintes estruturas é encontrada tanto em células procariontes quanto em células eucariontes?',
    subject: 'Biologia Celular',
    topic: 'Comparação Celular',
    difficulty: 'Fácil',
    options: [
      { id: 'A', letter: 'A', text: 'Carioteca (envelope nuclear)' },
      { id: 'B', letter: 'B', text: 'Ribossomos' },
      { id: 'C', letter: 'C', text: 'Complexo Golgiense' },
      { id: 'D', letter: 'D', text: 'Mitocôndrias' }
    ],
    correctOptionId: 'B',
    explanation: 'Os ribossomos são os únicos complexos macromoleculares universais presentes em todas as formas celulares (procariontes e eucariontes), responsáveis pela síntese proteica.',
    hint: 'Pense em qual elemento celular é imprescindível para fabricar proteínas em qualquer organismo vivo.'
  },
  {
    id: 3,
    statement: 'Sobre a membrana plasmática, assinale a afirmação correta a respeito do transporte ativo de substâncias:',
    subject: 'Biologia Celular',
    topic: 'Transporte de Membrana',
    difficulty: 'Média',
    options: [
      { id: 'A', letter: 'A', text: 'Ocorre a favor do gradiente de concentração sem consumo de ATP' },
      { id: 'B', letter: 'B', text: 'Ocorre contra o gradiente de concentração com consumo de energia (ATP)' },
      { id: 'C', letter: 'C', text: 'É exemplificado pela difusão simples de oxigênio e gás carbônico' },
      { id: 'D', letter: 'D', text: 'Depende exclusivamente da pressão osmótica das hemácias' }
    ],
    correctOptionId: 'B',
    explanation: 'O transporte ativo requer gasto energético na forma de ATP porque move solutos contra o seu gradiente eletroquímico, como na bomba de sódio e potássio.',
    hint: 'Se move contra o fluxo natural (contra o gradiente), a célula precisa "pagar" em moedas de ATP.'
  },
  {
    id: 4,
    statement: 'Qual organela possui enzimas digestivas (hidrolases ácidas) encarregadas da digestão intracelular e autofagia?',
    subject: 'Biologia Celular',
    topic: 'Fisiologia Celular',
    difficulty: 'Fácil',
    options: [
      { id: 'A', letter: 'A', text: 'Peroxissomos' },
      { id: 'B', letter: 'B', text: 'Lisossomos' },
      { id: 'C', letter: 'C', text: 'Centríolos' },
      { id: 'D', letter: 'D', text: 'Cloroplastos' }
    ],
    correctOptionId: 'B',
    explanation: 'Os lisossomos funcionam como o sistema digestório da célula, quebrando partículas fagocitadas e reciclando componentes celulares envelhecidos.',
    hint: 'O sufixo "lise" remete à quebra ou digestão de substâncias orgânicas.'
  },
  {
    id: 5,
    statement: 'Em qual fase da mitose os cromossomos homólogos ou cromátides irmãs atingem o grau máximo de condensação e se alinham na placa equatorial?',
    subject: 'Biologia Celular',
    topic: 'Divisão Celular • Mitose',
    difficulty: 'Média',
    options: [
      { id: 'A', letter: 'A', text: 'Prófase' },
      { id: 'B', letter: 'B', text: 'Metáfase' },
      { id: 'C', letter: 'C', text: 'Anáfase' },
      { id: 'D', letter: 'D', text: 'Telófase' }
    ],
    correctOptionId: 'B',
    explanation: 'Na Metáfase (fase do meio), os cromossomos estão alinhados no equador da célula e presos ao fuso mitótico em sua máxima espiralação.',
    hint: '"Meta" lembra meio: cromossomos perfeitamente posicionados na linha central da célula.'
  }
];

export const PEER_HELP_COMMENTS: PeerComment[] = [
  {
    id: 'p1',
    authorInitials: 'MA',
    authorName: 'Marina Alves',
    text: "Dica: preste atenção no detalhe do 'DNA próprio circular' que é similar às bactérias antigas!",
    avatarColorClass: 'bg-[#ffdbc8]',
    textColorClass: 'text-[#a73a00]'
  },
  {
    id: 'p2',
    authorInitials: 'LF',
    authorName: 'Lucas Ferreira',
    text: "A produção da moeda energética (ATP) entrega a resposta bem rápido. Vai na fé!",
    avatarColorClass: 'bg-[#6ffbbe]/30',
    textColorClass: 'text-[#007d55]'
  },
  {
    id: 'p3',
    authorInitials: 'GC',
    authorName: 'Gabriela Corrêa',
    text: "O prefixo endo- e simbiose é clássico da teoria de Lynn Margulis para mitocôndrias e cloroplastos.",
    avatarColorClass: 'bg-[#dbe1ff]',
    textColorClass: 'text-[#004ac6]'
  }
];
