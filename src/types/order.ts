import type { OrderStatus } from './database.types'

export interface OrderItem {
  id: string
  product_id: string
  product_name: string
  product_image: string | null
  quantity: number
  price: number
}

export interface Order {
  id: string
  user_id: string | null
  status: OrderStatus
  total: number
  stripe_session_id: string | null
  shipping_address: Record<string, string> | null
  customer_email: string | null
  created_at: string
  items?: OrderItem[]
}
