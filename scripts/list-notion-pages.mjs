#!/usr/bin/env node
import { Client } from "@notionhq/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(p) {
  const path = resolve(process.cwd(), p);
  if (!existsSync(path)) return;
  for (const raw of readFileSync(path, "utf8").split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
    if (!m) continue;
    let v = m[2].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
      v = v.slice(1, -1);
    if (!process.env[m[1]]) process.env[m[1]] = v;
  }
}
loadEnvFile(".env.local");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

console.log("Páginas accesibles por la integración:");
const res = await notion.search({ filter: { property: "object", value: "page" } });
for (const r of res.results) {
  const title =
    Object.values(r.properties ?? {})
      .find((p) => p.type === "title")
      ?.title?.map((t) => t.plain_text)
      .join("") || "(sin título)";
  console.log(`  - ${title}  →  ${r.id}`);
}
console.log("\nBases de datos accesibles:");
const dbs = await notion.search({ filter: { property: "object", value: "database" } });
for (const r of dbs.results) {
  const title = (r.title ?? []).map((t) => t.plain_text).join("") || "(sin título)";
  console.log(`  - ${title}  →  ${r.id}`);
}
