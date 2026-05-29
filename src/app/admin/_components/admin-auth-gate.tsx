"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { FaArrowLeft, FaLock, FaShieldAlt, FaSignInAlt, FaUserCheck } from "react-icons/fa";
import { useAuthStore } from "@/stores/auth-store";
import styles from "./admin-dashboard.module.css";

const localAdminEmails = [
  "admin@suwave.local",
  "operador@suwave.local",
  "financeiro@suwave.local",
  "moderador@suwave.local",
  "suporte@suwave.local",
];

function getAllowedAdminEmails() {
  const configuredEmails = process.env.NEXT_PUBLIC_SUWAVE_ADMIN_EMAILS?.split(",") ?? [];

  return [...configuredEmails, ...localAdminEmails]
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

function AccessPanel({
  actionHref,
  actionIcon,
  actionLabel,
  helper,
  title,
}: {
  actionHref: string;
  actionIcon: ReactNode;
  actionLabel: string;
  helper: string;
  title: string;
}) {
  return (
    <section className={styles.adminGate}>
      <article className={styles.adminGateCard}>
        <span>
          <FaShieldAlt aria-hidden="true" />
        </span>
        <small>Admin SUWAVE</small>
        <h1>{title}</h1>
        <p>{helper}</p>
        <div>
          <Link href={actionHref}>
            {actionIcon}
            {actionLabel}
          </Link>
          <Link href="/more">
            <FaArrowLeft aria-hidden="true" />
            Voltar
          </Link>
        </div>
      </article>
    </section>
  );
}

export function AdminAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const accountEmail = useAuthStore((state) => state.accountDraft.email);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const isAdmin = useMemo(() => {
    if (!accountEmail) {
      return false;
    }

    return getAllowedAdminEmails().includes(accountEmail.trim().toLowerCase());
  }, [accountEmail]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!profileCompleted) {
      router.replace(`/auth/profile?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, profileCompleted, router]);

  if (!isAuthenticated) {
    return (
      <AccessPanel
        actionHref={`/auth/login?next=${encodeURIComponent(pathname)}`}
        actionIcon={<FaSignInAlt aria-hidden="true" />}
        actionLabel="Entrar"
        helper="Entre com uma conta autorizada para acessar o painel administrativo."
        title="Acesso restrito"
      />
    );
  }

  if (!profileCompleted) {
    return (
      <AccessPanel
        actionHref={`/auth/profile?next=${encodeURIComponent(pathname)}`}
        actionIcon={<FaUserCheck aria-hidden="true" />}
        actionLabel="Completar perfil"
        helper="Complete o perfil antes de acessar ferramentas administrativas."
        title="Perfil necessario"
      />
    );
  }

  if (!isAdmin) {
    return (
      <AccessPanel
        actionHref="/profile"
        actionIcon={<FaLock aria-hidden="true" />}
        actionLabel="Ver meu perfil"
        helper="Sua conta esta autenticada, mas nao possui permissao administrativa."
        title="Permissao negada"
      />
    );
  }

  return children;
}
