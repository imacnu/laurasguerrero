'use client'

import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const { items } = useCart()

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
          <h1 className="font-display text-4xl mb-10">Carrito</h1>

          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="font-display text-3xl text-charcoal/40">Tu carrito está vacío</p>
              <Link
                href="/catalog"
                className="inline-block text-sm tracking-widest uppercase underline underline-offset-4"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ul>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              </div>
              <div>
                <CartSummary />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
