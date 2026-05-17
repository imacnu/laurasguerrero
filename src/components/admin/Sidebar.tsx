'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Productos', icon: Package },
  { href: '/admin/orders', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
  { href: '/admin/coupons', label: 'Cupones', icon: Tag },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 flex-shrink-0 border-r border-charcoal/10 bg-cream min-h-screen">
      <div className="p-6 border-b border-charcoal/10">
        <Link href="/" className="font-display text-lg tracking-wider uppercase">
          Laura Guerrero
        </Link>
        <p className="text-[10px] tracking-widest uppercase text-charcoal/50 mt-0.5">Admin</p>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm transition-colors',
                active
                  ? 'bg-charcoal text-cream'
                  : 'text-charcoal/60 hover:text-charcoal hover:bg-cream-dark'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
