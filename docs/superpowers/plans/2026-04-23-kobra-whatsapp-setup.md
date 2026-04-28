# Kobra AI WhatsApp Chatbot — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Poner en producción el chatbot de WhatsApp de Kobra AI conectando Meta Cloud API → Chatwoot → n8n → Claude API → HubSpot + Calendly.

**Architecture:** Los 3 flujos n8n ya están creados (IDs: 161Z0mDNuxo56hop, uq17eTclrU6FZrph, 48p1C05VIF238Owf). Solo hay que configurar la infraestructura externa (VPS + Docker), los servicios (Chatwoot, Meta, HubSpot, Notion) y rellenar los credenciales en n8n.

**Tech Stack:** Docker, Chatwoot, Meta Cloud API (WhatsApp), n8n, Claude API (claude-sonnet-4-6), HubSpot CRM (free), Notion API, Calendly, Nginx + SSL.

---

## Mapa de archivos / servicios

| Servicio | Dónde vive | Qué hace |
|---|---|---|
| `n8n` | VPS Docker puerto 5678 | Cerebro de automatización |
| `Chatwoot` | VPS Docker puerto 3000 | Bandeja compartida WhatsApp |
| `Nginx` | VPS | Reverse proxy + SSL para ambos |
| Meta Cloud API | Meta Business Suite | Canal WhatsApp oficial |
| HubSpot | app.hubspot.com | CRM + pipeline de leads |
| Notion | notion.so | Base de conocimiento del bot |
| Anthropic | api.anthropic.com | LLM (Claude) |

---

## Task 1: Contratar y preparar el VPS

**Servicios:** Hetzner Cloud (recomendado) — CX21 (2 vCPU, 4GB RAM, 40GB SSD) ~6€/mes

- [ ] **Paso 1: Crear cuenta en Hetzner Cloud**

  Ve a https://www.hetzner.com/cloud → Sign up → verifica email → añade método de pago.

- [ ] **Paso 2: Crear servidor**

  En Hetzner Console:
  - Location: Nuremberg (EU)
  - Image: **Ubuntu 22.04**
  - Type: **CX21** (2 vCPU, 4GB RAM)
  - SSH Key: sube tu clave pública (o usa contraseña root)
  - Name: `kobra-automation`
  - Clic en "Create & Buy"

- [ ] **Paso 3: Apuntar dominio a la IP del VPS**

  En tu proveedor de DNS (Cloudflare, etc.), crea dos registros A:
  ```
  chat.kobra.ai    →  [IP del VPS]   (para Chatwoot)
  n8n.kobra.ai     →  [IP del VPS]   (para n8n)
  ```
  Espera 5-10 min a que propague.

- [ ] **Paso 4: Conectar al VPS por SSH**

  ```bash
  ssh root@[IP_DEL_VPS]
  ```

- [ ] **Paso 5: Actualizar sistema e instalar dependencias**

  ```bash
  apt update && apt upgrade -y
  apt install -y curl git nginx certbot python3-certbot-nginx ufw
  ```

- [ ] **Paso 6: Instalar Docker**

  ```bash
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
  docker --version
  ```
  Esperado: `Docker version 24.x.x`

- [ ] **Paso 7: Configurar firewall**

  ```bash
  ufw allow OpenSSH
  ufw allow 'Nginx Full'
  ufw enable
  ufw status
  ```
  Esperado: Status active con puertos 22, 80, 443 abiertos.

---

## Task 2: Instalar Chatwoot con Docker

**Archivos:**
- Crear: `/opt/chatwoot/docker-compose.yml`
- Crear: `/opt/chatwoot/.env`

- [ ] **Paso 1: Crear directorio y archivo de entorno**

  ```bash
  mkdir -p /opt/chatwoot
  cd /opt/chatwoot
  ```

  Descarga la configuración oficial:
  ```bash
  wget -O .env https://raw.githubusercontent.com/chatwoot/chatwoot/develop/.env.example
  ```

- [ ] **Paso 2: Editar variables de entorno críticas**

  ```bash
  nano .env
  ```

  Edita estas líneas:
  ```env
  SECRET_KEY_BASE=<genera con: openssl rand -hex 64>
  FRONTEND_URL=https://chat.kobra.ai
  DEFAULT_LOCALE=es
  FORCE_SSL=true
  ENABLE_ACCOUNT_SIGNUP=false
  ```

  Para generar SECRET_KEY_BASE en otra terminal:
  ```bash
  openssl rand -hex 64
  ```

- [ ] **Paso 3: Crear docker-compose.yml**

  ```bash
  nano /opt/chatwoot/docker-compose.yml
  ```

  Contenido:
  ```yaml
  version: '3'

  services:
    base: &base
      image: chatwoot/chatwoot:latest
      env_file: .env
      volumes:
        - /data/chatwoot/storage:/app/storage

    rails:
      <<: *base
      depends_on:
        - postgres
        - redis
      ports:
        - "3000:3000"
      environment:
        - NODE_ENV=production
        - RAILS_ENV=production
      command: bundle exec rails s -p 3000 -b 0.0.0.0

    sidekiq:
      <<: *base
      depends_on:
        - postgres
        - redis
      environment:
        - NODE_ENV=production
        - RAILS_ENV=production
      command: bundle exec sidekiq -C config/sidekiq.yml

    postgres:
      image: postgres:14
      restart: always
      volumes:
        - /data/chatwoot/postgres:/var/lib/postgresql/data
      environment:
        POSTGRES_DB: chatwoot
        POSTGRES_USER: chatwoot
        POSTGRES_PASSWORD: chatwoot_password_segura_2024

    redis:
      image: redis:alpine
      restart: always
      volumes:
        - /data/chatwoot/redis:/data
  ```

- [ ] **Paso 4: Actualizar .env con credenciales de postgres**

  En el archivo `.env`, asegúrate de que estas líneas coincidan con el docker-compose:
  ```env
  POSTGRES_HOST=postgres
  POSTGRES_USERNAME=chatwoot
  POSTGRES_PASSWORD=chatwoot_password_segura_2024
  POSTGRES_DATABASE=chatwoot
  REDIS_URL=redis://redis:6379
  ```

- [ ] **Paso 5: Lanzar Chatwoot**

  ```bash
  mkdir -p /data/chatwoot/storage /data/chatwoot/postgres /data/chatwoot/redis
  docker compose up -d
  docker compose logs -f rails
  ```

  Espera a ver: `Listening on http://0.0.0.0:3000`

- [ ] **Paso 6: Crear base de datos**

  ```bash
  docker compose exec rails bundle exec rails db:chatwoot_prepare
  ```

- [ ] **Paso 7: Verificar que Chatwoot responde**

  ```bash
  curl http://localhost:3000
  ```
  Esperado: HTML con título "Chatwoot"

---

## Task 3: Instalar n8n con Docker

**Archivos:**
- Crear: `/opt/n8n/docker-compose.yml`

- [ ] **Paso 1: Crear directorio**

  ```bash
  mkdir -p /opt/n8n /data/n8n
  cd /opt/n8n
  ```

- [ ] **Paso 2: Crear docker-compose.yml**

  ```bash
  nano /opt/n8n/docker-compose.yml
  ```

  Contenido:
  ```yaml
  version: '3'

  services:
    n8n:
      image: n8nio/n8n
      restart: always
      ports:
        - "5678:5678"
      environment:
        - N8N_HOST=n8n.kobra.ai
        - N8N_PORT=5678
        - N8N_PROTOCOL=https
        - NODE_ENV=production
        - WEBHOOK_URL=https://n8n.kobra.ai/
        - GENERIC_TIMEZONE=Europe/Madrid
        - N8N_BASIC_AUTH_ACTIVE=true
        - N8N_BASIC_AUTH_USER=kobra
        - N8N_BASIC_AUTH_PASSWORD=<contraseña_segura>
        - N8N_ENCRYPTION_KEY=<genera con: openssl rand -hex 32>
      volumes:
        - /data/n8n:/home/node/.n8n
  ```

- [ ] **Paso 3: Lanzar n8n**

  ```bash
  docker compose up -d
  docker compose logs -f n8n
  ```

  Espera a ver: `Editor is now accessible via: http://localhost:5678`

---

## Task 4: Configurar Nginx + SSL

**Archivos:**
- Crear: `/etc/nginx/sites-available/chatwoot`
- Crear: `/etc/nginx/sites-available/n8n`

- [ ] **Paso 1: Configurar Nginx para Chatwoot**

  ```bash
  nano /etc/nginx/sites-available/chatwoot
  ```

  Contenido:
  ```nginx
  server {
      listen 80;
      server_name chat.kobra.ai;

      location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```

- [ ] **Paso 2: Configurar Nginx para n8n**

  ```bash
  nano /etc/nginx/sites-available/n8n
  ```

  Contenido:
  ```nginx
  server {
      listen 80;
      server_name n8n.kobra.ai;

      location / {
          proxy_pass http://localhost:5678;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_cache_bypass $http_upgrade;
      }
  }
  ```

- [ ] **Paso 3: Activar sitios y recargar Nginx**

  ```bash
  ln -s /etc/nginx/sites-available/chatwoot /etc/nginx/sites-enabled/
  ln -s /etc/nginx/sites-available/n8n /etc/nginx/sites-enabled/
  nginx -t
  systemctl reload nginx
  ```

  Esperado: `nginx: configuration file /etc/nginx/nginx.conf test is successful`

- [ ] **Paso 4: Generar certificados SSL**

  ```bash
  certbot --nginx -d chat.kobra.ai -d n8n.kobra.ai --non-interactive --agree-tos -m alvaromendezburriel@gmail.com
  ```

  Esperado: `Congratulations! Your certificate and chain have been saved`

- [ ] **Paso 5: Verificar acceso HTTPS**

  ```bash
  curl -I https://chat.kobra.ai
  curl -I https://n8n.kobra.ai
  ```

  Esperado: `HTTP/2 200` en ambos.

---

## Task 5: Configurar Chatwoot — Cuenta y WhatsApp

- [ ] **Paso 1: Crear cuenta de administrador en Chatwoot**

  Ve a `https://chat.kobra.ai` → "Create a new account" → rellena datos de Kobra AI.

- [ ] **Paso 2: Configurar idioma y zona horaria**

  Settings → Account Settings:
  - Language: Español
  - Timezone: Madrid
  - Clic Save

- [ ] **Paso 3: Crear etiquetas (labels) del sistema**

  Settings → Labels → New Label. Crea estas 5:
  - `bot` (color verde)
  - `humano` (color naranja)
  - `cliente` (color azul)
  - `cerrado` (color gris)
  - `follow-up` (color amarillo)

- [ ] **Paso 4: Invitar agentes del equipo**

  Settings → Agents → Invite Agent:
  - Añade los emails del equipo de Kobra
  - Role: Agent

- [ ] **Paso 5: Obtener API Access Token**

  Profile (icono arriba derecha) → Access Token → copia el token.
  **Guárdalo**, lo necesitas para n8n como `YOUR_CHATWOOT_USER_TOKEN`.

- [ ] **Paso 6: Anotar Account ID**

  En la URL de Chatwoot verás: `https://chat.kobra.ai/app/accounts/1/...`
  El número `1` es tu `YOUR_ACCOUNT_ID`.

---

## Task 6: Configurar Meta Cloud API (WhatsApp Business)

- [ ] **Paso 1: Crear app en Meta for Developers**

  Ve a https://developers.facebook.com → My Apps → Create App:
  - Type: **Business**
  - App name: Kobra AI
  - Business account: selecciona tu cuenta de Meta Business

- [ ] **Paso 2: Añadir producto WhatsApp**

  En el dashboard de la app → Add Product → WhatsApp → Set Up.

- [ ] **Paso 3: Añadir número de teléfono**

  WhatsApp → Getting Started → Add phone number:
  - Selecciona tu número de WhatsApp Business existente
  - Verifica con el SMS/llamada que te mandan

- [ ] **Paso 4: Anotar credenciales de Meta**

  En WhatsApp → API Setup:
  - **Phone Number ID** → guarda como `YOUR_PHONE_NUMBER_ID`
  - **WhatsApp Business Account ID** → guarda también

- [ ] **Paso 5: Crear System User Token permanente**

  Ve a Business Settings → System Users → Add:
  - Name: `kobra-n8n-bot`
  - Role: Admin
  → Add Assets → añade tu app → permiso `whatsapp_business_messaging`
  → Generate Token → elige tu app → permisos: `whatsapp_business_messaging`, `whatsapp_business_management`
  → copia el token → guarda como `YOUR_META_PERMANENT_TOKEN`

- [ ] **Paso 6: Conectar WhatsApp a Chatwoot**

  En Chatwoot: Settings → Inboxes → Add Inbox → WhatsApp:
  - API Key: pega el System User Token
  - Phone Number ID: pega el Phone Number ID
  - Business Account ID: pega el WABA ID
  - Name: "Kobra WhatsApp Principal"
  → Next → asigna agentes → Finish

  Chatwoot te mostrará una **Webhook URL** automáticamente. Cópiala.

- [ ] **Paso 7: Configurar webhook en Meta**

  En Meta for Developers → WhatsApp → Configuration → Webhooks:
  - Callback URL: la URL que te dio Chatwoot
  - Verify Token: el que Chatwoot configure automáticamente
  - Suscribe a: `messages`
  → Verify and Save

- [ ] **Paso 8: Verificar integración**

  Desde un número de teléfono diferente, envía "Hola" a tu número de WhatsApp Business.
  Debe aparecer en Chatwoot en la bandeja "Kobra WhatsApp Principal".

---

## Task 7: Configurar HubSpot — Propiedades y Pipeline

- [ ] **Paso 1: Crear cuenta HubSpot gratuita**

  Ve a https://app.hubspot.com → Sign up → usa `alvaromendezburriel@gmail.com` → elige "Free tools".

- [ ] **Paso 2: Crear propiedades personalizadas de contacto**

  Settings → Properties → Contact properties → Create property. Crea estas 8:

  | Nombre interno | Label | Tipo |
  |---|---|---|
  | `kobra_tipo` | Tipo Kobra | Single-line text |
  | `kobra_sector` | Sector | Single-line text |
  | `kobra_necesidad` | Necesidad | Single-line text |
  | `kobra_presupuesto` | Presupuesto | Single-line text |
  | `kobra_urgencia` | Urgencia | Single-line text |
  | `kobra_lead_score` | Lead Score | Number |
  | `kobra_fuente` | Fuente | Single-line text |
  | `kobra_followup_enviado` | Follow-up enviado | Single-line text |

- [ ] **Paso 3: Crear pipeline de ventas personalizado**

  Settings → Deals → Pipelines → Edit pipeline "Sales Pipeline":
  
  Renombra/añade etapas en este orden:
  1. `nuevo_lead` → Nuevo Lead (probabilidad 10%)
  2. `cualificado` → Cualificado (probabilidad 25%)
  3. `appointmentscheduled` → Demo Agendada (probabilidad 50%) ← este nombre exacto lo usa n8n
  4. `propuesta_enviada` → Propuesta Enviada (probabilidad 70%)
  5. `negociacion` → Negociación (probabilidad 85%)
  6. `closedwon` → Cerrado Ganado (100%)
  7. `closedlost` → Cerrado Perdido (0%)

- [ ] **Paso 4: Crear Private App para API**

  Settings → Integrations → Private Apps → Create private app:
  - Name: `Kobra n8n Integration`
  - Scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.deals.read`, `crm.objects.deals.write`
  → Create app → copia el token → guarda como `YOUR_HUBSPOT_PRIVATE_APP_TOKEN`

- [ ] **Paso 5: Crear webhook para deal "Cerrado Ganado"**

  Settings → Integrations → Webhooks → Create webhook subscription:
  - Event type: `deal.propertyChange`
  - Property: `dealstage`
  - Target URL: `https://n8n.kobra.ai/webhook/kobra-deal-cerrado`
  → Create

---

## Task 8: Configurar Notion — Base de Conocimiento

- [ ] **Paso 1: Crear Integration de Notion**

  Ve a https://www.notion.so/my-integrations → New integration:
  - Name: `Kobra Bot`
  - Associated workspace: el tuyo
  → Submit → copia el "Internal Integration Token" → guarda como `YOUR_NOTION_INTEGRATION_TOKEN`

- [ ] **Paso 2: Crear página de base de conocimiento**

  En Notion, crea una página nueva llamada: **"Kobra AI — Base de Conocimiento Bot"**

  Estructura sugerida:
  ```
  ## Servicios que ofrecemos
  - Chatbot WhatsApp (desde 800€ setup + 200€/mes)
  - Agente de voz IA (ElevenLabs + OpenAI Voice)
  - Automatización de procesos con n8n
  - Integraciones CRM (HubSpot, Zoho, Google Calendar)
  - Setup en menos de 1 semana
  - Sin contrato de permanencia (30 días preaviso)

  ## Sectores donde trabajamos
  Restaurantes, clínicas dentales, inmobiliarias, peluquerías, academias, talleres, ecommerce.

  ## FAQs frecuentes
  [copia las 8 preguntas/respuestas de la web de Kobra]

  ## Proceso de onboarding
  Día 1: Auditoría gratuita. Días 2-5: Configuración e integración. Semana 2: IA en producción.

  ## Qué NO hacemos
  No vendemos software genérico. No usamos APIs no oficiales. No hacemos webs ni SEO.

  ## Casos de éxito
  [añade ejemplos reales cuando los tengas]

  ## Objecciones comunes y cómo responderlas
  - "Es muy caro" → ROI: 1 chatbot equivale a 1 empleado part-time a 1/10 del coste
  - "¿Y si falla?" → Monitorización 24/7 + soporte incluido en mantenimiento
  - "No sé si WhatsApp me puede bloquear" → API oficial Meta = 0 riesgo de bloqueo
  ```

- [ ] **Paso 3: Conectar Integration a la página**

  En la página de Notion → ··· (tres puntos) → Add connections → busca "Kobra Bot" → Confirm.

- [ ] **Paso 4: Obtener el Page ID**

  Abre la página en Notion. La URL es:
  `https://www.notion.so/Kobra-AI-Base-de-Conocimiento-Bot-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

  El ID son los últimos 32 caracteres (sin guiones). Guarda como `YOUR_NOTION_PAGE_ID`.

  Formato correcto: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` (con guiones).

- [ ] **Paso 5: Verificar API de Notion**

  Desde terminal:
  ```bash
  curl -H "Authorization: Bearer YOUR_NOTION_INTEGRATION_TOKEN" \
       -H "Notion-Version: 2022-06-28" \
       "https://api.notion.com/v1/blocks/YOUR_NOTION_PAGE_ID/children"
  ```
  Esperado: JSON con los bloques de tu página.

---

## Task 9: Obtener API Key de Anthropic

- [ ] **Paso 1: Crear cuenta en Anthropic**

  Ve a https://console.anthropic.com → Sign up → verifica email.

- [ ] **Paso 2: Añadir método de pago**

  Console → Billing → Add payment method → añade tarjeta de crédito.
  Añade créditos iniciales (mínimo 5$).

- [ ] **Paso 3: Crear API Key**

  Console → API Keys → Create Key:
  - Name: `kobra-whatsapp-bot`
  → Create → copia la key → guarda como `YOUR_ANTHROPIC_API_KEY`

  ⚠️ La clave solo se muestra una vez. Guárdala en un gestor de contraseñas.

- [ ] **Paso 4: Verificar API Key**

  ```bash
  curl https://api.anthropic.com/v1/messages \
    -H "x-api-key: YOUR_ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{"model":"claude-sonnet-4-6","max_tokens":10,"messages":[{"role":"user","content":"Hola"}]}'
  ```
  Esperado: JSON con `{"content":[{"type":"text","text":"..."}]}`

---

## Task 10: Configurar credenciales en n8n

Los 3 flujos ya están creados. Ahora hay que reemplazar todos los `YOUR_` con los valores reales.

- [ ] **Paso 1: Acceder a n8n**

  Abre `https://n8n.kobra.ai` → login con las credenciales del docker-compose.

- [ ] **Paso 2: Editar flujo "Kobra AI — WhatsApp Chatbot Principal"**

  Abre el workflow → busca cada nodo HTTP Request y actualiza:

  **Nodos de Chatwoot** (6 nodos):
  - Reemplaza `YOUR_CHATWOOT_URL` → `https://chat.kobra.ai`
  - Reemplaza `YOUR_ACCOUNT_ID` → el número de tu cuenta (ej: `1`)
  - Reemplaza `YOUR_CHATWOOT_USER_TOKEN` → el token de tu perfil

  **Nodos de HubSpot** (2 nodos):
  - Reemplaza `YOUR_HUBSPOT_PRIVATE_APP_TOKEN` → el token de la Private App

  **Nodo de Notion**:
  - Reemplaza `YOUR_NOTION_PAGE_ID` → el ID de tu página
  - Reemplaza `YOUR_NOTION_INTEGRATION_TOKEN` → el token de integración

  **Nodo de Claude API**:
  - Reemplaza `YOUR_ANTHROPIC_API_KEY` → tu API key de Anthropic

  **Nodo de Meta WhatsApp**:
  - Reemplaza `YOUR_PHONE_NUMBER_ID` → el Phone Number ID de Meta
  - Reemplaza `YOUR_META_PERMANENT_TOKEN` → el System User Token
  - Reemplaza `YOUR_TEAM_PHONE_34XXXXXXXXX` → número del equipo con prefijo (ej: `34612345678`)

  **Nodo de Calendly**:
  - Reemplaza `YOUR_CALENDLY_LINK` → tu link de Calendly (ej: `kobra-ai/demo`)

- [ ] **Paso 3: Editar flujo "Follow-up Automático"**

  Actualiza los mismos tokens de HubSpot y Meta en este workflow.
  - Reemplaza `YOUR_CALENDLY_LINK` → tu link de Calendly

- [ ] **Paso 4: Editar flujo "Reactivación Bot"**

  Actualiza los tokens de Chatwoot en este workflow.

- [ ] **Paso 5: Copiar la Webhook URL de n8n**

  En el flujo principal → nodo "Webhook Chatwoot" → copia la URL de producción.
  Tiene formato: `https://n8n.kobra.ai/webhook/kobra-whatsapp`

---

## Task 11: Conectar Chatwoot → n8n (Webhook de Chatwoot)

- [ ] **Paso 1: Configurar webhook en Chatwoot**

  Chatwoot → Settings → Integrations → Webhook → Add new webhook:
  - URL: `https://n8n.kobra.ai/webhook/kobra-whatsapp`
  - Checkboxes activados:
    - ✅ Message created
    - ✅ Conversation status changed
    - ✅ Conversation resolved
  → Create

- [ ] **Paso 2: Verificar webhook funciona**

  Desde tu móvil, envía "Hola" a tu número de WhatsApp Business.

  En n8n → Executions → deberías ver una ejecución nueva.
  Si aparece → el webhook está funcionando.

---

## Task 12: Activar los 3 flujos de n8n

- [ ] **Paso 1: Activar flujo principal**

  En n8n → "Kobra AI — WhatsApp Chatbot Principal" → toggle Active (arriba derecha).

- [ ] **Paso 2: Activar flujo de follow-up**

  "Kobra AI — Follow-up Automático (24h y 72h)" → toggle Active.

- [ ] **Paso 3: Activar flujo de reactivación**

  "Kobra AI — Reactivación Bot (3h sin respuesta humana)" → toggle Active.

- [ ] **Paso 4: Verificar que los 3 están activos**

  En n8n → Workflows → los 3 deben aparecer con indicador verde.

---

## Task 13: Test de extremo a extremo

- [ ] **Paso 1: Test de mensaje básico (FAQ)**

  Desde un móvil diferente al del equipo:
  - Escribe "Hola, ¿qué es Kobra AI?" al número de WhatsApp Business
  - Espera respuesta (máx 10 segundos)
  - El bot debe responder con información de Kobra
  - En n8n → Executions → verifica ejecución completada sin errores

- [ ] **Paso 2: Test de cualificación**

  Continúa la conversación:
  - Responde sobre tu sector y necesidad
  - El bot debe hacer preguntas de cualificación
  - En HubSpot → Contacts → debe aparecer el contacto nuevo con datos

- [ ] **Paso 3: Test de demo (Calendly)**

  Cuando el bot ofrezca la demo:
  - Verifica que envía el link de Calendly correctamente
  - En HubSpot → Deals → debe aparecer el deal en etapa "Demo Agendada"

- [ ] **Paso 4: Test de escalación a humano**

  En la misma conversación escribe: "quiero hablar con una persona"
  - El bot debe responder que el equipo te atiende
  - Tu número de equipo debe recibir notificación de WhatsApp
  - En Chatwoot → la conversación debe tener label "humano"

- [ ] **Paso 5: Test de modo humano (bot pausado)**

  Desde Chatwoot app móvil, responde al cliente.
  - Escribe algo como "Hola, soy el equipo de Kobra, te llamo en 5 minutos"
  - El bot NO debe intervenir en esta conversación

- [ ] **Paso 6: Test de reactivación del bot**

  En Chatwoot, marca la conversación como "Resuelta" (botón Resolve).
  - En 15 minutos, el flujo de reactivación se ejecutará
  - Si pasaran 3h reales, el bot enviaría el mensaje de reactivación
  - Para testear sin esperar: ejecuta manualmente el flujo de reactivación en n8n

- [ ] **Paso 7: Test de segmentación cliente**

  En HubSpot, crea un contacto de prueba con `kobra_tipo = cliente` y el mismo número de WhatsApp.
  Envía un mensaje desde ese número.
  - El bot NO debe responder
  - En Chatwoot debe aparecer la conversación sin respuesta automática

---

## Task 14: Instalar Chatwoot app móvil en el equipo

- [ ] **Paso 1: Descargar la app**

  Cada miembro del equipo instala en su móvil:
  - iOS: busca "Chatwoot" en App Store
  - Android: busca "Chatwoot" en Google Play

- [ ] **Paso 2: Configurar la app**

  Abre la app → "Self hosted" → introduce:
  - URL: `https://chat.kobra.ai`
  - Email y contraseña de vuestras cuentas de Chatwoot

- [ ] **Paso 3: Activar notificaciones push**

  Acepta el permiso de notificaciones cuando la app lo pida.
  Verifica en Chatwoot web → Profile → Notifications → activa "Push notifications".

- [ ] **Paso 4: Test de notificación**

  Desde otro móvil, escribe al WhatsApp y pide hablar con una persona.
  Los móviles del equipo deben recibir notificación push de Chatwoot.

---

## Resumen de credenciales a guardar en gestor de contraseñas

```
VPS Hetzner:
  IP: [tu IP]
  SSH: root / [tu clave]

n8n:
  URL: https://n8n.kobra.ai
  User: kobra
  Pass: [tu contraseña]

Chatwoot:
  URL: https://chat.kobra.ai
  Admin: [tu email]
  API Token: [CHATWOOT_USER_TOKEN]
  Account ID: [número]

HubSpot:
  Private App Token: [HUBSPOT_TOKEN]

Notion:
  Integration Token: [NOTION_TOKEN]
  Page ID: [NOTION_PAGE_ID]

Anthropic:
  API Key: [ANTHROPIC_KEY]

Meta WhatsApp:
  Phone Number ID: [META_PHONE_ID]
  System User Token: [META_TOKEN]
  Team Phone: [34XXXXXXXXX]

Calendly:
  Link: https://calendly.com/[TU_LINK]
```

---

## Coste total mensual estimado

| Servicio | Coste |
|---|---|
| VPS Hetzner CX21 | ~6€ |
| Claude API (500 msgs) | ~8€ |
| Meta Cloud API | Gratis (primeras 1.000 conv/mes) |
| HubSpot | Gratis |
| Notion | Gratis |
| Chatwoot (self-hosted) | 0€ |
| **TOTAL** | **~14€/mes** |
