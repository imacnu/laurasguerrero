import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import Button from '@/components/ui/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Productos — Admin',
  robots: { index: false },
}

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('id, name, price, stock, slug')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Productos</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center bg-charcoal text-cream hover:bg-charcoal-light border border-charcoal transition-colors px-4 py-2 text-xs tracking-widest uppercase"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="border border-charcoal/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream-dark">
            <tr>
              {['Nombre', 'Precio', 'Stock', 'Acciones'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs tracking-widest uppercase text-charcoal/50"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {(products ?? []).map((p) => (
              <tr key={p.id} className="hover:bg-cream-dark/50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={p.stock === 0 ? 'text-red-500' : ''}>{p.stock}</span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="text-xs tracking-widest uppercase underline underline-offset-4"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
