import ProductCard from '@/components/catalog/ProductCard'
import type { Product } from '@/types/product'

interface RecommendationsProps {
  products: Product[]
}

export default function Recommendations({ products }: RecommendationsProps) {
  if (products.length === 0) return null

  return (
    <section className="mt-20 pt-12 border-t border-charcoal/10">
      <h2 className="font-display text-3xl text-center mb-10">También te puede gustar</h2>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  )
}
