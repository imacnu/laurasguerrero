'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/types/cart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity, closeCart } = useCart()

  return (
    <li className="flex gap-4 py-4 border-b border-charcoal/10 last:border-0">
      {/* Image */}
      <Link
        href={`/products/${item.slug}`}
        onClick={closeCart}
        className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-cream-dark"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/products/${item.slug}`}
            onClick={closeCart}
            className="font-display text-base hover:text-gold transition-colors line-clamp-2"
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.id)}
            aria-label="Eliminar"
            className="flex-shrink-0 text-charcoal/40 hover:text-charcoal transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity */}
          <div className="flex items-center gap-2 border border-charcoal/20">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-1.5 hover:bg-cream-dark transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1.5 hover:bg-cream-dark transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
        </div>
      </div>
    </li>
  )
}
