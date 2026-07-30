const badges = [
  { num: '01', title: 'Kvalitetssikrede leverandører', text: 'Vi samarbeider kun med seriøse og kvalitetssikrede leverandører som oppfyller våre krav.' },
  { num: '02', title: 'Vi gjør jobben for deg',        text: 'Vi gjør jobben for deg — innhenter og forhandler tilbud, slik at du slipper å bli kontaktet av flere selskaper og unngår uoversiktlige tilbud og skjulte overraskelser.' },
  { num: '03', title: 'Beste tilbud',                  text: 'Vi jobber for å sikre deg den beste kombinasjonen av pris, kvalitet og service.' },
  { num: '04', title: 'Helt gratis å bruke',           text: 'Det koster ingenting å benytte VelgTilbud. Du betaler kun dersom du velger å gå videre med et tilbud.' },
  { num: '05', title: 'Ingen binding',                 text: 'Du står fritt til å takke ja eller nei til tilbudet. Tjenesten er helt uforpliktende.' },
  { num: '06', title: 'Personlig oppfølging',          text: 'Vi følger deg gjennom prosessen og er tilgjengelige dersom du trenger hjelp eller har spørsmål.' },
]

export default function TrustBadges() {
  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Derfor velger kundene VelgTilbud</h2>
          <p className="section-subtitle">Vi innhenter og forhandler frem det beste tilbudet fra kvalitetssikrede leverandører — helt gratis og uforpliktende.</p>
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
