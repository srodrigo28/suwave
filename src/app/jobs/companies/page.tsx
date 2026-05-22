import { AppShell } from "@/app/_components/app-shell";
import { getCompaniesWithJobs } from "@/repositories/company-repository";
import { CompanyListScreen } from "./_components/company-list-screen";

export default function JobCompaniesPage() {
  return (
    <AppShell>
      <CompanyListScreen companies={getCompaniesWithJobs()} />
    </AppShell>
  );
}
