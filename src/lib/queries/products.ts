import { createClient, createPublicClient } from '@/lib/supabase/server'
import type { Product, ProductFilters } from '@/types/product'

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(id, name, slug), collection:collections(id, name, slug)')
    .gt('stock', 0)

  if (filters?.category) {
    query = query.eq('category.slug', filters.category)
  }
  if (filters?.material) {
    query = query.ilike('material', `%${filters.material}%`)
  }
  if (filters?.collection) {
    query = query.eq('collection.slug', filters.collection)
  }
  if (filters?.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice)
  }

  const sort = filters?.sort ?? 'newest'
  if (sort === 'price_asc') query = query.order('price', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  else if (sort === 'featured') query = query.order('featured', { ascending: false })
  else query = query.order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) return []
  return (data as unknown as Product[]) ?? []
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug), collection:collections(id, name, slug)')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data as unknown as Product
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .eq('featured', true)
    .gt('stock', 0)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return []
  return (data as unknown as Product[]) ?? []
}

// Uses cookie-free client — safe to call in generateStaticParams
export async function getProductSlugs(): Promise<string[]> {
  const supabase = createPublicClient()
  const { data } = await supabase.from('products').select('slug')
  return (data ?? []).map((p) => p.slug)
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit = 4
): Promise<Product[]> {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*, category:categories(id, name, slug)')
    .neq('id', productId)
    .gt('stock', 0)
    .limit(limit)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data } = await query
  return (data as unknown as Product[]) ?? []
}
