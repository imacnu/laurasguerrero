import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Envíos',
  description: 'Información sobre envíos y tiempos de entrega de Laura Guerrero.',
}

const shippingInfo = [
  {
    title: 'Envío estándar',
    time: '3–5 días laborables',
    price: 'Gratis en pedidos +150€',
    description: 'Disponible para toda España peninsular. Envío a Baleares, Canarias, Ceuta y Melilla con costes adicionales.',
  },
  {
    title: 'Envío express',
    time: '24–48 horas',
    price: '9,95€',
    description: 'Disponible de lunes a jueves para pedidos realizados antes de las 13:00h.',
  },
  {
    title: 'Europa',
    time: '5–10 días laborables',
    price: 'Desde 14,95€',
    description: 'Enviamos a toda la Unión Europea. El coste exacto se calcula en el checkout.',
  },
]

export default function ShippingPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Información</p>
            <h1 className="font-display text-5xl">Envíos</h1>
          </div>

          <div className="space-y-8 mb-16">
            {shippingInfo.map((info) => (
              <div key={info.title} className="border-b border-charcoal/10 pb-8 last:border-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="font-display text-2xl">{info.title}</h2>
                  <span className="text-sm text-charcoal/60">{info.price}</span>
                </div>
                <p className="text-xs tracking-widest uppercase text-gold mb-2">{info.time}</p>
                <p className="text-sm text-charcoal/60 leading-relaxed">{info.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-cream-dark p-8 space-y-4">
            <h2 className="font-display text-2xl">Información importante</h2>
            <ul className="space-y-3 text-sm text-charcoal/70">
              <li className="flex gap-2">
                <span className="text-gold mt-0.5">—</span>
                <span>Todos los pedidos se procesan en 1–2 días laborables tras la confirmación del pago.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold mt-0.5">—</span>
                <span>Recibirás un email con el número de seguimiento cuando tu pedido sea enviado.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold mt-0.5">—</span>
                <span>Las piezas se envían en packaging de lujo reutilizable con certificado de autenticidad.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold mt-0.5">—</span>
                <span>Para pedidos personalizados, los plazos de envío pueden variar. Te informaremos en el momento del pedido.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
