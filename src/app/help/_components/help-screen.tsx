"use client";

import { motion } from "motion/react";
import {
  FaChevronRight,
  FaRegHandPaper,
  FaSearch,
  FaWhatsapp,
} from "react-icons/fa";
import { useAuthStore } from "@/stores/auth-store";
import { containerMotion, riseMotion } from "@/shared/motion/motion-variants";
import { BackButton } from "@/shared/navigation/back-button";
import { BottomNavigation } from "@/shared/navigation/bottom-navigation";
import styles from "@/app/_components/suwave-home.module.css";

const helpShortcuts = [
  "Devolver um produto",
  "Iniciar ou seguir uma reclamacao",
  "Quando recebo minhas compras",
  "Ajuda com cupons",
];

function firstNameFrom(fullName?: string) {
  return fullName?.trim().split(/\s+/)[0] || "Lucas";
}

function HelpRow({ label }: { label: string }) {
  return (
    <button className={styles.helpRow} type="button">
      <span>{label}</span>
      <FaChevronRight aria-hidden="true" />
    </button>
  );
}

export function HelpScreen() {
  const profileName = useAuthStore((state) => state.profileDraft.fullName);
  const accountName = useAuthStore((state) => state.accountDraft.fullName);
  const firstName = firstNameFrom(profileName || accountName);

  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={styles.homeScreen}
      initial={{ opacity: 0, x: 18 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
    >
      <motion.section
        animate="visible"
        className={`${styles.content} ${styles.helpContent}`}
        initial="hidden"
        variants={containerMotion}
      >
        <motion.header className={styles.helpHeader} variants={riseMotion}>
          <BackButton
            ariaLabel="Voltar para o inicio"
            className={styles.helpBack}
            href="/"
          />
          <h1>Ajuda</h1>
          <span aria-hidden="true" />
        </motion.header>

        <motion.div className={styles.helpIntro} variants={riseMotion}>
          <h2>
            Olá, {firstName}
            <FaRegHandPaper aria-hidden="true" />
          </h2>
          <p>Como podemos ajudar?</p>
        </motion.div>

        <motion.label className={styles.helpSearch} variants={riseMotion}>
          <FaSearch aria-hidden="true" />
          <input
            aria-label="Pesquisar ajuda"
            placeholder="Escreva a sua pergunta"
            type="search"
          />
        </motion.label>

        <motion.section className={styles.helpSection} variants={riseMotion}>
          <h2>Atalhos personalizados</h2>
          <div className={styles.helpList}>
            {helpShortcuts.map((shortcut) => (
              <HelpRow key={shortcut} label={shortcut} />
            ))}
          </div>
        </motion.section>

        <motion.div variants={riseMotion}>
          <HelpRow label="Conheca as perguntas frequentes" />
        </motion.div>

        <motion.section className={styles.helpContact} variants={riseMotion}>
          <h2>Você precisa de mais ajuda?</h2>
          <a
            aria-label="Falar com suporte pelo WhatsApp"
            href="https://wa.me/5566992772107"
            rel="noreferrer"
            target="_blank"
          >
            <FaWhatsapp aria-hidden="true" />
            Fale conosco
          </a>
        </motion.section>
      </motion.section>
      <BottomNavigation />
    </motion.div>
  );
}
