'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCart } from '@/hooks/useCart'
import Button from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface AddToCartProps {
  product: Product
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addItem, openCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const outOfStock = product.stock === 0

  function handleAdd() {
    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? null,
      quantity,
      slug: product.slug,
    })
    openCart()
    toast.success('Añadido al carrito')
  }

  return (
    <div className="space-y-4">
      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-xs tracking-widest uppercase text-charcoal/60">Cantidad</span>
        <div className="flex items-center border border-charcoal/20">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-cream-dark transition-colors text-sm"
          >
            −
          </button>
          <span className="px-4 py-2 text-sm min-w-[3rem] text-center">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            disabled={quantity >= product.stock}
            className="px-3 py-2 hover:bg-cream-dark transition-colors text-sm disabled:opacity-40"
          >
            +
          </button>
        </div>
      </div>

      <Button
        className="w-full"
        size="lg"
        onClick={handleAdd}
        disabled={outOfStock}
      >
        {outOfStock ? 'Agotado' : 'Añadir al carrito'}
      </Button>
    </div>
  )
}
