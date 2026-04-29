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
