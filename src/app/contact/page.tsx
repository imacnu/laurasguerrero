import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta con Laura Guerrero para consultas, pedidos personalizados o atención al cliente.',
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Escríbenos</p>
            <h1 className="font-display text-5xl">Contacto</h1>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl mb-3">Atención al cliente</h2>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  Estamos aquí para ayudarte con cualquier consulta sobre nuestras piezas, pedidos o servicios personalizados.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-1">Email</p>
                  <a
                    href="mailto:hola@lauraguerrero.com"
                    className="text-sm hover:text-gold transition-colors underline underline-offset-4"
                  >
                    hola@lauraguerrero.com
                  </a>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-1">Horario</p>
                  <p className="text-sm text-charcoal/70">Lunes a viernes, 10:00 – 18:00</p>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-charcoal/40 mb-1">Tiempo de respuesta</p>
                  <p className="text-sm text-charcoal/70">Menos de 24 horas laborables</p>
                </div>
              </div>
            </div>

            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs tracking-widest uppercase text-charcoal/60 mb-1.5">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-charcoal transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-widest uppercase text-charcoal/60 mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-charcoal transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs tracking-widest uppercase text-charcoal/60 mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full border-b border-charcoal/20 bg-transparent py-2 text-sm outline-none focus:border-charcoal transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-charcoal text-cream py-3 text-xs tracking-widest uppercase hover:bg-charcoal/90 transition-colors"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
