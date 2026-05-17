import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getOrderById } from '@/lib/queries/orders'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

export const metadata: Metadata = {
  title: 'Detalle pedido — Admin',
  robots: { index: false },
}

interface AdminOrderDetailPageProps {
  params: Promise<{ id: string }>
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) notFound()

  return (
    <div className="space-y-6 max-w-2xl">
      <Link
        href="/admin/orders"
        className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
      >
        ← Pedidos
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl">Pedido #{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-sm text-charcoal/60 mt-1">
            {new Date(order.created_at).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          {order.customer_email && (
            <p className="text-sm text-charcoal/60 mt-0.5">{order.customer_email}</p>
          )}
        </div>
        <Badge>{statusLabels[order.status]}</Badge>
      </div>

      {order.items && order.items.length > 0 && (
        <div className="border border-charcoal/10 divide-y divide-charcoal/10">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium">{item.product_name}</p>
                <p className="text-xs text-charcoal/50">Qty: {item.quantity} · {formatPrice(item.price)} c/u</p>
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

      {order.shipping_address && (
        <div className="border border-charcoal/10 p-4 space-y-1">
          <p className="text-xs tracking-widest uppercase text-charcoal/50 mb-2">Dirección de envío</p>
          {Object.values(order.shipping_address).filter(Boolean).map((v, i) => (
            <p key={i} className="text-sm">{v}</p>
          ))}
        </div>
      )}
    </div>
  )
}
