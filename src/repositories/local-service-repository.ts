import type { LocalServiceKind, LocalServiceProfessional } from "@/models/local-service";

const hairdressers: LocalServiceProfessional[] = [
  {
    category: "Cabeleireira",
    description:
      "Especialista em loiros, mechas, alisamentos, cortes e tratamentos capilares com atendimento personalizado.",
    galleryLabel: "+16",
    kind: "beauty",
    location: "Sinop - MT",
    name: "Studio Thais Lemos",
    products: [
      { id: "oleo-argan", price: "R$ 49,90", title: "Oleo Reparador Argan Oil" },
      { id: "leave-in-liso", price: "R$ 39,90", title: "Leave-in Liso Perfeito" },
      { id: "shampoo-hidratacao", price: "R$ 32,90", title: "Shampoo Hidratacao" },
      { id: "mascara-reconstrucao", price: "R$ 59,90", title: "Mascara Reconstrucao" },
    ],
    rating: "4,9",
    reviewCount: "128 avaliacoes",
    services: ["Coloracao", "Mechas", "Cortes", "Hidratacao", "Alisamentos"],
    shortDescription: "Loiros, mechas e tratamentos capilares.",
    slug: "studio-thais-lemos",
    unavailable: ["Alongamentos", "Quimica para gestantes"],
    verified: true,
    workInfo: {
      attendance: "Segunda a sabado",
      experience: "8+ anos",
      hours: "08:00 as 19:00",
    },
  },
  {
    category: "Cabeleireira",
    description:
      "Salao completo para corte, escova, hidratacao e finalizacao para eventos.",
    galleryLabel: "+9",
    kind: "beauty",
    location: "Sinop - MT",
    name: "Espaco Beleza & Estilo",
    products: [
      { id: "kit-cronograma", price: "R$ 89,90", title: "Kit Cronograma Capilar" },
      { id: "finalizador-brilho", price: "R$ 34,90", title: "Finalizador Brilho Intenso" },
    ],
    rating: "4,8",
    reviewCount: "96 avaliacoes",
    services: ["Corte", "Escova", "Hidratacao", "Penteados"],
    shortDescription: "Cortes, escovas e producao para eventos.",
    slug: "espaco-beleza-estilo",
    verified: true,
    workInfo: {
      attendance: "Segunda a sabado",
      experience: "6+ anos",
      hours: "09:00 as 18:00",
    },
  },
  {
    category: "Cabeleireira",
    description:
      "Atendimento para cabelo natural, cronograma capilar e tratamentos de recuperacao.",
    galleryLabel: "+7",
    kind: "beauty",
    location: "Sinop - MT",
    name: "Beleza Natural Hair",
    products: [
      { id: "shampoo-matizador", price: "R$ 42,90", title: "Shampoo Matizador 300ml" },
      { id: "leave-in-10", price: "R$ 45,90", title: "Leave-in 10 em 1" },
    ],
    rating: "4,7",
    reviewCount: "73 avaliacoes",
    services: ["Tratamentos", "Finalizacao", "Cortes", "Cronograma capilar"],
    shortDescription: "Tratamentos para cabelo natural e recuperacao.",
    slug: "beleza-natural-hair",
    workInfo: {
      attendance: "Terca a sabado",
      experience: "5+ anos",
      hours: "08:30 as 18:30",
    },
  },
];

const builders: LocalServiceProfessional[] = [
  {
    category: "Pedreiro",
    description:
      "Mais de 10 anos de experiencia em construcoes, reformas e acabamentos. Trabalho com qualidade, compromisso e pontualidade.",
    galleryLabel: "1/8",
    kind: "construction",
    location: "Sinop - MT",
    name: "Joao Construcoes",
    products: [
      { id: "selador-acrilico", price: "R$ 79,90", title: "Selador Acrilico" },
      { id: "colher-pedreiro", price: "R$ 29,90", title: "Colher de Pedreiro" },
      { id: "areia-media", price: "R$ 180,00", title: "Areia Media" },
      { id: "brita-1", price: "R$ 210,00", title: "Brita 1" },
    ],
    rating: "4,9",
    reviewCount: "211 avaliacoes",
    services: ["Alvenaria", "Reboco", "Pisos", "Acabamentos", "Reformas", "Construcao do zero"],
    shortDescription: "Construcoes, reformas e acabamentos.",
    slug: "joao-construcoes",
    verified: true,
    workInfo: {
      attendance: "Segunda a sabado",
      experience: "10+ anos",
      hours: "07:00 as 18:00",
    },
  },
  {
    category: "Pedreiro",
    description:
      "Pedreiro para pequenos reparos, pisos, contrapiso, reboco e manutencoes residenciais.",
    galleryLabel: "1/6",
    kind: "construction",
    location: "Sinop - MT",
    name: "Carlos Pedreiro",
    products: [
      { id: "argamassa-acii", price: "R$ 34,90", title: "Argamassa ACII 20kg" },
      { id: "cimento-cpii", price: "R$ 42,90", title: "Cimento CP II" },
    ],
    rating: "4,8",
    reviewCount: "144 avaliacoes",
    services: ["Pisos", "Reboco", "Reparos", "Manutencao"],
    shortDescription: "Reparos residenciais e acabamento.",
    slug: "carlos-pedreiro",
    verified: true,
    workInfo: {
      attendance: "Segunda a sexta",
      experience: "9+ anos",
      hours: "07:30 as 17:30",
    },
  },
  {
    category: "Pedreiro",
    description:
      "Equipe para obra maior, reformas completas, acabamento fino e acompanhamento de cronograma.",
    galleryLabel: "1/10",
    kind: "construction",
    location: "Sinop - MT",
    name: "Norte Construcoes",
    products: [
      { id: "bloco-concreto", price: "R$ 6,90", title: "Bloco de Concreto" },
      { id: "ceramica-60", price: "R$ 64,90", title: "Ceramica 60x60" },
    ],
    rating: "4,7",
    reviewCount: "118 avaliacoes",
    services: ["Reformas", "Obra do zero", "Acabamento", "Gestao de equipe"],
    shortDescription: "Equipe para obras e reformas completas.",
    slug: "norte-construcoes",
    workInfo: {
      attendance: "Segunda a sabado",
      experience: "12+ anos",
      hours: "07:00 as 18:00",
    },
  },
];

export function getLocalServices(kind: LocalServiceKind) {
  return kind === "beauty" ? hairdressers : builders;
}

export function getLocalServiceBySlug(kind: LocalServiceKind, slug: string) {
  return getLocalServices(kind).find((service) => service.slug === slug);
}
