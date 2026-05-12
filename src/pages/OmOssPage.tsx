import { CheckCircle2, Quote } from 'lucide-react'
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
  { year: 'For 20+ år siden', text: 'Alt som fantes av eiendeler fikk plass i baksetet på en Toyota Celica fra 1992.' },
  { year: 'Første tanke', text: 'Etter at sjefen betalte 18 000 kr for en lokal flyttejobb tenkte vi: dette kan vi gjøre bedre.' },
  { year: '14 år i bransjen', text: 'Oppstart av eget flyttebyrå — og etter hvert rengjøringsbyrå og flyttevask.' },
  { year: 'I dag', text: 'Velgtilbud ble til. Én enkel tjeneste der kunden sender én forespørsel og mottar tilbud fra relevante aktører.' },
]

export default function OmOssPage() {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="bg-navy">
        <div className="container-wide pt-14 pb-14 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="pt-6 pb-14 lg:pb-20">
              <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">Om oss</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                Bygget på ekte{' '}
                <span className="text-sand">bransjeerfaring</span>
              </h1>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Velgtilbud ble startet av folk med erfaring fra både flyttebyrå og rengjøringsbyrå — fordi vi visste at det var mulig å gjøre dette bedre.
              </p>
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
          <h2 className="section-title mb-4">Hvem er vi?</h2>
          <div className="space-y-4 text-greige leading-relaxed">
            <p>
              Mange som skal flytte, trenger flyttevask, privat rengjøring eller annen hjelp, vet ikke alltid hva de bør se etter. Prisene varierer mye, kvaliteten varierer mye, og det kan være vanskelig å vite hvilke aktører som faktisk er seriøse.
            </p>
            <p>
              Derfor laget vi Velgtilbud — en enkel tjeneste hvor kunder kan innhente tilbud fra relevante aktører, sammenligne alternativer og velge det tilbudet som passer best.
            </p>
            <p className="font-semibold text-navy">
              Målet vårt er ikke bare at kunden skal finne lavest mulig pris. Målet er at kunden skal finne riktig aktør til riktig pris.
            </p>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-offwhite py-14">
        <div className="container-wide max-w-3xl mx-auto">
          <div className="bg-navy rounded-2xl px-8 py-10 flex gap-6 items-start">
            <Quote className="w-8 h-8 text-sand flex-shrink-0 mt-1" />
            <div>
              <p className="text-white text-lg md:text-xl font-medium leading-relaxed mb-4">
                Svaret var 18 000 kroner. For meg hørtes det voldsomt ut. Min første tanke var at dette kunne jeg gjort for 6 000 kroner.
              </p>
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
            Fra en Toyota Celica med alt på baksetet til 14 år i bransjen — og til slutt Velgtilbud.
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
              Etter hvert ble rengjøring og flyttevask en naturlig del av virksomheten. Når folk flytter, trenger mange ikke bare hjelp til selve flyttejobben — de trenger også flyttevask, nedvask eller annen rengjøring i forbindelse med overtakelse.
            </p>
            <p>
              Vi lærte hvor viktig det er at flyttevasken blir godkjent. Vi lærte hva som kreves for at boligen skal være klar til overtakelse. Vi lærte også hvor frustrerende det kan være for kunden dersom rengjøringen ikke holder mål.
            </p>
            <p>
              Gjennom mange år i bransjen har vi sett hvor stor forskjell det er mellom ulike aktører. Noen er punktlige, ryddige og profesjonelle. Andre lover mer enn de klarer å levere.
            </p>
            <p>
              Vi vet hvor viktig god kommunikasjon er. Vi vet hvor viktig det er å møte opp til avtalt tid. Vi vet hvor viktig det er at prisene er tydelige, at kunden forstår hva som er inkludert, og at jobben faktisk blir gjort skikkelig.
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
