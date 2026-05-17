import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = {
  title: 'Usuarios — Admin',
  robots: { index: false },
}

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, full_name, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Usuarios</h1>
      <div className="border border-charcoal/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark">
            <tr>
              {['Nombre', 'Email', 'Registro'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs tracking-widest uppercase text-charcoal/50">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {(profiles ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-cream-dark/50">
                <td className="px-4 py-3">{p.full_name ?? '—'}</td>
                <td className="px-4 py-3 text-charcoal/70">{p.email}</td>
                <td className="px-4 py-3 text-charcoal/50 text-xs">
                  {new Date(p.created_at).toLocaleDateString('es-ES')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
