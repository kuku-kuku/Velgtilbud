import { CheckCircle2, Check, Quote } from 'lucide-react'
import LeadForm from '@/components/ui/LeadForm'

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
  { year: 'For over 20 år siden', text: 'Flyttelasset vårt fikk plass i baksetet på en Toyota Celica da vi flyttet til Trondheim. Det ble starten på en lang reise i flyttebransjen.' },
  { year: 'Den første tanken', text: 'Da vi så at en lokal flyttejobb kostet 18 000 kroner, tenkte vi: «Dette må kunne gjøres enklere, tryggere og til en mer riktig pris.»' },
  { year: 'Mange år i bransjen', text: 'Gjennom årene bygget vi erfaring fra både flyttebyrå, flyttevask og rengjøring. Vi lærte hvordan bransjen fungerer — både for kundene og selskapene.' },
  { year: 'I dag', text: 'Velgtilbud ble startet for å gjøre det enklere å finne seriøse flyttebyråer og rengjøringsfirma i Trondheim. Kunden sender én forespørsel og mottar flere relevante tilbud på ett sted.' },
]

export default function OmOssPage() {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/hero.webp') 28% center / cover no-repeat` }} />
        <div className="container-wide pt-14 pb-14 lg:pb-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Om oss</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Bygget på erfaring fra flytte- og{' '}
                <span className="text-sand">rengjøringsbransjen</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed mb-2 max-w-md">
                Velgtilbud ble startet for å gjøre det enklere å finne seriøse flyttebyråer og rengjøringsfirma i Trondheim. Plattformen er utviklet av personer med erfaring fra både flytting og rengjøring — med fokus på kvalitet, trygghet og en enklere prosess for kunden.
              </p>
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-md">
                Vi vet hvor vanskelig det kan være å finne pålitelige firma, sammenligne priser og få raske svar. Derfor samler vi kvalitetssikrede bedrifter på ett sted, slik at privatpersoner og bedrifter enkelt kan innhente og sammenligne tilbud.
              </p>
              <div className="flex flex-col gap-2">
                {[
                  'Erfaring fra flytte- og rengjøringsbransjen',
                  'Fokus på kvalitetssikrede bedrifter',
                  'Gratis og uforpliktende å bruke',
                  'Enklere måte å sammenligne tilbud i Trondheim',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-white/50">
                    <Check className="w-3.5 h-3.5 text-sand flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:self-center">
              <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-7 py-8">
                <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Kom i gang</p>
                <h2 className="text-xl font-bold text-navy mb-6">Få gratis tilbud nå</h2>
                <LeadForm defaultService="flytting" />
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
              Velgtilbud er en tjeneste som gjør det enklere å finne seriøse flyttebyråer og rengjøringsfirma i Trondheim. Mange opplever at det er vanskelig å vite hvilke aktører som tilbyr god kvalitet, riktige priser og pålitelig service — spesielt når markedet er fullt av ulike alternativer.
            </p>
            <p>
              Vi startet Velgtilbud for å gjøre prosessen tryggere, enklere og mer oversiktlig. På plattformen kan privatpersoner og bedrifter sende inn én forespørsel og motta tilbud fra relevante og kvalitetssikrede firma innen flytting, flyttevask og rengjøring.
            </p>
            <p className="font-semibold text-navy">
              Målet vårt er ikke bare å hjelpe kunder med å finne en lav pris — men å finne riktig firma til riktig pris.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {[
              'Sammenlign tilbud fra flere firma på ett sted',
              'Fokus på kvalitet, trygghet og seriøse aktører',
              'Gratis og uforpliktende å bruke',
              'Enklere måte å finne flytte- og rengjøringstjenester i Trondheim',
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
          <div className="bg-navy rounded-2xl px-8 py-10 flex gap-6 items-start">
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
              Vi vet også hvor viktig det er at flyttevasken blir godkjent ved overtakelse. Derfor ønsket vi å gjøre det enklere å finne seriøse aktører innen flytting, rengjøring og flyttevask i Trondheim. Velgtilbud ble laget for å hjelpe kunder med å sammenligne kvalitetssikrede firma på ett sted — enkelt, trygt og uforpliktende.
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
