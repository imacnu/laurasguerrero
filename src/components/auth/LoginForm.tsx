'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') ?? '/account'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data: LoginInput) {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
      toast.error('Email o contraseña incorrectos')
      return
    }
    router.push(next)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        {...register('email')}
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        id="password"
        type="password"
        label="Contraseña"
        autoComplete="current-password"
        error={errors.password?.message}
      />

      <div className="flex justify-end">
        <Link
          href="/recover-password"
          className="text-xs text-charcoal/60 hover:text-charcoal transition-colors underline underline-offset-4"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" loading={isSubmitting} className="w-full">
        Iniciar sesión
      </Button>

      <p className="text-center text-xs text-charcoal/60">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="underline underline-offset-4 hover:text-charcoal">
          Crear cuenta
        </Link>
      </p>
    </form>
  )
}
