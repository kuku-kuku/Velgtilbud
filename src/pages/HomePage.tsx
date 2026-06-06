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
        <title>Flyttebyrå Trøndelag – Få tilbud fra godkjente flyttebyråer | Velgtilbud</title>
        <meta name="description" content="Skal du flytte i Trøndelag? Velgtilbud.no hjelper deg å motta tilbud fra godkjente flyttebyråer og sammenligne pris, kvalitet og tilgjengelighet. Gratis og uforpliktende." />
        <meta name="keywords" content="flyttebyrå Trøndelag, flyttevask Trøndelag, flyttehjelp Trøndelag, få tilbud på flytting, sammenligne flyttebyrå, rengjøringsbyrå Trøndelag, tilbud på flyttevask" />
        <link rel="canonical" href="https://velgtilbud.no/" />
        <meta name="google-site-verification" content="_QfH5f_duK2p6rMPApBcV8blMxk1kGMpAdfcP3d9mSg" />
        <meta property="og:title" content="Flyttebyrå Trøndelag – Få tilbud fra godkjente flyttebyråer | Velgtilbud" />
        <meta property="og:description" content="Skal du flytte i Trøndelag? Motta tilbud fra godkjente flyttebyråer og sammenligne pris, kvalitet og tilgjengelighet. Gratis og uforpliktende." />
        <meta property="og:url" content="https://velgtilbud.no/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Velgtilbud",
          "description": "Trøndelags ledende markedsplass for flytting og rengjøring. Sammenlign tilbud fra godkjente selskaper gratis og uforpliktende.",
          "url": "https://velgtilbud.no",
          "email": "post@velgtilbud.no",
          "areaServed": {
            "@type": "City",
            "name": "Trøndelag"
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
