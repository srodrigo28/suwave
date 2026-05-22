import { notFound } from "next/navigation";
import { AppShell } from "@/app/_components/app-shell";
import { CompanyDetailsScreen } from "./_components/company-details-screen";
import {
  getCompaniesWithJobs,
  getCompanyBySlug,
} from "@/repositories/company-repository";
import { getVacanciesByCompanySlug } from "@/repositories/job-repository";

export function generateStaticParams() {
  return getCompaniesWithJobs().map((company) => ({
    companySlug: company.slug,
  }));
}

export default async function CompanyPage({
  params,
}: PageProps<"/companies/[companySlug]">) {
  const { companySlug } = await params;
  const company = getCompanyBySlug(companySlug);

  if (!company) {
    notFound();
  }

  return (
    <AppShell>
      <CompanyDetailsScreen
        company={company}
        vacancies={getVacanciesByCompanySlug(company.slug)}
      />
    </AppShell>
  );
}
