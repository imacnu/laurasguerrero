'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface UserFormProps {
  userId: string
  fullName: string | null
  email: string
  isAdmin: boolean
}

export default function UserForm({ userId, fullName, email, isAdmin }: UserFormProps) {
  const router = useRouter()
  const [name, setName] = useState(fullName ?? '')
  const [admin, setAdmin] = useState(isAdmin)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()

    // Update profile name
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ full_name: name })
      .eq('id', userId)

    if (profileError) {
      toast.error('Error al actualizar el perfil')
      setLoading(false)
      return
    }

    // Sync admin role
    if (admin && !isAdmin) {
      await supabase.from('user_roles').insert({ user_id: userId, role: 'admin' })
    } else if (!admin && isAdmin) {
      await supabase.from('user_roles').delete().eq('user_id', userId).eq('role', 'admin')
    }

    toast.success('Usuario actualizado')
    router.push('/admin/users')
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="space-y-5 max-w-md">
      <div>
        <label className="block text-xs tracking-widest uppercase text-charcoal/70 mb-1.5">Email</label>
        <p className="text-sm text-charcoal/60 border border-charcoal/10 px-4 py-3 bg-cream-dark">{email}</p>
        <p className="text-[11px] text-charcoal/40 mt-1">El email se gestiona desde Supabase Auth.</p>
      </div>

      <div>
        <label htmlFor="full_name" className="block text-xs tracking-widest uppercase text-charcoal/70 mb-1.5">
          Nombre completo
        </label>
        <input
          id="full_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm focus:border-charcoal focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer p-4 border border-charcoal/10 hover:border-charcoal/30 transition-colors">
        <input
          type="checkbox"
          checked={admin}
          onChange={(e) => setAdmin(e.target.checked)}
          className="h-4 w-4"
        />
        <div>
          <p className="text-sm font-medium">Administrador</p>
          <p className="text-xs text-charcoal/50">Acceso completo al panel de administración</p>
        </div>
      </label>

      <div className="flex gap-3 pt-2">
        <Button onClick={handleSave} loading={loading}>
          Guardar cambios
        </Button>
        <Button variant="outline" onClick={() => router.push('/admin/users')}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}
