import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import HowItWorks from '@/components/sections/HowItWorks'
import Services from '@/components/sections/Services'
import TrustBadges from '@/components/sections/TrustBadges'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>Flyttebyrå Trondheim – Gratis tilbud fra godkjente flyttebyråer | Velgtilbud</title>
        <meta name="description" content="Skal du flytte i Trondheim? Velgtilbud.no gir deg gratis tilbud fra godkjente flyttebyråer og rengjøringsfirma. Sammenlign pris og kvalitet – enkelt og uforpliktende." />
        <meta name="keywords" content="flyttebyrå Trondheim, flyttevask Trondheim, flyttehjelp Trondheim, rengjøringsbyrå Trondheim, flyttefirma Trondheim, tilbud på flytting Trondheim, sammenligne flyttebyrå" />
        <link rel="canonical" href="https://velgtilbud.no/" />
        <meta name="google-site-verification" content="_QfH5f_duK2p6rMPApBcV8blMxk1kGMpAdfcP3d9mSg" />
        <meta property="og:title" content="Flyttebyrå Trondheim – Gratis tilbud fra godkjente flyttebyråer | Velgtilbud" />
        <meta property="og:description" content="Skal du flytte i Trondheim? Motta gratis tilbud fra godkjente flyttebyråer og rengjøringsfirma. Sammenlign og velg det beste – helt uforpliktende." />
        <meta property="og:url" content="https://velgtilbud.no/" />
        <meta property="og:image" content="https://velgtilbud.no/logo.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Velgtilbud",
          "description": "Trondheims ledende markedsplass for flytting og rengjøring. Sammenlign gratis tilbud fra godkjente flyttebyråer og rengjøringsfirma i Trondheim.",
          "url": "https://velgtilbud.no",
          "logo": "https://velgtilbud.no/logo.jpg",
          "image": "https://velgtilbud.no/logo.jpg",
          "email": "post@velgtilbud.no",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Trondheim",
            "addressRegion": "Trøndelag",
            "addressCountry": "NO"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 63.4305,
            "longitude": 10.3951
          },
          "areaServed": {
            "@type": "City",
            "name": "Trondheim"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Flytte- og rengjøringstjenester i Trondheim",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flyttebyrå Trondheim" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flyttevask Trondheim" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rengjøringsbyrå Trondheim" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Kontorflytting Trondheim" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Flyttehjelp Trondheim" } }
            ]
          },
          "priceRange": "Gratis",
          "inLanguage": "nb"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Velgtilbud",
          "url": "https://velgtilbud.no",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://velgtilbud.no/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Koster det noe å bruke Velgtilbud?",
              "acceptedAnswer": { "@type": "Answer", "text": "Du betaler ingen skjulte gebyrer eller ekstra kostnader for å bruke VelgTilbud. Vår megleravgift er allerede inkludert i tilbudet du mottar, slik at prisen du ser er den endelige prisen. Ingen overraskelser – full oversikt fra start til slutt." }
            },
            {
              "@type": "Question",
              "name": "Hvor raskt mottar jeg et tilbud?",
              "acceptedAnswer": { "@type": "Answer", "text": "Våre meglere starter behandlingen av forespørselen din så raskt som mulig. Avhengig av hvor i landet du bor og tjenesten du trenger, kan det ta alt fra ca. 2 timer til opptil 2 dager før du mottar et tilbud. Du blir varslet på e-post og SMS så snart tilbudet er klart." }
            },
            {
              "@type": "Question",
              "name": "Hvordan velger dere selskapene?",
              "acceptedAnswer": { "@type": "Answer", "text": "Vi godkjenner kun selskaper registrert i Brønnøysund med gyldig forsikring og gode referanser. Selskaper med dårlige anmeldelser fjernes." }
            },
            {
              "@type": "Question",
              "name": "Kan jeg få tilbud på både flytting og rengjøring?",
              "acceptedAnswer": { "@type": "Answer", "text": "Ja, mange selskaper tilbyr begge tjenester. Du kan be om kombinert tilbud på flytting og flyttevask i samme forespørsel." }
            },
            {
              "@type": "Question",
              "name": "Er jeg forpliktet til å velge et tilbud?",
              "acceptedAnswer": { "@type": "Answer", "text": "Absolutt ikke. Du kan sammenligne fritt og takke nei til alle tilbudene uten kostnad eller forklaring." }
            }
          ]
        })}</script>
      </Helmet>
      <Hero />
      <Stats />
      <HowItWorks />
      <Services />
      <TrustBadges />
      <Testimonials />
      <FAQ />
    </div>
  )
}
