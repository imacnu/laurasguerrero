'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { recoverPasswordSchema, type RecoverPasswordInput } from '@/lib/validations/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function RecoverPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RecoverPasswordInput>({ resolver: zodResolver(recoverPasswordSchema) })

  async function onSubmit(data: RecoverPasswordInput) {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account/reset-password`,
    })

    if (error) {
      toast.error('Error al enviar el email. Inténtalo de nuevo.')
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="text-center space-y-3">
        <p className="font-display text-2xl">Revisa tu email</p>
        <p className="text-sm text-charcoal/60">
          Si existe una cuenta con ese email, recibirás un enlace para restablecer tu contraseña.
        </p>
        <Link
          href="/login"
          className="text-xs tracking-widest uppercase underline underline-offset-4"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <p className="text-sm text-charcoal/60">
        Introduce tu email y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      <Input
        {...register('email')}
        id="email"
        type="email"
        label="Email"
        autoComplete="email"
        error={errors.email?.message}
      />
      <Button type="submit" loading={isSubmitting} className="w-full">
        Enviar enlace
      </Button>
      <p className="text-center">
        <Link
          href="/login"
          className="text-xs text-charcoal/60 hover:text-charcoal transition-colors underline underline-offset-4"
        >
          Volver al inicio de sesión
        </Link>
      </p>
    </form>
  )
}
