export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Bestsellers from '@/components/home/Bestsellers'
import NewCollection from '@/components/home/NewCollection'
import Storytelling from '@/components/home/Storytelling'
import CallToAction from '@/components/home/CallToAction'
import InstagramFeed from '@/components/home/InstagramFeed'
import Newsletter from '@/components/home/Newsletter'
import StructuredData from '@/components/seo/StructuredData'
import { getFeaturedProducts } from '@/lib/queries/products'
import { getCollections } from '@/lib/queries/categories'

export const metadata: Metadata = {
  title: 'Laura Guerrero — Joyería Premium Artesanal',
  description:
    'Joyería artesanal premium diseñada en Madrid. Anillos, collares, pulseras y pendientes para los momentos más especiales.',
  openGraph: {
    title: 'Laura Guerrero — Joyería Premium Artesanal',
    description: 'Joyería artesanal premium diseñada en Madrid.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],
  },
}

export default async function HomePage() {
  const [featuredProducts, collections] = await Promise.all([
    getFeaturedProducts(4).catch(() => []),
    getCollections().catch(() => []),
  ])

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Laura Guerrero',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    description: 'Joyería artesanal premium diseñada en Madrid.',
    sameAs: ['https://instagram.com/lauraguerrero'],
  }

  return (
    <>
      <StructuredData data={organizationSchema} />
      <Header />
      <main>
        <Hero />
        <Bestsellers products={featuredProducts} />
        <NewCollection collections={collections} />
        <Storytelling />
        <CallToAction />
        <InstagramFeed />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
