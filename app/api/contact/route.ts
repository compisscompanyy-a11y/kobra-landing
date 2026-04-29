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
