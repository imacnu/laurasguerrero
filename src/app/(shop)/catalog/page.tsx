export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/catalog/ProductGrid'
import FilterPanel from '@/components/catalog/FilterPanel'
import SortDropdown from '@/components/catalog/SortDropdown'
import Skeleton from '@/components/ui/Skeleton'
import { getProducts } from '@/lib/queries/products'
import { getCategories, getCollections } from '@/lib/queries/categories'
import type { ProductFilters } from '@/types/product'

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Explora toda la colección de joyería premium Laura Guerrero.',
}

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string
    material?: string
    collection?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
  }>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams

  const filters: ProductFilters = {
    category: params.category,
    material: params.material,
    collection: params.collection,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    sort: params.sort as ProductFilters['sort'],
  }

  const [products, categories, collections] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getCollections(),
  ])

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        {/* Page header */}
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <h1 className="font-display text-4xl lg:text-5xl">Catálogo</h1>
          <p className="mt-2 text-sm text-charcoal/60">{products.length} piezas</p>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
            {/* Filters */}
            <div className="w-full lg:w-48 flex-shrink-0">
              <Suspense>
                <FilterPanel categories={categories} collections={collections} />
              </Suspense>
            </div>

            {/* Products */}
            <div className="flex-1">
              <div className="mb-6 flex justify-end">
                <Suspense>
                  <SortDropdown />
                </Suspense>
              </div>
              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
