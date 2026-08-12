import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2 } from 'lucide-react'
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
      <section className="bg-navy relative overflow-hidden min-h-screen flex flex-col justify-center -mt-16">
        <div
          className="absolute inset-0 animate-hero-zoom bg-cover bg-no-repeat [background-position:65%_center] sm:[background-position:center_center]"
          style={{ backgroundImage: `linear-gradient(to bottom, rgba(14,29,45,0.82) 0%, rgba(14,29,45,0.72) 100%), url('/Bedrifter.png')` }}
        />
        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-center">
            <div className="lg:pl-2">
              <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-5">Bedrifter · Hele Norge</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
                <span className="text-sand">Kontorflytting</span>
                {' '}og bedrifts&shy;rengjøring
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-4 max-w-md">
                Få et konkurransedyktig tilbud på kontorflytting, næringsflytting og rengjøring for bedrifter – uansett hvor i Norge virksomheten holder til.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
                Vårt team innhenter og forhandler frem et godt tilbud fra kvalitetssikrede leverandører, slik at bedriften får en effektiv og trygg løsning uten å bruke tid på å kontakte flere bedrifter selv.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Skreddersydde løsninger', desc: 'Flytting, rengjøring og mellomlagring tilpasset bedriftens størrelse, behov og tidsplan.' },
                  { title: 'Kvalitetssikrede leverandører', desc: 'Vi samarbeider med erfarne leverandører innen kontorflytting og bedriftsrengjøring over hele Norge.' },
                  { title: 'Gratis og uforpliktende', desc: 'Vi forhandler frem konkurransedyktige tilbud – helt kostnadsfritt og uten forpliktelser.' },
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
              <div id="hero-form" className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 px-4 sm:px-7 py-8">
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
