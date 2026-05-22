export type JobVacancyTone = "violet" | "blue" | "green" | "yellow" | "teal";

export type JobVacancyIcon =
  | "cash-register"
  | "boxes"
  | "broom"
  | "bread"
  | "student";

export type JobVacancy = {
  companySlug: string;
  icon: JobVacancyIcon;
  role: string;
  schedule: string;
  title: string;
  tone: JobVacancyTone;
};
