import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <Logo variant="light" full className="h-16 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs mb-6">
              Trondheims ledende markedsplass for flyttebyrå og rengjøring. Vi kobler deg med godkjente selskaper — gratis og uforpliktende.
            </p>
            <div className="flex flex-col gap-2.5 text-sm">
              <a href="tel:+47 972 77 276" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-sand flex-shrink-0" /> +47 972 77 276
              </a>
              <a href="mailto:post@velgtilbud.no" className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-sand flex-shrink-0" /> post@velgtilbud.no
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-sand flex-shrink-0" /> Trondheim, Norge
              </span>
            </div>
          </div>

          {/* Tjenester */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Tjenester</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: 'Privatpersoner', href: '/privatpersoner' },
                { label: 'Bedrifter',      href: '/bedrifter' },
                { label: 'Flyttevask',     href: '/privatpersoner' },
                { label: 'Rengjøring',     href: '/privatpersoner' },
              ].map((s) => (
                <li key={s.label}>
                  <Link to={s.href} className="hover:text-white transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Selskap */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Selskap</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {[
                { label: 'Om oss', href: '/om-oss' },
                { label: 'Bli partner', href: '/bli-partner' },
                { label: 'Personvern', href: '/' },
                { label: 'Vilkår', href: '/' },
              ].map((c) => (
                <li key={c.label}>
                  <Link to={c.href} className="hover:text-white transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Velgtilbud AS. Alle rettigheter forbeholdt.</p>
          <p>Org.nr: 935 830 621</p>
        </div>
      </div>
    </footer>
  )
}
