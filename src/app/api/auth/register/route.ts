import type { RegisterAccountInput, RegisterAccountResult } from "@/models/auth";

export async function POST(request: Request) {
  const input = (await request.json()) as Partial<RegisterAccountInput>;

  const result: RegisterAccountResult = {
    account: {
      acceptedTerms: Boolean(input.acceptedTerms),
      email: input.email ?? "",
      fullName: input.fullName ?? "",
      whatsapp: input.whatsapp ?? "",
    },
    mode: "local",
    status: "draft-created",
  };

  return Response.json(result);
}
