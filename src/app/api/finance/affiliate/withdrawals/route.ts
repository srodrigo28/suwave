import { financeApiRequest } from "../../_lib";

export async function POST(request: Request) {
  return financeApiRequest(request, "/finance/affiliate/withdrawals", {
    body: await request.text(),
    method: "POST",
  });
}
