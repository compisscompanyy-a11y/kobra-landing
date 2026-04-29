import { Client } from "@notionhq/client";
import type { ContactFormInput } from "./validation";

/**
 * Notion client + helpers for the "Solicitudes" database.
 *
 * Required env vars:
 *   NOTION_TOKEN          – Internal integration token (secret_…)
 *   NOTION_DATABASE_ID    – ID of the Solicitudes DB (printed by setup script)
 *
 * The DB is created once via `npm run setup-notion`. At runtime we only
 * insert pages — no schema introspection, no "create-if-missing" round trip.
 */

let cachedClient: Client | null = null;

export function getNotionClient(): Client {
  if (cachedClient) return cachedClient;
  const auth = process.env.NOTION_TOKEN;
  if (!auth) {
    throw new Error(
      "NOTION_TOKEN no configurado. Crea una integración en https://www.notion.so/my-integrations y guárdalo en .env.local"
    );
  }
  cachedClient = new Client({ auth });
  return cachedClient;
}

export interface CreateSolicitudResult {
  pageId: string;
  url: string;
}

export async function createSolicitud(
  data: ContactFormInput
): Promise<CreateSolicitudResult> {
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!databaseId) {
    throw new Error(
      "NOTION_DATABASE_ID no configurado. Ejecuta `npm run setup-notion` y pega el ID que imprime."
    );
  }

  const notion = getNotionClient();
  const now = new Date().toISOString();

  const properties: Record<string, unknown> = {
    Nombre: {
      title: [{ type: "text", text: { content: data.name } }],
    },
    Email: {
      email: data.email,
    },
    Servicio: {
      select: { name: data.product },
    },
    Estado: {
      select: { name: "Nuevo" },
    },
    "Fecha de envío": {
      date: { start: now },
    },
  };

  if (data.phone && data.phone.trim()) {
    properties["Teléfono"] = { phone_number: data.phone.trim() };
  }

  if (data.message && data.message.trim()) {
    properties["Mensaje"] = {
      rich_text: [{ type: "text", text: { content: data.message.trim() } }],
    };
  }

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    properties: properties as any,
  });

  // The Notion SDK returns either PageObjectResponse or PartialPageObjectResponse.
  // Both expose `id`; only the full response exposes `url`.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const url = (response as any).url ?? "";
  return { pageId: response.id, url };
}
