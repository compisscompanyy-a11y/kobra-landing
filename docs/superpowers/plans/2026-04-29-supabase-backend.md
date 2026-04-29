# Supabase Backend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Supabase persistence (leads + chatbot conversations), a Resend email integration, and a protected `/admin` panel with login, lead management, status updates, and email reply.

**Architecture:** Next.js 14 API Routes + Supabase JS v2 (`@supabase/ssr`) + Resend. The contact form POSTs to `/api/contact`, the chatbot saves to Supabase on each exchange, admin routes are protected by session check, all `/admin/*` paths guarded by Next.js middleware.

**Tech Stack:** Next.js 14 App Router, `@supabase/supabase-js`, `@supabase/ssr`, `resend`, TypeScript

---

### Task 1: Install packages

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the three new dependencies**

```bash
cd "kobra-landing"
npm install @supabase/supabase-js @supabase/ssr resend
```

Expected output: `added N packages` with no errors.

- [ ] **Step 2: Verify packages in package.json**

```bash
grep -E "supabase|resend" package.json
```

Expected:
```
"@supabase/supabase-js": "^2.x.x",
"@supabase/ssr": "^0.x.x",
"resend": "^4.x.x"
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install supabase and resend packages"
```

---

### Task 2: Create Supabase tables

**Files:** (SQL run in Supabase dashboard — no local files)

- [ ] **Step 1: Open your Supabase project → SQL Editor and run this SQL**

```sql
-- leads table
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text not null,
  email text not null,
  phone text,
  product text not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'contacted', 'closed')),
  lang text not null default 'es',
  replied_at timestamptz
);

-- conversations table
create table conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  session_id text unique not null
);

-- messages table
create table messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null
);

-- Enable Row Level Security
alter table leads enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- Service role bypasses RLS automatically (used in API routes)
-- No policies needed for leads (never accessed from client)
-- Conversations/messages: server only too
```

- [ ] **Step 2: Add the four environment variables to `.env.local` and to Vercel dashboard**

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
RESEND_API_KEY=re_...
```

Find these values in: Supabase → Project Settings → API.
Find RESEND_API_KEY in: resend.com → API Keys.

- [ ] **Step 3: Create admin user in Supabase**

Go to Supabase → Authentication → Users → "Add user" → enter your email + password. This is the only admin user.

---

### Task 3: Type definitions + Supabase clients

**Files:**
- Create: `types/supabase.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/admin.ts`

- [ ] **Step 1: Create `types/supabase.ts`**

```ts
export type LeadStatus = 'pending' | 'contacted' | 'closed'

export interface Lead {
  id: string
  created_at: string
  name: string
  email: string
  phone: string | null
  product: string
  message: string | null
  status: LeadStatus
  lang: string
  replied_at: string | null
}

export interface Conversation {
  id: string
  created_at: string
  updated_at: string
  session_id: string
}

export interface ChatMessage {
  id: string
  created_at: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
}
```

- [ ] **Step 2: Create `lib/supabase/client.ts` (browser client)**

```ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 3: Create `lib/supabase/server.ts` (server client with cookies)**

```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Called from a Server Component — ignore
          }
        },
      },
    }
  )
}
```

- [ ] **Step 4: Create `lib/supabase/admin.ts` (service role — bypasses RLS)**

```ts
import { createClient } from '@supabase/supabase-js'

export const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } }
)
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no output (no errors).

- [ ] **Step 6: Commit**

```bash
git add types/ lib/supabase/
git commit -m "feat: add Supabase client files and DB types"
```

---

### Task 4: Resend email helper

**Files:**
- Create: `lib/resend.ts`

- [ ] **Step 1: Create `lib/resend.ts`**

```ts
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendLeadNotification(lead: {
  name: string
  email: string
  phone?: string | null
  product: string
  message?: string | null
}) {
  return resend.emails.send({
    from: 'Kobra AI <onboarding@resend.dev>',
    to: 'kobra.automation.ia@gmail.com',
    subject: `Nuevo lead: ${lead.product} — ${lead.name}`,
    html: `
      <h2 style="color:#00E676">Nuevo contacto desde kobra-automation.com</h2>
      <p><strong>Nombre:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Teléfono:</strong> ${lead.phone ?? '—'}</p>
      <p><strong>Servicio:</strong> ${lead.product}</p>
      <p><strong>Mensaje:</strong> ${lead.message ?? '—'}</p>
    `,
  })
}

export async function sendReplyToLead(
  to: string,
  subject: string,
  body: string
) {
  return resend.emails.send({
    from: 'Kobra AI <onboarding@resend.dev>',
    to,
    subject,
    html: body.replace(/\n/g, '<br>'),
  })
}
```

> Note: `onboarding@resend.dev` is Resend's shared sender for testing. Once you verify your domain in Resend, change it to `hola@kobra-automation.com`.

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add lib/resend.ts
git commit -m "feat: add Resend email helpers"
```

---

### Task 5: POST /api/contact route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create `app/api/contact/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { adminClient } from '@/lib/supabase/admin'
import { sendLeadNotification } from '@/lib/resend'

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, product, message, lang } = await request.json()

    if (!name || !email || !product) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const { error } = await adminClient.from('leads').insert({
      name,
      email,
      phone: phone || null,
      product,
      message: message || null,
      lang: lang || 'es',
    })

    if (error) throw error

    // Fire-and-forget: don't fail the request if email fails
    sendLeadNotification({ name, email, phone, product, message }).catch(console.error)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Error al enviar el formulario' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/
git commit -m "feat: POST /api/contact saves lead to Supabase and emails notification"
```

---

### Task 6: Update ContactForm to use /api/contact

**Files:**
- Modify: `components/ui/ContactForm.tsx:44-58`

- [ ] **Step 1: Replace the `handleSubmit` function in `ContactForm.tsx`**

Find this block (lines 44–58) and replace it entirely:

```tsx
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, lang }),
      })

      if (!res.ok) {
        const data = await res.json()
        console.error("Contact error:", data)
        setStatus("error")
        return
      }

      setStatus("success")
    } catch {
      setStatus("error")
    }
  }
```

- [ ] **Step 2: Add an error state to the JSX — after the success block (line 81) add this before the `<form>` return:**

```tsx
  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12 rounded-2xl border border-red-500/20 bg-[#0d0d0d] text-center min-h-[400px]">
        <p className="text-white font-semibold text-lg">
          {lang === "es" ? "Algo salió mal." : "Something went wrong."}
        </p>
        <p className="text-[#666] text-sm">
          {lang === "es"
            ? "Por favor escríbenos por WhatsApp para respuesta inmediata."
            : "Please message us on WhatsApp for an immediate response."}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-[#00E676] text-sm underline"
        >
          {lang === "es" ? "Intentar de nuevo" : "Try again"}
        </button>
      </div>
    )
  }
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 4: Test the form locally — submit a test contact and check Supabase Table Editor → leads**

```bash
npm run dev
# Open http://localhost:3000/contacto
# Fill in the form and submit
# Check Supabase dashboard → Table Editor → leads
```

Expected: new row in `leads` table.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ContactForm.tsx
git commit -m "feat: contact form POSTs to /api/contact instead of mailto"
```

---

### Task 7: Update /api/chat to save conversations

**Files:**
- Modify: `components/sections/InteractiveDemo.tsx:48-58`
- Modify: `app/api/chat/route.ts`

- [ ] **Step 1: Add `sessionId` ref to `InteractiveDemo.tsx`**

After line 25 (`const [isTyping, setIsTyping] = useState(false)`), add:

```tsx
  const sessionId = useRef<string>(
    typeof crypto !== 'undefined' ? crypto.randomUUID() : Math.random().toString(36).slice(2)
  )
```

- [ ] **Step 2: Pass `session_id` in the fetch call in `InteractiveDemo.tsx`**

Replace the `body: JSON.stringify(...)` block inside `sendMessage` (around line 52):

```tsx
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang,
          session_id: sessionId.current,
        }),
```

- [ ] **Step 3: Add conversation persistence to `app/api/chat/route.ts`**

At the top of the file, after the existing imports, add:

```ts
import { adminClient } from '@/lib/supabase/admin'
```

Then in the `POST` function, after the line:
```ts
    const content = response.content[0];
    if (content.type !== "text") throw new Error("Unexpected response type");
```

Add this block **before** the `return NextResponse.json(...)`:

```ts
    // Persist conversation async — don't block the response
    const { session_id } = await request.clone().json().catch(() => ({}))
    if (session_id) {
      const userMsg = cleanMessages[cleanMessages.length - 1]
      Promise.all([
        adminClient
          .from('conversations')
          .upsert({ session_id, updated_at: new Date().toISOString() }, { onConflict: 'session_id' })
          .select('id')
          .single()
          .then(({ data: conv }) => {
            if (!conv) return
            return adminClient.from('messages').insert([
              { conversation_id: conv.id, role: 'user', content: userMsg?.content ?? '' },
              { conversation_id: conv.id, role: 'assistant', content: content.text },
            ])
          }),
      ]).catch(console.error)
    }
```

> Note: `request.clone().json()` is needed because `request.json()` was already consumed earlier. We use `clone()` to read the body again.

Actually, the body is already destructured at the top of the POST handler via `const { messages, lang = "es" } = await request.json()`. We need to also destructure `session_id` there. Find that line and update it:

```ts
    const { messages, lang = "es", session_id } = await request.json();
```

Then remove the `request.clone().json()` call and use `session_id` directly. The persistence block becomes:

```ts
    // Persist conversation async — don't block the response
    if (session_id) {
      const userMsg = cleanMessages[cleanMessages.length - 1]
      adminClient
        .from('conversations')
        .upsert({ session_id, updated_at: new Date().toISOString() }, { onConflict: 'session_id' })
        .select('id')
        .single()
        .then(({ data: conv }) => {
          if (!conv) return
          return adminClient.from('messages').insert([
            { conversation_id: conv.id, role: 'user', content: userMsg?.content ?? '' },
            { conversation_id: conv.id, role: 'assistant', content: content.text },
          ])
        })
        .catch(console.error)
    }
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 5: Test locally — chat a few messages, then check Supabase**

```bash
npm run dev
# Open http://localhost:3000/demo or the homepage
# Send 2-3 messages
# Check Supabase → Table Editor → conversations and messages
```

Expected: 1 row in `conversations`, 2–3 pairs of rows in `messages`.

- [ ] **Step 6: Commit**

```bash
git add components/sections/InteractiveDemo.tsx app/api/chat/route.ts
git commit -m "feat: chatbot saves conversations and messages to Supabase"
```

---

### Task 8: Middleware + admin layout

**Files:**
- Create: `middleware.ts`
- Create: `app/admin/layout.tsx`

- [ ] **Step 1: Create `middleware.ts` at project root**

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()

  const response = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Allow access to the login page itself
  if (pathname === '/admin') {
    if (session) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
    return response
  }

  // All other /admin/* routes require a session
  if (!session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
```

- [ ] **Step 2: Create `app/admin/layout.tsx`**

```tsx
import type { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add middleware.ts app/admin/layout.tsx
git commit -m "feat: Next.js middleware protects /admin/* routes"
```

---

### Task 9: Admin login page

**Files:**
- Create: `app/admin/page.tsx`

- [ ] **Step 1: Create `app/admin/page.tsx`**

```tsx
"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/admin/dashboard')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-8 rounded-2xl border border-white/5 bg-[#0d0d0d]">
        <h1 className="text-xl font-bold text-white mb-1">
          KOBRA<span className="text-[#00E676]">.</span> Admin
        </h1>
        <p className="text-[#555] text-sm mb-8">Panel de gestión</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-colors disabled:opacity-60"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Test login locally**

```bash
npm run dev
# Open http://localhost:3000/admin
# Log in with the admin user created in Supabase
# Should redirect to /admin/dashboard (404 for now — that's expected)
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/page.tsx
git commit -m "feat: admin login page with Supabase Auth"
```

---

### Task 10: Shared admin components

**Files:**
- Create: `components/admin/StatusBadge.tsx`
- Create: `components/admin/LeadRow.tsx`
- Create: `components/admin/AdminNav.tsx`

- [ ] **Step 1: Create `components/admin/StatusBadge.tsx`**

```tsx
import type { LeadStatus } from '@/types/supabase'

const COLORS: Record<LeadStatus, string> = {
  pending:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  contacted: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  closed:    'bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20',
}

const LABELS: Record<LeadStatus, string> = {
  pending:   'Pendiente',
  contacted: 'Contactado',
  closed:    'Cerrado',
}

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${COLORS[status]}`}>
      {LABELS[status]}
    </span>
  )
}
```

- [ ] **Step 2: Create `components/admin/LeadRow.tsx`**

```tsx
import Link from 'next/link'
import type { Lead } from '@/types/supabase'
import StatusBadge from './StatusBadge'

export default function LeadRow({ lead }: { lead: Lead }) {
  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0d0d0d] hover:border-[#00E676]/20 transition-colors"
    >
      <div className="flex flex-col gap-0.5">
        <p className="text-white font-medium text-sm">{lead.name}</p>
        <p className="text-[#555] text-xs">{lead.email} · {lead.product}</p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={lead.status} />
        <p className="text-[#444] text-xs">
          {new Date(lead.created_at).toLocaleDateString('es-ES')}
        </p>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Create `components/admin/AdminNav.tsx`**

```tsx
"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/admin')
  }

  function isActive(path: string) {
    return pathname.startsWith(path) ? 'text-white' : 'text-[#555] hover:text-white'
  }

  return (
    <nav className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <span className="text-white font-bold text-sm">
          KOBRA<span className="text-[#00E676]">.</span> Admin
        </span>
        <Link href="/admin/dashboard" className={`text-sm transition-colors ${isActive('/admin/dashboard')}`}>
          Leads
        </Link>
        <Link href="/admin/conversations" className={`text-sm transition-colors ${isActive('/admin/conversations')}`}>
          Conversaciones
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm text-[#555] hover:text-white transition-colors"
      >
        Salir →
      </button>
    </nav>
  )
}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add components/admin/
git commit -m "feat: admin shared components (StatusBadge, LeadRow, AdminNav)"
```

---

### Task 11: Admin dashboard page

**Files:**
- Create: `app/admin/dashboard/page.tsx`

- [ ] **Step 1: Create `app/admin/dashboard/page.tsx`**

```tsx
import { adminClient } from '@/lib/supabase/admin'
import type { Lead } from '@/types/supabase'
import Link from 'next/link'
import LeadRow from '@/components/admin/LeadRow'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

const FILTERS = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'contacted', label: 'Contactado' },
  { value: 'closed', label: 'Cerrado' },
]

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const statusFilter = searchParams.status ?? ''

  let query = adminClient
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (['pending', 'contacted', 'closed'].includes(statusFilter)) {
    query = query.eq('status', statusFilter)
  }

  const { data: leads, error } = await query

  if (error) {
    return <div className="p-8 text-red-400">Error: {error.message}</div>
  }

  return (
    <>
      <AdminNav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Leads</h1>
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <Link
                key={f.value}
                href={f.value ? `/admin/dashboard?status=${f.value}` : '/admin/dashboard'}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  statusFilter === f.value
                    ? 'bg-[#00E676] text-[#030303]'
                    : 'bg-white/5 text-[#888] hover:bg-white/10'
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {(leads?.length ?? 0) === 0 && (
            <p className="text-[#444] text-center py-16">No hay leads todavía.</p>
          )}
          {leads?.map((lead: Lead) => (
            <LeadRow key={lead.id} lead={lead} />
          ))}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Test — log in and navigate to /admin/dashboard**

```bash
npm run dev
# Open http://localhost:3000/admin
# Log in → should see dashboard with any leads you submitted earlier
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/dashboard/
git commit -m "feat: admin dashboard with lead list and status filter"
```

---

### Task 12: Lead status update (PATCH API + StatusSelector)

**Files:**
- Create: `app/api/admin/leads/[id]/route.ts`
- Create: `components/admin/StatusSelector.tsx`

- [ ] **Step 1: Create `app/api/admin/leads/[id]/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { status } = await request.json()
  if (!['pending', 'contacted', 'closed'].includes(status)) {
    return NextResponse.json({ error: 'Status inválido' }, { status: 400 })
  }

  const { error } = await adminClient
    .from('leads')
    .update({ status })
    .eq('id', params.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Create `components/admin/StatusSelector.tsx`**

```tsx
"use client"

import { useState } from 'react'
import type { LeadStatus } from '@/types/supabase'

const OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'contacted', label: 'Contactado' },
  { value: 'closed', label: 'Cerrado' },
]

export default function StatusSelector({
  leadId,
  currentStatus,
}: {
  leadId: string
  currentStatus: LeadStatus
}) {
  const [status, setStatus] = useState<LeadStatus>(currentStatus)
  const [saving, setSaving] = useState(false)

  async function handleChange(newStatus: LeadStatus) {
    setSaving(true)
    await fetch(`/api/admin/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setStatus(newStatus)
    setSaving(false)
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value as LeadStatus)}
      disabled={saving}
      className="bg-[#111] border border-white/8 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E676]/30 disabled:opacity-60 transition-colors"
    >
      {OPTIONS.map(o => (
        <option key={o.value} value={o.value} className="bg-[#111]">
          {o.label}
        </option>
      ))}
    </select>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/leads/ components/admin/StatusSelector.tsx
git commit -m "feat: PATCH /api/admin/leads/[id] + StatusSelector component"
```

---

### Task 13: Email reply (POST API + EmailReplyForm)

**Files:**
- Create: `app/api/admin/leads/[id]/reply/route.ts`
- Create: `components/admin/EmailReplyForm.tsx`

- [ ] **Step 1: Create `app/api/admin/leads/[id]/reply/route.ts`**

```ts
import { NextRequest, NextResponse } from 'next/server'
import { adminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { sendReplyToLead } from '@/lib/resend'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { subject, body } = await request.json()
  if (!subject || !body) {
    return NextResponse.json({ error: 'Faltan asunto o cuerpo' }, { status: 400 })
  }

  const { data: lead, error: fetchError } = await adminClient
    .from('leads')
    .select('email')
    .eq('id', params.id)
    .single()

  if (fetchError || !lead) {
    return NextResponse.json({ error: 'Lead no encontrado' }, { status: 404 })
  }

  const { error: emailError } = await sendReplyToLead(lead.email, subject, body)
  if (emailError) {
    return NextResponse.json({ error: 'Error enviando email' }, { status: 500 })
  }

  await adminClient
    .from('leads')
    .update({ replied_at: new Date().toISOString() })
    .eq('id', params.id)

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 2: Create `components/admin/EmailReplyForm.tsx`**

```tsx
"use client"

import { useState } from 'react'

export default function EmailReplyForm({
  leadId,
  leadEmail,
  leadName,
  repliedAt,
}: {
  leadId: string
  leadEmail: string
  leadName: string
  repliedAt: string | null
}) {
  const defaultSubject = `Hola ${leadName}, te escribimos desde Kobra AI`
  const [subject, setSubject] = useState(defaultSubject)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(!!repliedAt)
  const [error, setError] = useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')

    const res = await fetch(`/api/admin/leads/${leadId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, body }),
    })

    if (res.ok) {
      setSent(true)
    } else {
      setError('Error al enviar el email. Inténtalo de nuevo.')
    }
    setSending(false)
  }

  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-[#0d0d0d] mt-6">
      <p className="text-xs text-[#555] mb-1">Responder por email</p>
      <p className="text-sm text-white font-medium mb-4">→ {leadEmail}</p>

      {sent && (
        <p className="text-[#00E676] text-sm mb-4">
          ✓ Email enviado
          {repliedAt
            ? ` el ${new Date(repliedAt).toLocaleDateString('es-ES')}`
            : ''}
        </p>
      )}

      <form onSubmit={handleSend} className="flex flex-col gap-3">
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Asunto"
          required
          className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors"
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={6}
          placeholder="Escribe tu respuesta..."
          required
          className="bg-[#111] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#00E676]/30 transition-colors resize-none"
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={sending}
          className="px-6 py-3 rounded-xl bg-[#00E676] text-[#030303] font-semibold text-sm hover:bg-[#69f0ae] transition-colors disabled:opacity-60 self-start"
        >
          {sending ? 'Enviando...' : 'Enviar email'}
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add app/api/admin/leads/ components/admin/EmailReplyForm.tsx
git commit -m "feat: POST /api/admin/leads/[id]/reply + EmailReplyForm component"
```

---

### Task 14: Admin lead detail page

**Files:**
- Create: `app/admin/leads/[id]/page.tsx`

- [ ] **Step 1: Create `app/admin/leads/[id]/page.tsx`**

```tsx
import { adminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdminNav from '@/components/admin/AdminNav'
import StatusSelector from '@/components/admin/StatusSelector'
import EmailReplyForm from '@/components/admin/EmailReplyForm'

export const dynamic = 'force-dynamic'

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: lead, error } = await adminClient
    .from('leads')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !lead) notFound()

  return (
    <>
      <AdminNav />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          href="/admin/dashboard"
          className="text-[#555] text-sm hover:text-white transition-colors mb-6 inline-block"
        >
          ← Volver a leads
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
            <p className="text-[#555] text-sm mt-1">{lead.email}</p>
            {lead.phone && <p className="text-[#555] text-sm">{lead.phone}</p>}
            <p className="text-[#444] text-xs mt-1">
              {lead.product} · {new Date(lead.created_at).toLocaleDateString('es-ES')}
            </p>
          </div>
          <StatusSelector leadId={lead.id} currentStatus={lead.status} />
        </div>

        {lead.message && (
          <div className="p-4 rounded-xl border border-white/5 bg-[#0d0d0d] mb-2">
            <p className="text-xs text-[#555] mb-2">Mensaje</p>
            <p className="text-white text-sm leading-relaxed">{lead.message}</p>
          </div>
        )}

        <EmailReplyForm
          leadId={lead.id}
          leadEmail={lead.email}
          leadName={lead.name}
          repliedAt={lead.replied_at}
        />
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Test — click a lead in the dashboard, change its status, send a test reply**

```bash
npm run dev
# /admin/dashboard → click a lead
# Change status with the selector → check Supabase leads table
# Fill in reply form → check email arrives
```

- [ ] **Step 4: Commit**

```bash
git add app/admin/leads/
git commit -m "feat: admin lead detail page with status selector and email reply"
```

---

### Task 15: Admin conversations page

**Files:**
- Create: `app/admin/conversations/page.tsx`

- [ ] **Step 1: Create `app/admin/conversations/page.tsx`**

```tsx
import { adminClient } from '@/lib/supabase/admin'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export default async function ConversationsPage() {
  const { data: conversations, error } = await adminClient
    .from('conversations')
    .select(`
      id,
      session_id,
      created_at,
      updated_at,
      messages(count)
    `)
    .order('updated_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-400">Error: {error.message}</div>
  }

  return (
    <>
      <AdminNav />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Conversaciones del chatbot</h1>

        <div className="flex flex-col gap-3">
          {(conversations?.length ?? 0) === 0 && (
            <p className="text-[#444] text-center py-16">
              No hay conversaciones todavía.
            </p>
          )}
          {conversations?.map(conv => {
            const msgCount = Array.isArray(conv.messages)
              ? (conv.messages[0] as { count: number } | undefined)?.count ?? 0
              : 0

            return (
              <div
                key={conv.id}
                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#0d0d0d]"
              >
                <div>
                  <p className="text-white text-sm font-mono">
                    {conv.session_id.slice(0, 12)}…
                  </p>
                  <p className="text-[#444] text-xs mt-0.5">
                    {msgCount} mensajes
                  </p>
                </div>
                <p className="text-[#444] text-xs">
                  {new Date(conv.updated_at).toLocaleDateString('es-ES')}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add app/admin/conversations/
git commit -m "feat: admin conversations list page"
```

---

### Task 16: Final build check + push

- [ ] **Step 1: Full build locally**

```bash
npm run build
```

Expected: `✓ Compiled successfully` with no TypeScript errors. If there are errors, fix them before continuing.

- [ ] **Step 2: Add env vars to Vercel**

Go to Vercel dashboard → project → Settings → Environment Variables. Add:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
```

- [ ] **Step 3: Push to GitHub → auto-deploys to Vercel**

```bash
git push
```

Expected: Vercel deployment succeeds (green in dashboard).

- [ ] **Step 4: Smoke test on production**

1. Submit the contact form at `https://www.kobra-automation.com/contacto` → check Supabase leads table
2. Check `kobra.automation.ia@gmail.com` for notification email
3. Open `https://www.kobra-automation.com/admin` → log in
4. See the lead in `/admin/dashboard`
5. Change its status, send a reply email
6. Check `/admin/conversations` after chatting on the demo

---
