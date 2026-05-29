import { LocalServiceListScreen } from "@/app/services/_components/local-service-list-screen";
import { getLocalServices } from "@/repositories/local-service-repository";

export default function HairdressersPage() {
  return (
    <LocalServiceListScreen
      kind="beauty"
      professionals={getLocalServices("beauty")}
      searchLabel="Buscar cabeleireiras"
      title="Cabeleireiras"
    />
  );
}
