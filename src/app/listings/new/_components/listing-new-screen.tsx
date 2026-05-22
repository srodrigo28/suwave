"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBullhorn } from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

export function ListingNewScreen() {
  const router = useRouter();
  const clearLocalSession = useAuthStore((state) => state.clearLocalSession);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const profileCompleted = useAuthStore((state) => state.profileCompleted);
  const fullName = useAuthStore(
    (state) => state.profileDraft.fullName ?? state.accountDraft.fullName,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/announce");
      return;
    }

    if (!profileCompleted) {
      router.replace("/auth/profile");
    }
  }, [isAuthenticated, profileCompleted, router]);

  return (
    <AuthFrame>
      <div className={styles.readyPanel}>
        <span>
          <FaBullhorn aria-hidden="true" />
        </span>
        <h1>{fullName ? `${fullName}, anuncie agora` : "Pronto para anunciar"}</h1>
        <p>
          Seu cadastro local esta completo. Esta tela segura o lugar do criador
          de anuncios que sera ligado a API na proxima etapa.
        </p>
        <Link className={styles.primaryAction} href="/listings">
          Escolher categoria
        </Link>
        <button className={styles.outlineAction} onClick={clearLocalSession} type="button">
          Limpar sessao local
        </button>
      </div>
    </AuthFrame>
  );
}
