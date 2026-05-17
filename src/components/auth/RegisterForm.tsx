'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function RegisterForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  async function onSubmit(data: RegisterInput) {
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { full_name: data.fullName } },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('¡Cuenta creada! Revisa tu email para confirmarla.')
    router.push('/login')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        {...register('fullName')}
        id="fullName"
        label="Nombre completo"
        autoComplete="name"
        error={errors.fullName?.message}
      />
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
        autoComplete="new-password"
        error={errors.password?.message}
      />
      <Input
        {...register('confirmPassword')}
        id="confirmPassword"
        type="password"
        label="Confirmar contraseña"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
      />

      <Button type="submit" loading={isSubmitting} className="w-full">
        Crear cuenta
      </Button>

      <p className="text-center text-xs text-charcoal/60">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="underline underline-offset-4 hover:text-charcoal">
          Iniciar sesión
        </Link>
      </p>
    </form>
  )
}
