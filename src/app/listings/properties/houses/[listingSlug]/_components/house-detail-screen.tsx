"use client";

import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaBookOpen,
  FaCar,
  FaHome,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export function HouseDetailScreen({
  listing,
  relatedListings,
}: {
  listing: Listing;
  relatedListings: Listing[];
}) {
  return (
    <AppShell>
      <section className={styles.flowScreen}>
        <div className={styles.flowScroll}>
          <header className={styles.topBar}>
            <BackButton ariaLabel="Voltar para casas" href="/listings/properties/houses" />
            <h1>Detalhes do imovel</h1>
            <button className={styles.iconButton} aria-label="Compartilhar" type="button">
              <FaShareAlt aria-hidden="true" />
            </button>
          </header>

          <div className={styles.detailHero}>
            <PickupMedia eager imageKind={listing.imageKind} sizes="360px" />
            <span className={styles.photoCounter}>1/12</span>
          </div>

          <h1 className={styles.detailTitle}>{listing.title}</h1>
          <em className={styles.place}>
            <FaMapMarkerAlt aria-hidden="true" />
            {listing.neighborhood} · {listing.place}
          </em>
          <strong className={styles.detailPrice}>{listing.price}</strong>

          <div className={styles.specGrid} aria-label="Informações do imóvel">
            <span><FaBed aria-hidden="true" /><b>Quartos</b><em>{listing.bedrooms}</em></span>
            <span><FaBath aria-hidden="true" /><b>Banheiros</b><em>{listing.bathrooms}</em></span>
            <span><FaCar aria-hidden="true" /><b>Garagem</b><em>{listing.parkingSpaces}</em></span>
            <span><FaRulerCombined aria-hidden="true" /><b>Construida</b><em>{listing.areaBuilt}</em></span>
            <span><FaRulerCombined aria-hidden="true" /><b>Terreno</b><em>{listing.areaLot}</em></span>
            <span><FaHome aria-hidden="true" /><b>Condicao</b><em>{listing.listingType}</em></span>
          </div>

          <section className={styles.description}>
            <h2>Descricao</h2>
            <p>{listing.description}</p>
          </section>

          <section className={styles.detailInfoList}>
            <span><b>Tipo de imovel</b><em>Casa</em></span>
            <span><b>Aceita financiamento</b><em>{listing.financing}</em></span>
            <span><b>Responsavel</b><em>{listing.seller}</em></span>
          </section>

          <button className={styles.messageButton} type="button">
            <FaWhatsapp aria-hidden="true" />
            Entrar em contato
          </button>

          <section className={styles.relatedSection}>
            <header className={styles.relatedHeader}>
              <h2>Imoveis semelhantes</h2>
              <button type="button">Ver todos</button>
            </header>
            <div className={styles.tileGrid}>
              {relatedListings.slice(0, 2).map((related) => (
                <Link
                  className={styles.tile}
                  href={`/listings/properties/houses/${related.slug}`}
                  key={related.slug}
                >
                  <PickupMedia imageKind={related.imageKind} />
                  <span className={styles.tileCopy}>
                    <h3>{related.title}</h3>
                    <strong className={styles.price}>{related.price}</strong>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.relatedSection}>
            <header className={styles.relatedHeader}>
              <h2>Produtos relacionados</h2>
              <button type="button">Ver todos</button>
            </header>
            <div className={styles.infoTileGrid}>
              {["Como financiar seu imovel", "Guia do primeiro imovel", "Reforma inteligente"].map((title) => (
                <article className={styles.infoTile} key={title}>
                  <FaBookOpen aria-hidden="true" />
                  <strong>{title}</strong>
                  <small>Conteudo recomendado</small>
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
