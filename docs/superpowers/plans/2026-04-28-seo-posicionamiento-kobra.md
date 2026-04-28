# SEO Posicionamiento Kobra — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Posicionar kobra-automation.com para búsquedas genéricas de automatización en Madrid creando páginas locales, blog SEO y corrigiendo errores técnicos críticos.

**Architecture:** Next.js 14 App Router. Corregir SITE_URL, convertir Hero a server component, añadir rutas /automatizaciones-madrid, /chatbot-empresas-madrid, /agente-voz-ia, /automatizacion-whatsapp-empresas y /blog con 5 artículos. Schema.org mejorado en cada página.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Schema.org JSON-LD

---

## Archivos modificados
- `app/layout.tsx` — SITE_URL, verification code, GA4, Schema.org
- `app/sitemap.ts` — añadir todas las nuevas URLs
- `app/robots.ts` — SITE_URL
- `app/page.tsx` — canonical
- `app/servicios/page.tsx` — canonical
- `app/contacto/page.tsx` — canonical
- `app/demo/page.tsx` — canonical (si existe)
- `components/sections/Hero.tsx` — server component, H1 único con keywords

## Archivos creados
- `lib/blog-posts.ts` — datos de los 5 artículos del blog
- `app/automatizaciones-madrid/page.tsx`
- `app/chatbot-empresas-madrid/page.tsx`
- `app/agente-voz-ia/page.tsx`
- `app/automatizacion-whatsapp-empresas/page.tsx`
- `app/blog/page.tsx` — listado del blog
- `app/blog/[slug]/page.tsx` — artículo individual

---

### Task 1: Corregir SITE_URL y metadata global en layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] Cambiar `const SITE_URL = "https://kobra.ai"` → `const SITE_URL = "https://www.kobra-automation.com"`
- [ ] Reemplazar `google: "google-site-verification-placeholder"` → `google: "hRGHHUKuNIyE04mPOyoltC0QgwSKfymsPvz7EphWinA"`
- [ ] Añadir GA4 script en el body (antes del closing tag)
- [ ] Actualizar Schema.org localBusinessSchema: url, @id, sameAs con kobra-automation.com
- [ ] Commit: `fix: corregir SITE_URL a kobra-automation.com y google verification`

---

### Task 2: Corregir canonicals en páginas existentes

**Files:**
- Modify: `app/page.tsx`, `app/servicios/page.tsx`, `app/contacto/page.tsx`

- [ ] En cada archivo cambiar `canonical: "https://kobra.ai..."` → `canonical: "https://www.kobra-automation.com..."`
- [ ] Cambiar OG url en cada página
- [ ] Commit: `fix: corregir canonicals en páginas existentes`

---

### Task 3: Convertir Hero a server component con H1 keyword-optimizado

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] Eliminar `"use client"` y el import de `useLang`
- [ ] Hardcodear el texto en español directamente
- [ ] Cambiar los 3 `<h1>` por 1 solo `<h1>` con keyword: "Automatización con IA para empresas en Madrid"
- [ ] Mover el texto secundario a `<p>` con keywords naturales
- [ ] Mantener los botones CTA como client component separado si necesitan interactividad (o simplificarlos a links estáticos)
- [ ] Commit: `seo: Hero a server component con H1 keyword-optimizado`

---

### Task 4: Crear lib/blog-posts.ts con datos de los 5 artículos

**Files:**
- Create: `lib/blog-posts.ts`

- [ ] Crear interfaz BlogPost con: slug, title, description, date, readTime, category, content (HTML/markdown), keywords
- [ ] Definir los 5 artículos con contenido completo (400-600 palabras cada uno)
- [ ] Exportar función `getBlogPost(slug)` y `getAllBlogPosts()`
- [ ] Commit: `feat: añadir datos de artículos del blog`

---

### Task 5: Crear página /automatizaciones-madrid

**Files:**
- Create: `app/automatizaciones-madrid/page.tsx`

- [ ] Metadata: title "Automatizaciones con IA en Madrid | Kobra AI", description, canonical, OG
- [ ] H1: "Automatizaciones con IA en Madrid"
- [ ] Contenido: 500 palabras sobre automatización para empresas madrileñas
- [ ] FAQ específico de automatización en Madrid con FAQPage Schema.org
- [ ] Service Schema.org con areaServed Madrid
- [ ] BreadcrumbList Schema.org
- [ ] CTA hacia /contacto
- [ ] Commit: `feat: página SEO /automatizaciones-madrid`

---

### Task 6: Crear página /chatbot-empresas-madrid

**Files:**
- Create: `app/chatbot-empresas-madrid/page.tsx`

- [ ] Metadata: title "Chatbot para Empresas en Madrid | Kobra AI"
- [ ] H1: "Chatbot para Empresas en Madrid"
- [ ] Contenido: 500 palabras sobre chatbots para pymes madrileñas
- [ ] FAQ con FAQPage Schema.org
- [ ] Service Schema.org
- [ ] BreadcrumbList Schema.org
- [ ] Commit: `feat: página SEO /chatbot-empresas-madrid`

---

### Task 7: Crear página /agente-voz-ia

**Files:**
- Create: `app/agente-voz-ia/page.tsx`

- [ ] Metadata: title "Agente de Voz con Inteligencia Artificial para Empresas | Kobra AI"
- [ ] H1: "Agente de Voz con Inteligencia Artificial"
- [ ] Contenido: 500 palabras sobre agentes de voz IA
- [ ] FAQ con FAQPage Schema.org
- [ ] Service Schema.org
- [ ] BreadcrumbList Schema.org
- [ ] Commit: `feat: página SEO /agente-voz-ia`

---

### Task 8: Crear página /automatizacion-whatsapp-empresas

**Files:**
- Create: `app/automatizacion-whatsapp-empresas/page.tsx`

- [ ] Metadata: title "Automatización de WhatsApp para Empresas | Kobra AI"
- [ ] H1: "Automatización de WhatsApp para Empresas"
- [ ] Contenido: 500 palabras sobre chatbot WhatsApp empresas
- [ ] FAQ con FAQPage Schema.org
- [ ] Service Schema.org
- [ ] BreadcrumbList Schema.org
- [ ] Commit: `feat: página SEO /automatizacion-whatsapp-empresas`

---

### Task 9: Crear blog listing /blog

**Files:**
- Create: `app/blog/page.tsx`

- [ ] Metadata: title "Blog de Automatización con IA | Kobra AI"
- [ ] H1: "Blog: Automatización con IA para Empresas"
- [ ] Grid de cards con todos los artículos (importar de lib/blog-posts.ts)
- [ ] Schema.org Blog
- [ ] BreadcrumbList
- [ ] Commit: `feat: página listado del blog`

---

### Task 10: Crear blog artículo /blog/[slug]

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] generateStaticParams con todos los slugs
- [ ] generateMetadata dinámico por artículo
- [ ] H1 con título del artículo
- [ ] Contenido renderizado
- [ ] Schema.org BlogPosting con author, datePublished, dateModified
- [ ] BreadcrumbList
- [ ] CTA al final hacia /contacto
- [ ] Commit: `feat: template de artículo de blog`

---

### Task 11: Actualizar sitemap.ts

**Files:**
- Modify: `app/sitemap.ts`

- [ ] Añadir las 4 páginas locales con priority 0.85
- [ ] Añadir /blog con priority 0.8
- [ ] Añadir los 5 slugs de artículos con priority 0.7 y fecha real
- [ ] Commit: `seo: actualizar sitemap con nuevas rutas`

---

### Task 12: Añadir BreadcrumbList a páginas existentes

**Files:**
- Modify: `app/servicios/page.tsx`, `app/contacto/page.tsx`

- [ ] Añadir script JSON-LD con BreadcrumbList en cada página
- [ ] Commit: `seo: añadir BreadcrumbList a páginas existentes`
