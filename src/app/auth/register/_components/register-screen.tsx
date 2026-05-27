"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaIdCard,
  FaLock,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { AuthHeader } from "@/app/auth/_components/auth-header";
import { registerAccount } from "@/services/auth-client";
import { maskCpf, maskWhatsapp } from "@/shared/forms/masks";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

export function RegisterScreen() {
  const router = useRouter();
  const accountDraft = useAuthStore((state) => state.accountDraft);
  const saveAccountDraft = useAuthStore((state) => state.saveAccountDraft);
  const saveAuthSession = useAuthStore((state) => state.saveAuthSession);
  const saveProfileDraft = useAuthStore((state) => state.saveProfileDraft);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    acceptedTerms: accountDraft.acceptedTerms ?? true,
    confirmation: "",
    cpf: accountDraft.cpf ?? "",
    email: accountDraft.email ?? "",
    fullName: accountDraft.fullName ?? "",
    password: "",
    whatsapp: maskWhatsapp(accountDraft.whatsapp ?? ""),
  });

  const updateAccountField = (
    field: "acceptedTerms" | "cpf" | "email" | "fullName" | "whatsapp",
    value: boolean | string,
  ) => {
    setForm((state) => ({ ...state, [field]: value }));
    saveAccountDraft({ [field]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await registerAccount({
        acceptedTerms: form.acceptedTerms,
        cpf: form.cpf,
        email: form.email,
        fullName: form.fullName,
        password: form.password,
        passwordConfirmation: form.confirmation,
        whatsapp: form.whatsapp,
      });
      saveAccountDraft({
        ...result.account,
      });
      saveProfileDraft({
        cpf: result.account.cpf,
        fullName: result.account.fullName,
        whatsapp: result.account.whatsapp,
      });
      saveAuthSession(result.accessToken);
      router.push("/auth/profile");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Não foi possível continuar agora.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame>
      <AuthHeader backHref="/auth/announce" title="Criar conta" />
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <FaUser aria-hidden="true" />
          <input
            onChange={(event) => updateAccountField("fullName", event.target.value)}
            placeholder="Nome completo"
            value={form.fullName}
          />
        </label>
        <label className={styles.field}>
          <FaWhatsapp aria-hidden="true" />
          <input
            inputMode="tel"
            onChange={(event) => updateAccountField("whatsapp", maskWhatsapp(event.target.value))}
            placeholder="WhatsApp"
            value={form.whatsapp}
          />
        </label>
        <label className={styles.field}>
          <FaIdCard aria-hidden="true" />
          <input
            inputMode="numeric"
            onChange={(event) => updateAccountField("cpf", maskCpf(event.target.value))}
            placeholder="CPF"
            value={form.cpf}
          />
        </label>
        <label className={styles.field}>
          <FaEnvelope aria-hidden="true" />
          <input
            inputMode="email"
            onChange={(event) => updateAccountField("email", event.target.value)}
            placeholder="E-mail"
            value={form.email}
          />
        </label>
        <label className={`${styles.field} ${styles.passwordField}`}>
          <FaLock aria-hidden="true" />
          <input
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
        <label className={`${styles.field} ${styles.passwordField}`}>
          <FaLock aria-hidden="true" />
          <input
            onChange={(event) =>
              setForm((state) => ({ ...state, confirmation: event.target.value }))
            }
            placeholder="Confirmar senha"
            type={showConfirmation ? "text" : "password"}
            value={form.confirmation}
          />
          <button
            aria-label={showConfirmation ? "Ocultar confirmacao" : "Mostrar confirmacao"}
            onClick={() => setShowConfirmation((visible) => !visible)}
            type="button"
          >
            {showConfirmation ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
          </button>
        </label>

        <label className={styles.terms}>
          <input
            checked={form.acceptedTerms}
            onChange={(event) => updateAccountField("acceptedTerms", event.target.checked)}
            type="checkbox"
          />
          <span>
            Aceito os <b>termos de uso</b>
          </span>
        </label>

        {formError ? <p className={styles.formError}>{formError}</p> : null}
        <button className={styles.primaryAction} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Continuando..." : "Continuar cadastro"}
        </button>
      </form>
    </AuthFrame>
  );
}
