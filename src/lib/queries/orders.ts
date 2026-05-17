import { createClient } from '@/lib/supabase/server'
import type { Order } from '@/types/order'

export async function getUserOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) return []
  return (data as Order[]) ?? []
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Order
}
