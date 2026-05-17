import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mis direcciones',
  robots: { index: false },
}

export default function AddressesPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Direcciones de envío</h1>
      <p className="text-sm text-charcoal/60">
        Las direcciones se guardan durante el proceso de compra en Stripe.
      </p>
    </div>
  )
}
