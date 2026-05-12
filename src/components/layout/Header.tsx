import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { label: 'Privatpersoner', href: '/privatpersoner' },
  { label: 'Bedrifter', href: '/bedrifter' },
  { label: 'Bli partner', href: '/bli-partner' },
  { label: 'Om oss', href: '/om-oss' },
]

interface Props {
  onOpenModal?: () => void
}

export default function Header({ onOpenModal }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={cn(
      'sticky top-0 w-full transition-all duration-300',
      open ? 'z-50 bg-white shadow-sm border-b border-sand/20' : 'z-50',
      !open && scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-sand/20' : 'bg-white'
    )}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-navy flex items-center justify-center">
              <span className="text-offwhite font-bold text-sm tracking-tight">VT</span>
            </div>
            <span className="font-bold text-lg text-navy tracking-tight hidden sm:block">
              Velgtilbud
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  'nav-link px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  isActive ? 'text-navy active' : 'text-greige hover:text-navy'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+4712345678" className="flex items-center gap-1.5 text-sm text-greige hover:text-navy transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +47 123 45 678
            </a>
            <button onClick={onOpenModal} className="btn-primary text-sm px-5 py-2.5">
              Få gratis tilbud
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-greige hover:text-navy hover:bg-sand/10 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          
          {/* Menu */}
          <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-t border-sand/20 shadow-lg z-50 animate-slide-down">
            <div className="container-wide py-4 flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => cn(
                    'px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    isActive ? 'bg-sand/20 text-navy' : 'text-greige hover:bg-sand/10 hover:text-navy'
                  )}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-sand/20 flex flex-col gap-2">
                <a href="tel:+4712345678" className="flex items-center gap-2 px-4 py-2 text-sm text-greige">
                  <Phone className="w-4 h-4" /> +47 123 45 678
                </a>
                <button 
                  onClick={() => {
                    setOpen(false)
                    onOpenModal?.()
                  }} 
                  className="btn-primary w-full text-center text-sm"
                >
                  Få gratis tilbud
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
