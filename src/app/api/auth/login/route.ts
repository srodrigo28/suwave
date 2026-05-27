import { z } from "zod";
import type { LoginResult } from "@/models/auth";
import { apiRequest, userToAccount, userToProfile } from "../_lib";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido.").transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1, "Informe sua senha."),
});

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.issues[0]?.message ?? "Informe e-mail e senha para entrar." },
      { status: 400 },
    );
  }

  const body = await apiRequest("/auth/login", {
    body: JSON.stringify(parsed.data),
    method: "POST",
  });

  if (body instanceof Response) {
    return body;
  }

  const user = body?.data?.user ?? {};
  const result: LoginResult = {
    accessToken: body?.data?.access_token ?? "",
    account: userToAccount(user),
    mode: "api",
    profile: userToProfile(user),
    profileCompleted: Boolean(user.profile_completed),
    status: "authenticated",
  };

  return Response.json(result);
}
