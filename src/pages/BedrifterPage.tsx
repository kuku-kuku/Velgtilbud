import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Check, CheckCircle2 } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'

type ServiceChoice = 'begge' | 'flyttehjelp' | 'rengjoring'
function choiceHeading(c: ServiceChoice) {
  if (c === 'rengjoring')  return 'Få gratis tilbud på rengjøring'
  if (c === 'flyttehjelp') return 'Få gratis tilbud på flyttehjelp'
  return 'Få gratis tilbud på flytting og rengjøring'
}
import FAQ from '@/components/sections/FAQ'

const services = [
  { title: 'Kontorflytting',    desc: 'Få et konkurransedyktig tilbud på trygg og effektiv kontorflytting, tilpasset bedriftens størrelse, behov og ønsket tidspunkt.' },
  { title: 'Næringsflytting',   desc: 'Vi hjelper bedrifter med å finne en kvalitetssikret leverandør for små og store næringsflyttinger, tilpasset virksomhetens behov.' },
  { title: 'Bedriftsrengjøring', desc: 'Få tilbud på fast renhold, kontorvask, butikkrenhold eller engangsrengjøring utført av kvalitetssikrede leverandører.' },
  { title: 'Mellomlagring',     desc: 'Få tilbud på sikre og fleksible lagerløsninger ved flytting, oppussing eller midlertidig behov for oppbevaring av inventar og utstyr.' },
]

const benefits = [
  'Tilbud på kontorflytting og bedriftsrengjøring',
  'Flytting av kontor, lager, inventar og IT-utstyr',
  'Fleksible løsninger tilpasset bedriftens behov',
  'Effektiv koordinering fra forespørsel til ferdig tilbud',
  'Minimal nedetid for ansatte og drift',
  'Gratis og uforpliktende tilbud – ingen skjulte kostnader',
]

export default function BedrifterPage() {
  const [choice, setChoice] = useState<ServiceChoice>('begge')
  return (
    <div className="page-enter">
      <Helmet>
        <title>Kontorflytting Trondheim – Tilbud på Næringsflytting og Rengjøring | Velgtilbud</title>
        <meta name="description" content="Finn erfarne leverandører for kontorflytting og næringsflytting i Trondheim. Sammenlign gratis tilbud fra kvalitetssikrede firma. Minimal nedetid og effektiv prosess." />
        <link rel="canonical" href="https://velgtilbud.no/bedrifter" />
        <meta property="og:title" content="Kontorflytting Trondheim – Tilbud på Næringsflytting og Rengjøring | Velgtilbud" />
        <meta property="og:description" content="Finn profesjonelle leverandører for kontorflytting og rengjøring i Trondheim. Sammenlign gratis tilbud – minimal nedetid for din bedrift." />
        <meta property="og:url" content="https://velgtilbud.no/bedrifter" />
        <meta property="og:image" content="https://velgtilbud.no/logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Kontorflytting og næringsflytting Trondheim",
          "description": "Profesjonell kontorflytting og næringsflytting i Trondheim. Finn og sammenlign erfarne leverandører med minimal nedetid for din bedrift.",
          "provider": { "@type": "LocalBusiness", "name": "Velgtilbud", "url": "https://velgtilbud.no" },
          "areaServed": { "@type": "City", "name": "Trondheim" },
          "serviceType": ["Kontorflytting", "Næringsflytting", "Kontorrengjøring", "Mellomlagring"],
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NOK", "description": "Gratis og uforpliktende å innhente tilbud" }
        })}</script>
      </Helmet>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden -mt-16">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/Bedrifter.png') 65% center / cover no-repeat` }} />
        <div className="container-wide pt-28 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Bedrifter · Hele Norge</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                <span className="text-sand">Kontorflytting</span>
                {' '}og bedriftsrengjøring i hele Norge
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Få et konkurransedyktig tilbud på <strong className="text-white/80">kontorflytting, næringsflytting og rengjøring for bedrifter</strong> – uansett hvor i Norge virksomheten holder til. Vårt team innhenter og forhandler frem et godt tilbud fra kvalitetssikrede leverandører, slik at bedriften får en effektiv og trygg løsning.
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
                <h2 className="text-xl font-bold text-navy mb-6">{choiceHeading(choice)}</h2>
                <LeadForm defaultService="flytting" defaultServiceChoice="begge" onServiceChoiceChange={setChoice} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-offwhite">
        <div className="container-wide">
          <h2 className="section-title mb-2">Tjenester for bedrifter i hele Norge</h2>
          <p className="section-subtitle mb-10">Få konkurransedyktige tilbud på <strong>kontorflytting, næringsflytting, bedriftsrengjøring og mellomlagring</strong> – uansett hvor i Norge virksomheten holder til. Vårt team innhenter og forhandler frem et godt tilbud fra kvalitetssikrede leverandører, helt gratis og uforpliktende.</p>
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
            <h2 className="section-title mb-2">Derfor bruker bedrifter Velgtilbud</h2>
            <p className="section-subtitle">Enten bedriften trenger flytting, rengjøring eller begge deler, gjør vi prosessen enklere. Vårt team innhenter og forhandler frem et eller flere konkurransedyktige tilbud fra kvalitetssikrede leverandører – raskt, trygt og helt uforpliktende.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: 'Kvalitetssikrede leverandører', text: 'Vi samarbeider med erfarne leverandører innen kontorflytting, næringsflytting og bedriftsrengjøring over hele Norge.' },
              { title: 'Effektiv gjennomføring',        text: 'Vi sørger for en smidig prosess og finner en løsning som passer bedriftens behov og ønsket tidsplan.' },
              { title: 'Alt på ett sted',               text: 'Flytting, bedriftsrengjøring og mellomlagring kan samles i én forespørsel, slik at bedriften sparer tid og får en enklere prosess.' },
              { title: 'Gratis og uforpliktende',       text: 'Det koster ingenting å motta flere ferdig forhandlede tilbud. Tilbudet inkluderer vår megleravgift, uten skjulte kostnader eller overraskelser.' },
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
