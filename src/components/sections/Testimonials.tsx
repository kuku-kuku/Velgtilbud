const testimonials = [
  { name: 'Maren Haugen',    location: 'Trondheim',    rating: 5, text: 'Fikk 4 tilbud på under én time og valgte et flyttebyrå i Trondheim som var 30% billigere enn hva jeg fant på egenhånd. Anbefales!', initials: 'MH', bg: 'bg-navy' },
  { name: 'Kristoffer Dahl', location: 'Trondheim',    rating: 5, text: 'Bestilte flyttevask via Velgtilbud. Selskapet gjorde en upåklagelig jobb og utleier godkjente alt på første forsøk. Veldig enkelt!', initials: 'KD', bg: 'bg-taupe' },
  { name: 'Astrid Lund',     location: 'Trondheim',    rating: 5, text: 'Kombinerte flytting og rengjøring — samme selskap tok seg av begge. Spart tid og penger. Helt klart verdt det.', initials: 'AL', bg: 'bg-sage' },
  { name: 'Per Eriksen',     location: 'Trondheim',    rating: 5, text: 'Rask respons og gode priser på kontorflytting. Selskapet vi valgte leverte godt over forventning.', initials: 'PE', bg: 'bg-greige' },
  { name: 'Ingrid Bakke',    location: 'Trondheim',    rating: 5, text: 'Fikk tilbud på utvask i Trondheim innen én time. Fikk hele depositumet tilbake. Kan ikke anbefales nok.', initials: 'IB', bg: 'bg-navy' },
  { name: 'Thomas Berg',     location: 'Trondheim',    rating: 5, text: 'Spare tid og penger — det er det dette handler om. Superenkel prosess fra start til slutt.', initials: 'TB', bg: 'bg-taupe' },
]

export default function Testimonials() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-12">
          <h2 className="section-title">Hva kundene sier om Velgtilbud</h2>
          <p className="text-sm text-greige pb-1 flex-shrink-0">
            <span className="font-bold text-navy">4.8 / 5</span> · 2 840 anmeldelser
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-offwhite rounded-2xl p-6 border border-sand/20 hover:border-sand/40 transition-colors flex flex-col">
              <p className="text-navy text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
              <div className="flex items-center justify-between pt-4 border-t border-sand/20">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${t.bg} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-greige">{t.location}</p>
                  </div>
                </div>
                <p className="text-xs text-sand">{'★'.repeat(t.rating)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
