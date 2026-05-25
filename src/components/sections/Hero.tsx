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

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              Finn beste flyttebyrå
              <br />i Trondheim
            </h1>

            <div className="min-h-[1.6rem] mb-4">
              <RotatingText className="text-white text-lg font-medium" />
            </div>

            <p className="text-white/80 text-base leading-relaxed mb-10 max-w-md">
              Vi sender deg tilbud på flytting i Trondheim fra opptil 5 godkjente byråer. Sammenlign og velg.
            </p>

            <div className="flex flex-col gap-3 text-sm text-white/80">
              {['100% gratis å bruke', 'Ingen binding — avslå fritt', 'Opptil 5 tilbud fra godkjente selskaper'].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div id="hero-form" className="bg-white/85 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/30 px-7 py-8">
              <p className="text-xs font-semibold text-greige uppercase tracking-widest mb-1">Gratis tilbud</p>
              <h2 className="text-xl font-bold text-navy mb-6">Få tilbud på flytting nå</h2>
              <LeadForm defaultService="flytting" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
