const stats = [
  { value: '12 000+', label: 'Fornøyde kunder' },
  { value: '350+',    label: 'Godkjente selskaper' },
  { value: '4.8 / 5', label: 'Gjennomsnittsvurdering' },
  { value: '< 2 t',   label: 'Responstid' },
]

export default function Stats() {
  return (
    <section className="bg-sand/30 py-16">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-sand/40">
          {stats.map((stat) => (
            <div key={stat.label} className="px-8 text-center">
              <div className="text-4xl font-bold text-navy mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-greige uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
