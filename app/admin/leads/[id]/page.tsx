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
