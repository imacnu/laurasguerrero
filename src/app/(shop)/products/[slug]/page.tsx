import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ImageGallery from '@/components/product/ImageGallery'
import AddToCart from '@/components/product/AddToCart'
import Accordion from '@/components/product/Accordion'
import Recommendations from '@/components/product/Recommendations'
import StructuredData from '@/components/seo/StructuredData'
import Badge from '@/components/ui/Badge'
import { getProductBySlug, getProductSlugs, getRelatedProducts } from '@/lib/queries/products'
import { formatPrice } from '@/lib/utils'

export const revalidate = 3600

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.description ?? `${product.name} — Joyería premium Laura Guerrero`,
    openGraph: {
      title: `${product.name} | Laura Guerrero`,
      description: product.description ?? '',
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  }
}

const accordionItems = [
  {
    title: 'Información del producto',
    content:
      'Cada pieza está elaborada artesanalmente con materiales seleccionados de primera calidad. Las dimensiones pueden variar ligeramente al ser piezas únicas.',
  },
  {
    title: 'Envío',
    content:
      'Envío estándar en 3-5 días laborables. Envío exprés en 24-48h. Envío gratuito en pedidos superiores a 100€.',
  },
  {
    title: 'Devoluciones',
    content:
      'Aceptamos devoluciones en los 14 días siguientes a la recepción del pedido. La pieza debe estar en perfecto estado y sin usar.',
  },
]

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const related = await getRelatedProducts(product.id, product.category_id, 4)

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'EUR',
      availability:
        product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
    brand: {
      '@type': 'Brand',
      name: 'Laura Guerrero',
    },
  }

  return (
    <>
      <StructuredData data={productSchema} />
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Gallery */}
            <ImageGallery images={product.images} productName={product.name} />

            {/* Info */}
            <div className="space-y-6">
              {product.category && (
                <p className="text-xs tracking-widest uppercase text-charcoal/50">
                  {product.category.name}
                </p>
              )}
              <h1 className="font-display text-4xl leading-tight">{product.name}</h1>
              <p className="text-2xl">{formatPrice(product.price)}</p>

              {product.material && (
                <div className="flex items-center gap-2">
                  <span className="text-xs tracking-widest uppercase text-charcoal/50">Material:</span>
                  <Badge variant="outline">{product.material}</Badge>
                </div>
              )}

              {product.description && (
                <p className="text-sm text-charcoal/70 leading-relaxed">{product.description}</p>
              )}

              <AddToCart product={product} />

              <Accordion items={accordionItems} />
            </div>
          </div>

          <Recommendations products={related} />
        </div>
      </main>
      <Footer />
    </>
  )
}
