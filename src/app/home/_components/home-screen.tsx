"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaBell,
  FaBriefcase,
  FaCamera,
  FaCar,
  FaChevronDown,
  FaChevronRight,
  FaCube,
  FaHamburger,
  FaHandshake,
  FaMapMarkerAlt,
  FaMedkit,
  FaPercent,
  FaPlus,
  FaSearch,
  FaShoppingCart,
  FaTicketAlt,
} from "react-icons/fa";
import type { Listing } from "@/models/listing";
import {
  containerMotion,
  riseMotion,
} from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import { MarketplaceFeed } from "./marketplace-feed";
import styles from "@/app/_components/suwave-home.module.css";

const categories = [
  { name: "Mercado", icon: FaShoppingCart, tone: "lime" },
  { name: "Comida e bebida", icon: FaHamburger, tone: "food", href: "/food/snacks" },
  { name: "Carona", icon: FaCar, tone: "green", href: "/rides/regional" },
  { name: "Envios", icon: FaCube, tone: "blue", href: "/shipping/local" },
  { name: "Farmacia", icon: FaMedkit, tone: "mint" },
  { name: "Prestadores de serviço", icon: FaHandshake, tone: "gray", href: "/services/builders" },
  { name: "Empregos", icon: FaBriefcase, tone: "violet", href: "/jobs" },
  { name: "Mais categorias", icon: FaPlus, tone: "soft", href: "/listings" },
] satisfies {
  name: string;
  icon: IconType;
  tone: keyof typeof styles;
  href?: string;
}[];

const cityStorageKey = "suwave-selected-city";
const cityLabels: Record<string, string> = {
  "claudia-mt": "Claudia - MT",
  "lucas-rio-verde-mt": "Lucas do Rio Verde - MT",
  "mutum-mt": "Mutum - MT",
  "sinop-mt": "Sinop - MT",
  "sorriso-mt": "Sorriso - MT",
  "uniao-sul-mt": "Uniao do Sul - MT",
};

function BannerChip({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <motion.span
      animate={{ y: [0, -5, 0] }}
      className={`${styles.bannerChip} ${className}`}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.span>
  );
}

function HomeHeader() {
  const [selectedCity, setSelectedCity] = useState(cityLabels["sinop-mt"]);

  useEffect(() => {
    const syncSelectedCity = () => {
      const storedCity = window.localStorage.getItem(cityStorageKey);
      setSelectedCity(cityLabels[storedCity ?? "sinop-mt"] ?? cityLabels["sinop-mt"]);
    };

    syncSelectedCity();
    window.addEventListener("storage", syncSelectedCity);
    window.addEventListener("suwave-city-change", syncSelectedCity);

    return () => {
      window.removeEventListener("storage", syncSelectedCity);
      window.removeEventListener("suwave-city-change", syncSelectedCity);
    };
  }, []);

  return (
    <motion.header className={styles.header} variants={riseMotion}>
      <div className={styles.balance}>
        <small>Saldo</small>
        <strong>R$ 100,00</strong>
        <button type="button">
          <FaTicketAlt aria-hidden="true" />
          Cupom <b>2</b>
        </button>
      </div>
      <div className={styles.cityPicker}>
        <Link
          className={styles.place}
          href="/location"
        >
          <FaMapMarkerAlt aria-hidden="true" />
          {selectedCity}
          <FaChevronDown aria-hidden="true" />
        </Link>
      </div>
      <Link className={styles.alert} href="/notifications" aria-label="Notificacoes">
        <FaBell aria-hidden="true" />
        <b>2</b>
      </Link>
    </motion.header>
  );
}

function PromoBanner({ listings }: { listings: Listing[] }) {
  const featuredListings = listings.filter((listing) =>
    listing.tags?.includes("destaque"),
  );
  const slides = featuredListings.length ? featuredListings : listings.slice(0, 1);
  const [activeSlide, setActiveSlide] = useState(0);
  const activeListing = slides[activeSlide];

  useEffect(() => {
    if (slides.length < 2) {
      return;
    }

    const slideTimer = window.setInterval(() => {
      setActiveSlide((slide) => (slide + 1) % slides.length);
    }, 3600);

    return () => window.clearInterval(slideTimer);
  }, [slides.length]);

  return (
    <section className={styles.banner} aria-label="Produtos em destaque">
      <div className={styles.bannerCopy}>
        <h1>
          Tudo que você precisa
          <em> em um so app!</em>
        </h1>
        <p>Pratico, rapido e seguro.</p>
        <button type="button">
          Explorar agora
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className={styles.bannerArt} aria-hidden="true">
        <AnimatePresence mode="wait">
          {activeListing ? (
            <motion.div
              animate={{ opacity: 1, rotate: -4, scale: 1, x: 0 }}
              className={styles.bannerProduct}
              exit={{ opacity: 0, rotate: 3, scale: 0.94, x: 20 }}
              initial={{ opacity: 0, rotate: -10, scale: 0.92, x: 30 }}
              key={activeListing.title}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                alt=""
                className={styles[activeListing.imageKind]}
                fill
                sizes="(max-width: 430px) 44vw, 230px"
                src={activeListing.image}
              />
              <span>
                <b>Destaque</b>
                {activeListing.title}
                <strong>{activeListing.price}</strong>
              </span>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <BannerChip className={styles.cartChip}>
          <FaShoppingCart />
        </BannerChip>
        <BannerChip className={styles.deliveryChip}>
          <FaCube />
        </BannerChip>
        <BannerChip className={styles.foodChip}>
          <FaHamburger />
        </BannerChip>
        <BannerChip className={styles.carChip}>
          <FaCar />
        </BannerChip>
        <BannerChip className={styles.boxChip}>
          <FaCube />
        </BannerChip>
        <BannerChip className={styles.discountChip}>
          <FaPercent />
        </BannerChip>
      </div>
      <div className={styles.dots} aria-label="Destaques">
        {slides.map((slide, index) => (
          <button
            aria-label={`Ver destaque ${index + 1}: ${slide.title}`}
            aria-pressed={index === activeSlide}
            className={index === activeSlide ? styles.dotActive : ""}
            key={slide.title}
            onClick={() => setActiveSlide(index)}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <div className={styles.categoryGrid} aria-label="Categorias">
      {categories.map(({ href, icon: Icon, name, tone }) =>
        href ? (
          <Link className={styles.category} href={href} key={name}>
            <span className={styles[tone]}>
              <Icon aria-hidden="true" />
            </span>
            {name}
          </Link>
        ) : (
          <motion.button
            className={styles.category}
            key={name}
            transition={{ duration: 0.2 }}
            type="button"
            variants={riseMotion}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
          >
            <span className={styles[tone]}>
              <Icon aria-hidden="true" />
            </span>
            {name}
          </motion.button>
        ),
      )}
    </div>
  );
}

export function HomeScreen({ listings }: { listings: Listing[] }) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.homeScreen}
      initial={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      <motion.div
        animate="visible"
        className={styles.content}
        initial="hidden"
        variants={containerMotion}
      >
        <HomeHeader />

        <motion.div className={styles.search} variants={riseMotion}>
          <FaSearch aria-hidden="true" />
          <Link href="/search">O que você procura?</Link>
          <Link href="/search?mode=image" aria-label="Buscar por foto">
            <FaCamera aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div variants={riseMotion}>
          <PromoBanner listings={listings} />
        </motion.div>

        <CategoryGrid />
        <MarketplaceFeed listings={listings} />
      </motion.div>
      <BottomNavigation />
    </motion.div>
  );
}
