# SEO Posicionamiento Kobra — Diseño

**Fecha:** 2026-04-28  
**Objetivo:** Posicionar kobra-automation.com en las primeras posiciones de Google para búsquedas como "automatizaciones madrid", "chatbot empresas madrid", "agente voz IA" y términos relacionados.

---

## Contexto

El sitio actualmente solo aparece en búsquedas de marca ("kobra ai", "kobra empresa"). Cero impresiones para keywords genéricas. El diagnóstico revela errores técnicos críticos que bloquean el indexado correcto.

**Datos clave:**
- Dominio real: `https://www.kobra-automation.com`
- Google Search Console: verificado (`hRGHHUKuNIyE04mPOyoltC0QgwSKfymsPvz7EphWinA`)
- GA4: no instalado aún (placeholder `G-XXXXXXXXXX`)
- Framework: Next.js 14 (App Router)
- Deploy: Vercel via GitHub

---

## Problemas críticos identificados

1. **SITE_URL incorrecto** — todo el código apunta a `https://kobra.ai`. Canonicals, sitemap y Schema.org apuntan al dominio equivocado.
2. **Triple H1 sin keywords** — Hero.tsx tiene 3 `<h1>` con texto "Tu negocio. Automatizado. Por Kobra AI." sin keywords de Madrid ni automatización.
3. **Hero es client-side** — `"use client"` + useLang() context → H1 se renderiza con JS, Google puede no indexarlo.
4. **Google verification es placeholder** — `google-site-verification-placeholder` publicado en producción.
5. **Sin Google Analytics** — no hay tracking instalado.
6. **Sin páginas locales** — no hay contenido específico para "madrid" más allá de metadatos.
7. **Sin blog** — imposible rankear para términos genéricos sin contenido de calidad.

---

## Solución: Opción C — Técnico + Páginas locales + Blog

### Sección 1: Correcciones técnicas

**1.1 Cambiar SITE_URL**
- Reemplazar `https://kobra.ai` por `https://www.kobra-automation.com` en:
  - `app/layout.tsx`
  - `app/sitemap.ts`
  - `app/robots.ts`
  - `app/page.tsx`
  - `app/servicios/page.tsx`
  - `app/contacto/page.tsx`
  - `app/demo/page.tsx` (si existe)
  - Schema.org en layout.tsx

**1.2 Corregir H1 en Hero**
- Convertir Hero.tsx de client a server component (hardcodear texto ES)
- Reducir a 1 solo `<h1>` con keyword principal: "Automatización con IA para empresas en Madrid"
- Mover subtítulo a `<p>` con keywords secundarias

**1.3 Google Verification**
- Reemplazar `google-site-verification-placeholder` por `hRGHHUKuNIyE04mPOyoltC0QgwSKfymsPvz7EphWinA`

**1.4 Google Analytics 4**
- Añadir `<Script>` gtag.js en `app/layout.tsx` con strategy `afterInteractive`
- ID: `G-XXXXXXXXXX` (placeholder para que el usuario sustituya)
- Eventos: clic "Pedir Demo", clic WhatsApp, envío formulario contacto

**1.5 Mejorar sitemap**
- Añadir todas las nuevas páginas (locales + blog)
- Fechas de lastModified reales por página

---

### Sección 2: Páginas locales SEO

Nuevas rutas en `/app`:

| Ruta | H1 | Keyword objetivo |
|------|-----|-----------------|
| `/automatizaciones-madrid` | "Automatizaciones con IA en Madrid" | automatizaciones madrid |
| `/chatbot-empresas-madrid` | "Chatbot para Empresas en Madrid" | chatbot para empresas madrid |
| `/agente-voz-ia` | "Agente de Voz con Inteligencia Artificial" | agente de voz inteligencia artificial |
| `/automatizacion-whatsapp-empresas` | "Automatización de WhatsApp para Empresas" | chatbot whatsapp empresas |

**Cada página incluye:**
- Metadata completa (title, description, keywords, canonical, OG)
- H1 con keyword exacta
- 400-600 palabras de contenido optimizado (no relleno)
- FAQ específico de esa categoría (con FAQPage Schema.org)
- Schema.org `Service` con precio y área geográfica
- BreadcrumbList Schema.org
- CTA hacia /contacto
- Link interno hacia /servicios y otras páginas locales

---

### Sección 3: Blog SEO

**Estructura:**
- `/blog` — listado de artículos con schema `Blog`
- `/blog/[slug]` — artículo individual con schema `Article` / `BlogPosting`

**5 artículos iniciales:**

| Slug | Título | Keyword objetivo |
|------|--------|-----------------|
| `automatizar-restaurante-madrid-ia` | "Cómo automatizar tu restaurante en Madrid con IA" | automatizar restaurante madrid |
| `chatbot-whatsapp-empresas-guia-2025` | "Chatbot WhatsApp para empresas: guía completa 2025" | chatbot whatsapp empresa |
| `agente-voz-ia-vs-recepcionista` | "Agente de voz IA vs recepcionista: ¿cuál es más rentable?" | agente voz ia empresa |
| `automatizacion-clinicas-dentales-madrid` | "Automatización de procesos para clínicas dentales en Madrid" | automatización clínica dental |
| `cuanto-cuesta-chatbot-empresas-espana` | "¿Cuánto cuesta un chatbot para empresas en España?" | precio chatbot empresa |

**Estructura de cada artículo:**
- Metadata: title, description, canonical, OG, fecha de publicación
- H1 con keyword
- Introducción (100 palabras)
- 3-4 secciones H2
- Conclusión con CTA
- Schema.org `BlogPosting` con author, datePublished, dateModified
- BreadcrumbList
- Link a página de servicio relacionada

**Listado `/blog`:**
- Grid de cards con imagen, título, descripción, fecha
- Schema.org `Blog`
- Paginación preparada (aunque inicialmente todo en una página)

---

### Sección 4: Schema.org mejorado

**Nuevo en layout.tsx:**
- `Organization` schema con sameAs a LinkedIn, WhatsApp

**Nuevo en cada página interior:**
- `BreadcrumbList` con ruta completa

**Nuevo en páginas locales:**
- `Service` con name, description, provider, areaServed (Madrid), offers

**Nuevo en blog:**
- `Blog` en /blog
- `BlogPosting` en cada artículo con author, datePublished, image, wordCount

**Mejora en home:**
- Revisar `AggregateRating` (actualmente tiene reviewCount: 23 hardcodeado — mantener si es real)

---

## Arquitectura de archivos nueva

```
app/
  automatizaciones-madrid/
    page.tsx
  chatbot-empresas-madrid/
    page.tsx
  agente-voz-ia/
    page.tsx
  automatizacion-whatsapp-empresas/
    page.tsx
  blog/
    page.tsx
    [slug]/
      page.tsx
lib/
  blog-posts.ts         ← datos de artículos (título, contenido, meta)
components/
  sections/
    BlogCard.tsx        ← card de artículo para el listado
    LocalHero.tsx       ← hero reutilizable para páginas locales
```

---

## Criterios de éxito

- [ ] Cero errores de cobertura en Google Search Console tras deploy
- [ ] Sitemap.xml con todas las URLs nuevas enviado a GSC
- [ ] Impresiones para "automatizaciones madrid" en 4-8 semanas
- [ ] Core Web Vitals sin regresión (Hero server-side mejora LCP)
- [ ] GA4 recibiendo eventos tras que el usuario añada el ID real

---

## Pendientes del usuario tras el deploy

1. Sustituir `G-XXXXXXXXXX` por su ID de GA4 real en `app/layout.tsx`
2. Enviar el nuevo sitemap.xml desde Google Search Console → Sitemaps
3. Solicitar indexación de las nuevas URLs desde GSC → Inspección de URLs
4. Configurar Google My Business con categoría "Empresa de automatización"
