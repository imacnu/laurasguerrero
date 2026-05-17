export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-lg px-6 py-20 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-gold" />
          </div>
          <h1 className="font-display text-4xl">¡Pedido confirmado!</h1>
          <p className="text-charcoal/60 leading-relaxed">
            Gracias por tu compra. Recibirás un email de confirmación con los detalles de tu pedido.
          </p>
          {session_id && (
            <p className="text-xs text-charcoal/40 font-mono">
              Ref: {session_id.slice(-12).toUpperCase()}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center border border-charcoal px-6 py-3 text-xs tracking-widest uppercase hover:bg-charcoal hover:text-cream transition-colors"
            >
              Ver mis pedidos
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center bg-charcoal text-cream px-6 py-3 text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
