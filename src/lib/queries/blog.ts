import { createClient, createPublicClient } from '@/lib/supabase/server'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  published_at: string | null
  created_at: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image, published_at, created_at, content')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) return []
  return (data ?? []) as BlogPost[]
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) return null
  return data as unknown as BlogPost
}

// Cookie-free — safe in generateStaticParams
export async function getBlogSlugs(): Promise<string[]> {
  const supabase = createPublicClient()
  const { data } = await supabase.from('blog_posts').select('slug').eq('published', true)
  return (data ?? []).map((p) => p.slug)
}
