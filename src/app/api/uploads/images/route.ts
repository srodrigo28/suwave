const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://99dev.pro/suwave-api/api/v1"
).replace(/\/$/, "");

export async function POST(request: Request) {
  const token = request.headers.get("authorization");

  if (!token) {
    return Response.json(
      { message: "Sua sessão expirou. Entre novamente para enviar a foto." },
      { status: 401 },
    );
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/uploads/images`, {
      body: await request.formData(),
      headers: { Authorization: token },
      method: "POST",
    });
  } catch {
    return Response.json(
      { message: "Não foi possível conectar ao serviço de upload agora." },
      { status: 503 },
    );
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return Response.json(
      { message: body?.error?.message ?? body?.message ?? "Não foi possível enviar a foto." },
      { status: response.status },
    );
  }

  return Response.json(body);
}
