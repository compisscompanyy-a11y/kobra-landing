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
