import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories, getCollections } from '@/lib/queries/categories'
import ProductForm from '@/components/admin/ProductForm'

export const metadata: Metadata = {
  title: 'Nuevo producto — Admin',
  robots: { index: false },
}

export default async function NewProductPage() {
  const [categories, collections] = await Promise.all([getCategories(), getCollections()])

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/products"
          className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
        >
          ← Productos
        </Link>
      </div>
      <h1 className="font-display text-3xl">Nuevo producto</h1>
      <ProductForm categories={categories} collections={collections} />
    </div>
  )
}
