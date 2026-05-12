import { Check } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'
import TrustBadges from '@/components/sections/TrustBadges'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'

const movingItems = [
  { title: 'Boligflytting Trondheim',  desc: 'Fra leilighet til villa — vi finner rett byrå til din boligflytting i Trondheim.' },
  { title: 'Pakking & emballasje',     desc: 'Profesjonell pakking av alle eiendeler, inkl. skjøre gjenstander.' },
  { title: 'Pianotransport',           desc: 'Spesialtransport for piano og andre verdifulle gjenstander.' },
  { title: 'Langtransport',            desc: 'Flytting til og fra Trondheim — vi dekker hele landet.' },
]

const cleaningItems = [
  { title: 'Flyttevask Trondheim',  desc: 'Grundig utvask godkjent av utleier. Få hele depositumet tilbake.' },
  { title: 'Hjemmerengjøring',      desc: 'Fast eller engangsvask — tilpasset ditt behov og timeplan.' },
  { title: 'Vindusvask',            desc: 'Inne- og utvendig vindusvask. Flekk- og striefritt.' },
  { title: 'Etter-bygg rengjøring', desc: 'Fjerning av byggstøv og rester etter oppussing.' },
]

const priceGuide = [
  { label: '1-roms leilighet',    move: 'fra 2 500 kr', clean: 'fra 900 kr' },
  { label: '2-roms leilighet',    move: 'fra 4 000 kr', clean: 'fra 1 400 kr' },
  { label: '3-roms leilighet',    move: 'fra 6 000 kr', clean: 'fra 2 000 kr' },
  { label: 'Villa / rekkehus',    move: 'fra 9 000 kr', clean: 'fra 3 000 kr' },
]

export default function PrivatePage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-navy">
        <div className="container-wide pt-14 pb-14 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Privatpersoner · Trondheim</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Beste{' '}
                <span className="text-sand">flyttebyrå</span>
                {' '}og rengjøring for privatpersoner i Trondheim
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Sammenlign tilbud på <strong className="text-white/80">flytting i Trondheim</strong> og <strong className="text-white/80">flyttevask</strong> fra godkjente selskaper. Gratis, raskt, uforpliktende.
              </p>
              <div className="flex flex-col gap-2.5">
                {['Gratis tilbud på flyttebyrå i Trondheim', 'Opptil 5 priser — du velger', 'Inkl. tilbud på utvask og rengjøring'].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-7 py-8">
                <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Privatpersoner</p>
                <h2 className="text-xl font-bold text-navy mb-6">Få gratis tilbud nå</h2>
                <LeadForm defaultService="flytting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving services */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Boligflytting i Trondheim</h2>
          <p className="section-subtitle mb-10">Finn godkjente <strong>flyttebyråer i Trondheim</strong> som tar seg av alt — fra pakking til oppsetting.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {movingItems.map((s) => (
              <div key={s.title} className="bg-offwhite rounded-2xl p-6 border border-sand/20">
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning services */}
      <section className="section-padding bg-offwhite">
        <div className="container-wide">
          <h2 className="section-title mb-2">Flyttevask og rengjøring i Trondheim</h2>
          <p className="section-subtitle mb-10">Trenger du <strong>utvask i Trondheim</strong>? Vi finner de beste rengjøringsselskapene til deg.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {cleaningItems.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-sand/20">
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price guide */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="section-title mb-2">Prisoversikt — Trondheim</h2>
          <p className="section-subtitle mb-10">Veiledende priser for <strong>flytting og flyttevask i Trondheim</strong>. Få eksakt pris via tilbud.</p>
          <div className="bg-offwhite rounded-2xl border border-sand/20 overflow-hidden">
            <div className="grid grid-cols-3 px-6 py-3 border-b border-sand/20">
              <p className="text-xs font-bold text-greige uppercase tracking-wider">Boligtype</p>
              <p className="text-xs font-bold text-greige uppercase tracking-wider">Flytting</p>
              <p className="text-xs font-bold text-greige uppercase tracking-wider">Rengjøring</p>
            </div>
            {priceGuide.map((p, i) => (
              <div key={i} className={`grid grid-cols-3 px-6 py-4 ${i < priceGuide.length - 1 ? 'border-b border-sand/20' : ''}`}>
                <p className="text-sm font-semibold text-navy">{p.label}</p>
                <p className="text-sm text-greige">{p.move}</p>
                <p className="text-sm text-greige">{p.clean}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-warm-gray mt-3 text-center">* Veiledende priser. Nøyaktig pris avhenger av avstand, etasje og ekstra tjenester.</p>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />
      <FAQ />
    </div>
  )
}
