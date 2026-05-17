'use client'

import Link from 'next/link'
import { X, User } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { User as SupabaseUser } from '@supabase/supabase-js'

interface MobileNavProps {
  links: { href: string; label: string }[]
  isOpen: boolean
  onClose: () => void
  user: SupabaseUser | null
}

export default function MobileNav({ links, isOpen, onClose, user }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-cream flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
              <span className="font-display text-lg tracking-[0.15em] uppercase">Menu</span>
              <button onClick={onClose} aria-label="Cerrar menú">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-6 flex-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="py-3 text-sm tracking-widest uppercase border-b border-charcoal/10 hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="p-6 border-t border-charcoal/10">
              <Link
                href={user ? '/account' : '/login'}
                onClick={onClose}
                className="flex items-center gap-3 text-sm tracking-widest uppercase"
              >
                <User className="h-4 w-4" />
                {user ? 'Mi Cuenta' : 'Iniciar Sesión'}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
