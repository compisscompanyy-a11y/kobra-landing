#!/usr/bin/env node
/**
 * One-shot setup script: creates the "Solicitudes" Notion database under a
 * parent page you've already shared with the integration.
 *
 * Required env vars (read from .env.local or your shell):
 *   NOTION_TOKEN              – Internal integration token
 *   NOTION_PARENT_PAGE_ID     – ID of the parent page (32 hex chars, no dashes,
 *                                or the dashed UUID — the SDK accepts both)
 *
 * Usage:
 *   npm run setup-notion
 *
 * Output: prints the new database ID. Paste it into .env.local as
 * NOTION_DATABASE_ID and into Vercel's Environment Variables.
 */

import { Client } from "@notionhq/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Lightweight .env.local loader so this works without `dotenv`.
function loadEnvFile(relPath) {
  const path = resolve(process.cwd(), relPath);
  if (!existsSync(path)) return;
  const text = readFileSync(path, "utf8");
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    const [, key, valueRaw] = m;
    if (process.env[key]) continue; // don't override real env
    let value = valueRaw.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const token = process.env.NOTION_TOKEN;
const parentPageId = process.env.NOTION_PARENT_PAGE_ID;

if (!token) {
  console.error("✖ Falta NOTION_TOKEN en .env.local");
  process.exit(1);
}
if (!parentPageId) {
  console.error("✖ Falta NOTION_PARENT_PAGE_ID en .env.local");
  console.error(
    "  Crea una página en Notion (ej. 'Kobra CRM'), compártela con la integración"
  );
  console.error(
    "  (botón ··· → Add connections → tu integración), copia su ID de la URL."
  );
  process.exit(1);
}

const notion = new Client({ auth: token });

const services = [
  { name: "Página web profesional", color: "blue" },
  { name: "Chatbot para página web", color: "green" },
  { name: "Chatbot de WhatsApp", color: "green" },
  { name: "Agente de voz telefónico", color: "purple" },
  { name: "No sé, quiero asesoramiento", color: "gray" },
  { name: "Professional website", color: "blue" },
  { name: "Web chatbot", color: "green" },
  { name: "WhatsApp chatbot", color: "green" },
  { name: "Phone voice agent", color: "purple" },
  { name: "Not sure, I need advice", color: "gray" },
];

const states = [
  { name: "Nuevo", color: "yellow" },
  { name: "En proceso", color: "blue" },
  { name: "Cerrado", color: "green" },
];

try {
  console.log("→ Creando base de datos 'Solicitudes'…");
  const db = await notion.databases.create({
    parent: { type: "page_id", page_id: parentPageId },
    icon: { type: "emoji", emoji: "📩" },
    title: [{ type: "text", text: { content: "Solicitudes" } }],
    properties: {
      Nombre: { title: {} },
      Email: { email: {} },
      Teléfono: { phone_number: {} },
      Servicio: { select: { options: services } },
      Estado: { select: { options: states } },
      "Fecha de envío": { date: {} },
      Mensaje: { rich_text: {} },
    },
  });

  console.log("");
  console.log("✓ Base de datos creada.");
  console.log("");
  console.log("  NOTION_DATABASE_ID=" + db.id);
  console.log("");
  console.log("Pega esa línea en .env.local y en las Environment Variables de Vercel.");
  console.log("URL: " + db.url);
} catch (err) {
  console.error("✖ Error creando la base de datos:");
  console.error(err.body ?? err.message ?? err);
  process.exit(1);
}
