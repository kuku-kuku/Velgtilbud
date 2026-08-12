import { Users, ShieldCheck, Tag, ClipboardCheck } from 'lucide-react'

const stats = [
  { icon: Users,           value: '3 000+',   label: 'Fornøyde kunder' },
  { icon: ShieldCheck,     value: '40+',       label: 'Kvalitetssikrede firma' },
  { icon: Tag,             value: 'Gratis',    label: 'Å sammenligne' },
  { icon: ClipboardCheck,  value: '1 skjema',  label: 'Vi finner riktig firma' },
]

export default function Stats() {
  return (
    <section className="bg-sand/30 py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-5 sm:py-6 gap-2 sm:gap-3 border border-sand/40 rounded-xl">
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-greige/60 stroke-[1]" />
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy leading-none mb-1.5">
                  {value}
                </div>
                <div className="text-xs text-greige uppercase tracking-widest font-semibold">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
