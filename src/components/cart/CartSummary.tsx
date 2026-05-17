'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'

export default function CartSummary() {
  const { items, subtotal, closeCart } = useCart()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Error al iniciar el pago')

      closeCart()
      router.push(data.url)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Error al procesar el pago')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-charcoal/60">Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-charcoal/60">Envío</span>
        <span className="text-charcoal/60">Se calculará en el pago</span>
      </div>
      <div className="flex justify-between font-medium pt-2 border-t border-charcoal/10">
        <span>Total estimado</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <Button className="w-full" onClick={handleCheckout} loading={loading}>
        Finalizar compra
      </Button>
      <p className="text-xs text-center text-charcoal/50">
        Pago seguro con SSL · Stripe
      </p>
    </div>
  )
}
