"use client";

import Link from "next/link";
import {
  FaCalendarAlt,
  FaCarSide,
  FaCog,
  FaGasPump,
  FaMapMarkerAlt,
  FaPalette,
  FaRoad,
  FaShareAlt,
  FaShieldAlt,
  FaTruck,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";

function RelatedListings({
  listings,
  title,
}: {
  listings: Listing[];
  title: string;
}) {
  return (
    <section className={styles.relatedSection}>
      <header className={styles.relatedHeader}>
        <h2>{title}</h2>
        <button type="button">Ver todos</button>
      </header>
      <div className={styles.tileGrid}>
        {listings.slice(0, 4).map((listing) => (
          <Link
            className={styles.tile}
            href={`/listings/vehicles/pickups/${listing.slug}`}
            key={`${title}-${listing.slug}`}
          >
            <PickupMedia imageKind={listing.imageKind} />
            <span className={styles.tileCopy}>
              <h3>{listing.title}</h3>
              <span className={styles.tileMeta}>
                <b>{listing.modelYear}</b>
                <b>{listing.fuel}</b>
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
    </section>
  );
}

export function PickupDetailScreen({
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
            <BackButton
              ariaLabel="Voltar para caminhonetes"
              href="/listings/vehicles/pickups"
            />
            <span />
            <button className={styles.iconButton} aria-label="Compartilhar" type="button">
              <FaShareAlt aria-hidden="true" />
            </button>
          </header>

          <div className={styles.detailHero}>
            <PickupMedia imageKind={listing.imageKind} />
          </div>

          <h1 className={styles.detailTitle}>{listing.title}</h1>
          <strong className={styles.detailPrice}>{listing.price}</strong>

          <div className={styles.specGrid} aria-label="Informacoes do veiculo">
            <span>
              <FaCalendarAlt aria-hidden="true" />
              <b>Ano</b>
              <em>{listing.modelYear}</em>
            </span>
            <span>
              <FaRoad aria-hidden="true" />
              <b>Quilometragem</b>
              <em>{listing.mileage}</em>
            </span>
            <span>
              <FaCog aria-hidden="true" />
              <b>Cambio</b>
              <em>{listing.transmission}</em>
            </span>
            <span>
              <FaGasPump aria-hidden="true" />
              <b>Combustivel</b>
              <em>{listing.fuel}</em>
            </span>
            <span>
              <FaTruck aria-hidden="true" />
              <b>Tracao</b>
              <em>4x4</em>
            </span>
            <span>
              <FaPalette aria-hidden="true" />
              <b>Cor</b>
              <em>{listing.color}</em>
            </span>
            <span>
              <FaCarSide aria-hidden="true" />
              <b>Portas</b>
              <em>4 portas</em>
            </span>
            <span>
              <FaShieldAlt aria-hidden="true" />
              <b>Placa final</b>
              <em>8FS2</em>
            </span>
          </div>

          <section className={styles.description}>
            <h2>Descricao do veiculo</h2>
            <p>
              Caminhonete automatica, unica dona, revisoes em dia, pneus novos e
              excelente estado de conservacao. Pronta para rodar.
            </p>
          </section>

          <div className={styles.delivery}>
            <FaTruck aria-hidden="true" />
            <span>
              Entrega
              <small>Sera combinada com o vendedor</small>
            </span>
          </div>

          <section className={styles.seller}>
            <span className={styles.sellerAvatar}>
              <FaUser aria-hidden="true" />
            </span>
            <span>
              <strong>{listing.seller}</strong>
              <small>Garagem · 4,7 · 128 avaliacoes</small>
            </span>
          </section>

          <button className={styles.messageButton} type="button">
            <FaWhatsapp aria-hidden="true" />
            Enviar mensagem
          </button>

          <RelatedListings
            listings={relatedListings}
            title="Mais produtos da loja"
          />
          <RelatedListings
            listings={relatedListings.slice().reverse()}
            title="Voce tambem pode gostar"
          />
          <RelatedListings
            listings={relatedListings}
            title="Produtos relacionados"
          />
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
