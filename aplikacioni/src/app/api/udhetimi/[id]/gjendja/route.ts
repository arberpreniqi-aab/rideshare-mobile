import { lexoGjendjen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";

// Leximi i gjendjes për dy ekranet. Përgjigjja varet nga sesioni, prandaj nuk ruhet në asnjë cache.
// Ky lexim vetëm lexon: nuk dërgon dhe nuk pranon kërkesa.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const headers = { "Cache-Control": "private, no-store", Vary: "Cookie" };
  try {
    const gjendja = await lexoGjendjen(id);
    if (!gjendja) return Response.json({ error: "Udhëtimi nuk u gjet." }, { status: 404, headers });
    return Response.json(gjendja, { headers });
  } catch {
    return Response.json({ error: "Gjendja nuk mund të lexohet tani." }, { status: 503, headers });
  }
}
