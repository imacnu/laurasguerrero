import { Share2 } from 'lucide-react'

// Placeholder until Instagram Basic API is connected
export default function InstagramFeed() {
  const placeholders = Array.from({ length: 6 })

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            <span className="text-sm tracking-widest uppercase">@lauraguerrero</span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-widest uppercase underline underline-offset-4 text-charcoal/60 hover:text-charcoal transition-colors"
          >
            Seguir
          </a>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:grid-cols-6">
          {placeholders.map((_, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-cream-dark flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <span className="font-display text-2xl text-charcoal/20">LG</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
