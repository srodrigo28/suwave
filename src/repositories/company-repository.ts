import type { Company } from "@/models/company";

const companies: Company[] = [
  {
    brand: "bino",
    employeeRange: "150 a 200",
    featured: true,
    hours: "07:00 as 22:00",
    name: "Supermercado Bino",
    phone: "(66) 9 9999-9999",
    place: "Sinop - MT",
    segment: "Supermercado",
    site: "www.supermercadobino.com.br",
    slug: "supermercado-bino",
    summary:
      "O Supermercado Bino esta ha mais de 5 anos atendendo Sinop e regiao com qualidade, preco justo e atendimento de excelencia.",
  },
  {
    brand: "shell",
    name: "Posto Sinop",
    place: "Sinop - MT",
    segment: "Posto de Combustivel",
    slug: "posto-sinop",
  },
  {
    brand: "guia",
    name: "Lojas Guia",
    place: "Sinop - MT",
    segment: "Varejo",
    slug: "lojas-guia",
  },
  {
    brand: "lincoln",
    name: "Restaurante Lincoln",
    place: "Sinop - MT",
    segment: "Restaurante",
    slug: "restaurante-lincoln",
  },
  {
    brand: "teresa",
    name: "Padaria da Teresa",
    place: "Sinop - MT",
    segment: "Padaria",
    slug: "padaria-da-teresa",
  },
];

export function getCompaniesWithJobs() {
  return companies;
}

export function getCompanyBySlug(companySlug: string) {
  return companies.find((company) => company.slug === companySlug);
}
