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
