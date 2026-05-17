import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Términos y condiciones' }

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h1 className="font-display text-4xl mb-8">Términos y condiciones</h1>
          <div className="space-y-6 text-sm text-charcoal/70 leading-relaxed">
            <p>
              El uso de esta web implica la aceptación de los presentes términos y condiciones. Si no estás de
              acuerdo con alguno de ellos, te rogamos que no utilices nuestros servicios.
            </p>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Pedidos y pagos</h2>
              <p>
                Los precios mostrados incluyen IVA. El pago se realiza de forma segura a través de Stripe.
                Laura Guerrero se reserva el derecho de cancelar un pedido en caso de error de precio o falta
                de stock, con reembolso completo al cliente.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Propiedad intelectual</h2>
              <p>
                Todos los contenidos de esta web (textos, imágenes, diseños) son propiedad de Laura Guerrero
                y están protegidos por las leyes de propiedad intelectual. Queda prohibida su reproducción sin
                autorización expresa.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Legislación aplicable</h2>
              <p>
                Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se
                someten a los juzgados y tribunales de Madrid.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
