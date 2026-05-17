'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, User, Menu, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import MobileNav from './MobileNav'

const navLinks = [
  { href: '/collections', label: 'Colecciones' },
  { href: '/catalog', label: 'Catálogo' },
  { href: '/blog', label: 'Diario' },
]

export default function Header() {
  const { itemCount, openCart } = useCart()
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-sm border-b border-charcoal/10' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 font-display text-xl tracking-[0.2em] uppercase text-charcoal"
            >
              Laura Guerrero
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link
                href={user ? '/account' : '/login'}
                className="hidden lg:block"
                aria-label="Mi cuenta"
              >
                <User className="h-5 w-5 text-charcoal/70 hover:text-charcoal transition-colors" />
              </Link>
              <button
                onClick={openCart}
                className="relative p-1"
                aria-label={`Carrito (${itemCount})`}
              >
                <ShoppingBag className="h-5 w-5 text-charcoal/70 hover:text-charcoal transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-charcoal text-cream text-[10px]">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileNav
        links={navLinks}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
      />
    </>
  )
}
