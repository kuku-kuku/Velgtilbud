import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const faqs = [
  { q: 'Koster det noe å bruke Velgtilbud?',              a: 'Nei — tjenesten er helt gratis for deg. Selskapene betaler en liten formidlingsavgift. Du betaler kun til selskapet du velger.' },
  { q: 'Hvor raskt får jeg tilbud på flyttebyrå i Trøndelag?', a: 'De fleste mottar sine første tilbud innen 1–2 timer på hverdager. Du vil motta varsling på e-post og SMS.' },
  { q: 'Hvordan velger dere selskapene?',                    a: 'Vi godkjenner kun selskaper registrert i Brønnøysund med gyldig forsikring og gode referanser. Selskaper med dårlige anmeldelser fjernes.' },
  { q: 'Kan jeg få tilbud på både flytting og rengjøring?',  a: 'Ja, mange selskaper tilbyr begge tjenester. Du kan be om kombinert tilbud på flytting og flyttevask i samme forespørsel.' },
  { q: 'Er jeg forpliktet til å velge et tilbud?',           a: 'Absolutt ikke. Du kan sammenligne fritt og takke nei til alle tilbudene uten kostnad eller forklaring.' },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section-padding bg-offwhite">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="section-title mb-4">Vanlige spørsmål</h2>
            <p className="text-greige leading-relaxed">
              Lurer du på noe om prosessen med å finne flyttebyrå i Trøndelag? Her svarer vi på det vi oftest får spørsmål om.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={cn(
                  'rounded-xl border transition-all duration-300 ease-out overflow-hidden',
                  open === i 
                    ? 'border-sand/60 bg-white shadow-sm' 
                    : 'border-sand/20 bg-white hover:border-sand/40 hover:shadow-sm'
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200"
                >
                  <span className={cn(
                    'font-semibold text-sm transition-colors duration-200',
                    open === i ? 'text-navy' : 'text-navy/80'
                  )}>
                    {faq.q}
                  </span>
                  <ChevronDown className={cn(
                    'w-4 h-4 flex-shrink-0 transition-all duration-300 ease-out text-greige',
                    open === i && 'rotate-180 text-navy'
                  )} />
                </button>
                <div 
                  className={cn(
                    'transition-all duration-300 ease-out',
                    open === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <div className="px-5 pb-4">
                    <p className="text-sm text-greige leading-relaxed animate-fadeIn">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
