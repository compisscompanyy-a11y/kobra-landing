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
