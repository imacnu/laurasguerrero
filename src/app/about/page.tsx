import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Sobre Laura',
  description: 'La historia detrás de Laura Guerrero, joyería artesanal premium diseñada en Madrid.',
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">La historia</p>
            <h1 className="font-display text-5xl">Sobre Laura</h1>
          </div>

          <div className="prose prose-sm max-w-none space-y-6 text-charcoal/70 leading-relaxed">
            <p className="font-display text-2xl text-charcoal leading-snug">
              "Cada pieza es una conversación silenciosa entre el metal y el tiempo."
            </p>

            <p>
              Laura Guerrero comenzó su andadura en la joyería de alta artesanía después de años de formación en los talleres más reconocidos de España y Francia. Lo que nació como una pasión por transformar materiales nobles en objetos con alma, se convirtió en una marca que hoy visten mujeres de todo el mundo en sus momentos más significativos.
            </p>

            <p>
              Cada pieza de la colección está diseñada y supervisada personalmente por Laura en su taller de Madrid. Trabajamos con materiales de la máxima calidad: oro de 18 quilates, plata 925, piedras semipreciosas certificadas y acabados que perduran generaciones.
            </p>

            <p>
              Nuestra filosofía es sencilla: la joyería debe ser una extensión de quien la lleva, no una imposición. Por eso diseñamos piezas atemporales que trascienden las tendencias, pensadas para acompañarte en cada etapa de tu vida.
            </p>

            <div className="border-t border-charcoal/10 pt-8 mt-8">
              <h2 className="font-display text-3xl text-charcoal mb-4">Nuestros valores</h2>
              <dl className="space-y-4">
                {[
                  { term: 'Artesanía', desc: 'Cada pieza se trabaja a mano en nuestro taller de Madrid, con atención al detalle que solo la artesanía puede ofrecer.' },
                  { term: 'Sostenibilidad', desc: 'Usamos materiales responsables y packaging 100% reciclable. La belleza no puede tener un coste medioambiental.' },
                  { term: 'Personalización', desc: 'Ofrecemos servicio de diseño personalizado para quienes buscan una pieza única e irrepetible.' },
                ].map(({ term, desc }) => (
                  <div key={term} className="flex gap-4">
                    <dt className="text-xs tracking-widest uppercase text-gold min-w-[100px] mt-0.5">{term}</dt>
                    <dd className="text-sm">{desc}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
