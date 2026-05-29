"use client";

import { FaCheckCircle, FaMapMarkerAlt, FaShareAlt, FaStar, FaWhatsapp } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { ServiceIcon } from "@/app/services/_components/service-icons";
import type { LocalServiceProfessional } from "@/models/local-service";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./local-services.module.css";

const backHref = {
  beauty: "/services/hairdressers",
  construction: "/services/builders",
};

export function LocalServiceDetailScreen({
  professional,
}: {
  professional: LocalServiceProfessional;
}) {
  return (
    <AppShell>
      <section className={styles.serviceScreen}>
        <div className={styles.serviceScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para lista" href={backHref[professional.kind]} />
            <h1>{professional.name}</h1>
            <button className={styles.iconButton} aria-label="Compartilhar" type="button">
              <FaShareAlt aria-hidden="true" />
            </button>
          </header>

          <section className={styles.gallery}>
            <b>{professional.galleryLabel}</b>
            <strong>{professional.category} em {professional.location}</strong>
          </section>

          <section className={styles.profileCard}>
            <span className={styles.heroAvatar}>
              <ServiceIcon kind={professional.kind} />
            </span>
            <span>
              <h2>{professional.name}</h2>
              <span className={styles.metaLine}>
                <FaStar aria-hidden="true" /> {professional.rating}
                <span>{professional.reviewCount}</span>
              </span>
              <span className={styles.metaLine}>
                <FaMapMarkerAlt aria-hidden="true" /> {professional.location}
                {professional.verified ? (
                  <span className={styles.verified}>
                    <FaCheckCircle aria-hidden="true" /> Verificado
                  </span>
                ) : null}
              </span>
            </span>
          </section>

          <section className={styles.about}>
            <h2>Sobre</h2>
            <p>{professional.description}</p>
            <div className={styles.chipGrid}>
              {professional.services.map((service) => (
                <span key={service}>{service}</span>
              ))}
              {professional.unavailable?.map((service) => (
                <span className={styles.negative} key={service}>{service}</span>
              ))}
            </div>
          </section>

          <section className={styles.infoGrid}>
            <span><small>Experiencia</small><strong>{professional.workInfo.experience}</strong></span>
            <span><small>Atendimento</small><strong>{professional.workInfo.attendance}</strong></span>
            <span><small>Horario</small><strong>{professional.workInfo.hours}</strong></span>
          </section>

          <section className={styles.booking}>
            <h2>{professional.kind === "beauty" ? "Agende seu horario" : "Solicite um orcamento"}</h2>
            <p>Fale pelo WhatsApp e combine detalhes, disponibilidade e valores.</p>
            <button className={styles.whatsappButton} type="button">
              <FaWhatsapp aria-hidden="true" />
              WhatsApp
            </button>
          </section>

          <section className={styles.productSection}>
            <h2>{professional.kind === "beauty" ? "Produtos do salao" : "Produtos do profissional"}</h2>
            <div className={styles.productGrid}>
              {professional.products.map((product) => (
                <article className={styles.productTile} key={product.id}>
                  <strong>{product.title}</strong>
                  <small>{product.price}</small>
                </article>
              ))}
            </div>
          </section>
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
