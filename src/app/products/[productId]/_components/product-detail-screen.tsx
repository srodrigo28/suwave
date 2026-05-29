"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowLeft,
  FaBolt,
  FaCartPlus,
  FaChevronRight,
  FaMinus,
  FaMapMarkerAlt,
  FaPlus,
  FaShareAlt,
  FaShoppingBag,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaTruck,
  FaUsers,
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

function attributeValue(product: Product, key: string) {
  return Object.values(product.attributes)
    .map((group) => group[key])
    .find(Boolean);
}

function installmentFor(price: string) {
  const numericPrice = Number(
    price.replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", "."),
  );

  if (!Number.isFinite(numericPrice)) {
    return "Em ate 12x";
  }

  return new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(numericPrice / 12);
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
  const color = attributeValue(product, "color") ?? "Padrao";
  const size = attributeValue(product, "size") ?? "Unico";
  const sizes = size.split(",").map((item) => item.trim()).filter(Boolean);
  const thumbnails = product.media.length ? product.media.slice(0, 4) : [];
  const variantLabels = [color, "Branco", "Cinza", "Areia"].slice(0, Math.max(1, thumbnails.length + 3));

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
            <Link aria-label="Compartilhar produto" href={`/help?product=${product.id}`}>
              <FaShareAlt aria-hidden="true" />
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
            <div className={styles.carouselDots} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          </section>

          <section className={styles.variantPanel} aria-label="Variacoes do produto">
            <div className={styles.optionHeader}>
              <strong>Cor:</strong>
              <span>{color}</span>
            </div>
            <div className={styles.thumbnailRail}>
              {variantLabels.map((label, index) => (
                <button className={index === 0 ? styles.activeThumb : undefined} key={label} type="button">
                  {cover ? (
                    <Image
                      alt={`${product.title} - ${label}`}
                      height={52}
                      src={cover.thumbnailUrl ?? cover.url}
                      width={52}
                    />
                  ) : null}
                </button>
              ))}
              <FaChevronRight aria-hidden="true" />
            </div>

            <div className={styles.optionHeader}>
              <strong>Tamanho:</strong>
            </div>
            <div className={styles.sizeRail}>
              {sizes.map((item) => (
                <button key={item} type="button">{item}</button>
              ))}
              <FaChevronRight aria-hidden="true" />
            </div>
          </section>

          <section className={styles.summary}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className={styles.priceLine}>
              <strong>{product.price}</strong>
              <span>
                <FaShoppingCart aria-hidden="true" />
                Em ate 12x de {installmentFor(product.price)}
              </span>
            </div>
          </section>

          <section className={styles.deliveryStrip} aria-label="Entrega e localizacao">
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              {product.city} {product.state}
            </span>
            <span>
              <FaTruck aria-hidden="true" />
              Frete gratis
            </span>
            <span>
              <FaBolt aria-hidden="true" />
              Chega entre hoje ou amanha
            </span>
          </section>

          <section className={styles.sharePanel}>
            <span>
              <FaUsers aria-hidden="true" />
              Compartilhe este link e ganhe comissao da venda
            </span>
            <strong>10%</strong>
            <Link href={`/help?product=${product.id}`}>
              <FaShareAlt aria-hidden="true" />
              Compartilhar
            </Link>
          </section>

          <section className={styles.purchasePanel}>
            <div className={styles.quantityRow}>
              <strong>Quantidade:</strong>
              <div>
                <button aria-label="Diminuir quantidade" type="button">
                  <FaMinus aria-hidden="true" />
                </button>
                <span>1</span>
                <button aria-label="Aumentar quantidade" type="button">
                  <FaPlus aria-hidden="true" />
                </button>
              </div>
              <small>10 disponiveis</small>
            </div>
            <Link className={styles.buyNow} href={checkoutHref}>
              <FaShoppingBag aria-hidden="true" />
              Comprar agora
            </Link>
            <Link className={styles.cartButton} href="/orders">
              <FaCartPlus aria-hidden="true" />
              Adicionar ao carrinho
            </Link>
          </section>

          <section className={styles.sellerPanel}>
            <span>
              <FaStore aria-hidden="true" />
            </span>
            <div>
              <small>{product.sellerName}</small>
              <strong>
                <FaStar aria-hidden="true" />
                4,7 (1.256 avaliacoes)
              </strong>
            </div>
            <FaChevronRight aria-hidden="true" />
          </section>

          <section className={styles.attributeGrid} aria-label="Detalhes do produto">
            {attributes.map((attribute) => (
              <article key={`${attribute.label}-${attribute.value}`}>
                <small>{attribute.label}</small>
                <strong>{attribute.value}</strong>
              </article>
            ))}
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

        <BottomNavigation />
      </motion.section>
    </AppShell>
  );
}
