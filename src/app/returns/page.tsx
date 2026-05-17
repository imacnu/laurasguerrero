import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Devoluciones',
  description: 'Política de devoluciones y cambios de Laura Guerrero.',
}

export default function ReturnsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Información</p>
            <h1 className="font-display text-5xl">Devoluciones</h1>
          </div>

          <div className="space-y-10 text-sm text-charcoal/70 leading-relaxed">
            <section>
              <h2 className="font-display text-2xl text-charcoal mb-3">Política general</h2>
              <p>
                Aceptamos devoluciones dentro de los <strong className="text-charcoal">14 días naturales</strong> desde la recepción del pedido, siempre que las piezas estén en perfecto estado, sin haber sido usadas y con el packaging original.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-3">Cómo iniciar una devolución</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Envía un email a <a href="mailto:devoluciones@lauraguerrero.com" className="underline underline-offset-4 hover:text-charcoal transition-colors">devoluciones@lauraguerrero.com</a> con tu número de pedido.</li>
                <li>Te enviaremos las instrucciones de devolución en menos de 24 horas laborables.</li>
                <li>Empaqueta la pieza con cuidado en su caja original y envíala a la dirección indicada.</li>
                <li>Una vez recibida y verificada, procesaremos el reembolso en 5–10 días laborables.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display text-2xl text-charcoal mb-3">Excepciones</h2>
              <ul className="space-y-2">
                {[
                  'Piezas personalizadas o con grabado bajo pedido.',
                  'Artículos marcados como "Última unidad" o en promoción final de temporada.',
                  'Piezas con signos de uso, daños o sin packaging original.',
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-charcoal/30 mt-0.5">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-cream-dark p-6">
              <h2 className="font-display text-xl text-charcoal mb-2">¿Tienes dudas?</h2>
              <p>
                Contacta con nuestro equipo en{' '}
                <a href="mailto:hola@lauraguerrero.com" className="underline underline-offset-4 hover:text-charcoal transition-colors">
                  hola@lauraguerrero.com
                </a>{' '}
                y te ayudaremos encantadas.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
