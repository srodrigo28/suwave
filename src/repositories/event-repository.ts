import type { EventVisibility, LocalEvent } from "@/models/event";

type ApiEnvelope<T> = {
  data?: T;
  message?: string;
};

type ApiEvent = {
  category: string;
  city: string;
  cta_label: string;
  date_label: string;
  description: string;
  host: string;
  id: string;
  location: string;
  slug: string;
  state: string;
  status: string;
  summary: string;
  tags: string[];
  time_label: string;
  title: string;
  visibility: EventVisibility;
};

const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://99dev.pro/suwave-api/api/v1"
).replace(/\/$/, "");

const localEvents: LocalEvent[] = [
  {
    category: "Show e gastronomia",
    city: "Frutal, MG",
    ctaLabel: "Ver programacao",
    dateLabel: "Sabado, 20 Jul",
    description:
      "Programacao publica com musica ao vivo, barracas de comida local e area familiar. O card ja nasce pronto para virar agenda integrada com compra de ingresso ou contato do organizador.",
    host: "Secretaria de Cultura",
    id: "evt-001",
    location: "Praca Central",
    slug: "festival-da-praca",
    status: "Publicado",
    summary: "Musica ao vivo, comida local e programacao aberta para a cidade.",
    tags: ["Publico", "Gratis", "Familia"],
    timeLabel: "18:00",
    title: "Festival da Praca",
    visibility: "public",
  },
  {
    category: "Comida local",
    city: "Frutal, MG",
    ctaLabel: "Reservar mesa",
    dateLabel: "Sexta, 26 Jul",
    description:
      "Evento de restaurante com cardapio especial, vagas limitadas e chamada direta para reserva. A estrutura cobre eventos de lojas, bares e restaurantes sem misturar com classificados.",
    host: "Cantinho do Churrasco",
    id: "evt-002",
    location: "Av. Principal, 820",
    slug: "noite-do-churrasco",
    status: "Aberto",
    summary: "Rodada especial com musica ao vivo e reservas antecipadas.",
    tags: ["Privado", "Reserva", "Restaurante"],
    timeLabel: "20:30",
    title: "Noite do Churrasco",
    visibility: "private",
  },
  {
    category: "Bar e encontro",
    city: "Frutal, MG",
    ctaLabel: "Chamar organizador",
    dateLabel: "Domingo, 28 Jul",
    description:
      "Modelo para eventos privados anunciados por empresas ou pessoas: aniversario, encontro, festa de bairro e pequenas divulgacoes com limite de participantes.",
    host: "Lincoln's Bar",
    id: "evt-003",
    location: "Rua das Palmeiras, 44",
    slug: "encontro-no-lincolns-bar",
    status: "Convites ativos",
    summary: "Encontro com lista de convidados e confirmacao por contato direto.",
    tags: ["Privado", "Lista", "Bar"],
    timeLabel: "19:00",
    title: "Encontro no Lincoln's Bar",
    visibility: "private",
  },
  {
    category: "Noticia local",
    city: "Frutal, MG",
    ctaLabel: "Ler noticia",
    dateLabel: "Hoje",
    description:
      "Publicacao editorial curta para comunicados da cidade, cobertura regional e avisos de utilidade publica. A mesma tela pode receber dados da API quando o backend deste modulo for aberto.",
    host: "Redacao Suwave",
    id: "evt-004",
    location: "Centro",
    slug: "agenda-cultural-da-semana",
    status: "Atualizado",
    summary: "Resumo da agenda cultural e dos avisos publicados para a semana.",
    tags: ["Noticia", "Cidade", "Agenda"],
    timeLabel: "09:15",
    title: "Agenda cultural da semana",
    visibility: "news",
  },
  {
    category: "Pizza e promocao",
    city: "Frutal, MG",
    ctaLabel: "Ver oferta",
    dateLabel: "Quinta, 1 Ago",
    description:
      "Divulgacao de evento promocional com horario, local e chamada comercial. A fatia cobre o caminho visual para negocios anunciarem eventos sem depender ainda de checkout.",
    host: "Pizza & Cia",
    id: "evt-005",
    location: "Rua Comercio, 199",
    slug: "rodizio-pizza-e-cia",
    status: "Publicado",
    summary: "Rodizio promocional com lote limitado e retirada de senhas no local.",
    tags: ["Privado", "Promocao", "Comida"],
    timeLabel: "19:30",
    title: "Rodizio Pizza & Cia",
    visibility: "private",
  },
];

export function getLocalEvents() {
  return localEvents;
}

export function getEventsByVisibility(visibility: EventVisibility) {
  return localEvents.filter((event) => event.visibility === visibility);
}

export function getPublicContentEvents() {
  return localEvents.filter((event) => event.visibility !== "private");
}

export function getLocalEventBySlug(eventSlug: string) {
  return localEvents.find((event) => event.slug === eventSlug);
}

function toLocalEvent(event: ApiEvent): LocalEvent {
  return {
    category: event.category,
    city: `${event.city}, ${event.state}`,
    ctaLabel: event.cta_label,
    dateLabel: event.date_label,
    description: event.description,
    host: event.host,
    id: event.id,
    location: event.location,
    slug: event.slug,
    status: event.status === "published" ? "Publicado" : event.status,
    summary: event.summary,
    tags: event.tags,
    timeLabel: event.time_label,
    title: event.title,
    visibility: event.visibility,
  };
}

async function fetchEventsFromApi(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 60 },
  });
  const body = (await response.json().catch(() => ({}))) as ApiEnvelope<ApiEvent[]>;

  if (!response.ok || !body.data) {
    throw new Error(body.message ?? "Nao foi possivel carregar eventos.");
  }

  return body.data.map(toLocalEvent);
}

async function fetchEventFromApi(eventSlug: string) {
  const response = await fetch(`${API_BASE_URL}/events/${eventSlug}`, {
    next: { revalidate: 60 },
  });
  const body = (await response.json().catch(() => ({}))) as ApiEnvelope<ApiEvent>;

  if (!response.ok || !body.data) {
    throw new Error(body.message ?? "Nao foi possivel carregar evento.");
  }

  return toLocalEvent(body.data);
}

export async function getEvents() {
  try {
    return await fetchEventsFromApi("/events");
  } catch {
    return getLocalEvents();
  }
}

export async function getRemoteEventsByVisibility(visibility: EventVisibility) {
  try {
    return await fetchEventsFromApi(`/events?visibility=${visibility}`);
  } catch {
    return getEventsByVisibility(visibility);
  }
}

export async function getPublicContentEventsFromApi() {
  try {
    const [publicEvents, newsEvents] = await Promise.all([
      fetchEventsFromApi("/events?visibility=public"),
      fetchEventsFromApi("/events?visibility=news"),
    ]);
    return [...publicEvents, ...newsEvents];
  } catch {
    return getPublicContentEvents();
  }
}

export async function getEventBySlug(eventSlug: string) {
  try {
    return await fetchEventFromApi(eventSlug);
  } catch {
    return getLocalEventBySlug(eventSlug);
  }
}
