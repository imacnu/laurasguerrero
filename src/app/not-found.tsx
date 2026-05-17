import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center space-y-6 px-6">
          <p className="font-display text-8xl text-charcoal/10">404</p>
          <h1 className="font-display text-3xl">Página no encontrada</h1>
          <p className="text-charcoal/60">La página que buscas no existe o ha sido movida.</p>
          <Link
            href="/"
            className="inline-block text-xs tracking-widest uppercase underline underline-offset-4"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
