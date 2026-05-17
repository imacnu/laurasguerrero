import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Pedidos — Admin',
  robots: { index: false },
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('id, status, total, customer_email, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Pedidos</h1>

      <div className="border border-charcoal/10 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead className="bg-cream-dark">
            <tr>
              {['ID', 'Cliente', 'Estado', 'Total', 'Fecha', ''].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs tracking-widest uppercase text-charcoal/50"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {(orders ?? []).map((o) => (
              <tr key={o.id} className="hover:bg-cream-dark/50">
                <td className="px-4 py-3 font-mono text-xs">
                  #{o.id.slice(-8).toUpperCase()}
                </td>
                <td className="px-4 py-3 text-charcoal/70">{o.customer_email ?? '—'}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline">{statusLabels[o.status]}</Badge>
                </td>
                <td className="px-4 py-3">{formatPrice(o.total)}</td>
                <td className="px-4 py-3 text-charcoal/50">
                  {new Date(o.created_at).toLocaleDateString('es-ES')}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${o.id}`}
                    className="text-xs tracking-widest uppercase underline underline-offset-4"
                  >
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
