const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://99dev.pro/suwave-api/api/v1"
).replace(/\/$/, "");

export type ApiUser = {
  accepted_terms?: boolean;
  cpf?: string | null;
  email?: string;
  full_name?: string;
  profile_completed?: boolean;
  whatsapp?: string | null;
};

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function userToAccount(user: ApiUser) {
  return {
    acceptedTerms: Boolean(user.accepted_terms),
    cpf: user.cpf ?? "",
    email: user.email ?? "",
    fullName: user.full_name ?? "",
    whatsapp: user.whatsapp ?? "",
  };
}

export function userToProfile(user: ApiUser & {
  avatar_url?: string | null;
  birth_date?: string | null;
  city?: string | null;
  gender?: string | null;
}) {
  return {
    avatarUrl: user.avatar_url ?? "",
    birthDate: user.birth_date ?? "",
    city: user.city ?? "",
    cpf: user.cpf ?? "",
    fullName: user.full_name ?? "",
    gender: user.gender ?? "",
    whatsapp: user.whatsapp ?? "",
  };
}

export async function apiRequest(path: string, init: RequestInit) {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });
  } catch {
    return Response.json(
      { message: "Nao foi possivel conectar ao servico de cadastro agora." },
      { status: 503 },
    );
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.error?.message ?? body?.message ?? "Nao foi possivel concluir a operacao.";
    return Response.json(
      { message, fields: body?.error?.fields ?? {} },
      { status: response.status },
    );
  }

  return body;
}
