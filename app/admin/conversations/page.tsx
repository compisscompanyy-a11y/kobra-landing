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
            const msgCount = Array.isArray((conv as any).messages)
              ? ((conv as any).messages[0] as { count: number } | undefined)?.count ?? 0
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
