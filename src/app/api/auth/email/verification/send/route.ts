import { apiRequest } from "@/app/api/auth/_lib";

export async function POST(request: Request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return Response.json(
      { message: "Sua sessao expirou. Entre novamente para reenviar a verificacao." },
      { status: 401 },
    );
  }

  const body = await apiRequest("/auth/email/verification/send", {
    body: JSON.stringify({}),
    headers: { Authorization: token },
    method: "POST",
  });

  if (body instanceof Response) {
    return body;
  }

  return Response.json(body);
}
