'use client'

import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success('Sesión cerrada')
    router.push('/')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="block w-full text-left py-2 text-sm text-charcoal/60 hover:text-red-600 transition-colors border-b border-charcoal/10"
    >
      Cerrar sesión
    </button>
  )
}
