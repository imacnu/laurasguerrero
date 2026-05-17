import type { MetadataRoute } from 'next'
import { getProductSlugs } from '@/lib/queries/products'
import { getCollections } from '@/lib/queries/categories'
import { getBlogSlugs } from '@/lib/queries/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lauraguerrero.es'

  const [productSlugs, collections, blogSlugs] = await Promise.all([
    getProductSlugs().catch(() => [] as string[]),
    getCollections().catch(() => []),
    getBlogSlugs().catch(() => [] as string[]),
  ])

  const productUrls = productSlugs.map((slug) => ({
    url: `${siteUrl}/products/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const collectionUrls = collections.map((col) => ({
    url: `${siteUrl}/collections/${col.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogUrls = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/catalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/collections`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    ...productUrls,
    ...collectionUrls,
    ...blogUrls,
  ]
}
