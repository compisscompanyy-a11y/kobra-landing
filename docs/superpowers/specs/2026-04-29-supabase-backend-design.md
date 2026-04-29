# Supabase Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Supabase backend to store leads and chatbot conversations, with a protected `/admin` panel to manage leads, update their status, and reply by email via Resend.

**Architecture:** Next.js 14 API Routes + Supabase (Postgres + Auth) + Resend for email. The contact form POSTs to `/api/contact`, the existing chatbot route saves conversations, and all `/admin/*` routes are protected by Next.js middleware checking Supabase session.

**Tech Stack:** Next.js 14 App Router, Supabase JS v2, Resend, TypeScript

---

## Database Schema

### `leads`
| column | type | notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| created_at | timestamptz | default now() |
| name | text | not null |
| email | text | not null |
| phone | text | nullable |
| product | text | service selected |
| message | text | nullable |
| status | text | 'pending' \| 'contacted' \| 'closed', default 'pending' |
| lang | text | 'es' \| 'en' |
| replied_at | timestamptz | nullable, set when admin sends reply |

### `conversations`
| column | type | notes |
|--------|------|-------|
| id | uuid | PK |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | updated on each new message |
| session_id | text | unique, generated client-side |

### `messages`
| column | type | notes |
|--------|------|-------|
| id | uuid | PK |
| created_at | timestamptz | default now() |
| conversation_id | uuid | FK → conversations.id |
| role | text | 'user' \| 'assistant' |
| content | text | not null |

---

## API Routes

### `POST /api/contact`
- Validates required fields (name, email, product)
- Inserts row into `leads`
- Sends notification email to `kobra.automation.ia@gmail.com` via Resend
- Returns `{ ok: true }` or `{ error: string }`

### `POST /api/chat` (update existing)
- Existing Anthropic logic unchanged
- On first message: creates `conversations` row with a `session_id` from the request
- Each message pair: inserts user message + assistant response into `messages`
- Updates `conversations.updated_at`

### `PATCH /api/admin/leads/[id]`
- Body: `{ status: 'pending' | 'contacted' | 'closed' }`
- Requires active admin session (checked via Supabase server client)
- Updates `leads.status`

### `POST /api/admin/leads/[id]/reply`
- Body: `{ subject: string, body: string }`
- Requires active admin session
- Sends email to lead's email via Resend
- Sets `leads.replied_at = now()`

---

## Admin Panel

### Routes
- `/admin` — Login page (Supabase Auth, email + password)
- `/admin/dashboard` — Leads list, filterable by status (pending/contacted/closed)
- `/admin/leads/[id]` — Lead detail: info, status selector, chatbot history if exists, email reply form
- `/admin/conversations` — All chatbot conversations list

### Auth
- Single admin user created manually in Supabase dashboard
- Next.js middleware (`middleware.ts`) checks session on all `/admin/*` routes
- Unauthenticated requests redirect to `/admin`
- Visual design: dark `#030303` background, `#00E676` accent — consistent with Kobra brand

---

## Email Flow (Resend)

1. **New lead notification** — `POST /api/contact` triggers email to `kobra.automation.ia@gmail.com` with lead details
2. **Admin reply** — `POST /api/admin/leads/[id]/reply` sends email to lead from `hola@kobra-automation.com` (or configured sender)

---

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL       # from Supabase project settings
NEXT_PUBLIC_SUPABASE_ANON_KEY  # from Supabase project settings
SUPABASE_SERVICE_ROLE_KEY      # for server-side admin operations
RESEND_API_KEY                 # from resend.com dashboard
```

---

## Files Created / Modified

**New:**
- `lib/supabase/client.ts` — browser Supabase client
- `lib/supabase/server.ts` — server Supabase client (cookies)
- `lib/supabase/admin.ts` — service role client
- `lib/resend.ts` — Resend client + email helpers
- `app/api/contact/route.ts` — contact form endpoint
- `app/api/admin/leads/[id]/route.ts` — PATCH status
- `app/api/admin/leads/[id]/reply/route.ts` — POST send email
- `app/admin/layout.tsx` — admin shell layout
- `app/admin/page.tsx` — login page
- `app/admin/dashboard/page.tsx` — leads dashboard
- `app/admin/leads/[id]/page.tsx` — lead detail
- `app/admin/conversations/page.tsx` — conversations list
- `middleware.ts` — auth guard for /admin/*
- `components/admin/LeadRow.tsx`
- `components/admin/StatusBadge.tsx`
- `components/admin/EmailReplyForm.tsx`
- `components/admin/ConversationThread.tsx`
- `types/supabase.ts` — DB type definitions

**Modified:**
- `app/api/chat/route.ts` — add conversation/message persistence
- `components/ui/ContactForm.tsx` — call `/api/contact` instead of mailto
