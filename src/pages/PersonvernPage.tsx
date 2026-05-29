import { Helmet } from 'react-helmet-async'

const sections = [
  {
    title: 'Hvem er ansvarlig?',
    content: `Velgtilbud.no drives av:

VÆRNES MULTISERVICE AS
Org.nr: 935 830 621
Ranheimsvegen 199 B, 7055 Ranheim
E-post: post@velgtilbud.no / post@vaernesmultiservice.no
Telefon: 972 77 276`,
  },
  {
    title: 'Hvilke opplysninger samler vi inn?',
    content: `Når du sender inn en forespørsel på Velgtilbud.no, kan vi samle inn:

• Navn
• Telefonnummer
• E-postadresse
• Adresse
• Opplysninger om oppdraget ditt

Disse opplysningene er nødvendige for at relevante leverandører skal kunne gi deg et tilbud.`,
  },
  {
    title: 'Hvordan bruker vi opplysningene?',
    content: `Opplysningene dine brukes kun for å:

• Formidle forespørselen din til aktuelle leverandører
• Hjelpe deg med å motta tilbud
• Administrere og forbedre tjenesten vår

Ved å sende inn en forespørsel samtykker du til at du kan bli kontaktet av opptil 5 selskaper via telefon, e-post eller SMS.`,
  },
  {
    title: 'Deling av opplysninger',
    content: `Vi deler kun opplysningene dine med relevante samarbeidspartnere som kan levere tjenestene du etterspør.

Vi selger aldri personopplysninger til tredjeparter.`,
  },
  {
    title: 'Lagring av opplysninger',
    content: `Personopplysningene dine lagres kun så lenge det er nødvendig for å levere tjenesten og oppfylle våre lovpålagte forpliktelser.`,
  },
  {
    title: 'Informasjonskapsler (cookies)',
    content: `Velgtilbud.no bruker informasjonskapsler for å forbedre brukeropplevelsen, analysere trafikk og sikre at nettsiden fungerer som den skal.

Du kan når som helst endre eller trekke tilbake samtykket ditt til informasjonskapsler via nettleseren din.`,
  },
  {
    title: 'Dine rettigheter',
    content: `Du har rett til å:

• Be om innsyn i opplysningene vi har om deg
• Få rettet feilaktige opplysninger
• Be om sletting av opplysninger
• Trekke tilbake samtykke

For spørsmål om personvern eller sletting av opplysninger, kontakt oss på:

post@velgtilbud.no`,
  },
]

export default function PersonvernPage() {
  return (
    <div className="page-enter">
      <Helmet>
        <title>Personvern og informasjonskapsler – Velgtilbud</title>
        <meta name="description" content="Les om hvordan Velgtilbud behandler dine personopplysninger, hvilke data vi samler inn og hvilke rettigheter du har som bruker." />
        <link rel="canonical" href="https://velgtilbud.no/personvern" />
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
            Personvern og<br className="hidden sm:block" /> informasjonskapsler
          </h1>
          <p className="text-white/60 text-base max-w-xl">
            Velgtilbud.no tar personvernet ditt på alvor. Denne siden forklarer hvordan vi samler inn, bruker og beskytter personopplysningene dine.
          </p>
          <p className="text-white/30 text-xs mt-6">Sist oppdatert: 29.05.2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-offwhite py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          <div className="flex flex-col gap-6">
            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl px-8 py-7 shadow-sm border border-sand/30">
                <h2 className="text-base font-bold text-navy mb-3">{s.title}</h2>
                <p className="text-greige text-sm leading-relaxed whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
