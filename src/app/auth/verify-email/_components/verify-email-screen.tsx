"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaEnvelope, FaExclamationTriangle } from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { confirmEmailVerification } from "@/services/auth-client";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

type VerifyStatus = "loading" | "success" | "error";

export function VerifyEmailScreen() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const saveAccountDraft = useAuthStore((state) => state.saveAccountDraft);
  const [status, setStatus] = useState<VerifyStatus>("loading");
  const [message, setMessage] = useState("Confirmando seu e-mail...");

  useEffect(() => {
    if (!token) {
      return;
    }

    confirmEmailVerification(token)
      .then((result) => {
        saveAccountDraft({
          accountVerified: result.data.account_verified,
          emailVerified: result.data.email_verified,
        });
        setStatus("success");
        setMessage(result.message ?? "E-mail verificado com sucesso.");
      })
      .catch((error) => {
        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "Não foi possível verificar seu e-mail.",
        );
      });
  }, [saveAccountDraft, token]);

  const visibleStatus: VerifyStatus = token ? status : "error";
  const visibleMessage = token ? message : "Link de verificação inválido.";

  return (
    <AuthFrame>
      <section className={styles.readyPanel}>
        <span>
          {visibleStatus === "success" ? (
            <FaCheckCircle aria-hidden="true" />
          ) : visibleStatus === "error" ? (
            <FaExclamationTriangle aria-hidden="true" />
          ) : (
            <FaEnvelope aria-hidden="true" />
          )}
        </span>
        <h1>
          {visibleStatus === "success"
            ? "Conta verificada"
            : visibleStatus === "error"
              ? "Verificacao pendente"
              : "Verificando conta"}
        </h1>
        <p>{visibleMessage}</p>
        <Link
          className={styles.primaryAction}
          href={visibleStatus === "success" ? "/profile" : "/auth/login"}
        >
          {visibleStatus === "success" ? "Ver meu perfil" : "Entrar na conta"}
        </Link>
      </section>
    </AuthFrame>
  );
}
