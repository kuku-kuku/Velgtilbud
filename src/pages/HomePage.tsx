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
        <meta property="og:image" content="https://velgtilbud.no/og-image.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Velgtilbud",
          "description": "Trondheims ledende markedsplass for flytting og rengjøring. Sammenlign tilbud fra godkjente selskaper gratis og uforpliktende.",
          "url": "https://velgtilbud.no",
          "email": "post@velgtilbud.no",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Trondheim",
            "addressCountry": "NO"
          },
          "areaServed": {
            "@type": "City",
            "name": "Trondheim"
          },
          "serviceType": ["Flyttebyrå", "Rengjøringsfirma", "Flyttevask", "Flyttehjelp", "Kontorflytting"],
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
