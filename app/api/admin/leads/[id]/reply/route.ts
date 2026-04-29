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
