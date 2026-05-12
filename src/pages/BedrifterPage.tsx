import { Check } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'
import FAQ from '@/components/sections/FAQ'

const services = [
  { title: 'Kontorflytting Trondheim',   desc: 'Effektiv kontorflytting med minimal nedetid. Vi koordinerer med deg slik at virksomheten er raskt i gang igjen.' },
  { title: 'Næringsflytting',            desc: 'Stor eller liten — vi finner selskaper som håndterer næringsflytting i hele Trondheims-regionen.' },
  { title: 'Kontorrengjøring',           desc: 'Fast eller engangsvask av kontor og næringsbygg. Gjerne utenfor åpningstid.' },
  { title: 'Mellomlagring',              desc: 'Trygg lagring av inventar mellom inn- og utflytting — fleksible løsninger.' },
]

const benefits = [
  'Tilbud fra spesialiserte næringsbyråer',
  'Koordinert flytteprosess med prosjektleder',
  'Minimal nedetid for din bedrift',
  'Fleksible datoer og tidspunkter',
  'Inkl. IT-utstyr og spesielle gjenstander',
  'Gratis og uforpliktende',
]

export default function BedrifterPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="bg-navy">
        <div className="container-wide pt-14 pb-14 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Bedrifter · Trondheim</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                <span className="text-sand">Kontorflytting</span>
                {' '}i Trondheim — profesjonelt og effektivt
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Vi kobler bedriften din med erfarne selskaper som spesialiserer seg på <strong className="text-white/80">næringsflytting i Trondheim</strong>. Gratis tilbud, ingen binding.
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
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Tjenester for bedrifter i Trondheim</h2>
          <p className="section-subtitle mb-10">Fra liten kontorflytting til stor næringsflytting — vi finner rett partner for deg.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div key={s.title} className="bg-offwhite rounded-2xl p-6 border border-sand/20">
                <h3 className="font-bold text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding bg-offwhite">
        <div className="container-wide max-w-3xl mx-auto text-center">
          <h2 className="section-title mb-4">Hvorfor bruke Velgtilbud for bedriftsflytting?</h2>
          <p className="text-greige leading-relaxed mb-0">
            Vi forstår at en bedriftsflytting i Trondheim krever mer enn en vanlig boligflytting. Derfor matcher vi deg med selskaper som har erfaring med næringsflytting, IT-utstyr, og koordinert logistikk — alt uten ekstra kostnad for deg.
          </p>
        </div>
      </section>

      <FAQ />
    </div>
  )
}
