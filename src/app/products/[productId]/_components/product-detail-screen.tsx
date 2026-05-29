"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaStore,
  FaWhatsapp,
} from "react-icons/fa";
import { AppShell } from "@/app/_components/app-shell";
import type { Product } from "@/models/product";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "./product-detail.module.css";

const productTypeLabels: Record<Product["type"], string> = {
  fashion: "Moda e vestuario",
  food: "Comida e bebida",
  real_estate: "Imovel",
  service: "Servico",
  vehicle: "Veiculo",
};

function formatAttributeLabel(label: string) {
  return label
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .toLowerCase();
}

function productAttributes(product: Product) {
  return Object.values(product.attributes).flatMap((group) =>
    Object.entries(group).map(([label, value]) => ({
      label: formatAttributeLabel(label),
      value,
    })),
  );
}

export function ProductDetailScreen({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const cover = product.media.find((media) => media.isCover) ?? product.media[0];
  const attributes = productAttributes(product);
  const checkoutHref = product.checkoutHref ?? `/orders?checkout=${product.id}`;

  return (
    <AppShell>
      <motion.section
        animate={{ opacity: 1, x: 0 }}
        className={styles.productScreen}
        initial={{ opacity: 0, x: 18 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
      >
        <div className={styles.productScroll}>
          <header className={styles.productHeader}>
            <Link aria-label="Voltar para inicio" href="/">
              <FaArrowLeft aria-hidden="true" />
            </Link>
            <span>{productTypeLabels[product.type]}</span>
            <Link aria-label="Meus pedidos" href="/orders">
              <FaShoppingBag aria-hidden="true" />
            </Link>
          </header>

          <section className={styles.mediaStage}>
            {cover ? (
              <Image
                alt={cover.altText ?? product.title}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 440px"
                src={cover.url}
              />
            ) : null}
            <b>{product.status === "published" ? "Publicado" : "Em analise"}</b>
          </section>

          <section className={styles.summary}>
            <small>
              <FaMapMarkerAlt aria-hidden="true" />
              {product.city} - {product.state}
            </small>
            <h1>{product.title}</h1>
            <strong>{product.price}</strong>
            <p>{product.description}</p>
          </section>

          <section className={styles.sellerPanel}>
            <span>
              <FaStore aria-hidden="true" />
            </span>
            <div>
              <small>Vendedor</small>
              <strong>{product.sellerName}</strong>
              <p>Conta preparada para responder, vender e atualizar status do pedido.</p>
            </div>
          </section>

          <section className={styles.attributeGrid} aria-label="Detalhes do produto">
            {attributes.map((attribute) => (
              <article key={`${attribute.label}-${attribute.value}`}>
                <small>{attribute.label}</small>
                <strong>{attribute.value}</strong>
              </article>
            ))}
          </section>

          <section className={styles.safeBuy}>
            <FaCheckCircle aria-hidden="true" />
            <p>Compre pelo SUWAVE para manter historico, suporte e acompanhamento do pedido.</p>
          </section>

          {relatedProducts.length ? (
            <section className={styles.relatedList} aria-label="Produtos relacionados">
              <h2>Mais da categoria</h2>
              {relatedProducts.map((relatedProduct) => (
                <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                  <span>{relatedProduct.title}</span>
                  <strong>{relatedProduct.price}</strong>
                </Link>
              ))}
            </section>
          ) : null}
        </div>

        <div className={styles.stickyActions}>
          <Link href={checkoutHref}>
            <FaShoppingBag aria-hidden="true" />
            Comprar
          </Link>
          <Link href={`/help?product=${product.id}`}>
            <FaWhatsapp aria-hidden="true" />
            Conversar
          </Link>
        </div>
        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
