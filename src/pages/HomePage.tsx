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
