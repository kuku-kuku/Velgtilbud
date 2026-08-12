import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Check } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'

type ServiceChoice = 'begge' | 'flyttehjelp' | 'rengjoring'
function choiceHeading(c: ServiceChoice) {
  if (c === 'rengjoring')  return 'Få gratis tilbud på rengjøring'
  if (c === 'flyttehjelp') return 'Få gratis tilbud på flyttehjelp'
  return 'Få gratis tilbud på flytting og rengjøring'
}
import TrustBadges from '@/components/sections/TrustBadges'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'

const movingItems = [
  { title: 'Flytting av leilighet og hus', desc: 'Vi innhenter og forhandler frem et konkurransedyktig tilbud på flytting, tilpasset dine behov – uansett hvor i Norge du skal flytte.' },
  { title: 'Pakking og emballasje',         desc: 'Få hjelp med trygg pakking, flytteesker og sikker transport av møbler, klær og skjøre eiendeler.' },
  { title: 'Pianotransport',                desc: 'Vi hjelper deg med å innhente et konkurransedyktig tilbud på pianotransport og spesialflytting av tunge eller verdifulle gjenstander.' },
  { title: 'Langtransport',                 desc: 'Vi innhenter tilbud på langtransport og flytteoppdrag over hele Norge – enten du flytter lokalt eller mellom landsdeler.' },
]

const cleaningItems = [
  { title: 'Flyttevask',                desc: 'Få et konkurransedyktig tilbud på profesjonell flyttevask med fornøydgaranti. Vi finner en kvalitetssikret leverandør som passer ditt behov.' },
  { title: 'Hjemmerengjøring',          desc: 'Få tilbud på fast eller engangs rengjøring tilpasset boligen, ønskene og timeplanen din.' },
  { title: 'Vindusvask',                desc: 'Få et godt tilbud på innvendig og utvendig vindusvask for leilighet, hus eller annen bolig.' },
  { title: 'Byggvask og visningsvask',  desc: 'Få hjelp med rengjøring etter oppussing, byggearbeid eller før visning og salg av bolig – utført av en kvalitetssikret leverandør.' },
]

const priceGuide = [
  { label: '1-roms leilighet', move: 'fra 2 500 kr', clean: 'fra 2 250 kr' },
  { label: '2-roms leilighet', move: 'fra 4 000 kr', clean: 'fra 3 500 kr' },
  { label: '3-roms leilighet', move: 'fra 6 000 kr', clean: 'fra 5 000 kr' },
  { label: 'Villa / rekkehus', move: 'fra 9 000 kr', clean: 'fra 7 500 kr' },
]

export default function PrivatePage() {
  const [choice, setChoice] = useState<ServiceChoice>('begge')
  return (
    <div className="page-enter">
      <Helmet>
        <title>Flyttebyrå Trondheim – Tilbud på Flytting og Flyttevask | Velgtilbud</title>
        <meta name="description" content="Finn godkjente flyttebyråer og rengjøringsfirma i Trondheim. Sammenlign gratis tilbud på boligflytting, flyttevask og hjemmerengjøring. Enkelt, trygt og uforpliktende." />
        <link rel="canonical" href="https://velgtilbud.no/privatpersoner" />
        <meta property="og:title" content="Flyttebyrå Trondheim – Tilbud på Flytting og Flyttevask | Velgtilbud" />
        <meta property="og:description" content="Finn godkjente flyttebyråer og rengjøringsfirma i Trondheim. Sammenlign gratis tilbud og velg det beste for deg." />
        <meta property="og:url" content="https://velgtilbud.no/privatpersoner" />
        <meta property="og:image" content="https://velgtilbud.no/logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Flyttebyrå og rengjøring Trondheim",
          "description": "Finn og sammenlign godkjente flyttebyråer og rengjøringsfirma i Trondheim. Gratis tilbud på boligflytting, flyttevask og hjemmerengjøring.",
          "provider": { "@type": "LocalBusiness", "name": "Velgtilbud", "url": "https://velgtilbud.no" },
          "areaServed": { "@type": "City", "name": "Trondheim" },
          "serviceType": ["Boligflytting", "Flyttevask", "Hjemmerengjøring", "Pianotransport", "Langtransport"],
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "NOK", "description": "Gratis og uforpliktende å innhente tilbud" }
        })}</script>
      </Helmet>
      {/* Hero */}
      <section className="bg-navy relative overflow-hidden -mt-16">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/Privat.png') 35% center / cover no-repeat` }} />
        <div className="container-wide pt-28 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Privatpersoner · Hele Norge</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Få det beste{' '}
                <span className="text-sand">tilbudet</span>
                {' '}på flytting og rengjøring
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-md">
                Send inn én forespørsel – <strong className="text-white/80">vårt meglerteam innhenter og forhandler frem det beste tilbudet</strong> fra kvalitetssikrede leverandører. Du mottar ett ferdigforhandlet tilbud, helt gratis og uforpliktende.
              </p>
              <div className="flex flex-col gap-2.5">
                {['Vi forhandler frem det beste tilbudet for deg', 'Tilbud fra kvalitetssikrede leverandører', 'Gratis og uforpliktende – uten skjulte kostnader'].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-4 sm:px-7 py-8">
                <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Privatpersoner</p>
                <h2 className="text-xl font-bold text-navy mb-6">{choiceHeading(choice)}</h2>
                <LeadForm defaultService="flytting" defaultServiceChoice="begge" onServiceChoiceChange={setChoice} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moving services */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <h2 className="section-title mb-2">Våre flyttetjenester</h2>
          <p className="section-subtitle mb-10">Vi hjelper deg med å finne riktig løsning for hele flytteprosessen. Vårt meglerteam innhenter og forhandler frem konkurransedyktige tilbud fra <strong>kvalitetssikrede leverandører over hele Norge</strong>.</p>
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
          <h2 className="section-title mb-2">Flyttevask og rengjøring i hele Norge</h2>
          <p className="section-subtitle mb-10">Få et konkurransedyktig tilbud på <strong>flyttevask, hjemmerengjøring, vindusvask og byggvask</strong> – uansett hvor i Norge du bor. Vårt team innhenter og forhandler frem et godt tilbud fra kvalitetssikrede leverandører, helt gratis og uforpliktende.</p>
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
          <h2 className="section-title mb-2">Prisoversikt for flytting og rengjøring i hele Norge</h2>
          <p className="section-subtitle mb-10">Alle oppdrag er ulike, og prisen avhenger blant annet av <strong>boligstørrelse, avstand, omfang og ønskede tjenester</strong>. Vårt team innhenter og forhandler frem et konkurransedyktig tilbud fra kvalitetssikrede leverandører – helt gratis og uforpliktende.</p>
          <div className="bg-offwhite rounded-2xl border border-sand/20 overflow-hidden">
            <div className="grid grid-cols-3 px-3 sm:px-6 py-3 border-b border-sand/20">
              <p className="text-[10px] sm:text-xs font-bold text-greige uppercase tracking-wider">Boligtype</p>
              <p className="text-[10px] sm:text-xs font-bold text-greige uppercase tracking-wider">Flytting</p>
              <p className="text-[10px] sm:text-xs font-bold text-greige uppercase tracking-wider">Rengjøring</p>
            </div>
            {priceGuide.map((p, i) => (
              <div key={i} className={`grid grid-cols-3 px-3 sm:px-6 py-4 ${i < priceGuide.length - 1 ? 'border-b border-sand/20' : ''}`}>
                <p className="text-xs sm:text-sm font-semibold text-navy">{p.label}</p>
                <p className="text-xs sm:text-sm text-greige">{p.move}</p>
                <p className="text-xs sm:text-sm text-greige">{p.clean}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-warm-gray mt-3 text-center">Alle priser fastsettes individuelt etter oppdragets omfang. Tilbudene du mottar er ferdig forhandlet av Værnes Multiservice AS og inkluderer vår megleravgift – uten skjulte kostnader eller overraskelser.</p>
        </div>
      </section>

      <TrustBadges />
      <Testimonials />
      <FAQ />
    </div>
  )
}
