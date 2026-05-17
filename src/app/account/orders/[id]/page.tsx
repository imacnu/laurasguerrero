import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getOrderById } from '@/lib/queries/orders'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Detalle del pedido',
  robots: { index: false },
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const order = await getOrderById(id)

  if (!order || order.user_id !== user?.id) notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/account/orders"
          className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
        >
          ← Mis pedidos
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl">
            Pedido #{order.id.slice(-8).toUpperCase()}
          </h1>
          <p className="text-sm text-charcoal/60 mt-1">
            {new Date(order.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <Badge>{statusLabels[order.status]}</Badge>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="border border-charcoal/10 divide-y divide-charcoal/10">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{item.product_name}</p>
                <p className="text-xs text-charcoal/50">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 font-medium">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
