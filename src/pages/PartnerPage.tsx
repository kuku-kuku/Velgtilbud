import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { CheckCircle, Loader2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const benefits = [
  { num: '01', title: 'Kvalifiserte kundehenvendelser', text: 'Motta forespørsler fra privatpersoner og bedrifter i Trondheim som aktivt søker tilbud på flytting og rengjøring.' },
  { num: '02', title: 'Betal kun for mottatte leads',   text: 'Ingen faste månedskostnader eller bindingstid. Du betaler kun for kundehenvendelser som sendes til din bedrift.' },
  { num: '03', title: 'Full kontroll over egne priser', text: 'Send tilbud basert på egne priser, tjenester og kapasitet. Dere bestemmer selv hvordan tilbudene utformes.' },
  { num: '04', title: 'Enkel håndtering av forespørsler', text: 'Motta og administrer forespørsler på en enkel og oversiktlig måte, slik at dere raskt kan følge opp potensielle kunder.' },
]

interface PartnerForm {
  company: string
  contact: string
  phone: string
  email: string
  services: string
  city: string
}

export default function PartnerPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<PartnerForm>()

  const onSubmit = async (data: PartnerForm) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    console.log('Partner application:', data)
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="page-enter">
      <Helmet>
        <title>Bli Partner – Få Flere Kunder Innen Flytting og Rengjøring | Velgtilbud</title>
        <meta name="description" content="Er du et flyttebyrå eller rengjøringsfirma i Trondheim? Bli partner hos Velgtilbud og motta kvalifiserte kundehenvendelser direkte. Betal kun for leads du mottar." />
        <link rel="canonical" href="https://velgtilbud.no/bli-partner" />
        <meta property="og:title" content="Bli Partner – Få Flere Kunder Innen Flytting og Rengjøring | Velgtilbud" />
        <meta property="og:description" content="Motta kvalifiserte kundehenvendelser fra Trondheim. Betal kun for leads du mottar. Registrer deg gratis." />
        <meta property="og:url" content="https://velgtilbud.no/bli-partner" />
      </Helmet>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/hero.webp') 50% 30% / cover no-repeat` }} />
        <div className="container-wide pt-14 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">
                For bedrifter · Trondheim
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Bli partner og motta{' '}
                <span className="text-sand">kvalifiserte leads</span>
                {' '}fra Trondheim
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-2 max-w-md">
                Få flere kunder innen flytting, rengjøring og næringstjenester i Trondheim gjennom Velgtilbud. Vi kobler din bedrift med personer og selskaper som aktivt søker etter tjenestene dere tilbyr.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                Motta relevante forespørsler fra kunder i Trondheim — uten bindingstid eller faste abonnementskostnader. Du velger selv hvilke leads du ønsker å kontakte.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Kvalifiserte leads fra privatpersoner og bedrifter',
                  'Ingen binding eller faste månedskostnader',
                  'Velg selv hvilke forespørsler du vil motta',
                  'Flere muligheter for oppdrag og vekst i Trondheim',
                  'Enkel og effektiv måte å få nye kunder på',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-7 py-8">
                {submitted ? (
                  <div className="flex flex-col items-center text-center py-8 gap-4">
                    <div className="w-14 h-14 rounded-full bg-sage/20 flex items-center justify-center">
                      <CheckCircle className="w-7 h-7 text-sage" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy mb-1">Søknad mottatt!</h3>
                      <p className="text-sm text-greige max-w-xs mx-auto">Vi tar kontakt innen 1 virkedag for å fortelle mer om partnerprogrammet.</p>
                    </div>
                  </div>
                ) : (
                  <div className="page-enter">
                    <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Partnerprogram</p>
                    <h2 className="text-xl font-bold text-navy mb-6">Registrer selskapet ditt</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label">Selskapsnavn</label>
                          <input {...register('company', { required: 'Påkrevd' })} placeholder="Flytt AS" className={cn('input-field', errors.company && 'border-red-300')} />
                        </div>
                        <div>
                          <label className="label">Kontaktperson</label>
                          <input {...register('contact', { required: 'Påkrevd' })} placeholder="Ola Nordmann" className={cn('input-field', errors.contact && 'border-red-300')} />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="label">Telefon</label>
                          <input {...register('phone', { required: 'Påkrevd' })} placeholder="+47 900 00 000" type="tel" className={cn('input-field', errors.phone && 'border-red-300')} />
                        </div>
                        <div>
                          <label className="label">E-post</label>
                          <input {...register('email', { required: 'Påkrevd' })} placeholder="post@selskap.no" type="email" className={cn('input-field', errors.email && 'border-red-300')} />
                        </div>
                      </div>
                      <div>
                        <label className="label">By / område dere dekker</label>
                        <input {...register('city', { required: 'Påkrevd' })} placeholder="Trondheim og omegn" className={cn('input-field', errors.city && 'border-red-300')} />
                      </div>
                      <div>
                        <label className="label">Tjenester dere tilbyr</label>
                        <input {...register('services', { required: 'Påkrevd' })} placeholder="Boligflytting, kontorflytting, rengjøring…" className={cn('input-field', errors.services && 'border-red-300')} />
                      </div>
                      <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 py-3.5 bg-navy text-white font-semibold rounded-xl hover:bg-navy/90 active:scale-95 transition-all disabled:opacity-60 mt-1">
                        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sender…</> : <>Send søknad <ArrowRight className="w-4 h-4" /></>}
                      </button>
                      <p className="text-center text-xs text-warm-gray">Vi tar kontakt innen 1 virkedag</p>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Fordeler med å bli partner hos Velgtilbud</h2>
          <p className="section-subtitle mb-10">Få flere relevante kundehenvendelser i Trondheim innen flytting, rengjøring og næringstjenester.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b) => (
              <div key={b.num} className="bg-offwhite rounded-2xl p-6 border border-sand/20">
                <span className="text-xs font-bold text-sand tracking-widest block mb-3">{b.num}</span>
                <h3 className="font-bold text-navy mb-2">{b.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

          </div>
  )
}
