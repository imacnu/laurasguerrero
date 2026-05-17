'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const options = [
  { value: 'newest', label: 'Más recientes' },
  { value: 'featured', label: 'Destacados' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
]

export default function SortDropdown() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const current = searchParams.get('sort') ?? 'newest'

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', e.target.value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <select
      value={current}
      onChange={onChange}
      className="border border-charcoal/20 bg-transparent px-3 py-2 text-xs tracking-wider uppercase focus:outline-none focus:border-charcoal transition-colors cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
