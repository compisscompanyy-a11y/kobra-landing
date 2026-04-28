# Kobra AI — WhatsApp Chatbot Profesional con n8n + Claude

**Fecha:** 2026-04-23  
**Proyecto:** Kobra Automation — bot de WhatsApp para atención a clientes y cualificación de leads

---

## Resumen ejecutivo

Bot de WhatsApp profesional para el número de empresa de Kobra AI. Claude (Anthropic) actúa como agente de ventas que cualifica leads, responde FAQs, agenda demos en Calendly y escala a humano cuando es necesario. Los clientes existentes son atendidos siempre por el equipo humano via Chatwoot.

---

## Stack tecnológico

| Componente | Herramienta | Justificación |
|---|---|---|
| Canal WhatsApp | Meta Cloud API (oficial) | Sin riesgo de bloqueo, cumple políticas Meta |
| Bandeja compartida | Chatwoot (self-hosted, Docker) | Open source, app móvil, handoff bot/humano nativo |
| Automatización | n8n (self-hosted) | Cerebro del flujo, conecta todo |
| IA | Claude API (claude-sonnet-4-6) | Respuestas naturales en español, contexto largo |
| Base de conocimiento | Notion (API) | Editable sin tocar n8n, actualización en tiempo real |
| CRM | HubSpot (free tier) | Pipeline profesional, webhooks, deal management |
| Agenda | Calendly (ya configurado) | Enlace de reserva enviado cuando hay fit |

---

## Segmentación de usuarios

### Leads / Prospectos
- Bot responde SIEMPRE
- Claude cualifica, responde FAQs, ofrece demo
- Si piden humano: escalación a equipo + bot pausado
- Follow-up automático a 24h y 72h si no agendan

### Clientes (deal cerrado en HubSpot)
- Bot NUNCA responde
- HubSpot webhook → n8n → Chatwoot marca número como "cliente"
- Notificación al equipo cuando el cliente escribe
- Atención 100% humana vía Chatwoot app móvil

---

## Arquitectura del flujo n8n

### Flujo principal (mensaje entrante)

```
1. Webhook Meta → Chatwoot recibe mensaje
2. Chatwoot webhook → n8n trigger
3. Verificar tipo: ¿entrante (cliente) o saliente (equipo)?
4. Si saliente → pausa bot para esa conversación (estado = humano)
5. Si entrante:
   a. Consultar HubSpot → ¿es cliente con deal cerrado?
      → Sí: notificar equipo en Chatwoot, no responder
      → No: continuar
   b. Consultar estado conversación (Chatwoot label)
      → "humano": ignorar
      → "bot" o nuevo: continuar
   c. Leer base de conocimiento de Notion
   d. Obtener historial de conversación (últimos 15 mensajes)
   e. Llamar Claude API con system prompt + historial + contexto Notion
   f. Claude detecta intención y genera respuesta
   g. Según intención:
      → FAQ: enviar respuesta via Chatwoot
      → Cualificar: hacer pregunta, guardar datos en HubSpot
      → Agendar: enviar link Calendly + crear deal en HubSpot
      → Escalar: responder al cliente + notificar equipo + pausar bot
   h. Guardar respuesta en historial Chatwoot
```

### Flujo de escalación

```
Claude detecta necesidad de humano
→ Responde al cliente: "En breve te atiende nuestro equipo"
→ n8n: asigna conversación Chatwoot a agente humano (sin asignar)
→ n8n: WhatsApp al número interno del equipo con resumen
→ n8n: etiqueta conversación como "humano" en Chatwoot
→ Equipo responde desde Chatwoot app móvil
→ Al marcar "Resuelto" en Chatwoot → webhook → n8n → etiqueta = "bot"
```

### Flujo de reactivación (3 horas)

```
n8n schedule trigger cada 15min
→ Busca conversaciones con etiqueta "humano" + última actividad > 3h
→ Si NO tiene etiqueta "cerrado":
   → Envía mensaje suave: "¿Puedo ayudarte en algo más?"
   → Cambia etiqueta a "bot"
→ Si tiene etiqueta "cerrado": no hace nada
```

### Flujo de follow-up

```
n8n schedule trigger cada hora
→ Busca deals en HubSpot en etapa "Cualificado" con antigüedad > 24h
→ Sin cita en Calendly registrada:
   → Follow-up 1 (24h): mensaje amigable + link Calendly
   → Follow-up 2 (72h): mensaje más directo con propuesta de valor
→ Si ya agendó o respondió: no enviar
```

### Flujo de nuevo cliente (HubSpot → bloqueo bot)

```
HubSpot webhook: deal movido a "Cerrado Ganado"
→ n8n recibe evento
→ Busca conversación en Chatwoot por número de teléfono
→ Añade etiqueta "cliente" a la conversación y al contacto
→ A partir de ahora: flujo principal detecta "cliente" y nunca responde con bot
```

---

## Pipeline HubSpot

| Etapa | Trigger automático | Acción n8n |
|---|---|---|
| Nuevo Lead | Primer mensaje recibido | Crear contacto + deal |
| Cualificado | Claude extrae nombre, empresa, sector, necesidad | Actualizar propiedades + lead score |
| Demo Agendada | Click en Calendly | Webhook Calendly → actualizar etapa |
| Propuesta Enviada | Manual por el equipo | — |
| Negociación | Manual | — |
| Cerrado Ganado | Manual | Webhook → bloquear bot |
| Cerrado Perdido | Manual | Webhook → archivar conversación |

### Propiedades de contacto (extraídas por Claude)
- `nombre_completo`
- `empresa`
- `sector` (restaurante / clínica / inmobiliaria / ecommerce / otro)
- `necesidad` (chatbot / agente voz / automatización / todo)
- `presupuesto_estimado` (bajo <500 / medio 500-2000 / alto >2000)
- `urgencia` (inmediata / 1-3 meses / explorando)
- `lead_score` (0-100, calculado por Claude)
- `fuente` = "WhatsApp"

---

## System prompt de Claude (resumen)

```
Eres Kobra, el asistente de ventas de Kobra AI, empresa de automatización 
con IA en Madrid. Tu objetivo es atender a potenciales clientes por WhatsApp 
de forma profesional, cercana y eficaz.

PERSONALIDAD:
- Profesional pero cercano, nunca robótico
- Hablas en español (tuteo)
- Conciso: mensajes cortos, máximo 3 párrafos
- Nunca inventas precios ni haces promesas no documentadas
- Usas emojis con moderación (1-2 por mensaje máximo)

FLUJO DE CONVERSACIÓN:
1. Saludo y bienvenida personalizada
2. Cualificación progresiva (no hagas todas las preguntas a la vez)
3. Cuando tengas sector + necesidad + urgencia → ofrece demo
4. Si preguntan precio → da rango (desde 800€ setup + 200€/mes) y ofrece auditoría gratuita
5. Si el lead tiene score >60 → prioriza agendar demo cuanto antes

ESCALACIÓN (transfiere a humano cuando):
- El usuario lo pide explícitamente
- Detectas frustración o urgencia alta
- Preguntas técnicas muy específicas que requieren propuesta personalizada
- Han tenido más de 10 mensajes sin agendar

BASE DE CONOCIMIENTO:
{contenido_notion}

HISTORIAL DE CONVERSACIÓN:
{historial}
```

---

## Chatwoot — configuración

- **Bandeja:** "Kobra WhatsApp" conectada a Meta Cloud API
- **Etiquetas:** `bot`, `humano`, `cliente`, `cerrado`, `follow-up`
- **Agentes:** miembros del equipo Kobra con acceso
- **App móvil:** instalada en teléfonos del equipo (iOS/Android)
- **Notificaciones push:** activadas para asignaciones nuevas

---

## Notion — base de conocimiento

Página principal: "Kobra AI — Base de Conocimiento Bot"

Secciones:
- Servicios y precios
- FAQs y objeciones comunes
- Casos de éxito por sector
- Proceso de onboarding (1 semana)
- Qué hacemos / qué NO hacemos
- Datos de contacto del equipo

n8n lee esta página completa antes de cada llamada a Claude.

---

## Infraestructura recomendada

```
VPS (Hetzner/DigitalOcean ~20€/mes):
├── n8n (Docker)
├── Chatwoot (Docker)
└── Nginx (reverse proxy + SSL)

Servicios externos:
├── Meta Cloud API (gratuito hasta volumen alto)
├── Claude API (pay-per-use ~0.001€/mensaje)
├── HubSpot (free tier)
├── Notion API (free)
└── Calendly (plan actual)
```

---

## Coste operativo estimado

| Concepto | Coste mensual |
|---|---|
| VPS (n8n + Chatwoot) | ~20€ |
| Claude API (500 msgs/mes) | ~5-10€ |
| Meta Cloud API | Gratis (primeras 1000 conversaciones/mes) |
| HubSpot | Gratis |
| Notion | Gratis |
| **Total** | **~25-30€/mes** |
