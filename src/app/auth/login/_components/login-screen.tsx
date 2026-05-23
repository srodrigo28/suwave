"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { FaCheck, FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { AuthHeader } from "@/app/auth/_components/auth-header";
import { loginAccount } from "@/services/auth-client";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

export function LoginScreen() {
  const router = useRouter();
  const accountDraft = useAuthStore((state) => state.accountDraft);
  const authenticateLocal = useAuthStore((state) => state.authenticateLocal);
  const completeProfileLocal = useAuthStore((state) => state.completeProfileLocal);
  const saveAccountDraft = useAuthStore((state) => state.saveAccountDraft);
  const saveProfileDraft = useAuthStore((state) => state.saveProfileDraft);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    email: accountDraft.email ?? "",
    password: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await loginAccount(form);
      saveAccountDraft(result.account);
      saveProfileDraft(result.profile);
      completeProfileLocal(result.profile);
      authenticateLocal();
      setIsWelcomeVisible(true);
      window.setTimeout(() => {
        router.push("/");
      }, 1450);
    } catch {
      setFormError("Informe um e-mail e senha validos para entrar.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame>
      <AuthHeader backHref="/auth/announce" title="Entrar" />
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <FaEnvelope aria-hidden="true" />
          <input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
            placeholder="E-mail"
            value={form.email}
          />
        </label>
        <label className={`${styles.field} ${styles.passwordField}`}>
          <FaLock aria-hidden="true" />
          <input
            autoComplete="current-password"
            onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
            placeholder="Senha"
            type={showPassword ? "text" : "password"}
            value={form.password}
          />
          <button
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
          </button>
        </label>

        {formError ? <p className={styles.formError}>{formError}</p> : null}
        <button className={styles.primaryAction} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p className={styles.signinLine}>
        Ainda nao tem conta?
        <Link href="/auth/register">Criar conta gratis</Link>
      </p>
      <AnimatePresence>
        {isWelcomeVisible ? (
          <motion.div
            animate={{ opacity: 1 }}
            className={styles.welcomeOverlay}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className={styles.welcomeCard}
              initial={{ scale: 0.92, y: 14 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <motion.span
                animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }}
                transition={{ delay: 0.12, duration: 0.55 }}
              >
                <FaCheck aria-hidden="true" />
              </motion.span>
              <h2>Seja bem-vindo</h2>
              <p>Voce entrou na sua conta.</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AuthFrame>
  );
}
