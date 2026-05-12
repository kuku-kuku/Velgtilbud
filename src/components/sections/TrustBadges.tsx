const badges = [
  { num: '01', title: 'Godkjente selskaper', text: 'Alle byråer er verifisert, forsikret og vurdert av kunder.' },
  { num: '02', title: 'Rask respons',         text: 'Opptil 5 tilbud innen 2 timer — også på Trondheims travleste dager.' },
  { num: '03', title: 'Kvalitetskontroll',   text: 'Vi overvåker alle selskaper kontinuerlig og fjerner de som ikke holder mål.' },
  { num: '04', title: '100% gratis',          text: 'Tjenesten er alltid gratis for deg. Ingen skjulte kostnader.' },
  { num: '05', title: 'Ingen forpliktelse',   text: 'Du velger fritt blant tilbudene. Ingen kontrakt med oss.' },
  { num: '06', title: 'Norsk kundeservice',   text: 'Vi er tilgjengelige mandag til lørdag på telefon og e-post.' },
]

export default function TrustBadges() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Din trygghet er vår prioritet</h2>
          <p className="section-subtitle">Vi gjør det enkelt og trygt å finne riktig flyttebyrå i Trondheim.</p>
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
