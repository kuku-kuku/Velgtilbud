import { Helmet } from 'react-helmet-async'

const sections = [
  {
    title: 'Hvem er vi?',
    content: `Velgtilbud er en norsk markedsplass som kobler privatpersoner og bedrifter i Trondheim med godkjente flyttebyråer og rengjøringsfirma. Vi drives av Velgtilbud AS og er tilgjengelige på velgtilbud.no.

Har du spørsmål om hvordan vi behandler dine personopplysninger, kan du kontakte oss på:

E-post: post@velgtilbud.no`,
  },
  {
    title: 'Hvilke opplysninger samler vi inn?',
    content: `Når du sender en forespørsel gjennom vårt skjema, samler vi inn følgende opplysninger:

• Navn
• Telefonnummer
• E-postadresse
• Nåværende og/eller ny adresse
• Detaljer om boligen (størrelse, etasje, type)
• Ønsket dato og eventuell fleksibilitet
• Type tjeneste (flytte, rengjøring eller begge)
• Eventuelle kommentarer du selv legger til

Vi samler kun inn det som er nødvendig for at samarbeidspartnere skal kunne gi deg et relevant og riktig tilbud.`,
  },
  {
    title: 'Hvorfor samler vi inn disse opplysningene?',
    content: `Vi behandler opplysningene dine for å:

• Sende din forespørsel til aktuelle og kvalitetssikrede samarbeidspartnere i Trondheim
• Sikre at tilbudene du mottar er tilpasset din konkrete situasjon
• Forbedre tjenesten vår og brukeropplevelsen på nettsiden

Det juridiske grunnlaget for behandlingen er GDPR artikkel 6 nr. 1 bokstav b (oppfyllelse av avtale) og artikkel 6 nr. 1 bokstav f (berettiget interesse i å gi deg relevante tilbud fra godkjente aktører).`,
  },
  {
    title: 'Hvem deler vi opplysningene med?',
    content: `Opplysningene du oppgir deles med de samarbeidspartnerne som er best egnet til å hjelpe deg. Det kan dreie seg om ett eller flere kvalitetssikrede flyttebyråer og/eller rengjøringsfirma i Trondheim-regionen.

Disse firmaene bruker opplysningene utelukkende til å utarbeide og sende deg et tilbud. De har ikke lov til å bruke opplysningene til markedsføring eller videresalg uten ditt samtykke.

Vi selger aldri personopplysninger til tredjeparter.`,
  },
  {
    title: 'Hvor lenge lagrer vi opplysningene?',
    content: `Vi lagrer opplysningene dine så lenge det er nødvendig for å oppfylle formålet de ble samlet inn for. Som hovedregel sletter vi opplysningene innen seks måneder etter at forespørselen ble sendt, med mindre annet følger av lovpålagte lagringsplikt.`,
  },
  {
    title: 'Informasjonskapsler (cookies)',
    content: `Nettsiden vår bruker informasjonskapsler for å forbedre brukeropplevelsen og analysere trafikk. Vi benytter blant annet Google Analytics for å forstå hvordan besøkende bruker siden.

Du kan når som helst trekke tilbake samtykket til informasjonskapsler ved å endre innstillingene i nettleseren din. Merk at dette kan påvirke funksjonaliteten på nettsiden.`,
  },
  {
    title: 'Dine rettigheter',
    content: `I henhold til personvernforordningen (GDPR) har du følgende rettigheter:

• Innsyn – du kan be om å få se hvilke opplysninger vi har lagret om deg
• Retting – du kan be oss om å rette opp feilaktige opplysninger
• Sletting – du kan be oss om å slette opplysningene dine, med mindre vi er lovpålagt å bevare dem
• Begrensning – du kan be om at behandlingen av opplysningene dine begrenses
• Dataportabilitet – du kan be om å motta opplysningene dine i et maskinlesbart format
• Innsigelse – du kan protestere mot behandling som er basert på berettiget interesse

For å benytte deg av disse rettighetene, ta kontakt med oss på post@velgtilbud.no. Vi svarer innen 30 dager.`,
  },
  {
    title: 'Klage til Datatilsynet',
    content: `Dersom du mener vi behandler personopplysningene dine i strid med regelverket, har du rett til å klage til Datatilsynet.

Datatilsynet
Postboks 458 Sentrum
0105 Oslo
postkasse@datatilsynet.no
www.datatilsynet.no`,
  },
  {
    title: 'Endringer i personvernerklæringen',
    content: `Vi forbeholder oss retten til å oppdatere denne personvernerklæringen ved behov. Vesentlige endringer vil varsles tydelig på nettsiden. Datoen for siste oppdatering er angitt nederst på siden.`,
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
            Her finner du informasjon om hvordan Velgtilbud samler inn, bruker og beskytter dine personopplysninger.
          </p>
          <p className="text-white/30 text-xs mt-6">Sist oppdatert: mai 2025</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-offwhite py-16 md:py-20">
        <div className="container-wide max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl px-8 py-8 shadow-sm border border-sand/30">
                <h2 className="text-lg font-bold text-navy mb-4">{s.title}</h2>
                <div className="text-greige text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
