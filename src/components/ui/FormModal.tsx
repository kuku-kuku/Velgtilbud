import { useEffect } from 'react'
import { X } from 'lucide-react'
import LeadForm from './LeadForm'
import type { ServiceType } from '@/lib/types'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  service: ServiceType
  onClose: () => void
  onServiceChange: (s: ServiceType) => void
}

const tabs: { value: ServiceType; label: string }[] = [
  { value: 'flytting',   label: 'Flytting' },
  { value: 'rengjoring', label: 'Rengjøring' },
]

export default function FormModal({ open, service, onClose, onServiceChange }: Props) {
  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Card */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl animate-slide-up max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-sand/20 sticky top-0 bg-white z-10">
          <div>
            <p className="text-xs font-semibold text-greige uppercase tracking-widest">Gratis · Uforpliktende</p>
            <h2 className="text-lg font-bold text-navy mt-0.5">Få tilbud fra Trondheim</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-offwhite hover:bg-sand/20 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Lukk"
          >
            <X className="w-4 h-4 text-greige" />
          </button>
        </div>

        {/* Service tabs */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex gap-1.5 p-1 bg-offwhite rounded-xl">
            {tabs.map((t) => {
              const isActive = service === t.value
              return (
                <button
                  key={t.value}
                  onClick={() => onServiceChange(t.value)}
                  className={cn(
                    'flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-150',
                    isActive
                      ? t.value === 'rengjoring' ? 'bg-taupe text-white shadow-sm' : 'bg-navy text-white shadow-sm'
                      : 'bg-white text-greige hover:bg-sand/50 hover:text-navy'
                  )}
                >
                  {t.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-8 pt-4">
          <LeadForm service={service} onServiceChange={onServiceChange} />
        </div>
      </div>
    </div>
  )
}
