export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const accountNav = [
  { href: '/account', label: 'Mi cuenta', exact: true },
  { href: '/account/orders', label: 'Mis pedidos' },
  { href: '/account/addresses', label: 'Direcciones' },
]

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/account')
  }

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24 min-h-screen">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
            {/* Sidebar */}
            <nav className="space-y-1">
              {accountNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors border-b border-charcoal/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Content */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
