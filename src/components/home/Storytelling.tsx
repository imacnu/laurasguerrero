'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function Storytelling() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-charcoal text-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold">Nuestra historia</p>
            <h2 className="font-display text-4xl font-light leading-tight lg:text-5xl">
              Cada pieza nace de
              <em className="block text-gold not-italic">una emoción</em>
            </h2>
            <p className="text-cream/60 leading-relaxed max-w-md">
              Diseñada a mano en Madrid, cada joya de Laura Guerrero es una expresión de belleza
              intemporal. Trabajamos con materiales seleccionados y técnicas artesanales heredadas,
              creando piezas únicas que acompañan tu historia.
            </p>
            <Link
              href="/about"
              className="inline-block text-xs tracking-widest uppercase border-b border-gold pb-0.5 text-gold hover:text-gold-light transition-colors"
            >
              Conocer más
            </Link>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-3"
          >
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`bg-charcoal-light ${i === 2 ? 'row-span-2' : 'aspect-square'}`}>
                <div className="h-full w-full flex items-center justify-center min-h-[120px]">
                  <span className="font-display text-4xl text-cream/10">LG</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
