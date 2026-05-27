import { z } from "zod";
import { apiRequest } from "@/app/api/auth/_lib";

const confirmSchema = z.object({
  token: z.string().min(1, "Link de verificação inválido."),
});

export async function POST(request: Request) {
  const parsed = confirmSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json(
      { message: parsed.error.issues[0]?.message ?? "Link de verificação inválido." },
      { status: 400 },
    );
  }

  const body = await apiRequest("/auth/email/verification/confirm", {
    body: JSON.stringify({ token: parsed.data.token }),
    method: "POST",
  });

  if (body instanceof Response) {
    return body;
  }

  return Response.json(body);
}
