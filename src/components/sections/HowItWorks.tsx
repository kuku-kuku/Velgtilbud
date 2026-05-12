const steps = [
  {
    number: '01',
    title: 'Fyll ut skjemaet',
    description: 'Fortell oss hva du trenger hjelp med — tar under 2 minutter. Ingen binding, ingen kostnad.',
  },
  {
    number: '02',
    title: 'Motta tilbud',
    description: 'Opptil 5 godkjente flyttebyråer i Trondheim sender deg sine beste priser innen 2 timer.',
  },
  {
    number: '03',
    title: 'Velg det beste',
    description: 'Sammenlign tilbud og anmeldelser. Du bestemmer selv hvem du vil bruke — vi forplikter deg ikke.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Slik fungerer det</h2>
          <p className="section-subtitle">Én forespørsel. Opptil fem tilbud. Du velger.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-sand/30 flex flex-col gap-5">
              <div className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">{step.number}</span>
              </div>
              <div>
                <h3 className="font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm text-greige leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
