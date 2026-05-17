import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { Order } from '@/types/order'

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  processing: 'En proceso',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}

const statusVariant: Record<string, 'default' | 'gold' | 'outline'> = {
  pending: 'outline',
  processing: 'gold',
  shipped: 'gold',
  delivered: 'default',
  cancelled: 'outline',
}

interface OrderListProps {
  orders: Order[]
}

export default function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-display text-2xl text-charcoal/40">No tienes pedidos todavía</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-charcoal/10">
      {orders.map((order) => (
        <li key={order.id} className="py-5">
          <Link href={`/account/orders/${order.id}`} className="flex items-center justify-between hover:opacity-70 transition-opacity">
            <div className="space-y-1">
              <p className="text-sm font-medium">Pedido #{order.id.slice(-8).toUpperCase()}</p>
              <p className="text-xs text-charcoal/50">
                {new Date(order.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant={statusVariant[order.status]}>
                {statusLabels[order.status]}
              </Badge>
              <span className="text-sm font-medium">{formatPrice(order.total)}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
