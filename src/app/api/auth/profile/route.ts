import type { CompleteProfileInput, CompleteProfileResult } from "@/models/auth";

export async function POST(request: Request) {
  const input = (await request.json()) as Partial<CompleteProfileInput>;

  const result: CompleteProfileResult = {
    mode: "local",
    profile: {
      avatarUrl: input.avatarUrl ?? "",
      birthDate: input.birthDate ?? "",
      city: input.city ?? "",
      cpf: input.cpf ?? "",
      fullName: input.fullName ?? "",
      gender: input.gender ?? "",
      whatsapp: input.whatsapp ?? "",
    },
    status: "profile-completed",
  };

  return Response.json(result);
}
