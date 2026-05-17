import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getUserOrders } from '@/lib/queries/orders'
import OrderList from '@/components/account/OrderList'

export const metadata: Metadata = {
  title: 'Mis pedidos',
  robots: { index: false },
}

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const orders = user ? await getUserOrders(user.id) : []

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Mis pedidos</h1>
      <OrderList orders={orders} />
    </div>
  )
}
