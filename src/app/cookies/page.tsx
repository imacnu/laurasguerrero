import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = { title: 'Política de cookies' }

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h1 className="font-display text-4xl mb-8">Política de cookies</h1>
          <div className="space-y-6 text-sm text-charcoal/70 leading-relaxed">
            <p>
              Esta web utiliza cookies propias y de terceros para mejorar tu experiencia de navegación.
            </p>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Cookies necesarias</h2>
              <p>
                Son imprescindibles para el funcionamiento básico de la web: gestión de sesión, carrito de
                compra y preferencias de usuario. No pueden desactivarse.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Cookies analíticas</h2>
              <p>
                Nos permiten entender cómo interactúas con la web para mejorar nuestros servicios. Los datos
                son anónimos y agregados.
              </p>
            </section>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-2">Cómo gestionar las cookies</h2>
              <p>
                Puedes configurar tu navegador para bloquear o eliminar cookies. Ten en cuenta que esto puede
                afectar al funcionamiento de algunas partes de la web.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
