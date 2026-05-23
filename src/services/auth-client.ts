import type {
  CompleteProfileInput,
  CompleteProfileResult,
  LoginInput,
  LoginResult,
  RegisterAccountInput,
  RegisterAccountResult,
} from "@/models/auth";

async function postAuth<TInput, TResult>(path: string, input: TInput, token?: string) {
  const response = await fetch(path, {
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    method: "POST",
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.message ?? "Nao foi possivel continuar o cadastro.");
  }

  return body as TResult;
}

export function registerAccount(input: RegisterAccountInput) {
  return postAuth<RegisterAccountInput, RegisterAccountResult>(
    "/api/auth/register",
    input,
  );
}

export function loginAccount(input: LoginInput) {
  return postAuth<LoginInput, LoginResult>("/api/auth/login", input);
}

export function completeProfile(input: CompleteProfileInput, token?: string) {
  return postAuth<CompleteProfileInput, CompleteProfileResult>(
    "/api/auth/profile",
    input,
    token,
  );
}
