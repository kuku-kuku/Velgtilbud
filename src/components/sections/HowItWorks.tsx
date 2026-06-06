const steps = [
  {
    number: '01',
    title: 'Fyll ut skjemaet',
    description: 'Beskriv hva du trenger hjelp med innen flytting eller rengjøring i Trøndelag. Det tar kun 2 minutter å sende inn forespørselen — helt gratis og uforpliktende.',
  },
  {
    number: '02',
    title: 'Motta tilbud fra flere bedrifter',
    description: 'Vi matcher deg med opptil 5 kvalitetssikrede flyttebyråer og rengjøringsfirma i Trøndelag, som sender deg sine beste tilbud.',
  },
  {
    number: '03',
    title: 'Sammenlign og velg',
    description: 'Sammenlign priser, tjenester og kundeanmeldelser på ett sted. Velg firmaet som passer dine behov og budsjett best — uten binding.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Slik fungerer det</h2>
          <p className="section-subtitle">Én forespørsel. Flere tilbud. Du velger det som passer best.</p>
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
