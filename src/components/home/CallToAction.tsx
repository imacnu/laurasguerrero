import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function CallToAction() {
  return (
    <section className="py-20 bg-rose">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-4">Exclusivo</p>
        <h2 className="font-display text-4xl font-light lg:text-5xl leading-tight mb-6">
          Diseño personalizado para ti
        </h2>
        <p className="text-charcoal/60 mb-8 max-w-lg mx-auto leading-relaxed">
          ¿Buscas algo único? Diseñamos piezas a medida para los momentos más especiales. Bodas,
          aniversarios, regalos únicos.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center bg-charcoal text-cream hover:bg-charcoal-light border border-charcoal transition-colors px-8 py-4 text-sm tracking-widest uppercase font-sans"
        >
          Solicitar presupuesto
        </Link>
      </div>
    </section>
  )
}
