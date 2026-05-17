import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StructuredData from '@/components/seo/StructuredData'
import { getBlogPostBySlug, getBlogSlugs } from '@/lib/queries/blog'

export const revalidate = 3600

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      images: post.cover_image ? [{ url: post.cover_image }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    datePublished: post.published_at,
    author: { '@type': 'Person', name: 'Laura Guerrero' },
    publisher: { '@type': 'Organization', name: 'Laura Guerrero' },
  }

  return (
    <>
      <StructuredData data={articleSchema} />
      <Header />
      <main className="pt-20 lg:pt-24">
        <article className="mx-auto max-w-2xl px-6 py-12 lg:px-8">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-xs tracking-widest uppercase text-charcoal/50 hover:text-charcoal transition-colors"
            >
              ← Diario
            </Link>
          </div>

          {post.cover_image && (
            <div className="aspect-[16/9] overflow-hidden mb-8">
              <Image
                src={post.cover_image}
                alt={post.title}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <header className="mb-8 space-y-3">
            {post.published_at && (
              <p className="text-xs text-charcoal/50">
                {new Date(post.published_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            <h1 className="font-display text-4xl lg:text-5xl">{post.title}</h1>
            {post.excerpt && (
              <p className="text-lg text-charcoal/60 leading-relaxed">{post.excerpt}</p>
            )}
          </header>

          <div className="prose prose-neutral max-w-none text-charcoal/80 leading-relaxed [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-light [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-light">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
