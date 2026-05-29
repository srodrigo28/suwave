import Link from "next/link";
import {
  FaCalendarAlt,
  FaFilter,
  FaMapMarkerAlt,
  FaNewspaper,
  FaSearch,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { EventVisibility, LocalEvent } from "@/models/event";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./events.module.css";

type EventsScreenProps = {
  activeTab: "all" | EventVisibility;
  events: LocalEvent[];
  title: string;
};

const tabItems = [
  { href: "/events", id: "all", label: "Todos", icon: FaNewspaper },
  { href: "/events/public", id: "public", label: "Publicos", icon: FaTicketAlt },
  { href: "/events/private", id: "private", label: "Privados", icon: FaUsers },
] as const;

const filterItemsByTab: Record<"all" | EventVisibility, string[]> = {
  all: ["Hoje", "Final de semana", "Musica ao vivo", "Promocoes"],
  news: ["Cidade", "Agenda", "Comunicados"],
  private: ["Hoje", "Final de semana", "Musica ao vivo", "Promocoes", "Religiosos"],
  public: ["Gratis", "Familia", "Ingressos", "Agenda publica"],
};

function EventMedia({ visibility }: { visibility: EventVisibility }) {
  const Icon = visibility === "private" ? FaUsers : visibility === "news" ? FaNewspaper : FaTicketAlt;

  return (
    <span className={styles.media}>
      <Icon aria-hidden="true" />
    </span>
  );
}

export function EventsScreen({ activeTab, events, title }: EventsScreenProps) {
  const privateCount = events.filter((event) => event.visibility === "private").length;
  const publicCount = events.filter((event) => event.visibility === "public").length;
  const searchPlaceholder =
    activeTab === "private" ? "Buscar eventos e noticias privadas" : "Buscar noticias e eventos publicos";
  const filterItems = filterItemsByTab[activeTab];

  return (
    <AppShell>
      <section className={styles.screen}>
        <div className={styles.scroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para categorias" href="/listings" />
            <h1>{title}</h1>
            <button className={styles.iconButton} aria-label="Filtrar" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <section className={styles.hero}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>Eventos e noticias</span>
              <h2>Agenda local</h2>
              <p>
                Feed pronto para eventos publicos, divulgacoes privadas e noticias
                locais com detalhe compartilhavel.
              </p>
            </div>
            <div className={styles.heroStats} aria-label="Resumo da agenda">
              <span className={styles.stat}>
                <strong>{events.length}</strong>
                <span>itens</span>
              </span>
              <span className={styles.stat}>
                <strong>{publicCount}</strong>
                <span>publicos</span>
              </span>
              <span className={styles.stat}>
                <strong>{privateCount}</strong>
                <span>privados</span>
              </span>
            </div>
          </section>

          <nav className={styles.tabs} aria-label="Tipos de conteudo">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <Link
                  className={activeTab === tab.id ? styles.tabActive : styles.tab}
                  href={tab.href}
                  key={tab.id}
                >
                  <Icon aria-hidden="true" />
                  {tab.label}
                </Link>
              );
            })}
          </nav>

          <section className={styles.searchPanel} aria-label="Busca e filtros de eventos">
            <label className={styles.searchBox}>
              <FaSearch aria-hidden="true" />
              <input aria-label={searchPlaceholder} placeholder={searchPlaceholder} type="search" />
            </label>
            <div className={styles.filterChips} aria-label="Filtros rapidos">
              {filterItems.map((item) => (
                <button key={item} type="button">
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className={styles.sectionHeader}>
            <h2>Em destaque</h2>
            <span>{events.length} publicados</span>
          </section>

          <div className={styles.list}>
            {events.map((event) => (
              <Link className={styles.card} href={`/events/${event.slug}`} key={event.id}>
                <EventMedia visibility={event.visibility} />
                <span className={styles.cardCopy}>
                  <span className={styles.metaRow}>
                    <FaCalendarAlt aria-hidden="true" />
                    {event.dateLabel}
                    <FaMapMarkerAlt aria-hidden="true" />
                    {event.city}
                  </span>
                  <h3>{event.title}</h3>
                  <p>{event.summary}</p>
                  <span className={styles.tagRow}>
                    {event.tags.slice(0, 3).map((tag) => (
                      <span key={`${event.id}-${tag}`}>{tag}</span>
                    ))}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
