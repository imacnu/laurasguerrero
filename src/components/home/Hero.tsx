'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-charcoal">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #C9A96E 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-xs tracking-[0.4em] uppercase text-gold"
        >
          Nueva Colección 2025
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-light leading-tight text-cream sm:text-7xl lg:text-8xl"
        >
          Piezas que
          <br />
          <em className="text-gold not-italic">cuentan tu historia</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg text-base text-cream/60 leading-relaxed"
        >
          Joyería artesanal de autor, diseñada para acompañar los momentos más especiales de tu vida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center bg-gold text-charcoal hover:bg-gold-dark border border-gold transition-colors px-8 py-4 text-sm tracking-widest uppercase font-sans"
          >
            Descubrir colección
          </Link>
          <Link
            href="/collections"
            className="text-xs tracking-widest uppercase text-cream/70 hover:text-cream transition-colors underline underline-offset-4"
          >
            Ver colecciones
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  )
}
