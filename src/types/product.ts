export interface Category {
  id: string
  name: string
  slug: string
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  image: string | null
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string[]
  stock: number
  category_id: string | null
  material: string | null
  collection_id: string | null
  featured: boolean
  category?: Category | null
  collection?: Collection | null
}

export interface ProductFilters {
  category?: string
  material?: string
  collection?: string
  minPrice?: number
  maxPrice?: number
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'featured'
}
