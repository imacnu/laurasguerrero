import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getCategories, getCollections } from '@/lib/queries/categories'
import ProductForm from '@/components/admin/ProductForm'
import type { Product } from '@/types/product'

export const metadata: Metadata = {
  title: 'Editar producto — Admin',
  robots: { index: false },
}

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) notFound()

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
      <h1 className="font-display text-3xl">Editar: {product.name}</h1>
      <ProductForm product={product as Product} categories={categories} collections={collections} />
    </div>
  )
}
