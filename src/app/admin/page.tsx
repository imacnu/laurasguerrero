import { createClient } from '@/lib/supabase/server'
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react'
import StatsCard from '@/components/admin/StatsCard'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard — Admin',
  robots: { index: false },
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: productCount }, { count: orderCount }, { count: userCount }, revenueResult] =
    await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('orders').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase
        .from('orders')
        .select('total')
        .neq('status', 'cancelled'),
    ])

  const revenue = (revenueResult.data ?? []).reduce(
    (sum: number, o: { total: number }) => sum + o.total,
    0
  )

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Productos"
          value={productCount ?? 0}
          icon={<Package className="h-6 w-6" />}
        />
        <StatsCard
          title="Pedidos"
          value={orderCount ?? 0}
          icon={<ShoppingBag className="h-6 w-6" />}
        />
        <StatsCard
          title="Clientes"
          value={userCount ?? 0}
          icon={<Users className="h-6 w-6" />}
        />
        <StatsCard
          title="Ingresos totales"
          value={formatPrice(revenue)}
          icon={<TrendingUp className="h-6 w-6" />}
        />
      </div>
    </div>
  )
}
