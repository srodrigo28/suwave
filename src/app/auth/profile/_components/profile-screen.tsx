"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBirthdayCake,
  FaCamera,
  FaChevronDown,
  FaIdCard,
  FaMapMarkerAlt,
  FaUser,
  FaWhatsapp,
} from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { AuthHeader } from "@/app/auth/_components/auth-header";
import { completeProfile } from "@/services/auth-client";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

export function ProfileScreen() {
  const router = useRouter();
  const accountDraft = useAuthStore((state) => state.accountDraft);
  const profileDraft = useAuthStore((state) => state.profileDraft);
  const completeProfileLocal = useAuthStore((state) => state.completeProfileLocal);
  const saveProfileDraft = useAuthStore((state) => state.saveProfileDraft);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    birthDate: profileDraft.birthDate ?? "",
    city: profileDraft.city ?? "",
    cpf: profileDraft.cpf ?? "",
    fullName: profileDraft.fullName ?? accountDraft.fullName ?? "",
    gender: profileDraft.gender ?? "",
    whatsapp: profileDraft.whatsapp ?? accountDraft.whatsapp ?? "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await completeProfile(form);
      saveProfileDraft(result.profile);
      completeProfileLocal(result.profile);
      router.push("/listings/new");
    } catch {
      setFormError("Nao foi possivel salvar o perfil agora.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame>
      <AuthHeader backHref="/auth/register" title="Complete seu perfil" />
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <div className={styles.photoPicker} aria-label="Adicionar foto de perfil">
          <span>
            <FaUser aria-hidden="true" />
            <i>
              <FaCamera aria-hidden="true" />
            </i>
          </span>
          <small>Adicionar foto de perfil</small>
        </div>
        <label className={styles.field}>
          <FaUser aria-hidden="true" />
          <input
            onChange={(event) => setForm((state) => ({ ...state, fullName: event.target.value }))}
            placeholder="Nome completo"
            value={form.fullName}
          />
        </label>
        <label className={styles.field}>
          <FaIdCard aria-hidden="true" />
          <input
            inputMode="numeric"
            onChange={(event) => setForm((state) => ({ ...state, cpf: event.target.value }))}
            placeholder="CPF"
            value={form.cpf}
          />
        </label>
        <label className={styles.field}>
          <FaBirthdayCake aria-hidden="true" />
          <input
            onChange={(event) => setForm((state) => ({ ...state, birthDate: event.target.value }))}
            placeholder="Data de nascimento"
            type="text"
            value={form.birthDate}
          />
        </label>
        <label className={`${styles.field} ${styles.passwordField}`}>
          <FaUser aria-hidden="true" />
          <select
            onChange={(event) => setForm((state) => ({ ...state, gender: event.target.value }))}
            value={form.gender}
          >
            <option value="">Genero</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao-informar">Prefiro nao informar</option>
          </select>
          <FaChevronDown aria-hidden="true" />
        </label>
        <label className={styles.field}>
          <FaMapMarkerAlt aria-hidden="true" />
          <input
            onChange={(event) => setForm((state) => ({ ...state, city: event.target.value }))}
            placeholder="Cidade / UF"
            value={form.city}
          />
        </label>
        <label className={styles.field}>
          <FaWhatsapp aria-hidden="true" />
          <input
            inputMode="tel"
            onChange={(event) => setForm((state) => ({ ...state, whatsapp: event.target.value }))}
            placeholder="WhatsApp"
            value={form.whatsapp}
          />
        </label>

        <p className={styles.profileHint}>Seus dados ajudam a criar seu perfil de anunciante.</p>
        {formError ? <p className={styles.formError}>{formError}</p> : null}
        <button className={styles.primaryAction} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Salvando..." : "Salvar e continuar"}
        </button>
      </form>
    </AuthFrame>
  );
}
