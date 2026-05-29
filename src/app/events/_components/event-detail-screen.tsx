import Link from "next/link";
import {
  FaBell,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaNewspaper,
  FaShareAlt,
  FaTicketAlt,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { EventVisibility, LocalEvent } from "@/models/event";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./events.module.css";

function DetailMedia({ visibility }: { visibility: EventVisibility }) {
  const Icon = visibility === "private" ? FaUsers : visibility === "news" ? FaNewspaper : FaTicketAlt;

  return (
    <div className={styles.detailMedia}>
      <Icon aria-hidden="true" />
    </div>
  );
}

export function EventDetailScreen({ event }: { event: LocalEvent }) {
  const backHref = event.visibility === "private" ? "/events/private" : "/events/public";
  const typeLabel = event.visibility === "private" ? "Privado" : event.visibility === "news" ? "Noticia" : "Publico";
  const ctaHref = event.visibility === "private" ? "/help" : "/events/public";

  return (
    <AppShell>
      <section className={styles.screen}>
        <div className={styles.scroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para eventos" href={backHref} />
            <h1>Detalhe</h1>
            <button className={styles.iconButton} aria-label="Compartilhar" type="button">
              <FaShareAlt aria-hidden="true" />
            </button>
          </header>

          <section className={styles.detailHeader}>
            <DetailMedia visibility={event.visibility} />
            <span className={styles.eyebrow}>{event.category}</span>
            <h2 className={styles.detailTitle}>{event.title}</h2>
            <span className={styles.detailMeta}>
              <FaCalendarAlt aria-hidden="true" />
              {event.dateLabel}
              <FaMapMarkerAlt aria-hidden="true" />
              {event.location}
            </span>
          </section>

          <section className={styles.detailPanel}>
            <div className={styles.infoGrid} aria-label="Informacoes do evento">
              <span className={styles.infoItem}>
                <span>Horario</span>
                <strong>{event.timeLabel}</strong>
              </span>
              <span className={styles.infoItem}>
                <span>Status</span>
                <strong>{event.status}</strong>
              </span>
              <span className={styles.infoItem}>
                <span>Cidade</span>
                <strong>{event.city}</strong>
              </span>
              <span className={styles.infoItem}>
                <span>Tipo</span>
                <strong>{typeLabel}</strong>
              </span>
            </div>
            <p>{event.description}</p>
            <span className={styles.tagRow}>
              {event.tags.map((tag) => (
                <span key={`${event.id}-${tag}`}>{tag}</span>
              ))}
            </span>
          </section>

          <section className={styles.hostPanel}>
            <span className={styles.hostIcon}>
              <FaUserTie aria-hidden="true" />
            </span>
            <div>
              <h2>{event.host}</h2>
              <p>Organizador vinculado ao card para contato, reserva, participacao ou leitura completa.</p>
            </div>
          </section>

          <Link className={styles.cta} href={ctaHref}>
            <FaBell aria-hidden="true" />
            {event.ctaLabel}
          </Link>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
