import { z } from "zod";
import type { CompleteProfileResult } from "@/models/auth";
import { apiRequest, onlyDigits, userToAccount, userToProfile } from "../_lib";

function isValidIsoDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

const profileSchema = z.object({
  avatarUrl: z.string().optional(),
  birthDate: z
    .string()
    .min(1, "Informe sua data de nascimento.")
    .refine(isValidIsoDate, "Informe uma data de nascimento valida."),
  city: z.string().trim().min(2, "Informe sua cidade."),
  cpf: z
    .string()
    .optional()
    .transform((value) => onlyDigits(value ?? ""))
    .refine((value) => !value || value.length === 11, "Informe um CPF válido."),
  email: z.email("Informe um e-mail válido.").optional().transform((value) => value?.trim().toLowerCase()),
  fullName: z.string().trim().min(2, "Informe seu nome completo.").max(160),
  gender: z.string().trim().min(1, "Selecione o gênero."),
  whatsapp: z
    .string()
    .transform(onlyDigits)
    .refine((value) => value.length >= 10 && value.length <= 11, "Informe um WhatsApp válido."),
});

export async function POST(request: Request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return Response.json(
      { message: "Sua sessão expirou. Volte ao cadastro para continuar." },
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
      email: input.email,
      full_name: input.fullName,
      gender: input.gender,
      avatar_url: input.avatarUrl,
      whatsapp: input.whatsapp,
    }),
    headers: { Authorization: token },
    method: "PUT",
  });

  if (body instanceof Response) {
    return body;
  }

  const user = body?.data?.user ?? body?.data ?? {};
  const result: CompleteProfileResult = {
    account: userToAccount(user),
    mode: "local",
    profile: userToProfile(user),
    status: "profile-completed",
  };

  return Response.json(result);
}
