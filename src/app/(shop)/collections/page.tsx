export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getCollections } from '@/lib/queries/categories'

export const metadata: Metadata = {
  title: 'Colecciones',
  description: 'Descubre todas las colecciones de joyería artesanal Laura Guerrero.',
}

export default async function CollectionsPage() {
  const collections = await getCollections().catch(() => [])

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Tienda</p>
            <h1 className="font-display text-5xl">Colecciones</h1>
          </div>

          {collections.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-3xl text-charcoal/30">Próximamente</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {collections.map((col) => (
                <Link
                  key={col.id}
                  href={`/collections/${col.slug}`}
                  className="group relative aspect-[4/5] overflow-hidden bg-charcoal/10 block"
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
                    <span className="font-display text-3xl text-charcoal group-hover:text-gold transition-colors">
                      {col.name}
                    </span>
                    {col.description && (
                      <p className="text-xs text-charcoal/60 leading-relaxed">{col.description}</p>
                    )}
                    <span className="text-xs tracking-widest uppercase underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
