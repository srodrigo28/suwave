import type {
  CompleteProfileInput,
  CompleteProfileResult,
  RegisterAccountInput,
  RegisterAccountResult,
} from "@/models/auth";

async function postAuth<TInput, TResult>(path: string, input: TInput) {
  const response = await fetch(path, {
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Nao foi possivel continuar o cadastro.");
  }

  return (await response.json()) as TResult;
}

export function registerAccount(input: RegisterAccountInput) {
  return postAuth<RegisterAccountInput, RegisterAccountResult>(
    "/api/auth/register",
    input,
  );
}

export function completeProfile(input: CompleteProfileInput) {
  return postAuth<CompleteProfileInput, CompleteProfileResult>(
    "/api/auth/profile",
    input,
  );
}
