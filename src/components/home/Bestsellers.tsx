import Link from 'next/link'
import ProductCard from '@/components/catalog/ProductCard'
import type { Product } from '@/types/product'

interface BestsellersProps {
  products: Product[]
}

export default function Bestsellers({ products }: BestsellersProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Más vendidos</p>
            <h2 className="font-display text-4xl lg:text-5xl">Los favoritos</h2>
          </div>
          <Link
            href="/catalog"
            className="hidden sm:block text-xs tracking-widest uppercase underline underline-offset-4 text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/catalog" className="text-xs tracking-widest uppercase underline underline-offset-4">
            Ver todos
          </Link>
        </div>
      </div>
    </section>
  )
}
