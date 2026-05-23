"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaCamera,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { AuthFrame } from "@/app/auth/_components/auth-frame";
import { AuthHeader } from "@/app/auth/_components/auth-header";
import { completeProfile } from "@/services/auth-client";
import { dateDisplayToIso, dateIsoToDisplay, maskCpf, maskDate, maskWhatsapp } from "@/shared/forms/masks";
import { useAuthStore } from "@/stores/auth-store";
import styles from "@/app/auth/_components/auth-flow.module.css";

const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Marco",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function buildCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const totalDays = new Date(year, month + 1, 0).getDate();
  const leadingDays = firstDay.getDay();

  return [
    ...Array.from({ length: leadingDays }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => new Date(year, month, index + 1)),
  ];
}

function formatCalendarDate(date: Date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}`;
}

export function ProfileScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = useAuthStore((state) => state.accessToken);
  const accountDraft = useAuthStore((state) => state.accountDraft);
  const profileDraft = useAuthStore((state) => state.profileDraft);
  const completeProfileLocal = useAuthStore((state) => state.completeProfileLocal);
  const saveAccountDraft = useAuthStore((state) => state.saveAccountDraft);
  const saveProfileDraft = useAuthStore((state) => state.saveProfileDraft);
  const isEditMode = searchParams.get("mode") === "edit";
  const initialBirthDate = profileDraft.birthDate ?? "";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const [formError, setFormError] = useState("");
  const [birthDateDisplay, setBirthDateDisplay] = useState(dateIsoToDisplay(initialBirthDate));
  const [imageName, setImageName] = useState("");
  const [form, setForm] = useState({
    avatarUrl: profileDraft.avatarUrl ?? "",
    birthDate: initialBirthDate,
    city: profileDraft.city ?? "",
    cpf: maskCpf(profileDraft.cpf ?? accountDraft.cpf ?? ""),
    email: accountDraft.email ?? "",
    fullName: profileDraft.fullName ?? accountDraft.fullName ?? "",
    gender: profileDraft.gender ?? "",
    whatsapp: maskWhatsapp(profileDraft.whatsapp ?? accountDraft.whatsapp ?? ""),
  });
  const selectedDate = form.birthDate ? new Date(`${form.birthDate}T00:00:00`) : null;
  const [calendarMonth, setCalendarMonth] = useState(
    selectedDate && !Number.isNaN(selectedDate.getTime()) ? selectedDate : new Date(2000, 0, 1),
  );
  const calendarDays = useMemo(() => buildCalendarDays(calendarMonth), [calendarMonth]);

  const updateProfileField = (
    field: "avatarUrl" | "birthDate" | "city" | "cpf" | "fullName" | "gender",
    value: string,
  ) => {
    setForm((state) => ({ ...state, [field]: value }));
    saveProfileDraft({ [field]: value });
  };

  const updateAccountField = (field: "email" | "fullName", value: string) => {
    setForm((state) => ({ ...state, [field]: value }));
    saveAccountDraft({ [field]: value });
  };

  const updateBirthDate = (value: string) => {
    const masked = maskDate(value);
    const isoDate = dateDisplayToIso(masked);

    setBirthDateDisplay(masked);
    updateProfileField("birthDate", isoDate);

    if (isoDate) {
      setCalendarMonth(new Date(`${isoDate}T00:00:00`));
    }
  };

  const selectBirthDate = (date: Date) => {
    const isoDate = formatCalendarDate(date);

    updateProfileField("birthDate", isoDate);
    setBirthDateDisplay(dateIsoToDisplay(isoDate));
    setIsCalendarOpen(false);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setFormError("Selecione uma imagem valida para o perfil.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateProfileField("avatarUrl", String(reader.result ?? ""));
      setImageName(file.name);
      setFormError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await completeProfile(form, accessToken);
      saveAccountDraft({
        ...accountDraft,
        email: form.email,
        fullName: form.fullName,
        whatsapp: form.whatsapp,
      });
      saveProfileDraft(result.profile);
      completeProfileLocal(result.profile);
      setIsWelcomeVisible(true);
      window.setTimeout(() => {
        router.push(isEditMode ? "/profile" : "/listings/new");
      }, 1450);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Nao foi possivel salvar o perfil agora.");
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame>
      <AuthHeader
        backHref={isEditMode ? "/profile" : "/auth/register"}
        title={isEditMode ? "Editar perfil" : "Complete seu perfil"}
      />
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <label className={styles.photoPicker} aria-label="Adicionar foto de perfil">
          <input accept="image/*" onChange={handleImageChange} type="file" />
          <span>
            {form.avatarUrl ? (
              <Image alt="" height={140} src={form.avatarUrl} unoptimized width={140} />
            ) : (
              <FaUser aria-hidden="true" />
            )}
            <i>
              <FaCamera aria-hidden="true" />
            </i>
          </span>
          <small>{imageName || "Adicionar foto de perfil"}</small>
        </label>
        <label className={styles.field}>
          <FaUser aria-hidden="true" />
          <input
            autoComplete="name"
            onChange={(event) => {
              updateProfileField("fullName", event.target.value);
              saveAccountDraft({ fullName: event.target.value });
            }}
            placeholder="Nome completo"
            value={form.fullName}
          />
        </label>
        <label className={styles.field}>
          <FaEnvelope aria-hidden="true" />
          <input
            autoComplete="email"
            inputMode="email"
            onChange={(event) => updateAccountField("email", event.target.value)}
            placeholder="E-mail"
            value={form.email}
          />
        </label>
        <div className={`${styles.field} ${styles.passwordField} ${styles.dateField}`}>
          <FaBirthdayCake aria-hidden="true" />
          <input
            inputMode="numeric"
            onChange={(event) => updateBirthDate(event.target.value)}
            placeholder="Data de nascimento"
            type="text"
            value={birthDateDisplay}
          />
          <button
            aria-label="Abrir calendario"
            onClick={() => setIsCalendarOpen((open) => !open)}
            type="button"
          >
            <FaCalendarAlt aria-hidden="true" />
          </button>
          {isCalendarOpen ? (
            <div className={styles.calendarPopover}>
              <div className={styles.calendarHeader}>
                <button
                  aria-label="Mes anterior"
                  onClick={() =>
                    setCalendarMonth(
                      (month) => new Date(month.getFullYear(), month.getMonth() - 1, 1),
                    )
                  }
                  type="button"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <strong>
                  {months[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                </strong>
                <button
                  aria-label="Proximo mes"
                  onClick={() =>
                    setCalendarMonth(
                      (month) => new Date(month.getFullYear(), month.getMonth() + 1, 1),
                    )
                  }
                  type="button"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>
              <div className={styles.calendarGrid}>
                {weekdays.map((weekday, index) => (
                  <b key={`${weekday}-${index}`}>{weekday}</b>
                ))}
                {calendarDays.map((date, index) =>
                  date ? (
                    <button
                      className={form.birthDate === formatCalendarDate(date) ? styles.selectedDay : ""}
                      key={date.toISOString()}
                      onClick={() => selectBirthDate(date)}
                      type="button"
                    >
                      {date.getDate()}
                    </button>
                  ) : (
                    <span key={`empty-${index}`} />
                  ),
                )}
              </div>
            </div>
          ) : null}
        </div>
        <label className={`${styles.field} ${styles.passwordField}`}>
          <FaUser aria-hidden="true" />
          <select
            onChange={(event) => updateProfileField("gender", event.target.value)}
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
            onChange={(event) => updateProfileField("city", event.target.value)}
            placeholder="Cidade / UF"
            value={form.city}
          />
        </label>

        <p className={styles.profileHint}>Seus dados ajudam a criar seu perfil de anunciante.</p>
        {formError ? <p className={styles.formError}>{formError}</p> : null}
        <button className={styles.primaryAction} disabled={isSubmitting} type="submit">
          {isSubmitting ? "Salvando..." : isEditMode ? "Salvar alteracoes" : "Salvar e continuar"}
        </button>
      </form>
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
              <h2>{isEditMode ? "Perfil atualizado" : "Seja bem-vindo"}</h2>
              <p>{isEditMode ? "Suas informacoes foram salvas." : "Seu perfil foi concluido."}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </AuthFrame>
  );
}
