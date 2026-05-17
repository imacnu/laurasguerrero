'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'

export default function CartDrawer() {
  const { isOpen, closeCart, items } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-display text-xl tracking-wide">Carrito</h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="p-1 text-charcoal/60 hover:text-charcoal transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <p className="font-display text-2xl text-charcoal/40">Tu carrito está vacío</p>
                  <p className="text-sm text-charcoal/50">
                    Descubre nuestra colección de joyería premium
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-xs tracking-widest uppercase underline underline-offset-4"
                  >
                    Explorar catálogo
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </ul>
              )}
            </div>

            {/* Summary */}
            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-6">
                <CartSummary />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
