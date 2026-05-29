import type {
  CompleteProfileInput,
  CompleteProfileResult,
  LoginInput,
  LoginResult,
  RegisterAccountInput,
  RegisterAccountResult,
} from "@/models/auth";
import { useAuthStore } from "@/stores/auth-store";

export function getSavedAccessToken() {
  const token = useAuthStore.getState().accessToken;

  if (token || typeof window === "undefined") {
    return token;
  }

  try {
    const savedState = JSON.parse(localStorage.getItem("suwave-auth-local") ?? "{}");
    return savedState?.state?.accessToken;
  } catch {
    return undefined;
  }
}

async function postAuth<TInput, TResult>(path: string, input: TInput, token?: string) {
  const accessToken = token || getSavedAccessToken();
  const response = await fetch(path, {
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    method: "POST",
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.message ?? "Não foi possível continuar o cadastro.");
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

export function confirmEmailVerification(token: string) {
  return postAuth<{ token: string }, { data: { account_verified: boolean; email_verified: boolean }; message: string }>(
    "/api/auth/email/verification/confirm",
    { token },
  );
}

export function sendEmailVerification() {
  return postAuth<Record<string, never>, { data: { email: string }; message: string }>(
    "/api/auth/email/verification/send",
    {},
  );
}

export async function uploadProfileImage(file: File, token?: string) {
  const accessToken = token || getSavedAccessToken();
  const formData = new FormData();
  formData.append("context", "profile");
  formData.append("file", file);

  const response = await fetch("/api/uploads/images", {
    body: formData,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    method: "POST",
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body?.message ?? "Não foi possível enviar a foto agora.");
  }

  return body as {
    data: {
      storage_file_id?: string;
      url: string;
    };
    message: string;
  };
}
