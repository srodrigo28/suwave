import { LocalServiceListScreen } from "@/app/services/_components/local-service-list-screen";
import { getLocalServices } from "@/repositories/local-service-repository";

export default function BuildersPage() {
  return (
    <LocalServiceListScreen
      kind="construction"
      professionals={getLocalServices("construction")}
      searchLabel="Buscar pedreiros"
      title="Pedreiros em Sinop - MT"
    />
  );
}
