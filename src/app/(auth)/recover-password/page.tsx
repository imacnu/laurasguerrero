import type { Metadata } from 'next'
import Link from 'next/link'
import RecoverPasswordForm from '@/components/auth/RecoverPasswordForm'

export const metadata: Metadata = {
  title: 'Recuperar contraseña',
  robots: { index: false },
}

export default function RecoverPasswordPage() {
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
          <h1 className="mt-6 font-display text-3xl">Recuperar contraseña</h1>
        </div>
        <RecoverPasswordForm />
      </div>
    </div>
  )
}
