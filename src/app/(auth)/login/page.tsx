import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import LoginForm from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  robots: { index: false },
}

export default function LoginPage() {
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
          <h1 className="mt-6 font-display text-3xl">Bienvenida</h1>
          <p className="mt-2 text-sm text-charcoal/60">Inicia sesión en tu cuenta</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
