import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LeadFormData, ServiceType } from '@/lib/types'

interface Props {
  // When provided, form is controlled — internal selector syncs upward
  service?: ServiceType
  onServiceChange?: (s: ServiceType) => void
  defaultService?: ServiceType
  className?: string
}

const serviceOptions: { value: ServiceType; label: string }[] = [
  { value: 'flytting',   label: 'Flytting' },
  { value: 'rengjoring', label: 'Rengjøring' },
]

export default function LeadForm({ service: controlledService, onServiceChange, defaultService = 'flytting', className }: Props) {
  const [internalService, setInternalService] = useState<ServiceType>(defaultService)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  // If controlled from outside, use that; otherwise use internal state
  const activeService = controlledService ?? internalService

  const handleServiceChange = (s: ServiceType) => {
    setInternalService(s)
    onServiceChange?.(s)
  }

  const activeClass = activeService === 'rengjoring'
    ? 'bg-taupe text-white border-taupe'
    : 'bg-navy text-white border-navy'

  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    defaultValues: { service: defaultService },
    mode: 'onBlur',
  })

  const validation = {
    name: {
      required: 'Navn er påkrevd',
      minLength: { value: 2, message: 'For kort' },
      pattern: { value: /^[A-Za-zÆæØøÅåÉéÈèÜü\s'-]{2,}$/, message: 'Kun bokstaver' },
      validate: (v: string) => v.trim().split(/\s+/).length >= 2 || 'Skriv fullt navn',
    },
    phone: {
      required: 'Telefon er påkrevd',
      validate: (v: string) => {
        const digits = v.replace(/[\s+\-()]/g, '')
        if (!/^\d+$/.test(digits)) return 'Kun tall'
        if (digits.startsWith('47') && digits.length === 10) return true
        if (digits.length === 8) return true
        return 'Skriv et gyldig norsk nummer (8 sifre)'
      },
    },
    email: {
      required: 'E-post er påkrevd',
      pattern: { value: /^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/, message: 'Ugyldig e-post' },
      validate: (v: string) => {
        const blocked = ['test@', 'fake@', 'spam@', 'asdf@', '123@']
        if (blocked.some((b) => v.toLowerCase().startsWith(b))) return 'Ugyldig e-post'
        return true
      },
    },
    postalCode: {
      required: 'Postnummer er påkrevd',
      pattern: { value: /^\d{4}$/, message: '4 sifre' },
      validate: (v: string) => {
        const n = parseInt(v)
        return (n >= 100 && n <= 9999) || 'Ugyldig postnummer'
      },
    },
  }

  const onSubmit = async (data: LeadFormData) => {
    setLoading(true)
    data.service = activeService
    await new Promise((r) => setTimeout(r, 1100))
    console.log('Lead:', data)
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center text-center py-8 gap-4', className)}>
        <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-sage" />
        </div>
        <div>
          <h3 className="text-base font-bold text-navy mb-1">Takk for henvendelsen!</h3>
          <p className="text-sm text-greige max-w-xs mx-auto">
            Du mottar tilbud fra godkjente selskaper i Trondheim innen <strong className="text-navy">2 timer</strong>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-3.5', className)}>

      {/* Service selector */}
      <div>
        <p className="label">Hva trenger du hjelp med?</p>
        <div className="grid grid-cols-2 gap-2">
          {serviceOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleServiceChange(opt.value)}
              className={cn(
                'py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all duration-150',
                activeService === opt.value
                  ? activeClass
                  : 'bg-white text-greige border-sand/50 hover:border-navy/30 hover:text-navy'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Name + Phone */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">Navn</label>
          <input
            {...register('name', validation.name)}
            placeholder="Ola Nordmann"
            className={cn('input-field', errors.name && 'border-red-300')}
          />
          {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Telefon</label>
          <input
            {...register('phone', validation.phone)}
            placeholder="+47 900 00 000"
            type="tel"
            className={cn('input-field', errors.phone && 'border-red-300')}
          />
          {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Email + Postal */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="label">E-post</label>
          <input
            {...register('email', validation.email)}
            placeholder="ola@example.no"
            type="email"
            className={cn('input-field', errors.email && 'border-red-300')}
          />
          {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label">Postnummer</label>
          <input
            {...register('postalCode', validation.postalCode)}
            placeholder="7010"
            maxLength={4}
            className={cn('input-field', errors.postalCode && 'border-red-300')}
          />
          {errors.postalCode && <p className="text-xs text-red-400 mt-1">{errors.postalCode.message}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full flex items-center justify-center gap-2 py-3 text-white font-semibold rounded-xl active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-0.5',
          activeService === 'rengjoring' ? 'bg-taupe hover:bg-taupe/90' : 'bg-navy hover:bg-navy/90'
        )}
      >
        {loading
          ? <><Loader2 className="w-4 h-4 animate-spin" /> Sender…</>
          : <>Få gratis tilbud <ArrowRight className="w-4 h-4" /></>
        }
      </button>

      <p className="text-center text-xs text-warm-gray">
        Gratis · Uforpliktende · Du velger selv
      </p>
    </form>
  )
}
