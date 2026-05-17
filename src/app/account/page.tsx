import { createClient } from '@/lib/supabase/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi cuenta',
  robots: { index: false },
}

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Mi cuenta</h1>
      <div className="border border-charcoal/10 p-6 space-y-3">
        <p className="text-xs tracking-widest uppercase text-charcoal/50">Información</p>
        <p className="text-sm">{user?.user_metadata?.full_name ?? 'Cliente'}</p>
        <p className="text-sm text-charcoal/60">{user?.email}</p>
      </div>
    </div>
  )
}
