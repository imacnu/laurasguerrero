import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Política de privacidad' }

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h1 className="font-display text-4xl mb-8">Política de privacidad</h1>
          <div className="space-y-6 text-sm text-charcoal/70 leading-relaxed">
            <p>
              En Laura Guerrero nos comprometemos a proteger tu privacidad y a tratar tus datos personales con
              total transparencia, en cumplimiento del Reglamento General de Protección de Datos (RGPD) y la
              Ley Orgánica de Protección de Datos (LOPDGDD).
            </p>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Responsable del tratamiento</h2>
              <p>Laura Guerrero · hola@lauraguerrero.com · Madrid, España</p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Datos que recogemos</h2>
              <p>
                Nombre, dirección de email y dirección postal cuando realizas un pedido o te suscribes a
                nuestra newsletter. No compartimos tus datos con terceros salvo proveedores de servicio
                esenciales (Stripe para pagos, Supabase para almacenamiento).
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Tus derechos</h2>
              <p>
                Puedes ejercer tus derechos de acceso, rectificación, supresión y portabilidad enviando un
                email a hola@lauraguerrero.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
