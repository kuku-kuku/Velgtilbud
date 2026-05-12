interface Props {
  title?: string
  subtitle?: string
}

export default function CTABanner({
  title   = 'Klar for å finne beste flyttebyrå i Trondheim?',
  subtitle = 'Fyll ut skjemaet — vi sender deg opptil 5 gratis tilbud fra godkjente selskaper innen 2 timer.',
}: Props) {
  return (
    <section className="bg-navy py-16 md:py-20">
      <div className="container-wide text-center max-w-2xl mx-auto">
        <p className="text-sand text-xs font-semibold uppercase tracking-widest mb-5">Kom i gang nå</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{title}</h2>
        <p className="text-white/40 leading-relaxed mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <div className="flex gap-2 p-1 bg-white/10 rounded-xl">
            {(['Flytting', 'Rengjøring'] as const).map((s) => (
              <div key={s} className="px-5 py-2.5 text-sm font-semibold text-white/50 rounded-lg">{s}</div>
            ))}
          </div>
          <p className="text-white/30 text-sm">← Bruk knappen nederst på siden</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-white/30">
          <span>Gratis å bruke</span>
          <span>·</span>
          <span>Ingen forpliktelse</span>
          <span>·</span>
          <span>Svar innen 2 timer</span>
        </div>
      </div>
    </section>
  )
}
