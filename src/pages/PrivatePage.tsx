import { Helmet } from 'react-helmet-async'
import { Check } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'
import TrustBadges from '@/components/sections/TrustBadges'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'

const movingItems = [
  { title: 'Flytting av leilighet og hus', desc: 'Vi hjelper deg med å finne riktig flyttefirma for små og store flytteoppdrag i Trondheim — enkelt, trygt og effektivt.' },
  { title: 'Pakking og emballasje',         desc: 'Få hjelp med trygg pakking, flytteesker og sikker transport av møbler, klær og skjøre eiendeler.' },
  { title: 'Pianotransport',                desc: 'Sammenlign tilbud på pianotransport og spesialflytting av tunge eller verdifulle gjenstander i Trondheim.' },
  { title: 'Langtransport',                 desc: 'Finn flyttebyrå for flytting til og fra Trondheim — både lokalt og over hele Norge.' },
]

const cleaningItems = [
  { title: 'Flyttevask i Trondheim',   desc: 'Få tilbud på profesjonell flyttevask med fornøydgaranti. Grundig utvask godkjent ved overlevering av bolig.' },
  { title: 'Hjemmerengjøring',         desc: 'Finn rengjøringshjelp i Trondheim til fast vask eller engangsvask — tilpasset din bolig og timeplan.' },
  { title: 'Vindusvask',               desc: 'Sammenlign tilbud på innvendig og utvendig vindusvask for leilighet, hus og hytter.' },
  { title: 'Byggvask og visningsvask', desc: 'Få hjelp med rengjøring etter oppussing, byggearbeid eller før visning og salg av bolig.' },
]

const priceGuide = [
  { label: '1-roms leilighet', move: 'fra 2 500 kr', clean: 'fra 2 250 kr' },
  { label: '2-roms leilighet', move: 'fra 4 000 kr', clean: 'fra 3 500 kr' },
  { label: '3-roms leilighet', move: 'fra 6 000 kr', clean: 'fra 5 000 kr' },
  { label: 'Villa / rekkehus', move: 'fra 9 000 kr', clean: 'fra 7 500 kr' },
]

export default function PrivatePage() {
  return (
    <div className="page-enter">
      <Helmet>
        <title>Privatpersoner – Tilbud på Flytting og Rengjøring i Trondheim | Velgtilbud</title>
        <meta name="description" content="Finn pålitelige flyttebyråer og rengjøringsfirma i Trondheim for privatpersoner. Sammenlign gratis tilbud på boligflytting, flyttevask og rengjøring. Velg det beste for deg." />
        <link rel="canonical" href="https://velgtilbud.no/privatpersoner" />
        <meta property="og:title" content="Privatpersoner – Tilbud på Flytting og Rengjøring i Trondheim | Velgtilbud" />
        <meta property="og:description" content="Finn pålitelige flyttebyråer og rengjøringsfirma i Trondheim. Sammenlign gratis tilbud og velg det beste for deg." />
        <meta property="og:url" content="https://velgtilbud.no/privatpersoner" />
      </Helmet>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/Privat.png') 35% center / cover no-repeat` }} />
        <div className="container-wide pt-14 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Privatpersoner · Trondheim</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Finn{' '}
                <span className="text-sand">flyttebyrå</span>
                {' '}og rengjøringsfirma i Trondheim
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Sammenlign tilbud på <strong className="text-white/80">flytting, flyttevask og rengjøring</strong> i Trondheim fra kvalitetssikrede firma. Send inn én forespørsel gratis og uforpliktende — motta flere tilbud og velg selv.
              </p>
              <div className="flex flex-col gap-2.5">
                {['Gratis tilbud fra flyttebyrå i Trondheim', 'Sammenlign opptil 5 relevante firma', 'Tilbud på flytting, utvask og rengjøring'].map((t) => (
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
          <h2 className="section-title mb-2">Flyttetjenester i Trondheim</h2>
          <p className="section-subtitle mb-10">Finn kvalitetssikrede <strong>flyttebyrå i Trondheim</strong> som hjelper deg med hele flytteprosessen — fra pakking og transport til flyttevask og montering.</p>
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
          <p className="section-subtitle mb-10">Finn kvalitetssikrede <strong>rengjøringsfirma i Trondheim</strong> for flyttevask, hjemmerengjøring og vask etter oppussing. Sammenlign tilbud gratis og velg det firmaet som passer deg best.</p>
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
          <h2 className="section-title mb-2">Prisoversikt for flytting og rengjøring i Trondheim</h2>
          <p className="section-subtitle mb-10">Se veiledende priser for <strong>flyttehjelp, flyttevask og rengjøring i Trondheim</strong>. Endelig pris varierer etter boligstørrelse, avstand, etasje og ønskede tjenester.</p>
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
          <p className="text-xs text-warm-gray mt-3 text-center">Prisene er veiledende og basert på gjennomsnittlige oppdrag i Trondheim. Du mottar eksakte tilbud fra relevante firma etter innsending av forespørsel.</p>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />
      <FAQ />
    </div>
  )
}
