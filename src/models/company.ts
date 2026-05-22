export type CompanyBrand = "bino" | "shell" | "guia" | "lincoln" | "teresa";

export type Company = {
  employeeRange?: string;
  featured?: boolean;
  hours?: string;
  name: string;
  phone?: string;
  place: string;
  segment: string;
  site?: string;
  slug: string;
  summary?: string;
  brand: CompanyBrand;
};
