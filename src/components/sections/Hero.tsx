import RotatingText from '@/components/ui/RotatingText'
import LeadForm from '@/components/ui/LeadForm'

export default function Hero() {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container-wide relative z-10 pt-14 pb-8 lg:pb-0">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — copy */}
          <div className="pt-6 pb-14 lg:pb-20">
            <p className="text-sand text-xs font-semibold uppercase tracking-[0.2em] mb-6">
              Trondheims ledende markedsplass
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Finn beste{' '}
              <span className="text-sand">flyttebyrå</span>
              {' '}i Trondheim
            </h1>

            <div className="min-h-[1.6rem] mb-8">
              <RotatingText className="text-white/50 text-lg" />
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-sm">
              Vi sender deg tilbud på{' '}
              <span className="text-white/70">flytting i Trondheim</span>{' '}
              fra opptil 5 godkjente byråer. Sammenlign og velg.
            </p>

            <div className="flex flex-col gap-2 text-sm text-white/40">
              {['100% gratis å bruke', 'Ingen binding — avslå fritt', 'Opptil 5 tilbud fra godkjente selskaper'].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <span className="w-1 h-1 rounded-full bg-sand flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:self-center">
            <div id="hero-form" className="bg-white rounded-2xl shadow-2xl shadow-black/20 px-7 py-8">
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
