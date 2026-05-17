import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import StatsCard from '@/components/admin/StatsCard'

export const metadata: Metadata = {
  title: 'Analytics — Admin',
  robots: { index: false },
}

export default async function AdminAnalyticsPage() {
  const supabase = await createClient()

  const [
    { data: revenueData },
    { data: ordersThisMonth },
    { data: topProducts },
  ] = await Promise.all([
    supabase.from('orders').select('total').neq('status', 'cancelled'),
    supabase
      .from('orders')
      .select('id, total')
      .neq('status', 'cancelled')
      .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
    supabase
      .from('order_items')
      .select('product_name, quantity, price')
      .order('quantity', { ascending: false })
      .limit(5),
  ])

  const totalRevenue = (revenueData ?? []).reduce((s: number, o: { total: number }) => s + o.total, 0)
  const monthRevenue = (ordersThisMonth ?? []).reduce((s: number, o: { total: number }) => s + o.total, 0)

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">Analytics</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard title="Ingresos totales" value={formatPrice(totalRevenue)} />
        <StatsCard title="Ingresos este mes" value={formatPrice(monthRevenue)} />
        <StatsCard title="Pedidos este mes" value={ordersThisMonth?.length ?? 0} />
      </div>

      {topProducts && topProducts.length > 0 && (
        <div>
          <h2 className="font-display text-xl mb-4">Productos más vendidos</h2>
          <div className="border border-charcoal/10">
            <table className="w-full text-sm">
              <thead className="bg-cream-dark">
                <tr>
                  {['Producto', 'Unidades', 'Ingresos'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs tracking-widest uppercase text-charcoal/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {topProducts.map((p, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">{p.product_name}</td>
                    <td className="px-4 py-3">{p.quantity}</td>
                    <td className="px-4 py-3">{formatPrice(p.price * p.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
