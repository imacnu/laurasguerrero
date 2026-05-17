import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductGrid from '@/components/catalog/ProductGrid'
import { getProducts } from '@/lib/queries/products'
import { getCollections, getCollectionsPublic } from '@/lib/queries/categories'

interface CollectionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const collections = await getCollectionsPublic()
    return collections.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params
  const collections = await getCollections().catch(() => [])
  const col = collections.find((c) => c.slug === slug)
  if (!col) return {}
  return { title: col.name, description: col.description ?? `Colección ${col.name}` }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params
  const collections = await getCollections().catch(() => [])
  const collection = collections.find((c) => c.slug === slug)

  if (!collection) notFound()

  const products = await getProducts({ collection: slug }).catch(() => [])

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Colección</p>
            <h1 className="font-display text-5xl">{collection.name}</h1>
            {collection.description && (
              <p className="mt-3 max-w-xl text-charcoal/60">{collection.description}</p>
            )}
          </div>
          <ProductGrid products={products} />
        </div>
      </main>
      <Footer />
    </>
  )
}
