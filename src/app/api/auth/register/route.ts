import { z } from "zod";
import type { RegisterAccountResult } from "@/models/auth";
import { apiRequest, onlyDigits, userToAccount, userToProfile } from "../_lib";

const registerSchema = z
  .object({
    acceptedTerms: z.literal(true, {
      error: "Para continuar, aceite os termos de uso.",
    }),
    cpf: z
      .string()
      .transform(onlyDigits)
      .refine((value) => value.length === 11, "Informe um CPF válido."),
    email: z.email("Informe um e-mail válido.").transform((value) => value.trim().toLowerCase()),
    fullName: z.string().trim().min(2, "Informe seu nome completo.").max(160),
    password: z.string().min(8, "Use uma senha com pelo menos 8 caracteres."),
    passwordConfirmation: z.string(),
    whatsapp: z
      .string()
      .transform(onlyDigits)
      .refine((value) => value.length >= 10 && value.length <= 11, "Informe um WhatsApp válido."),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: "As senhas precisam ser iguais.",
    path: ["passwordConfirmation"],
  });

function validationMessage(error: z.ZodError) {
  return error.issues[0]?.message ?? "Revise os dados informados para continuar.";
}

export async function POST(request: Request) {
  const parsed = registerSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ message: validationMessage(parsed.error) }, { status: 400 });
  }

  const input = parsed.data;
  const body = await apiRequest("/auth/register", {
    body: JSON.stringify({
      accepted_terms: input.acceptedTerms,
      cpf: input.cpf,
      email: input.email,
      full_name: input.fullName,
      password: input.password,
      whatsapp: input.whatsapp,
    }),
    method: "POST",
  });

  if (body instanceof Response) {
    return body;
  }

  const user = body?.data?.user ?? {};
  const result: RegisterAccountResult = {
    accessToken: body?.data?.access_token ?? "",
    account: userToAccount(user),
    mode: "api",
    status: "registered",
  };

  return Response.json({
    ...result,
    profile: userToProfile(user),
  });
}
