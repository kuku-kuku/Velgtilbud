import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Check, Quote } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'

type ServiceChoice = 'begge' | 'flyttehjelp' | 'rengjoring'
function choiceHeading(c: ServiceChoice) {
  if (c === 'rengjoring')  return 'Få gratis tilbud på rengjøring'
  if (c === 'flyttehjelp') return 'Få gratis tilbud på flyttehjelp'
  return 'Få gratis tilbud på flytting og rengjøring'
}

const values = [
  'Seriøse flyttebyråer og rengjøringsbyråer',
  'Tydelig kommunikasjon',
  'Rettferdige priser',
  'Punktlighet',
  'Kvalitet i arbeidet',
  'Trygghet for kunden',
  'Enkel sammenligning av tilbud',
]

const milestones = [
  { year: 'For over 20 år siden', text: 'Flyttelasset vårt fikk plass i baksetet på en Toyota Celica da vi flyttet til Trøndelag. Det ble starten på en lang reise i flyttebransjen.' },
  { year: 'Den første tanken', text: 'Da vi så at en lokal flyttejobb kostet 18 000 kroner, tenkte vi: «Dette må kunne gjøres enklere, tryggere og til en mer riktig pris.»' },
  { year: 'Mange år i bransjen', text: 'Gjennom årene bygget vi erfaring fra både flyttebyrå, flyttevask og rengjøring. Vi lærte hvordan bransjen fungerer — både for kundene og selskapene.' },
  { year: 'I dag', text: 'Velgtilbud ble startet for å gjøre det enklere å finne seriøse flyttebyråer og rengjøringsfirma i Trøndelag. Kunden sender én forespørsel og mottar flere relevante tilbud på ett sted.' },
]

export default function OmOssPage() {
  const [choice, setChoice] = useState<ServiceChoice>('begge')
  return (
    <div className="page-enter">
      <Helmet>
        <title>Om Oss – Velgtilbud Trondheim | Erfaring fra Flytte- og Rengjøringsbransjen</title>
        <meta name="description" content="Les om Velgtilbud og historien bak plattformen. Vi kobler privatpersoner og bedrifter i Trondheim med godkjente flyttebyråer og rengjøringsfirma – basert på mange års erfaring i bransjen." />
        <link rel="canonical" href="https://velgtilbud.no/om-oss" />
        <meta property="og:title" content="Om Oss – Velgtilbud Trondheim" />
        <meta property="og:description" content="Historien bak Velgtilbud — mange års erfaring fra flytte- og rengjøringsbransjen i Trondheim. Gratis tilbud fra godkjente firma." />
        <meta property="og:url" content="https://velgtilbud.no/om-oss" />
        <meta property="og:image" content="https://velgtilbud.no/logo.jpg" />
      </Helmet>

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden -mt-16">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/OM OSS.png') 28% center / cover no-repeat` }} />
        <div className="container-wide pt-28 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Om oss</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Bygget på erfaring fra flytte- og{' '}
                <span className="text-sand">rengjøringsbransjen</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-2 max-w-md">
                Velgtilbud drives av <strong className="text-white/80">Værnes Multiservice AS</strong> og er utviklet for å gjøre det enklere å finne kvalitetssikrede leverandører innen flytting og rengjøring i hele Norge. Vårt dedikerte meglerteam innhenter og forhandler frem konkurransedyktige tilbud, slik at kundene slipper å bruke tid på å kontakte flere bedrifter selv.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                Vi vet hvor tidkrevende det kan være å finne pålitelige leverandører og vurdere ulike alternativer. Derfor håndterer vi hele prosessen med å innhente og forhandle tilbud, slik at både privatpersoner og bedrifter mottar ett eller flere ferdig forhandlede tilbud – enkelt, trygt og helt uforpliktende.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Erfaring fra flytte- og rengjøringsbransjen',
                  'Kvalitetssikrede leverandører i hele Norge',
                  'Gratis og uforpliktende tjeneste',
                  'Ferdig forhandlede tilbud uten skjulte kostnader eller overraskelser',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-4 sm:px-7 py-8">
                <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Kom i gang</p>
                <h2 className="text-xl font-bold text-navy mb-6">{choiceHeading(choice)}</h2>
                <LeadForm defaultService="flytting" defaultServiceChoice="begge" onServiceChoiceChange={setChoice} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="section-title mb-4">Hvem er Velgtilbud?</h2>
          <div className="space-y-4 text-greige leading-relaxed mb-6">
            <p>
              Velgtilbud er en tjeneste drevet av Værnes Multiservice AS som gjør det enklere å finne kvalitetssikrede leverandører innen flytting og rengjøring i hele Norge. Vårt dedikerte meglerteam innhenter og forhandler frem konkurransedyktige tilbud, slik at du slipper å bruke tid på å kontakte flere bedrifter selv.
            </p>
            <p>
              Med én forespørsel håndterer vi hele prosessen med å innhente og forhandle tilbud fra relevante leverandører. Du mottar ett eller flere ferdig forhandlede tilbud, og dersom du aksepterer det, blir du satt i kontakt med leverandøren som utfører oppdraget.
            </p>
            <p className="font-semibold text-navy">
              Målet vårt er å gjøre det enklere, tryggere og mer oversiktlig å finne riktig leverandør – til riktig pris.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              'Kvalitetssikrede leverandører i hele Norge',
              'Vi innhenter og forhandler tilbud på dine vegne',
              'Gratis og uforpliktende tjeneste',
              'Ferdig forhandlede tilbud uten skjulte kostnader eller overraskelser',
            ].map((t) => (
              <div key={t} className="flex items-center gap-2.5 text-sm text-greige">
                <Check className="w-4 h-4 text-sand flex-shrink-0" /> {t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-offwhite py-14">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="bg-navy rounded-2xl px-5 sm:px-8 py-8 sm:py-10 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
            <Quote className="w-8 h-8 text-sand flex-shrink-0 mt-1" />
            <div>
              <div className="text-white text-lg md:text-xl font-medium leading-relaxed mb-4 flex flex-col gap-2">
                <span>18 000 kroner for en lokal flyttejobb.</span>
                <span>Min første tanke var: Dette kunne jeg gjort for 6 000 kroner.</span>
                <span>Det var da vi innså hvor vanskelig det er å vite hvem som tilbyr riktig pris — og riktig kvalitet.</span>
              </div>
              <p className="text-sand text-sm font-semibold uppercase tracking-widest">Gründerens første møte med bransjen</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="section-title mb-3">Historien bak</h2>
          <p className="section-subtitle mb-12">
            Fra en Toyota Celica fra 1992 med alt vi eide i baksetet — til mange år i flytte- og rengjøringsbransjen, og til slutt Velgtilbud.
          </p>
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-sand/40" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-6 pl-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-navy border-4 border-white ring-2 ring-sand/40 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-sand uppercase tracking-widest mb-1">{m.year}</p>
                    <p className="text-greige leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience section */}
      <section className="section-padding bg-offwhite">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="section-title mb-4">Erfaring med flytting, rengjøring og flyttevask</h2>
          <div className="space-y-4 text-greige leading-relaxed">
            <p>
              Gjennom mange år i flyttebransjen har vi sett hvor viktig det er at hele prosessen fungerer — ikke bare selve flyttingen. Når folk flytter, trenger de ofte hjelp med både flyttevask, rengjøring og overtakelse av boligen.
            </p>
            <p>
              Vi har erfart hvor stor forskjell det er mellom ulike flyttebyråer og rengjøringsfirma. Noen leverer høy kvalitet, møter opp til avtalt tid og gjør jobben skikkelig. Andre lover mer enn de klarer å holde.
            </p>
            <p>
              Gjennom erfaring fra både flytting og flyttevask lærte vi hva som faktisk betyr noe for kundene: tydelige priser, god kommunikasjon, pålitelig oppfølging og tjenester som holder det de lover.
            </p>
            <p>
              Vi vet også hvor viktig det er at flyttevasken blir godkjent ved overtakelse. Derfor ønsket vi å gjøre det enklere å finne seriøse aktører innen flytting, rengjøring og flyttevask i Trøndelag. Velgtilbud ble laget for å hjelpe kunder med å sammenligne kvalitetssikrede firma på ett sted — enkelt, trygt og uforpliktende.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title mb-3">Hva vi står for</h2>
            <p className="section-subtitle mb-10">
              Vi mener at en god tjeneste ikke bare handler om å sende kunden videre til hvem som helst. Det handler om å koble kunden med aktører som har mulighet til å levere en god jobb.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {values.map((v) => (
                <div key={v} className="flex items-start gap-3 bg-offwhite rounded-xl px-5 py-4 border border-sand/20">
                  <CheckCircle2 className="w-4 h-4 text-sand flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-navy font-medium">{v}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-greige leading-relaxed">
              Vi vet at pris er viktig. Men vi vet også at det billigste tilbudet ikke alltid er det beste. Derfor ønsker vi å hjelpe kunden med å se helheten før de velger.
            </p>
          </div>
        </div>
      </section>


    </div>
  )
}
