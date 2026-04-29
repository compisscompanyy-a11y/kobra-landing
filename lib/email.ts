import { Resend } from "resend";
import type { ContactFormInput } from "./validation";

/**
 * Email layer (Resend).
 *
 * Required env vars:
 *   RESEND_API_KEY      – API key from https://resend.com/api-keys
 *   CONTACT_FROM_EMAIL  – Sender address. Must be on a domain you've verified
 *                         in Resend. Until kobra-automation.com is verified,
 *                         use "onboarding@resend.dev" (works only to the
 *                         signup email of the Resend account).
 *   CONTACT_TO_EMAIL    – Where notifications land (e.g. kobra.automation.ia@gmail.com)
 */

let cachedClient: Resend | null = null;

function getResend(): Resend {
  if (cachedClient) return cachedClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY no configurado. Obtén una clave en https://resend.com/api-keys"
    );
  }
  cachedClient = new Resend(apiKey);
  return cachedClient;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface SendNotificationOptions {
  data: ContactFormInput;
  notionUrl?: string;
}

export async function sendNotificationEmail({
  data,
  notionUrl,
}: SendNotificationOptions): Promise<void> {
  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Kobra AI <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL;
  if (!to) {
    throw new Error(
      "CONTACT_TO_EMAIL no configurado (destinatario de las notificaciones)."
    );
  }

  const subject = `Nueva solicitud — ${data.product} — ${data.name}`;

  const text = [
    `Nombre:    ${data.name}`,
    `Email:     ${data.email}`,
    data.phone ? `Teléfono:  ${data.phone}` : null,
    `Servicio:  ${data.product}`,
    "",
    "Mensaje:",
    data.message?.trim() || "(sin mensaje)",
    "",
    notionUrl ? `Ver en Notion: ${notionUrl}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#0d0d0d;color:#eaeaea;border-radius:12px;">
      <h2 style="margin:0 0 16px;color:#00E676;font-size:20px;">Nueva solicitud de contacto</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:6px 0;color:#888;width:120px;">Nombre</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Email</td><td><a href="mailto:${escapeHtml(data.email)}" style="color:#00E676;">${escapeHtml(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding:6px 0;color:#888;">Teléfono</td><td>${escapeHtml(data.phone)}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#888;">Servicio</td><td>${escapeHtml(data.product)}</td></tr>
      </table>
      ${
        data.message?.trim()
          ? `<div style="margin-top:20px;padding:16px;background:#111;border-radius:8px;border-left:3px solid #00E676;white-space:pre-wrap;">${escapeHtml(data.message.trim())}</div>`
          : ""
      }
      ${
        notionUrl
          ? `<p style="margin-top:24px;font-size:13px;"><a href="${escapeHtml(notionUrl)}" style="color:#00E676;">Abrir en Notion →</a></p>`
          : ""
      }
      <p style="margin-top:24px;color:#555;font-size:12px;">Enviado desde el formulario de kobra-automation.com</p>
    </div>
  `;

  const resend = getResend();
  const result = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (result.error) {
    throw new Error(
      `Resend rechazó el envío: ${result.error.name ?? "unknown"} — ${result.error.message ?? ""}`
    );
  }
}
