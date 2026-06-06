import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import LeadForm from './LeadForm'
import { cn } from '@/lib/utils'

type ActiveService = 'flytting' | 'rengjoring'
type ServiceChoice = 'begge' | 'flyttehjelp' | 'rengjoring'

function choiceHeading(choice: ServiceChoice): string {
  if (choice === 'flyttehjelp') return 'Få gratis tilbud på flyttehjelp'
  if (choice === 'rengjoring')  return 'Få gratis tilbud på rengjøring'
  return 'Få gratis tilbud på flytting og rengjøring'
}

const config: Record<ActiveService, {
  label: string
  headerBg: string
  tagline: string
  activePill: string
  inactivePill: string
  dot: string
}> = {
  flytting: {
    label:        'Flytting',
    headerBg:     'bg-navy',
    tagline:      'Beste flyttebyrå i Trøndelag',
    activePill:   'bg-white text-navy shadow-sm',
    inactivePill: 'text-white/50 hover:text-white/80',
    dot:          'bg-sand',
  },
  rengjoring: {
    label:        'Rengjøring',
    headerBg:     'bg-taupe',
    tagline:      'Rengjøring og flyttevask i Trøndelag',
    activePill:   'bg-white text-taupe shadow-sm',
    inactivePill: 'text-white/50 hover:text-white/80',
    dot:          'bg-offwhite',
  },
}

export default function FloatingForm() {
  const [service,   setService]   = useState<ActiveService>('flytting')
  const [choice,    setChoice]    = useState<ServiceChoice>('begge')
  const [collapsed, setCollapsed] = useState(false)
  const [visible,   setVisible]   = useState(false)
  const [ready,     setReady]     = useState(false)
  const divRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  // Imperatively hide the element before React re-renders — most reliable pre-paint hide
  useLayoutEffect(() => {
    const el = divRef.current
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateX(2rem)'
      el.style.pointerEvents = 'none'
      el.style.transition = 'none'
    }
    setVisible(false)
    setReady(false)
  }, [pathname])

  useEffect(() => {
    let innerCleanup: (() => void) | undefined

    const timer = setTimeout(() => {
      const el = divRef.current
      if (el) {
        el.style.opacity = ''
        el.style.transform = ''
        el.style.pointerEvents = ''
        el.style.transition = ''
      }
      setReady(true)

      const heroForm = document.getElementById('hero-form')
      if (heroForm) {
        const observer = new IntersectionObserver(
          ([entry]) => setVisible(!entry.isIntersecting),
          { threshold: 0 }
        )
        observer.observe(heroForm)
        innerCleanup = () => observer.disconnect()
      } else {
        const handler = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        innerCleanup = () => window.removeEventListener('scroll', handler)
      }
    }, 200)

    return () => {
      clearTimeout(timer)
      innerCleanup?.()
    }
  }, [pathname])

  const c = config[service]

  return (
    <div
      ref={divRef}
      className={cn(
        'hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 w-[22rem] flex-col rounded-2xl shadow-2xl overflow-hidden border border-white/10',
        ready && 'transition-all duration-500 ease-out',
        visible
          ? 'opacity-100 translate-x-0 pointer-events-auto'
          : 'opacity-0 translate-x-8 pointer-events-none'
      )}
    >
      {/* Header */}
      <div className={cn('px-5 pt-5 pb-4 transition-colors duration-300', c.headerBg)}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className={cn('w-1.5 h-1.5 rounded-full', c.dot)} />
              <span className="text-white/50 text-xs">Gratis · Uforpliktende</span>
            </div>
            <p className="text-white font-semibold text-sm leading-snug">{choiceHeading(choice)}</p>
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0 ml-3 mt-0.5"
            aria-label={collapsed ? 'Åpne' : 'Minimer'}
          >
            {collapsed
              ? <Plus  className="w-3.5 h-3.5 text-white" />
              : <Minus className="w-3.5 h-3.5 text-white" />
            }
          </button>
        </div>

        {/* Service toggle */}
        <div className="flex gap-1 p-1 bg-white/10 rounded-xl">
          {(Object.keys(config) as ActiveService[]).map((s) => (
            <button
              key={s}
              onClick={() => { setService(s); setCollapsed(false); setChoice('begge') }}
              className={cn(
                'flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200',
                service === s ? c.activePill : c.inactivePill
              )}
            >
              {config[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Form body — smooth expand/collapse via grid row transition */}
      <div
        className={cn(
          'grid bg-white transition-[grid-template-rows] duration-400 ease-in-out',
          collapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 py-5">
            <LeadForm
              service={service}
              onServiceChange={(s) => setService(s as ActiveService)}
              onServiceChoiceChange={setChoice}
              defaultServiceChoice="begge"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
