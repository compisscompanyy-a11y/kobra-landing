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
