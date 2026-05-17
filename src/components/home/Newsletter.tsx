'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    toast.success('¡Gracias! Pronto tendrás noticias exclusivas.')
    setEmail('')
    setLoading(false)
  }

  return (
    <section className="py-20 border-t border-charcoal/10">
      <div className="mx-auto max-w-xl px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-4">Newsletter</p>
        <h2 className="font-display text-4xl font-light mb-3">Acceso exclusivo</h2>
        <p className="text-sm text-charcoal/60 mb-8">
          Sé la primera en descubrir nuevas colecciones, eventos privados y ofertas exclusivas.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" loading={loading} className="whitespace-nowrap">
            Suscribirme
          </Button>
        </form>
        <p className="mt-4 text-xs text-charcoal/40">
          Sin spam. Cancela cuando quieras.
        </p>
      </div>
    </section>
  )
}
