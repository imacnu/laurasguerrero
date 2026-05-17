'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return

    setLoading(true)
    const { createClient } = await import('@/lib/supabase/client')
    const supabase = createClient()
    const { error } = await supabase.from('products').delete().eq('id', id)

    if (error) {
      toast.error('Error al eliminar el producto')
    } else {
      toast.success('Producto eliminado')
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xs tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
    >
      {loading ? '…' : 'Eliminar'}
    </button>
  )
}
