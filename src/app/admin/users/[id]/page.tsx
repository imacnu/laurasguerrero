import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import UserForm from '@/components/admin/UserForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Editar usuario — Admin',
  robots: { index: false },
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('id', id)
    .single()

  if (!profile) notFound()

  const { data: roleData } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', id)
    .eq('role', 'admin')
    .maybeSingle()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl">Editar usuario</h1>
        <p className="text-sm text-charcoal/50 mt-1">{profile.email}</p>
      </div>
      <UserForm
        userId={profile.id}
        fullName={profile.full_name}
        email={profile.email}
        isAdmin={!!roleData}
      />
    </div>
  )
}
