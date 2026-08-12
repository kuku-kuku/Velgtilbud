import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
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
    try {
      const url = import.meta.env.VITE_PARTNER_SIGNUP_URL as string
      const res = await fetch(url, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'apikey':        import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } catch (err) {
      console.error('Partner signup failed:', err)
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  return (
    <div className="page-enter">
      <Helmet>
        <title>Bli Partner i Trondheim – Få Leads Innen Flytting og Rengjøring | Velgtilbud</title>
        <meta name="description" content="Er du et flyttebyrå eller rengjøringsfirma i Trondheim? Bli partner hos Velgtilbud og motta kvalifiserte kundehenvendelser direkte. Ingen binding – betal kun for leads du mottar." />
        <link rel="canonical" href="https://velgtilbud.no/bli-partner" />
        <meta property="og:title" content="Bli Partner i Trondheim – Få Leads Innen Flytting og Rengjøring | Velgtilbud" />
        <meta property="og:description" content="Motta kvalifiserte kundehenvendelser fra Trondheim. Ingen binding – betal kun for leads du mottar. Registrer deg gratis." />
        <meta property="og:url" content="https://velgtilbud.no/bli-partner" />
        <meta property="og:image" content="https://velgtilbud.no/logo.jpg" />
      </Helmet>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden min-h-screen flex flex-col justify-center -mt-16">
        <div
          className="absolute inset-0 animate-hero-zoom bg-cover bg-no-repeat [background-position:50%_30%] sm:[background-position:center_center]"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(14,29,45,0.82) 0%, rgba(14,29,45,0.72) 100%), url('/bli partner (2).webp')` }}
        />
        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-center">
            <div className="lg:pl-2 overflow-hidden">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-5">
                For bedrifter · Hele Norge
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
                Bli partner og motta{' '}
                <span className="text-sand">kvalifiserte leads</span>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-4 max-w-md">
                Få flere kunder innen flytting, rengjøring og næringstjenester gjennom Velgtilbud. Vi kobler din bedrift med personer og selskaper som aktivt søker etter tjenestene dere tilbyr.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
                Motta relevante forespørsler fra kunder over hele Norge — uten bindingstid eller faste abonnementskostnader. Du velger selv hvilke leads du ønsker å kontakte.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Kvalifiserte leads', desc: 'Motta forespørsler fra privatpersoner og bedrifter som aktivt søker etter dine tjenester.' },
                  { title: 'Ingen binding', desc: 'Ingen faste månedskostnader eller bindingstid – du betaler kun for leads du velger.' },
                  { title: 'Enkel vekst', desc: 'Flere muligheter for oppdrag uten å bruke tid på markedsføring og kundeakkvisisjon.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand flex-shrink-0 mt-1.5" />
                    <div>
                      <p className="text-sm font-bold text-white uppercase tracking-wide leading-none mb-0.5">{title}</p>
                      <p className="text-sm text-white/50">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 px-4 sm:px-7 py-8">
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
