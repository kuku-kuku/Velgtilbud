import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ServiceType } from '@/lib/types'

interface Props {
  onOpen: (service: ServiceType) => void
}

const services: { value: ServiceType; label: string }[] = [
  { value: 'flytting',   label: 'Flytting' },
  { value: 'rengjoring', label: 'Rengjøring' },
]

export default function StickyBar({ onOpen }: Props) {
  const [visible,  setVisible]  = useState(false)
  const [selected, setSelected] = useState<ServiceType>('flytting')

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className={cn(
      'fixed bottom-0 left-0 right-0 z-40 transition-all duration-300',
      visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
    )}>
      {/* Gradient fade above bar */}
      <div className="h-8 bg-gradient-to-t from-navy/20 to-transparent pointer-events-none" />

      <div className="bg-navy border-t border-white/10 shadow-2xl">
        <div className="container-wide py-3">
          <div className="flex items-center gap-3">
            {/* Toggle */}
            <div className="flex gap-1 p-1 bg-white/10 rounded-xl flex-shrink-0">
              {services.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSelected(s.value)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150',
                    selected === s.value
                      ? 'bg-white text-navy shadow-sm'
                      : 'text-white/60 hover:text-white'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-white/10 flex-shrink-0" />

            {/* Label */}
            <p className="hidden sm:block text-white/40 text-sm flex-1 truncate">
              {selected === 'flytting'
                ? 'Finn beste flyttebyrå i Trondheim'
                : 'Finn beste rengjøringsselskap i Trondheim'}
            </p>

            {/* CTA */}
            <button
              onClick={() => onOpen(selected)}
              className="flex items-center gap-2 px-5 py-2.5 bg-sand hover:bg-sand/90 text-navy font-bold text-sm rounded-xl transition-all active:scale-95 flex-shrink-0 shadow-lg"
            >
              Få gratis tilbud
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
