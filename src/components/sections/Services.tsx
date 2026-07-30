import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'

const cards = [
  {
    tag: 'Privatpersoner',
    href: '/privatpersoner',
    title: 'Flytting og rengjøring til best mulig pris',
    body: 'Vi innhenter tilbud fra kvalitetssikrede leverandører og forhandler på dine vegne, slik at du får den beste løsningen til riktig pris – helt kostnadsfritt.',
    items: ['Vi innhenter tilbudene', 'Vi forhandler for deg', 'Kvalitetssikrede leverandører', 'Gratis og uforpliktende'],
    cta: 'Få ditt tilbud som privatkunde',
    bg: 'bg-navy',
    accent: 'text-sand',
    check: 'text-sand',
    link: 'bg-white/10 hover:bg-white/20 text-white',
  },
  {
    tag: 'Bedrifter',
    href: '/bedrifter',
    title: 'Skreddersydde løsninger for bedrifter',
    body: 'Vi finner den beste leverandøren for din bedrift og forhandler frem konkurransedyktige priser på flytting og renhold.',
    items: ['Flyttetjenester', 'Renholdstjenester', 'Konkurransedyktige priser', 'Én kontakt gjennom hele prosessen'],
    cta: 'Få tilbud til bedriften',
    bg: 'bg-taupe',
    accent: 'text-offwhite/70',
    check: 'text-offwhite/60',
    link: 'bg-white/10 hover:bg-white/20 text-white',
  },
]

export default function Services() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="mb-14">
          <h2 className="section-title">Vi finner det beste tilbudet for deg</h2>
          <p className="section-subtitle">Vi gjør jobben for deg ved å innhente og forhandle frem det beste tilbudet — helt gratis og uforpliktende.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-stretch">
          {cards.map((c) => (
            <div key={c.tag} className={`${c.bg} rounded-2xl overflow-hidden flex flex-col`}>
              <div className="px-8 pt-8 pb-6 flex flex-col flex-1">
                <p className={`text-xs font-semibold uppercase tracking-widest mb-4 ${c.accent}`}>{c.tag}</p>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{c.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{c.body}</p>
                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8 flex-1">
                  {c.items.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-white/70">
                      <Check className={`w-3.5 h-3.5 flex-shrink-0 ${c.check}`} />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  to={c.href}
                  className={`flex items-center justify-between w-full px-5 py-3 rounded-xl transition-colors group text-sm font-semibold mt-auto ${c.link}`}
                >
                  {c.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
