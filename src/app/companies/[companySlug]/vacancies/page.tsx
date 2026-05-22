import { notFound } from "next/navigation";
import { AppShell } from "@/app/_components/app-shell";
import { getCompaniesWithJobs, getCompanyBySlug } from "@/repositories/company-repository";
import { getVacanciesByCompanySlug } from "@/repositories/job-repository";
import { CompanyVacanciesScreen } from "./_components/company-vacancies-screen";

export function generateStaticParams() {
  return getCompaniesWithJobs()
    .filter((company) => getVacanciesByCompanySlug(company.slug).length > 2)
    .map((company) => ({
      companySlug: company.slug,
    }));
}

export default async function CompanyVacanciesPage({
  params,
}: PageProps<"/companies/[companySlug]/vacancies">) {
  const { companySlug } = await params;
  const company = getCompanyBySlug(companySlug);

  if (!company) {
    notFound();
  }

  const continuationVacancies = getVacanciesByCompanySlug(company.slug).slice(2);

  if (!continuationVacancies.length) {
    notFound();
  }

  return (
    <AppShell>
      <CompanyVacanciesScreen
        company={company}
        vacancies={continuationVacancies}
      />
    </AppShell>
  );
}
