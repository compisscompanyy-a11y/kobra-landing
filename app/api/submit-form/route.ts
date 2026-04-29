import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactFormSchema } from "@/lib/validation";
import { createSolicitud } from "@/lib/notion";
import { sendNotificationEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/submit-form
 *
 * Body: JSON matching contactFormSchema (see lib/validation.ts).
 *
 * Behavior:
 *   1. Validate.
 *   2. Drop spam silently (honeypot field non-empty → 200 OK, do nothing).
 *   3. Insert row in Notion (Solicitudes DB) with state "Nuevo".
 *   4. Send notification email via Resend.
 *
 * Notion failure is fatal (we can't lose leads). Email failure is logged but
 * does NOT fail the request — the lead is already saved in Notion, and we'd
 * rather give the user a success response than have them re-submit.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body inválido: se esperaba JSON." },
      { status: 400 }
    );
  }

  let data;
  try {
    data = contactFormSchema.parse(payload);
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos del formulario inválidos.",
          issues: err.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 422 }
      );
    }
    throw err;
  }

  // Honeypot: bots fill the hidden `website` field. Pretend success, log, exit.
  if (data.website && data.website.length > 0) {
    console.info("[submit-form] honeypot triggered — silently dropping");
    return NextResponse.json({ ok: true });
  }

  // 1) Notion (fatal on failure)
  let notionUrl: string | undefined;
  try {
    const result = await createSolicitud(data);
    notionUrl = result.url;
    console.info("[submit-form] Notion page created:", result.pageId);
  } catch (err) {
    console.error("[submit-form] Notion error:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "No pudimos guardar tu solicitud. Por favor inténtalo de nuevo o escríbenos directamente.",
      },
      { status: 502 }
    );
  }

  // 2) Email (best-effort)
  try {
    await sendNotificationEmail({ data, notionUrl });
    console.info("[submit-form] notification email sent");
  } catch (err) {
    console.error("[submit-form] email error (non-fatal):", err);
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { error: "Método no permitido. Usa POST con JSON." },
    { status: 405 }
  );
}
