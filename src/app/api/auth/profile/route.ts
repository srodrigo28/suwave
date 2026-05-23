import { z } from "zod";
import type { CompleteProfileResult } from "@/models/auth";
import { apiRequest, onlyDigits, userToProfile } from "../_lib";

const profileSchema = z.object({
  avatarUrl: z.string().optional(),
  birthDate: z.string().min(1, "Informe sua data de nascimento."),
  city: z.string().trim().min(2, "Informe sua cidade."),
  cpf: z
    .string()
    .optional()
    .transform((value) => onlyDigits(value ?? ""))
    .refine((value) => !value || value.length === 11, "Informe um CPF valido."),
  fullName: z.string().trim().min(2, "Informe seu nome completo.").max(160),
  gender: z.string().trim().min(1, "Selecione o genero."),
  whatsapp: z
    .string()
    .transform(onlyDigits)
    .refine((value) => value.length >= 10 && value.length <= 11, "Informe um WhatsApp valido."),
});

export async function POST(request: Request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return Response.json(
      { message: "Sua sessao expirou. Volte ao cadastro para continuar." },
      { status: 401 },
    );
  }

  const parsed = profileSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.issues[0]?.message ?? "Revise os dados do perfil." },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const body = await apiRequest("/users/me/profile", {
    body: JSON.stringify({
      birth_date: input.birthDate,
      city: input.city,
      cpf: input.cpf || undefined,
      full_name: input.fullName,
      gender: input.gender,
      whatsapp: input.whatsapp,
    }),
    headers: { Authorization: token },
    method: "PUT",
  });

  if (body instanceof Response) {
    return body;
  }

  const result: CompleteProfileResult = {
    mode: "local",
    profile: userToProfile(body?.data?.user ?? {}),
    status: "profile-completed",
  };

  return Response.json(result);
}
