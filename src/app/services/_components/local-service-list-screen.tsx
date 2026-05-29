"use client";

import Link from "next/link";
import { FaFilter, FaMapMarkerAlt, FaSearch, FaStar, FaCheckCircle } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { ServiceIcon } from "@/app/services/_components/service-icons";
import type { LocalServiceKind, LocalServiceProfessional } from "@/models/local-service";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./local-services.module.css";

const basePath: Record<LocalServiceKind, string> = {
  beauty: "/services/hairdressers",
  construction: "/services/builders",
};

export function LocalServiceListScreen({
  kind,
  professionals,
  searchLabel,
  title,
}: {
  kind: LocalServiceKind;
  professionals: LocalServiceProfessional[];
  searchLabel: string;
  title: string;
}) {
  return (
    <AppShell>
      <section className={styles.serviceScreen}>
        <div className={styles.serviceScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para categorias" href="/listings" />
            <h1>{title}</h1>
            <button className={styles.iconButton} aria-label="Filtros" type="button">
              <FaFilter aria-hidden="true" />
            </button>
          </header>

          <label className={styles.searchBar}>
            <FaSearch aria-hidden="true" />
            <span>{searchLabel}</span>
            <FaFilter aria-hidden="true" />
          </label>

          <div className={styles.serviceList}>
            {professionals.map((professional, index) => (
              <Link
                className={`${styles.serviceCard} ${index === 0 ? styles.serviceCardActive : ""}`}
                href={`${basePath[kind]}/${professional.slug}`}
                key={professional.slug}
              >
                <span className={styles.avatar}>
                  <ServiceIcon kind={professional.kind} />
                </span>
                <span className={styles.serviceCopy}>
                  <h2>{professional.name}</h2>
                  <span className={styles.metaLine}>
                    <span><FaStar aria-hidden="true" /> {professional.rating}</span>
                    <span>{professional.reviewCount}</span>
                    {professional.verified ? (
                      <span className={styles.verified}>
                        <FaCheckCircle aria-hidden="true" /> Verificado
                      </span>
                    ) : null}
                  </span>
                  <p>{professional.shortDescription}</p>
                  <span className={styles.metaLine}>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {professional.location}
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
