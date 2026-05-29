import { financeApiRequest } from "../../_lib";

export function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const query = type ? `?type=${encodeURIComponent(type)}` : "";

  return financeApiRequest(request, `/finance/wallet/movements${query}`);
}
