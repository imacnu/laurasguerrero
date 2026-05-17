import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cupones — Admin',
  robots: { index: false },
}

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Cupones</h1>
      <p className="text-sm text-charcoal/60">
        Los cupones de descuento se gestionan directamente en el dashboard de Stripe.
      </p>
    </div>
  )
}
