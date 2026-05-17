export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string | null
  quantity: number
  slug: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}
