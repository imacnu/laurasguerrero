'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import type { Category, Collection } from '@/types/product'

interface FilterPanelProps {
  categories: Category[]
  collections: Collection[]
}

const materials = ['Oro', 'Plata', 'Oro rosa', 'Bronce']

export default function FilterPanel({ categories, collections }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, pathname]
  )

  const activeCategory = searchParams.get('category')
  const activeMaterial = searchParams.get('material')
  const activeCollection = searchParams.get('collection')

  return (
    <aside className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-charcoal/50 mb-3">Categoría</h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => setParam('category', null)}
              className={`text-sm transition-colors ${
                !activeCategory ? 'text-charcoal font-medium' : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Todas
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => setParam('category', cat.slug)}
                className={`text-sm transition-colors ${
                  activeCategory === cat.slug
                    ? 'text-charcoal font-medium'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Collections */}
      {collections.length > 0 && (
        <div>
          <h3 className="text-xs tracking-widest uppercase text-charcoal/50 mb-3">Colección</h3>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => setParam('collection', null)}
                className={`text-sm transition-colors ${
                  !activeCollection
                    ? 'text-charcoal font-medium'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                Todas
              </button>
            </li>
            {collections.map((col) => (
              <li key={col.id}>
                <button
                  onClick={() => setParam('collection', col.slug)}
                  className={`text-sm transition-colors ${
                    activeCollection === col.slug
                      ? 'text-charcoal font-medium'
                      : 'text-charcoal/60 hover:text-charcoal'
                  }`}
                >
                  {col.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Material */}
      <div>
        <h3 className="text-xs tracking-widest uppercase text-charcoal/50 mb-3">Material</h3>
        <ul className="space-y-1.5">
          <li>
            <button
              onClick={() => setParam('material', null)}
              className={`text-sm transition-colors ${
                !activeMaterial ? 'text-charcoal font-medium' : 'text-charcoal/60 hover:text-charcoal'
              }`}
            >
              Todos
            </button>
          </li>
          {materials.map((mat) => (
            <li key={mat}>
              <button
                onClick={() => setParam('material', mat.toLowerCase())}
                className={`text-sm transition-colors ${
                  activeMaterial === mat.toLowerCase()
                    ? 'text-charcoal font-medium'
                    : 'text-charcoal/60 hover:text-charcoal'
                }`}
              >
                {mat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Clear filters */}
      {(activeCategory || activeMaterial || activeCollection) && (
        <button
          onClick={() => router.push(pathname, { scroll: false })}
          className="text-xs tracking-widest uppercase underline underline-offset-4 text-charcoal/50 hover:text-charcoal transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  )
}
