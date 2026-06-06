import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'

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

  const hasDarkHero = ['/', '/privatpersoner', '/bedrifter', '/bli-partner', '/om-oss'].includes(pathname)
  const transparent = hasDarkHero && !scrolled && !open

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
      transparent
        ? 'bg-transparent border-transparent'
        : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-sand/20'
    )}>
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo variant={transparent ? 'light' : 'dark'} full className="h-11 w-auto transition-opacity duration-300" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  'nav-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300',
                  transparent ? 'nav-link-white' : '',
                  transparent
                    ? isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    : isActive ? 'text-navy active' : 'text-greige hover:text-navy'
                )}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+47 972 77 276" className={cn(
              'flex items-center gap-1.5 text-sm transition-colors duration-300',
              transparent ? 'text-white/70 hover:text-white' : 'text-greige hover:text-navy'
            )}>
              <Phone className="w-3.5 h-3.5" />
              +47 972 77 276
            </a>
            <button onClick={onOpenModal} className={cn(
              'text-sm px-5 py-2.5 rounded-xl font-semibold transition-all duration-300',
              transparent
                ? 'bg-white text-navy hover:bg-white/90'
                : 'btn-primary'
            )}>
              Få gratis tilbud
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors duration-300',
              transparent ? 'text-white/80 hover:text-white' : 'text-greige hover:text-navy hover:bg-sand/10'
            )}
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
                <a href="tel:+47 972 77 276" className="flex items-center gap-2 px-4 py-2 text-sm text-greige">
                  <Phone className="w-4 h-4" /> +47 972 77 276
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
