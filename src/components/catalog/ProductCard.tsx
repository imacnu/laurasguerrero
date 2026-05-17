'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCart()

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    if (product.stock === 0) return

    addItem({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? null,
      quantity: 1,
      slug: product.slug,
    })
    openCart()
    toast.success('Añadido al carrito')
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-4xl text-charcoal/20">LG</span>
          </div>
        )}

        {/* Quick add button */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex w-full items-center justify-center gap-2 bg-charcoal py-3 text-cream text-xs tracking-widest uppercase hover:bg-charcoal-light transition-colors disabled:opacity-50"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>
        </div>

        {product.stock === 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-charcoal px-2 py-1 text-cream text-[10px] tracking-widest uppercase">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        {product.category && (
          <p className="text-[10px] tracking-widest uppercase text-charcoal/50">
            {product.category.name}
          </p>
        )}
        <h3 className="font-display text-lg leading-tight group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}
