"use client";

import Link from "next/link";
import {
  FaBicycle,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPalette,
  FaShareAlt,
  FaShieldAlt,
  FaShoppingBag,
  FaStar,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import { PickupMedia } from "@/app/listings/_components/pickup-media";
import styles from "@/app/listings/_components/listing-flow.module.css";
import type { Listing } from "@/models/listing";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";

export function BicycleDetailScreen({
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
            <BackButton ariaLabel="Voltar para bicicletas" href="/listings/vehicles/bicycles" />
            <span />
            <button className={styles.iconButton} aria-label="Compartilhar" type="button">
              <FaShareAlt aria-hidden="true" />
            </button>
          </header>

          <div className={styles.detailHero}>
            <PickupMedia eager imageKind={listing.imageKind} sizes="360px" />
            <span className={styles.photoCounter}>1/5</span>
          </div>

          <h1 className={styles.detailTitle}>{listing.title}</h1>
          <strong className={styles.detailPrice}>{listing.price}</strong>
          <em className={styles.place}>
            <FaMapMarkerAlt aria-hidden="true" />
            {listing.place}
          </em>
          <p className={styles.categoryPath}>{listing.category}</p>

          <div className={styles.specGrid} aria-label="Atributos da bicicleta">
            <span><FaCheckCircle aria-hidden="true" /><b>Estado</b><em>{listing.condition}</em></span>
            <span><FaBicycle aria-hidden="true" /><b>Aro</b><em>{listing.wheelSize}</em></span>
            <span><FaBicycle aria-hidden="true" /><b>Marchas</b><em>{listing.gears}</em></span>
            <span><FaPalette aria-hidden="true" /><b>Cor</b><em>{listing.color}</em></span>
            <span><FaShieldAlt aria-hidden="true" /><b>Freios</b><em>A disco</em></span>
            <span><FaCheckCircle aria-hidden="true" /><b>Suspensao</b><em>Dianteira</em></span>
          </div>

          <section className={styles.description}>
            <h2>Descricao</h2>
            <p>{listing.description}</p>
          </section>

          <section className={styles.seller}>
            <span className={styles.sellerAvatar}>
              <FaUser aria-hidden="true" />
            </span>
            <span>
              <strong>{listing.seller}</strong>
              <small><FaStar aria-hidden="true" /> 4,8 · cadastrado ha 2 anos</small>
            </span>
          </section>

          <div className={styles.actionGrid}>
            <button className={styles.messageButton} type="button">
              <FaShoppingBag aria-hidden="true" />
              Comprar
            </button>
            <button className={styles.secondaryButton} type="button">
              <FaWhatsapp aria-hidden="true" />
              Enviar mensagem
            </button>
          </div>

          <aside className={styles.safetyNotice}>
            <FaShieldAlt aria-hidden="true" />
            Use pagamentos dentro do app para manter sua compra protegida.
          </aside>

          <section className={styles.relatedSection}>
            <header className={styles.relatedHeader}>
              <h2>Bicicletas semelhantes</h2>
              <button type="button">Ver todos</button>
            </header>
            <div className={styles.tileGrid}>
              {relatedListings.map((related) => (
                <Link
                  className={styles.tile}
                  href={`/listings/vehicles/bicycles/${related.slug}`}
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
        </div>
        <BottomNavigation />
      </section>
    </AppShell>
  );
}
