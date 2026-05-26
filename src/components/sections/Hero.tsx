import RotatingText from '@/components/ui/RotatingText'
import LeadForm from '@/components/ui/LeadForm'

export default function Hero() {
  return (
    <section className="bg-navy relative overflow-hidden min-h-screen flex flex-col justify-center -mt-16">
      {/* Background photo with zoom animation */}
      <div
        className="absolute inset-0 animate-hero-zoom"
        style={{
          background: `
            linear-gradient(to bottom, rgba(14,29,45,0.82) 0%, rgba(14,29,45,0.72) 100%),
            url('/hero.webp') center / cover no-repeat
          `,
        }}
      />

      <div className="container-wide relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-20 items-center">

          {/* Left — copy */}
          <div className="lg:pl-2">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Trondheims ledende markedsplass
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              Finn flyttebyrå og
              <br className="hidden md:block" />rengjøringsbyrå i Trondheim
            </h1>

            <div className="min-h-[1.6rem] mb-4">
              <RotatingText className="text-white text-lg font-medium" />
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-10 max-w-md">
              Send én forespørsel – motta tilbud fra flere kvalitetssikrede bedrifter. Sammenlign priser, tjenester og velg det som passer deg best.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { title: 'Raskt svar',                      desc: 'Alle henvendelser besvares raskt' },
                { title: 'Kun godkjente bedrifter',         desc: 'Vi samarbeider med seriøse og pålitelige aktører' },
                { title: 'Enkelt, gratis og uforpliktende', desc: 'Helt gratis å sende forespørsel – uten forpliktelser' },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-sand flex-shrink-0 mt-1.5" />
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wide leading-none mb-0.5">{title}</p>
                    <p className="text-sm text-white/50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div id="hero-form" className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 px-7 py-8">
              <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Gratis tilbud</p>
              <h2 className="text-xl font-bold text-navy mb-6">Få gratis tilbud på flytting og rengjøring</h2>
              <LeadForm defaultService="flytting" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
