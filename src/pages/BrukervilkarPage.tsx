import { Helmet } from 'react-helmet-async'

const sections = [
  {
    number: '1.',
    title: 'Om tjenesten',
    content: `Velgtilbud.no er en gratis tjeneste som hjelper privatpersoner og bedrifter med å innhente tilbud fra relevante flytte- og rengjøringsselskaper.

Ved å sende inn en forespørsel samtykker du til at opplysningene dine deles med aktuelle samarbeidspartnere. Du kan motta tilbud fra opptil 5 selskaper.`,
  },
  {
    number: '2.',
    title: 'Kontakt mellom kunde og leverandør',
    content: `Etter at forespørselen er sendt inn, kan du bli kontaktet via telefon, e-post eller SMS av selskaper som ønsker å gi deg et tilbud.

Velgtilbud.no formidler kun kontakten mellom kunde og leverandør. Eventuelle avtaler inngås direkte mellom deg og selskapet du velger.`,
  },
  {
    number: '3.',
    title: 'Ansvar',
    content: `Velgtilbud.no kan ikke garantere at du mottar tilbud, eller at tilbudene er markedets beste eller billigste.

Vi samarbeider med kvalitetssikrede aktører, men er ikke ansvarlige for tjenester, priser, kvalitet, levering eller andre forhold knyttet til avtalen mellom kunde og leverandør.`,
  },
  {
    number: '4.',
    title: 'Bruk av tjenesten',
    content: `Det er ikke tillatt å misbruke tjenesten, sende falske forespørsler eller forsøke å få tilgang til systemer eller informasjon som ikke er offentlig tilgjengelig.`,
  },
  {
    number: '5.',
    title: 'Personvern',
    content: `Opplysningene du sender inn brukes for å formidle forespørselen til relevante selskaper og for å administrere tjenesten.

Behandling av personopplysninger skjer i henhold til gjeldende personvernlovgivning (GDPR). Les vår fullstendige personvernerklæring på velgtilbud.no/personvern.`,
  },
  {
    number: '6.',
    title: 'Endringer',
    content: `Velgtilbud.no kan oppdatere disse brukervilkårene ved behov. Oppdatert versjon vil alltid være tilgjengelig på nettsiden.`,
  },
  {
    number: '7.',
    title: 'Kontakt',
    content: `Har du spørsmål om tjenesten eller ønsker å få slettet opplysninger, kan du kontakte oss på:\n\npost@velgtilbud.no`,
  },
  {
    number: '8.',
    title: 'Lovvalg',
    content: `Bruk av Velgtilbud.no er underlagt norsk lov. Eventuelle tvister skal søkes løst i minnelighet.`,
  },
]

export default function BrukervilkarPage() {
  return (
    <div className="page-enter">
      <Helmet>
        <title>Brukervilkår – Velgtilbud.no</title>
        <meta name="description" content="Les brukervilkårene for Velgtilbud.no — vilkår for bruk av tjenesten, ansvarsbegrensning og kontaktinformasjon." />
        <link rel="canonical" href="https://velgtilbud.no/brukervilkar" />
      </Helmet>

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, rgba(14,29,45,0.97) 0%, rgba(14,29,45,0.88) 50%, rgba(14,29,45,0.70) 100%), url('/hero.webp') 28% center / cover no-repeat` }}
        />
        <div className="container-wide py-20 relative z-10">
          <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-4">Juridisk</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Brukervilkår for<br className="hidden sm:block" /> Velgtilbud.no
          </h1>
          <p className="text-white/60 text-base max-w-xl">
            Ved å bruke Velgtilbud.no godtar du vilkårene nedenfor. Les dem nøye før du sender inn en forespørsel.
          </p>
          <p className="text-white/30 text-xs mt-6">Sist oppdatert: 29.05.2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-offwhite py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          <div className="flex flex-col gap-6">
            {sections.map((s) => (
              <div key={s.number} className="bg-white rounded-2xl px-8 py-7 shadow-sm border border-sand/30">
                <h2 className="text-base font-bold text-navy mb-3">
                  {s.number} {s.title}
                </h2>
                <p className="text-greige text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
