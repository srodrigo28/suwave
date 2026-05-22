import type { JobVacancy } from "@/models/job";

const vacancies: JobVacancy[] = [
  {
    companySlug: "supermercado-bino",
    icon: "cash-register",
    role: "CLT",
    schedule: "Tempo integral",
    title: "Operador de Caixa",
    tone: "violet",
  },
  {
    companySlug: "supermercado-bino",
    icon: "boxes",
    role: "CLT",
    schedule: "Tempo integral",
    title: "Repositor de Mercadorias",
    tone: "blue",
  },
  {
    companySlug: "supermercado-bino",
    icon: "broom",
    role: "CLT",
    schedule: "Meio periodo",
    title: "Auxiliar de Limpeza",
    tone: "green",
  },
  {
    companySlug: "supermercado-bino",
    icon: "bread",
    role: "CLT",
    schedule: "Tempo integral",
    title: "Auxiliar de Padaria",
    tone: "yellow",
  },
  {
    companySlug: "supermercado-bino",
    icon: "student",
    role: "Aprendiz",
    schedule: "Meio periodo",
    title: "Jovem Aprendiz",
    tone: "teal",
  },
];

export function getVacanciesByCompanySlug(companySlug: string) {
  return vacancies.filter((vacancy) => vacancy.companySlug === companySlug);
}
