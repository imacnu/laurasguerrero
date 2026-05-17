import type { Metadata } from 'next'
import Link from 'next/link'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Crear cuenta',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.2em] uppercase text-charcoal"
          >
            Laura Guerrero
          </Link>
          <h1 className="mt-6 font-display text-3xl">Crear cuenta</h1>
          <p className="mt-2 text-sm text-charcoal/60">Únete a la comunidad Laura Guerrero</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
