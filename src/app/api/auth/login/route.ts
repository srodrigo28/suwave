import type { LoginInput, LoginResult } from "@/models/auth";

function displayNameFromEmail(email: string) {
  const localPart = email.split("@")[0]?.replace(/\d+/g, "") ?? "";
  const separated = localPart
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[._-]+/g, " ")
    .trim();

  if (!separated) {
    return "Usuario Suwave";
  }

  if (separated.toLowerCase() === "rodrigoexer") {
    return "Rodrigo Exer";
  }

  return separated
    .split(/\s+/)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1).toLowerCase()}`)
    .join(" ");
}

export async function POST(request: Request) {
  const input = (await request.json()) as Partial<LoginInput>;

  if (!input.email?.trim() || !input.password?.trim()) {
    return Response.json(
      { message: "Informe e-mail e senha para entrar." },
      { status: 400 },
    );
  }

  const email = input.email.trim();
  const fullName = displayNameFromEmail(email);
  const profile = {
    avatarUrl: "",
    birthDate: "1985-03-12",
    city: "Sinop / MT",
    cpf: "12345678900",
    fullName,
    gender: "masculino",
    whatsapp: "66992223344",
  };
  const result: LoginResult = {
    account: {
      acceptedTerms: true,
      email,
      fullName,
      whatsapp: profile.whatsapp,
    },
    mode: "local",
    profile,
    profileCompleted: true,
    status: "authenticated",
  };

  return Response.json(result);
}
