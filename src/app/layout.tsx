import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/layout/Providers'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Laura Guerrero — Joyería Premium',
    template: '%s | Laura Guerrero',
  },
  description:
    'Joyería artesanal premium. Piezas únicas diseñadas para momentos especiales.',
  keywords: ['joyería', 'joyería premium', 'anillos', 'collares', 'pulseras', 'pendientes'],
  authors: [{ name: 'Laura Guerrero' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Laura Guerrero',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
