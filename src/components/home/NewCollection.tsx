import Link from 'next/link'
import type { Collection } from '@/types/product'

interface NewCollectionProps {
  collections: Collection[]
}

export default function NewCollection({ collections }: NewCollectionProps) {
  return (
    <section className="py-20 bg-cream-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Nuevas llegadas</p>
          <h2 className="font-display text-4xl lg:text-5xl">Colecciones</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 3).map((col) => (
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

          {collections.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 py-16 text-center">
              <p className="font-display text-2xl text-charcoal/30">Próximamente</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
