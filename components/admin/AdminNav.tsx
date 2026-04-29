"use client"

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminNav() {
  const router = useRouter()
  const pathname = usePathname()

  async function handleLogout() {
    const supabase = createClient()
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
