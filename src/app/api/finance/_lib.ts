const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://99dev.pro/suwave-api/api/v1"
).replace(/\/$/, "");

export async function financeApiRequest(request: Request, path: string, init?: RequestInit) {
  const token = request.headers.get("authorization");

  if (!token) {
    return Response.json({ message: "Entre para acessar o financeiro." }, { status: 401 });
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    return Response.json({ message: "Nao foi possivel conectar ao financeiro agora." }, { status: 503 });
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.error?.message ?? body?.message ?? "Nao foi possivel concluir a operacao.";
    return Response.json({ message, fields: body?.error?.fields ?? {} }, { status: response.status });
  }

  return Response.json(body, { status: response.status });
}
