export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getBlogPosts } from '@/lib/queries/blog'

export const metadata: Metadata = {
  title: 'Diario',
  description:
    'Tendencias de joyería, guías de regalos y la historia detrás de cada pieza Laura Guerrero.',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-2">Diario</p>
            <h1 className="font-display text-5xl">Inspiración & Tendencias</h1>
          </div>

          {posts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-3xl text-charcoal/30">Próximamente</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden bg-cream-dark mb-4">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <span className="font-display text-4xl text-charcoal/20">LG</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {post.published_at && (
                      <p className="text-xs text-charcoal/50">
                        {new Date(post.published_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                    <h2 className="font-display text-xl group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-charcoal/60 line-clamp-2">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
