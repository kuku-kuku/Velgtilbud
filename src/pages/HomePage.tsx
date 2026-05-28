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
        <title>Velgtilbud – Finn Beste Flyttebyrå og Rengjøringsfirma i Trondheim</title>
        <meta name="description" content="Sammenlign gratis tilbud fra de beste flyttebyråene og rengjøringsfirmaene i Trondheim. Send én forespørsel og motta tilbud fra opptil 5 godkjente selskaper. Gratis og uforpliktende." />
        <link rel="canonical" href="https://velgtilbud.no/" />
        <meta property="og:title" content="Velgtilbud – Finn Beste Flyttebyrå og Rengjøringsfirma i Trondheim" />
        <meta property="og:description" content="Sammenlign gratis tilbud fra de beste flyttebyråene og rengjøringsfirmaene i Trondheim. Gratis og uforpliktende." />
        <meta property="og:url" content="https://velgtilbud.no/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Velgtilbud",
          "description": "Trondheims ledende markedsplass for flytting og rengjøring. Sammenlign tilbud fra godkjente selskaper gratis og uforpliktende.",
          "url": "https://velgtilbud.no",
          "email": "post@velgtilbud.no",
          "areaServed": {
            "@type": "City",
            "name": "Trondheim"
          },
          "serviceType": ["Flyttebyrå", "Rengjøringsfirma", "Flyttevask"],
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
