"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import {
  FaBell,
  FaBuilding,
  FaChevronRight,
  FaGraduationCap,
  FaIdBadge,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaShieldAlt,
  FaTag,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "@/app/_components/suwave-home.module.css";

type MoreItem = {
  href?: string;
  icon: IconType;
  label: string;
};

const menuItems: MoreItem[] = [
  { href: "/profile", icon: FaUser, label: "Meu Perfil" },
  { href: "/orders", icon: FaShoppingBag, label: "Minhas Compras" },
  { href: "/location", icon: FaMapMarkerAlt, label: "Cidade e Regiao" },
  { icon: FaTicketAlt, label: "Codigo de Entrega" },
  { href: "/notifications", icon: FaBell, label: "Notificacoes" },
  { icon: FaIdBadge, label: "Conta Afiliado" },
  { href: "/listings/new", icon: FaTag, label: "Meus Anuncios" },
  { icon: FaBuilding, label: "Perfil Empresarial" },
  { icon: FaGraduationCap, label: "Como Usar a Suwave" },
  { icon: FaShieldAlt, label: "Termos e Privacidade" },
  { icon: FaInfoCircle, label: "Sobre a Suwave" },
];

function MenuRow({ href, icon: Icon, label }: MoreItem) {
  const content = (
    <>
      <span className={styles.moreItemIcon}>
        <Icon aria-hidden="true" />
      </span>
      <strong>{label}</strong>
      <FaChevronRight aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <Link className={styles.moreItem} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button className={styles.moreItem} type="button">
      {content}
    </button>
  );
}

export function MoreScreen() {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.homeScreen}
      initial={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <motion.section
        animate="visible"
        className={`${styles.content} ${styles.moreContent}`}
        initial="hidden"
        variants={containerMotion}
      >
        <motion.header className={styles.moreHeader} variants={riseMotion}>
          <h1>Mais</h1>
        </motion.header>

        <motion.div
          aria-label="Menu Mais"
          className={styles.moreList}
          variants={containerMotion}
        >
          {menuItems.map((item) => (
            <motion.div key={item.label} variants={riseMotion}>
              <MenuRow {...item} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      <BottomNavigation />
    </motion.div>
  );
}
