import { financeApiRequest } from "../_lib";

export function GET(request: Request) {
  return financeApiRequest(request, "/finance/affiliate");
}
