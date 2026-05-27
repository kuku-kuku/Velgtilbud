import { Check, CheckCircle2 } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'
import FAQ from '@/components/sections/FAQ'

const services = [
  { title: 'Kontorflytting i Trondheim', desc: 'Effektiv og planlagt kontorflytting med minimal nedetid. Vi hjelper bedrifter med trygg flytting av arbeidsplasser, inventar og IT-utstyr.' },
  { title: 'Næringsflytting',            desc: 'Finn flyttefirma som håndterer små og store næringsflyttinger i Trondheim og omegn — tilpasset bedriftens størrelse og behov.' },
  { title: 'Kontorrengjøring',           desc: 'Sammenlign tilbud på fast renhold og engangsvask for kontor, butikk og næringslokaler — utført av profesjonelle rengjøringsfirma.' },
  { title: 'Mellomlagring',              desc: 'Få tilgang til sikre og fleksible lagerløsninger ved flytting, oppussing eller midlertidig behov for oppbevaring av inventar og utstyr.' },
]

const benefits = [
  'Tilbud fra erfarne flyttefirma for bedrifter',
  'Effektiv prosjektstyring og koordinert flytteprosess',
  'Flytting av kontor, lager, IT-utstyr og inventar',
  'Minimal nedetid for ansatte og drift',
  'Fleksible tidspunkt tilpasset bedriftens behov',
  'Gratis å motta og sammenligne tilbud',
]

export default function BedrifterPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/hero.webp') 65% center / cover no-repeat` }} />
        <div className="container-wide pt-14 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Bedrifter · Trondheim</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                <span className="text-sand">Kontorflytting</span>
                {' '}i Trondheim for bedrifter
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Finn erfarne selskaper innen <strong className="text-white/80">kontorflytting og næringsflytting i Trondheim</strong>. Vi kobler din bedrift med kvalitetssikrede aktører som sørger for en effektiv flytteprosess med minimal nedetid.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-2 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0 mt-0.5" /> {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-7 py-8">
                <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Bedrifter</p>
                <h2 className="text-xl font-bold text-navy mb-6">Få tilbud på kontorflytting</h2>
                <LeadForm defaultService="flytting" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-offwhite">
        <div className="container-wide">
          <h2 className="section-title mb-2">Tjenester for bedrifter i Trondheim</h2>
          <p className="section-subtitle mb-10">Finn profesjonelle tjenester innen kontorflytting, næringsflytting og kontorrengjøring i Trondheim. Vi hjelper bedrifter med å sammenligne tilbud fra erfarne og kvalitetssikrede leverandører.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-sand/20">
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-10">
            <h2 className="section-title mb-2">Derfor bruker bedrifter Velgtilbud!</h2>
            <p className="section-subtitle">Bedriftsflytting krever planlegging, presisjon og erfarne fagfolk. Vi matcher deg med kvalitetssikrede selskaper i Trondheim — raskt og enkelt.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Erfarne næringsaktører',  text: 'Vi matcher deg med selskaper som spesialiserer seg på bedrifts- og næringsflytting i Trondheim.' },
              { title: 'Minimal nedetid',          text: 'Effektiv koordinering sørger for at virksomheten er raskt i gang igjen etter flyttingen.' },
              { title: 'Alt på ett sted',          text: 'Flytting av kontor, lager, inventar og IT-utstyr — vi finner firma som dekker hele behovet.' },
              { title: 'Gratis og uforpliktende',  text: 'Det koster ingenting å innhente og sammenligne tilbud. Ingen binding, ingen skjulte kostnader.' },
            ].map((b) => (
              <div key={b.title} className="bg-offwhite rounded-2xl p-6 border border-sand/20 flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-navy mb-2">{b.title}</h3>
                  <p className="text-sm text-greige leading-relaxed">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  )
}
