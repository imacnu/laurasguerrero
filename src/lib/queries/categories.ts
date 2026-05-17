import { createClient, createPublicClient } from '@/lib/supabase/server'
import type { Category, Collection } from '@/types/product'

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('categories').select('*').order('name')
  if (error) return []
  return (data ?? []) as Category[]
}

export async function getCollections(): Promise<Collection[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('collections').select('*').order('name')
  if (error) return []
  return (data ?? []) as Collection[]
}

// Cookie-free — safe in generateStaticParams
export async function getCollectionsPublic(): Promise<Collection[]> {
  const supabase = createPublicClient()
  const { data } = await supabase.from('collections').select('*').order('name')
  return (data ?? []) as Collection[]
}
