"use client";

import Link from "next/link";
import { motion } from "motion/react";
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
  { name: "Comida e bebida", icon: FaHamburger, tone: "food" },
  { name: "Carona", icon: FaCar, tone: "green" },
  { name: "Envios", icon: FaCube, tone: "blue" },
  { name: "Farmacia", icon: FaMedkit, tone: "mint" },
  { name: "Prestadores de servico", icon: FaHandshake, tone: "gray" },
  { name: "Empregos", icon: FaBriefcase, tone: "violet", href: "/jobs" },
  { name: "Mais categorias", icon: FaPlus, tone: "soft", href: "/listings" },
] satisfies {
  name: string;
  icon: IconType;
  tone: keyof typeof styles;
  href?: string;
}[];

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
      <button className={styles.place} type="button">
        <FaMapMarkerAlt aria-hidden="true" />
        Sinop - MT
        <FaChevronDown aria-hidden="true" />
      </button>
      <button className={styles.alert} type="button" aria-label="Notificacoes">
        <FaBell aria-hidden="true" />
        <b>2</b>
      </button>
    </motion.header>
  );
}

function PromoBanner() {
  return (
    <section className={styles.banner} aria-label="Destaque do aplicativo">
      <div className={styles.bannerCopy}>
        <h1>
          Tudo que voce precisa
          <em> em um so app!</em>
        </h1>
        <p>Pratico, rapido e seguro.</p>
        <button type="button">
          Explorar agora
          <FaChevronRight aria-hidden="true" />
        </button>
      </div>
      <div className={styles.bannerArt} aria-hidden="true">
        <motion.div
          animate={{ rotate: [-11, -8, -11], y: [0, -4, 0] }}
          className={styles.heroPhone}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>SUWAVE</span>
        </motion.div>
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
      <div className={styles.dots} aria-hidden="true">
        <b />
        <i />
        <i />
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

        <motion.label className={styles.search} variants={riseMotion}>
          <FaSearch aria-hidden="true" />
          <span>O que voce procura?</span>
          <button type="button" aria-label="Buscar por foto">
            <FaCamera aria-hidden="true" />
          </button>
        </motion.label>

        <motion.div variants={riseMotion}>
          <PromoBanner />
        </motion.div>

        <CategoryGrid />
        <MarketplaceFeed listings={listings} />
      </motion.div>
      <BottomNavigation />
    </motion.div>
  );
}
