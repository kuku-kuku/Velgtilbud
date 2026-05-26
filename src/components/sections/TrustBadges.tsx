const badges = [
  { num: '01', title: 'Kvalitetssikrede selskaper', text: 'Alle bedrifter på plattformen blir kontrollert og vurdert før de kan motta forespørsler fra kunder.' },
  { num: '02', title: 'Rask oppfølging',             text: 'Send inn én forespørsel og motta tilbud fra flere relevante firma så raskt som mulig.' },
  { num: '03', title: 'Trygg sammenligning',         text: 'Sammenlign priser, tjenester og kundeomtaler på ett sted før du velger firma.' },
  { num: '04', title: 'Helt gratis å bruke',         text: 'Det er gratis å sende forespørsel og motta tilbud — uten skjulte kostnader.' },
  { num: '05', title: 'Ingen binding',               text: 'Du bestemmer selv om du vil takke ja til et tilbud. Ingen forpliktelser eller bindingstid.' },
  { num: '06', title: 'Norsk kundeservice',          text: 'Vi hjelper deg dersom du har spørsmål underveis i prosessen.' },
]

export default function TrustBadges() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Din trygghet er vår prioritet</h2>
          <p className="section-subtitle">Vi gjør det enkelt, trygt og gratis å finne kvalitetssikrede flyttebyråer og rengjøringsfirma i Trondheim.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div key={b.num} className="bg-white rounded-2xl p-6 border border-sand/30 hover:border-sand/60 transition-colors">
              <span className="text-xs font-bold text-sand tracking-widest block mb-3">{b.num}</span>
              <h3 className="font-bold text-navy mb-2">{b.title}</h3>
              <p className="text-sm text-greige leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
