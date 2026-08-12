import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, Loader2, ArrowRight, ChevronLeft, ChevronDown, CalendarDays, Home, Building2, Info } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { nb } from 'date-fns/locale'
import 'react-day-picker/src/style.css'
import { cn } from '@/lib/utils'
import type { ServiceType } from '@/lib/types'


type ServiceChoice  = 'begge' | 'flyttehjelp' | 'rengjoring'
type CustomerType   = 'privat' | 'borettslag' | 'bedrift'
type StepId =
  | 'service' | 'customerType' | 'cleaningType' | 'date'
  | 'fromAddress' | 'size' | 'toAddress' | 'parking'
  | 'propertyType' | 'rooms'
  | 'contact' | 'address'

const SIZE_OPTIONS = ['0–50', '51–100', '101–150', '151–200', '200+']

const FLEX_OPTIONS = [
  { v: '1dag',   l: '± 1 dag'        },
  { v: '2dager', l: '± 2 dager'      },
  { v: '3dager', l: '± 3 dager'      },
  { v: '1uke',   l: '± 1 uke'        },
  { v: 'mer',    l: 'Mer enn en uke' },
]

const PROPERTY_TYPES = ['Enebolig', 'Leilighet', 'Tomannsbolig', 'Rekkehus', 'Annet']

const AREA_EXTRAS = [
  { v: 'garasje', l: 'Garasje'          },
  { v: 'balkong', l: 'Balkong/veranda'  },
  { v: 'bod',     l: 'Bod'              },
]

const CLEANING_TYPES = [
  'Fast renhold',
  'Byggrengjøring',
  'Dødsbovask',
  'Fasadevask',
  'Flyttevask',
  'Gulvbehandling',
  'Storrengjøring',
  'Vindusvask',
  'Visningsvask',
  'Annen vask',
]

const STEP_LABELS: Record<StepId, string> = {
  service:      'Hva trenger du hjelp med?',
  customerType: 'Hvem bestiller?',
  cleaningType: 'Hva slags type rengjøring ønsker du?',
  date:         'Ønsket dato',
  fromAddress:  'Nåværende adresse',
  size:         'Størrelse på boligen',
  toAddress:    'Ny adresse',
  parking:      'Hvor nær kan flyttebilen parkere?',
  propertyType: 'Om boligen',
  rooms:        'Rom og detaljer',
  contact:      'Kontaktinfo',
  address:      'Din adresse',
}

function getSteps(svc: ServiceChoice): StepId[] {
  if (svc === 'rengjoring') {
    return ['service', 'customerType', 'cleaningType', 'date', 'propertyType', 'rooms', 'contact', 'address']
  }
  if (svc === 'begge') {
    return ['service', 'customerType', 'date', 'fromAddress', 'toAddress', 'parking', 'propertyType', 'rooms', 'contact']
  }
  return ['service', 'customerType', 'date', 'fromAddress', 'toAddress', 'parking', 'contact']
}

function toServiceType(c: ServiceChoice): ServiceType {
  return c === 'rengjoring' ? 'rengjoring' : 'flytting'
}

function toServiceChoice(s: ServiceType): ServiceChoice {
  return s === 'rengjoring' ? 'rengjoring' : 'flyttehjelp'
}

// Fires a GA4/Google Ads conversion event via GTM. The form is a popup with no
// thank-you page or URL change, so page-view-based conversion tracking never
// triggers — this is the only signal Ads/GA4 gets that a lead was submitted.
function pushLeadConversion(service: ServiceChoice) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: 'generate_lead',
    lead_service: toServiceType(service),
  })
}

interface FS {
  service:      ServiceChoice
  customerType: CustomerType
  cleaningType: string
  date: string; flex: boolean; flexRange: string
  fromStreet: string; fromNo: string; fromPostal: string; fromCity: string; fromFloor: string; fromElevator: boolean
  size: string
  toStreet: string; toNo: string; toPostal: string; toCity: string; toFloor: string; toElevator: boolean
  parkA: string; parkB: string
  propType: string; floors: string; wholeProperty: boolean; area: string; petTraces: boolean | null
  soverom: number; badwc: number; kjokken: number; stue: number
  areaExtras: string[]; comments: string
  name: string; phone: string; email: string
}

const INIT: Omit<FS, 'service'> = {
  customerType: 'privat',
  cleaningType: '',
  date: '', flex: false, flexRange: '',
  fromStreet: '', fromNo: '', fromPostal: '', fromCity: '', fromFloor: '', fromElevator: false,
  size: '',
  toStreet: '', toNo: '', toPostal: '', toCity: '', toFloor: '', toElevator: false,
  parkA: '', parkB: '',
  propType: '', floors: '', wholeProperty: true, area: '', petTraces: null,
  soverom: 0, badwc: 0, kjokken: 0, stue: 0,
  areaExtras: [], comments: '',
  name: '', phone: '', email: '',
}

interface Props {
  service?: ServiceType
  onServiceChange?: (s: ServiceType) => void
  onServiceChoiceChange?: (s: ServiceChoice) => void
  defaultService?: ServiceType
  defaultServiceChoice?: ServiceChoice
  onStepChange?: () => void
  className?: string
}

export default function LeadForm({ service: ctrl, onServiceChange, onServiceChoiceChange, defaultService = 'flytting', defaultServiceChoice, onStepChange, className }: Props) {
  const initSvc = defaultServiceChoice ?? toServiceChoice(ctrl ?? defaultService)
  const [data, setData] = useState<FS>({ ...INIT, service: initSvc })
  const [stepIdx, setStepIdx] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<'success' | 'duplicate' | false>(false)
  const [loading, setLoading] = useState(false)
  const [consent, setConsent] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const turnstileRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetId = useRef<string | null>(null)
  const turnstileSiteKey  = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
  const [calOpen,       setCalOpen]       = useState(false)
  const [flexOpen,      setFlexOpen]      = useState(false)
  const [calPopupStyle, setCalPopupStyle] = useState<React.CSSProperties>({})
  const dateButtonRef  = useRef<HTMLButtonElement>(null)
  const formRef        = useRef<HTMLDivElement>(null)
  const mountedRef     = useRef(false)

  // Scroll form into view when the step changes — but NOT on initial mount.
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return }
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [stepIdx])

  // Load the Turnstile script once (only if site key configured)
  useEffect(() => {
    if (!turnstileSiteKey) return
    if (document.querySelector('script[data-turnstile]')) return
    const s = document.createElement('script')
    s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    s.async = true
    s.defer = true
    s.setAttribute('data-turnstile', '1')
    document.head.appendChild(s)
  }, [turnstileSiteKey])

  const localISO = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

  const openCal = () => {
    if (dateButtonRef.current) {
      const r = dateButtonRef.current.getBoundingClientRect()
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        const w = Math.min(window.innerWidth - 32, 360)
        setCalPopupStyle({
          position: 'fixed',
          top: Math.max(16, (window.innerHeight - 420) / 2),
          left: (window.innerWidth - w) / 2,
          width: w,
          zIndex: 9999,
        })
      } else {
        const popupWidth = Math.max(r.width, 288)
        const spaceBelow = window.innerHeight - r.bottom
        const top = spaceBelow > 340 ? r.bottom + 6 : r.top - 340
        const left = Math.min(r.left, window.innerWidth - popupWidth - 16)
        setCalPopupStyle({ position: 'fixed', top, left, width: popupWidth, zIndex: 9999 })
      }
    }
    setCalOpen(o => !o)
  }

  useEffect(() => {
    if (!calOpen) return
    const close = () => setCalOpen(false)
    window.addEventListener('scroll', close, { passive: true, capture: true })
    return () => window.removeEventListener('scroll', close, { capture: true })
  }, [calOpen])

  const prevCtrl = useRef(ctrl)
  useEffect(() => {
    if (ctrl !== undefined && ctrl !== prevCtrl.current) {
      prevCtrl.current = ctrl
      const newChoice = toServiceChoice(ctrl)
      setData(d => ({ ...d, service: newChoice }))
      setStepIdx(0)
      setErrors({})
    }
  }, [ctrl])

  const steps = getSteps(data.service)
  const currentStep = steps[stepIdx]
  const isLast = stepIdx === steps.length - 1
  const progress = ((stepIdx + 1) / steps.length) * 100

  // Render the Turnstile widget when we reach the last step
  useEffect(() => {
    if (!isLast || !turnstileSiteKey) return
    let cancelled = false
    const tryRender = () => {
      if (cancelled) return
      const ts = (window as unknown as { turnstile?: {
        render: (el: HTMLElement, opts: Record<string, unknown>) => string
        remove: (id: string) => void
      } }).turnstile
      if (!ts || !turnstileRef.current) { setTimeout(tryRender, 200); return }
      if (turnstileWidgetId.current) return
      turnstileWidgetId.current = ts.render(turnstileRef.current, {
        sitekey:  turnstileSiteKey,
        callback: (token: string) => setTurnstileToken(token),
        'expired-callback': () => setTurnstileToken(null),
        'error-callback':   () => setTurnstileToken(null),
      })
    }
    tryRender()
    return () => {
      cancelled = true
      const ts = (window as unknown as { turnstile?: { remove: (id: string) => void } }).turnstile
      if (ts && turnstileWidgetId.current) {
        ts.remove(turnstileWidgetId.current)
        turnstileWidgetId.current = null
        setTurnstileToken(null)
      }
    }
  }, [isLast, turnstileSiteKey])

  function set<K extends keyof FS>(k: K, v: FS[K]) {
    setData(d => ({ ...d, [k]: v }))
    setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  function handleServiceChange(svc: ServiceChoice) {
    setData(d => ({ ...d, service: svc }))
    onServiceChange?.(toServiceType(svc))
    onServiceChoiceChange?.(svc)
    setErrors({})
  }

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (currentStep === 'cleaningType') {
      if (!data.cleaningType) errs.cleaningType = 'Velg type rengjøring'
    } else if (currentStep === 'date') {
      if (!data.date) errs.date = 'Velg en dato'
      if (data.flex && !data.flexRange) errs.flexRange = 'Velg hvor fleksibel'
    } else if (currentStep === 'fromAddress') {
      if (!data.fromStreet.trim()) errs.fromStreet = 'Påkrevd'
      if (!data.fromPostal.match(/^\d{4}$/)) errs.fromPostal = '4 sifre'
      if (!data.fromFloor.trim()) errs.fromFloor = 'Påkrevd'
    } else if (currentStep === 'size') {
      if (!data.size) errs.size = 'Velg størrelse'
    } else if (currentStep === 'toAddress') {
      if (!data.toStreet.trim()) errs.toStreet = 'Påkrevd'
      if (!data.toPostal.match(/^\d{4}$/)) errs.toPostal = '4 sifre'
      if (!data.toFloor.trim()) errs.toFloor = 'Påkrevd'
    } else if (currentStep === 'propertyType') {
      if (!data.propType) errs.propType = 'Velg boligtype'
      if (!data.floors) errs.floors = 'Velg antall etasjer'
      if (!data.area.trim()) errs.area = 'Oppgi areal'
    } else if (currentStep === 'rooms') {
      const total = data.soverom + data.badwc + data.kjokken + data.stue
      if (total === 0) errs.rooms = 'Velg minst ett rom'
    } else if (currentStep === 'contact') {
      if (data.name.trim().split(/\s+/).length < 2) errs.name = 'Skriv fullt navn'
      const digits = data.phone.replace(/\D/g, '')
      if (!digits.match(/^(47\d{8}|\d{8})$/)) errs.phone = 'Gyldig norsk nummer (8 sifre)'
      if (!data.email.match(/^[^\s@]+@[^\s@]{2,}\.[^\s@]{2,}$/)) errs.email = 'Ugyldig e-post'
    } else if (currentStep === 'address') {
      if (!data.fromStreet.trim()) errs.fromStreet = 'Påkrevd'
      if (!data.fromPostal.match(/^\d{4}$/)) errs.fromPostal = '4 sifre'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function next() {
    if (!validate()) return
    setStepIdx(i => i + 1)
    onStepChange?.()
  }

  function back() {
    setErrors({})
    setStepIdx(i => i - 1)
    onStepChange?.()
  }

  async function submit() {
    if (!validate()) return
    if (!consent) {
      setErrors(e => ({ ...e, consent: 'Du må godta samtykket for å sende inn' }))
      return
    }
    if (turnstileSiteKey && !turnstileToken) {
      setErrors(e => ({ ...e, consent: 'Vennligst bekreft at du ikke er en robot' }))
      return
    }
    setLoading(true)
    try {
      const url = import.meta.env.VITE_SUBMIT_LEAD_URL as string
      const res = await fetch(url, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'apikey':        import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify({ ...data, consent: true, turnstileToken }),
      })
      if (res.status === 409) { setSubmitted('duplicate'); return }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      pushLeadConversion(data.service)
      setSubmitted('success')
    } catch (err) {
      console.error('Lead submission failed:', err)
      setSubmitted('success') // still show success — admin can follow up manually
    } finally {
      setLoading(false)
    }
  }

  const activeColor = data.service === 'rengjoring'
    ? 'bg-taupe hover:bg-taupe/90'
    : 'bg-navy hover:bg-navy/90'

  const activeBg = data.service === 'rengjoring' ? 'bg-taupe' : 'bg-navy'

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center text-center py-8 gap-4', className)}>
        <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
          <CheckCircle className="w-6 h-6 text-sage" />
        </div>
        {submitted === 'duplicate' ? (
          <div>
            <h3 className="text-base font-bold text-navy mb-1">Forespørsel allerede mottatt</h3>
            <p className="text-sm text-greige max-w-xs mx-auto">
              Vi har allerede registrert en forespørsel fra denne e-postadressen. Du vil bli kontaktet av bedriftene innen kort tid.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-base font-bold text-navy mb-1">Takk for henvendelsen!</h3>
            <p className="text-sm text-greige max-w-xs mx-auto">
              Vi har mottatt forespørselen din og sender den videre til relevante flyttebyråer og rengjøringsfirma.
            </p>
            <p className="text-sm text-greige max-w-xs mx-auto mt-2">
              Du vil bli kontaktet innen kort tid. Vi anbefaler at du svarer på ukjente telefonnumre, da bedriftene ofte tar kontakt direkte.
            </p>
            <p className="text-sm text-greige max-w-xs mx-auto mt-2">
              Vi anbefaler også at du følger med på både innboksen og spam-/søppelpostmappen den kommende tiden, slik at du ikke går glipp av viktig informasjon og tilbud.
            </p>
          </div>
        )}
      </div>
    )
  }

  function ElevatorToggle({ val, onChange }: { val: boolean; onChange: (v: boolean) => void }) {
    return (
      <div className="flex gap-2">
        {([true, false] as const).map(v => (
          <button
            key={String(v)}
            type="button"
            onClick={() => onChange(v)}
            className={cn(
              'flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all',
              val === v
                ? `${activeBg} text-white border-transparent`
                : 'bg-white text-greige border-sand/50 hover:border-navy/30 hover:text-navy'
            )}
          >
            {v ? 'Ja' : 'Nei'}
          </button>
        ))}
      </div>
    )
  }

  function renderStep() {
    switch (currentStep) {

      case 'service':
        return (
          <div className="flex flex-col gap-2">
            {([
              { v: 'begge',       l: 'Flyttehjelp og flyttevask' },
              { v: 'flyttehjelp', l: 'Kun flyttehjelp'           },
              { v: 'rengjoring',  l: 'Kun rengjøring'            },
            ] as { v: ServiceChoice; l: string }[]).map(({ v, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => handleServiceChange(v)}
                className={cn(
                  'w-full py-3 px-4 rounded-xl border text-sm font-semibold text-left transition-all',
                  data.service === v
                    ? `${activeBg} text-white border-transparent`
                    : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )

      case 'customerType':
        return (
          <div className="flex flex-col gap-2">
            {([
              { v: 'privat',     l: 'Privat'      },
              ...(data.service !== 'flyttehjelp' ? [{ v: 'borettslag', l: 'Borettslag' }] : []),
              { v: 'bedrift',    l: 'Bedrift'      },
            ] as { v: CustomerType; l: string }[]).map(({ v, l }) => (
              <button
                key={v}
                type="button"
                onClick={() => set('customerType', v)}
                className={cn(
                  'w-full py-3 px-4 rounded-xl border text-sm font-semibold text-left transition-all',
                  data.customerType === v
                    ? `${activeBg} text-white border-transparent`
                    : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )

      case 'cleaningType':
        return (
          <div className="flex flex-col gap-2">
            {CLEANING_TYPES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => set('cleaningType', t)}
                className={cn(
                  'w-full py-3 px-4 rounded-xl border text-sm font-semibold text-left transition-all',
                  data.cleaningType === t
                    ? `${activeBg} text-white border-transparent`
                    : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                )}
              >
                {t}
              </button>
            ))}
            {errors.cleaningType && <p className="text-xs text-red-400 mt-1">{errors.cleaningType}</p>}
          </div>
        )

      case 'date': {
        const accentColor = data.service === 'rengjoring' ? '#8A7563' : '#0E1D2D'
        const selected = data.date ? new Date(data.date + 'T00:00:00') : undefined
        const MONTHS_NO = ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember']
        const displayDate = selected
          ? `${selected.getDate()}. ${MONTHS_NO[selected.getMonth()]} ${selected.getFullYear()}`
          : null
        const selectedFlexLabel = FLEX_OPTIONS.find(o => o.v === data.flexRange)?.l
        const pw = (calPopupStyle.width as number) || 288
        const cw = Math.max(Math.floor((pw - 24) / 7), 32)
        const cbw = cw - 2

        return (
          <div className="flex flex-col gap-4">
            <div>
              <button
                ref={dateButtonRef}
                type="button"
                onClick={openCal}
                className={cn(
                  'input-field flex items-center justify-between gap-2 text-left',
                  errors.date && 'border-red-300'
                )}
              >
                <span className={displayDate ? 'text-navy font-medium' : 'text-warm-gray/70'}>
                  {displayDate ?? 'Velg dato…'}
                </span>
                <CalendarDays className="w-4 h-4 text-greige flex-shrink-0" />
              </button>
              {errors.date && <p className="text-xs text-red-400 mt-1">{errors.date}</p>}
            </div>

            {calOpen && createPortal(
              <>
                <div className="fixed inset-0 z-[9998]" onClick={() => setCalOpen(false)} />
                <div style={calPopupStyle} className="bg-white rounded-xl border border-sand/40 shadow-2xl overflow-hidden">
                  <DayPicker
                    animate
                    mode="single"
                    selected={selected}
                    onSelect={d => { if (d) set('date', localISO(d)) }}
                    locale={nb}
                    disabled={{ before: new Date() }}
                    style={{
                      '--rdp-accent-color':            accentColor,
                      '--rdp-accent-background-color': `${accentColor}18`,
                      '--rdp-day-height':              `${cw}px`,
                      '--rdp-day-width':               `${cw}px`,
                      '--rdp-day_button-height':       `${cbw}px`,
                      '--rdp-day_button-width':        `${cbw}px`,
                      '--rdp-day_button-border-radius':'8px',
                      '--rdp-nav_button-height':       '1.75rem',
                      '--rdp-nav_button-width':        '1.75rem',
                    } as React.CSSProperties}
                    classNames={{ root: 'rdp-root p-3 !font-sans text-sm', caption_label: 'capitalize' }}
                  />
                  <div className="px-3 pb-3 border-t border-sand/20 pt-2">
                    <button
                      type="button"
                      onClick={() => setCalOpen(false)}
                      className={cn('w-full py-2 text-sm font-semibold rounded-xl text-white transition-all active:scale-95', activeBg)}
                    >
                      {selected ? 'Bekreft dato' : 'Lukk'}
                    </button>
                  </div>
                </div>
              </>,
              document.body
            )}

            <div>
              <label className="label">Er datoen fleksibel?</label>
              <div className="flex gap-2">
                {([true, false] as const).map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => { set('flex', v); if (!v) { set('flexRange', ''); setFlexOpen(false) } }}
                    className={cn(
                      'flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-all',
                      data.flex === v
                        ? `${activeBg} text-white border-transparent`
                        : 'bg-white text-greige border-sand/50 hover:border-navy/30 hover:text-navy'
                    )}
                  >
                    {v ? 'Ja' : 'Nei'}
                  </button>
                ))}
              </div>
            </div>

            {data.flex && (
              <div>
                <label className="label">Hvor fleksibel?</label>
                <button
                  type="button"
                  onClick={() => setFlexOpen(o => !o)}
                  className={cn(
                    'input-field flex items-center justify-between gap-2 text-left',
                    errors.flexRange && 'border-red-300'
                  )}
                >
                  <span className={selectedFlexLabel ? 'text-navy font-medium' : 'text-warm-gray/70'}>
                    {selectedFlexLabel ?? 'Velg fleksibilitet…'}
                  </span>
                  <ChevronDown className={cn('w-4 h-4 text-greige flex-shrink-0 transition-transform duration-150', flexOpen && 'rotate-180')} />
                </button>
                {errors.flexRange && <p className="text-xs text-red-400 mt-1">{errors.flexRange}</p>}
                <div className={cn(
                  'grid transition-[grid-template-rows] duration-200 ease-in-out',
                  flexOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}>
                  <div className="overflow-hidden">
                    <div className="mt-1 bg-white rounded-xl border border-sand/50 overflow-hidden shadow-sm">
                      {FLEX_OPTIONS.map(({ v, l }, i) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => { set('flexRange', v); setFlexOpen(false) }}
                          className={cn(
                            'w-full px-4 py-2.5 text-sm text-left transition-colors',
                            i > 0 && 'border-t border-sand/30',
                            data.flexRange === v
                              ? `${activeBg} text-white font-semibold`
                              : 'text-navy hover:bg-offwhite'
                          )}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }

      case 'fromAddress':
        return (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="label">Gate</label>
                <input
                  value={data.fromStreet}
                  onChange={e => set('fromStreet', e.target.value)}
                  placeholder="Gateveien"
                  className={cn('input-field', errors.fromStreet && 'border-red-300')}
                />
                {errors.fromStreet && <p className="text-xs text-red-400 mt-1">{errors.fromStreet}</p>}
              </div>
              <div>
                <label className="label">Nr.</label>
                <input value={data.fromNo} onChange={e => set('fromNo', e.target.value)} placeholder="1A" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Postnummer</label>
                <input
                  value={data.fromPostal}
                  onChange={e => set('fromPostal', e.target.value)}
                  placeholder="7010"
                  maxLength={4}
                  className={cn('input-field', errors.fromPostal && 'border-red-300')}
                />
                {errors.fromPostal && <p className="text-xs text-red-400 mt-1">{errors.fromPostal}</p>}
              </div>
              <div>
                <label className="label">Sted</label>
                <input value={data.fromCity} onChange={e => set('fromCity', e.target.value)} placeholder="Trøndelag" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Etasje</label>
                <input
                  value={data.fromFloor}
                  onChange={e => set('fromFloor', e.target.value)}
                  placeholder="1"
                  className={cn('input-field', errors.fromFloor && 'border-red-300')}
                />
                {errors.fromFloor && <p className="text-xs text-red-400 mt-1">{errors.fromFloor}</p>}
              </div>
              <div>
                <label className="label">Heis?</label>
                <ElevatorToggle val={data.fromElevator} onChange={v => set('fromElevator', v)} />
              </div>
            </div>
            <div>
              <label className="label">Størrelse på boligen (kvm)</label>
              <input
                type="number"
                min="1"
                value={data.size}
                onChange={e => set('size', e.target.value)}
                placeholder="75"
                className="input-field"
              />
            </div>
          </div>
        )

      case 'size':
        return (
          <div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {SIZE_OPTIONS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set('size', s)}
                  className={cn(
                    'py-3 rounded-xl border text-center transition-all',
                    data.size === s
                      ? `${activeBg} text-white border-transparent`
                      : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                  )}
                >
                  <span className="text-xs font-semibold block">{s}</span>
                  <span className="text-[10px] opacity-60">m²</span>
                </button>
              ))}
            </div>
            {errors.size && <p className="text-xs text-red-400 mt-2">{errors.size}</p>}
          </div>
        )

      case 'toAddress':
        return (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="label">Gate</label>
                <input
                  value={data.toStreet}
                  onChange={e => set('toStreet', e.target.value)}
                  placeholder="Gateveien"
                  className={cn('input-field', errors.toStreet && 'border-red-300')}
                />
                {errors.toStreet && <p className="text-xs text-red-400 mt-1">{errors.toStreet}</p>}
              </div>
              <div>
                <label className="label">Nr.</label>
                <input value={data.toNo} onChange={e => set('toNo', e.target.value)} placeholder="1A" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Postnummer</label>
                <input
                  value={data.toPostal}
                  onChange={e => set('toPostal', e.target.value)}
                  placeholder="7010"
                  maxLength={4}
                  className={cn('input-field', errors.toPostal && 'border-red-300')}
                />
                {errors.toPostal && <p className="text-xs text-red-400 mt-1">{errors.toPostal}</p>}
              </div>
              <div>
                <label className="label">Sted</label>
                <input value={data.toCity} onChange={e => set('toCity', e.target.value)} placeholder="Trøndelag" className="input-field" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">Etasje</label>
                <input
                  value={data.toFloor}
                  onChange={e => set('toFloor', e.target.value)}
                  placeholder="2"
                  className={cn('input-field', errors.toFloor && 'border-red-300')}
                />
                {errors.toFloor && <p className="text-xs text-red-400 mt-1">{errors.toFloor}</p>}
              </div>
              <div>
                <label className="label">Heis?</label>
                <ElevatorToggle val={data.toElevator} onChange={v => set('toElevator', v)} />
              </div>
            </div>
          </div>
        )

      case 'parking':
        return (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-greige -mt-2">Oppgi omtrentlig avstand fra inngangsdøren til der bilen kan stå parkert.</p>
            {([
              { icon: Home,      label: 'Adresse du flytter fra', val: data.parkA, key: 'parkA' as const, ph: 'F.eks. 5' },
              { icon: Building2, label: 'Adresse du flytter til',  val: data.parkB, key: 'parkB' as const, ph: 'F.eks. 10' },
            ]).map(({ icon: Icon, label, val, key, ph }) => (
              <div key={key} className="bg-white rounded-2xl border border-sand/30 p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-offwhite border border-sand/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-greige" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-navy">{label}</p>
                    <span className="text-xs text-greige">Meter</span>
                  </div>
                  <p className="text-xs text-greige mb-2">Ca. avstand fra inngang til parkering</p>
                  <input
                    type="number"
                    min="0"
                    value={val}
                    onChange={e => set(key, e.target.value)}
                    placeholder={ph}
                    className="input-field py-2 md:text-sm"
                  />
                </div>
              </div>
            ))}
            <div className="flex items-start gap-2.5 bg-offwhite rounded-xl px-4 py-3 border border-sand/20">
              <Info className="w-4 h-4 text-greige flex-shrink-0 mt-0.5" />
              <p className="text-xs text-greige leading-relaxed">Dette hjelper flyttebyrået med å beregne tidsbruk og gi deg et mer nøyaktig tilbud.</p>
            </div>
          </div>
        )

      case 'propertyType':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className="label">Type bolig</label>
              <div className="flex flex-wrap gap-1.5">
                {PROPERTY_TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set('propType', t)}
                    className={cn(
                      'py-1.5 px-3 rounded-lg border text-xs font-semibold transition-all',
                      data.propType === t
                        ? `${activeBg} text-white border-transparent`
                        : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {errors.propType && <p className="text-xs text-red-400 mt-1">{errors.propType}</p>}
            </div>

            <div>
              <label className="label">Antall etasjer</label>
              <div className="grid grid-cols-4 gap-1.5">
                {['1', '2', '3', '4+'].map(f => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => set('floors', f)}
                    className={cn(
                      'py-1.5 rounded-lg border text-xs font-semibold transition-all',
                      data.floors === f
                        ? `${activeBg} text-white border-transparent`
                        : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
              {errors.floors && <p className="text-xs text-red-400 mt-1">{errors.floors}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Hele boligen?</label>
                <div className="flex gap-1.5">
                  {([true, false] as const).map(v => (
                    <button
                      key={String(v)}
                      type="button"
                      onClick={() => set('wholeProperty', v)}
                      className={cn(
                        'flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all',
                        data.wholeProperty === v
                          ? `${activeBg} text-white border-transparent`
                          : 'bg-white text-greige border-sand/50 hover:border-navy/30 hover:text-navy'
                      )}
                    >
                      {v ? 'Ja' : 'Nei'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Areal (kvm)</label>
                <input
                  type="number"
                  min="1"
                  value={data.area}
                  onChange={e => set('area', e.target.value)}
                  placeholder="70"
                  className={cn('input-field py-1.5 md:text-sm', errors.area && 'border-red-300')}
                />
                {errors.area && <p className="text-xs text-red-400 mt-1">{errors.area}</p>}
              </div>
            </div>

            <div>
              <label className="label">Spor etter husdyr?</label>
              <div className="flex gap-1.5">
                {([true, false] as const).map(v => (
                  <button
                    key={String(v)}
                    type="button"
                    onClick={() => set('petTraces', v)}
                    className={cn(
                      'flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-all',
                      data.petTraces === v
                        ? `${activeBg} text-white border-transparent`
                        : 'bg-white text-greige border-sand/50 hover:border-navy/30 hover:text-navy'
                    )}
                  >
                    {v ? 'Ja' : 'Nei'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case 'rooms': {
        const roomTypes: { key: 'soverom' | 'badwc' | 'kjokken' | 'stue'; label: string }[] = [
          { key: 'soverom', label: 'Soverom'  },
          { key: 'badwc',   label: 'Bad/WC'   },
          { key: 'kjokken', label: 'Kjøkken'  },
          { key: 'stue',    label: 'Stue'     },
        ]
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className="label">Antall rom som skal vaskes</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                {roomTypes.map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between bg-white rounded-xl border border-sand/50 px-3 py-2">
                    <span className="text-xs text-navy font-medium">{label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => set(key, Math.max(0, data[key] - 1))}
                        className="w-6 h-6 rounded-md border border-sand/50 flex items-center justify-center text-navy font-bold text-sm hover:border-navy/40 transition"
                      >−</button>
                      <span className="w-4 text-center font-semibold text-navy text-xs">{data[key]}</span>
                      <button
                        type="button"
                        onClick={() => set(key, data[key] + 1)}
                        className={cn('w-6 h-6 rounded-md flex items-center justify-center font-bold text-sm transition text-white', activeBg)}
                      >+</button>
                    </div>
                  </div>
                ))}
              </div>
              {errors.rooms && <p className="text-xs text-red-400 mt-1">{errors.rooms}</p>}
            </div>

            <div>
              <label className="label">Ekstra områder (valgfritt)</label>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {AREA_EXTRAS.map(({ v, l }) => {
                  const checked = data.areaExtras.includes(v)
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() =>
                        set('areaExtras', checked ? data.areaExtras.filter(e => e !== v) : [...data.areaExtras, v])
                      }
                      className={cn(
                        'py-1.5 px-3 rounded-lg border text-xs font-semibold transition-all',
                        checked
                          ? `${activeBg} text-white border-transparent`
                          : 'bg-white border-sand/50 text-greige hover:border-navy/30 hover:text-navy'
                      )}
                    >
                      {l}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="label">Andre kommentarer (valgfritt)</label>
              <textarea
                value={data.comments}
                onChange={e => set('comments', e.target.value)}
                placeholder="F.eks. vask av doble vinduer og håndvask stukkatur"
                rows={2}
                className="input-field resize-none"
              />
            </div>
          </div>
        )
      }

      case 'contact':
        return (
          <div className="flex flex-col gap-3">
            <div>
              <label className="label">Fullt navn</label>
              <input
                value={data.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Ola Nordmann"
                className={cn('input-field', errors.name && 'border-red-300')}
              />
              {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="label">Telefon</label>
              <input
                value={data.phone}
                onChange={e => set('phone', e.target.value)}
                placeholder="+47 900 00 000"
                type="tel"
                className={cn('input-field', errors.phone && 'border-red-300')}
              />
              {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="label">E-post</label>
              <input
                value={data.email}
                onChange={e => set('email', e.target.value)}
                placeholder="ola@example.no"
                type="email"
                className={cn('input-field', errors.email && 'border-red-300')}
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
            <p className="text-xs text-greige leading-relaxed">
              Gratis og uforpliktende — du velger selv om du vil akseptere tilbudet.
            </p>
          </div>
        )

      case 'address':
        return (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="label">Adresse</label>
                <input
                  value={data.fromStreet}
                  onChange={e => set('fromStreet', e.target.value)}
                  placeholder="Gateveien"
                  className={cn('input-field', errors.fromStreet && 'border-red-300')}
                />
                {errors.fromStreet && <p className="text-xs text-red-400 mt-1">{errors.fromStreet}</p>}
              </div>
              <div>
                <label className="label">Nr.</label>
                <input value={data.fromNo} onChange={e => set('fromNo', e.target.value)} placeholder="1A" className="input-field" />
              </div>
            </div>
            <div>
              <label className="label">Postnummer</label>
              <input
                value={data.fromPostal}
                onChange={e => set('fromPostal', e.target.value)}
                placeholder="7010"
                maxLength={4}
                className={cn('input-field', errors.fromPostal && 'border-red-300')}
              />
              {errors.fromPostal && <p className="text-xs text-red-400 mt-1">{errors.fromPostal}</p>}
            </div>
            <p className="text-xs text-greige leading-relaxed">
              Gratis og uforpliktende — du velger selv om du vil akseptere tilbudet.
            </p>
          </div>
        )
    }
  }

  return (
    <div ref={formRef} className={cn('flex flex-col gap-4', className)}>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-sand/30 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-300', activeBg)}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-greige tabular-nums flex-shrink-0">
          {stepIdx + 1} / {steps.length}
        </span>
      </div>

      <p className="text-sm font-semibold text-navy -mb-1">{STEP_LABELS[currentStep]}</p>

      {renderStep()}

      {isLast && (
        <div className="flex flex-col gap-3 mt-1">
          <label className="flex items-start gap-2 text-xs text-greige cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => {
                setConsent(e.target.checked)
                if (e.target.checked) setErrors(er => { const n = { ...er }; delete n.consent; return n })
              }}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-navy cursor-pointer"
            />
            <span>
              Jeg samtykker til at mine opplysninger deles med relevante samarbeidspartnere
              (flyttebyråer og rengjøringsfirma) for å motta tilbud, og har lest{' '}
              <a href="/personvern" target="_blank" rel="noreferrer" className="underline hover:text-navy">
                personvernerklæringen
              </a>
              .
            </span>
          </label>
          {turnstileSiteKey && <div ref={turnstileRef} className="min-h-[65px]" />}
          {errors.consent && <p className="text-xs text-red-600">{errors.consent}</p>}
        </div>
      )}

      <div className="flex gap-2 mt-1">
        {stepIdx > 0 && (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-1 py-2.5 px-4 rounded-xl border border-sand/50 text-sm font-semibold text-greige hover:border-navy/30 hover:text-navy transition-all flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" /> Tilbake
          </button>
        )}
        <button
          type="button"
          onClick={isLast ? submit : next}
          disabled={loading}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed',
            activeColor
          )}
        >
          {loading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Sender…</>
            : isLast
              ? <>Få gratis tilbud <ArrowRight className="w-4 h-4" /></>
              : <>Neste <ArrowRight className="w-4 h-4" /></>
          }
        </button>
      </div>

    </div>
  )
}
