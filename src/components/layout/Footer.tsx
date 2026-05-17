import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/catalog', label: 'Catálogo' },
    { href: '/collections', label: 'Colecciones' },
    { href: '/blog', label: 'Diario' },
  ],
  info: [
    { href: '/about', label: 'Sobre Laura' },
    { href: '/contact', label: 'Contacto' },
    { href: '/shipping', label: 'Envíos' },
    { href: '/returns', label: 'Devoluciones' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacidad' },
    { href: '/terms', label: 'Términos' },
    { href: '/cookies', label: 'Cookies' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl tracking-[0.2em] uppercase block">
              Laura Guerrero
            </Link>
            <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
              Joyería artesanal premium diseñada para momentos que se recuerdan para siempre.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-gold transition-colors text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              @lauraguerrero
            </a>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">Tienda</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">Información</h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs tracking-widest uppercase text-cream/40 mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream/40 tracking-wide">
            © {new Date().getFullYear()} Laura Guerrero. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-cream/40">
            <span>Pagos seguros con</span>
            <span className="tracking-wider">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
