"use client";

import Link from "next/link";
import { FaFilter, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";

export function PickupResultsScreen({ listings }: { listings: Listing[] }) {
  return (
    <AppShell>
      <section className={styles.flowScreen}>
        <div className={styles.flowScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para categorias" href="/listings" />
            <h1>Caminhonetes</h1>
            <div className={styles.toolbarActions}>
              <button className={styles.iconButton} aria-label="Buscar" type="button">
                <FaSearch aria-hidden="true" />
              </button>
              <button className={styles.iconButton} aria-label="Filtrar" type="button">
                <FaFilter aria-hidden="true" />
              </button>
            </div>
          </header>

          <label className={styles.searchBar}>
            <FaSearch aria-hidden="true" />
            <span>Buscar caminhonetes</span>
          </label>
          <span className={styles.resultCount}>156 resultados encontrados</span>

          <div className={styles.resultList}>
            {listings.slice(0, 4).map((listing) => (
              <Link
                className={styles.resultCard}
                href={`/listings/vehicles/pickups/${listing.slug}`}
                key={listing.slug}
              >
                <PickupMedia imageKind={listing.imageKind} />
                <span className={styles.resultCopy}>
                  <h2>{listing.title}</h2>
                  <span className={styles.listingMeta}>
                    <b>{listing.modelYear}</b>
                    <b>{listing.fuel}</b>
                    <b>{listing.mileage}</b>
                  </span>
                  <strong className={styles.price}>{listing.price}</strong>
                  <em className={styles.place}>
                    <FaMapMarkerAlt aria-hidden="true" />
                    {listing.place}
                  </em>
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
