"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaBriefcase,
  FaCar,
  FaEnvelope,
  FaHome,
  FaChevronLeft,
  FaPlus,
  FaShoppingCart,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

export function AnnounceAuthScreen() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);

  useEffect(() => {
    if (!isAuthenticated || !profileCompleted) {
      return;
    }

    router.replace("/listings/new");
  }, [isAuthenticated, profileCompleted, router]);

  return (
    <AuthFrame>
      <div className={styles.announceContent}>
        <Link aria-label="Voltar para inicio" className={styles.authExit} href="/">
          <FaChevronLeft aria-hidden="true" />
          Inicio
        </Link>
        <div className={styles.announceArt} aria-hidden="true">
          <span className={styles.announceAvatar}>
            <FaUser />
          </span>
          <span className={styles.announceBubble}>
            <FaShoppingCart />
          </span>
          <span className={styles.announceBubble}>
            <FaBriefcase />
          </span>
          <span className={styles.announceBubble}>
            <FaCar />
          </span>
          <span className={styles.announceBubble}>
            <FaHome />
          </span>
        </div>

        <h1>Entre para anunciar</h1>
        <p>Para criar anuncios, entre ou crie sua conta gratis.</p>

        <div className={styles.authActions}>
          <Link className={styles.primaryAction} href="/auth/login">
            <FaWhatsapp aria-hidden="true" />
            Entrar com WhatsApp
          </Link>
          <Link className={styles.softAction} href="/auth/login">
            <FaEnvelope aria-hidden="true" />
            Entrar com e-mail
          </Link>
          <Link className={styles.outlineAction} href="/auth/register">
            <FaPlus aria-hidden="true" />
            Criar conta gratis
          </Link>
        </div>

        <p className={styles.signinLine}>
          Ja tem conta?
          <Link href="/auth/login">
            Entrar
          </Link>
        </p>
      </div>
    </AuthFrame>
  );
}
