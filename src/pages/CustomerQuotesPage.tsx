import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader2, CheckCircle, Clock, Star, Phone, Mail } from 'lucide-react'

const API = import.meta.env.VITE_QUOTE_API_URL as string

type Quote = {
  id: string
  price: number
  message: string | null
  available_date: string | null
  status: string
  created_at: string
  partners: { name: string; phone: string; email: string }
}

type CustomerData = {
  lead: { service_type: string; name: string; desired_date: string | null; created_at: string }
  quotes: Quote[]
  total_contacted: number
}

function svcLabel(t: string) {
  if (t === 'rengjoring') return 'Rengjøring'
  if (t === 'begge')      return 'Flytting + Rengjøring'
  return 'Flytting'
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function CustomerQuotesPage() {
  const { token } = useParams<{ token: string }>()
  const [data, setData]       = useState<CustomerData | null>(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(true)
  const [chosen, setChosen]   = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API}?type=customer&token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else setData(d)
      })
      .catch(() => setError('Noe gikk galt. Prøv igjen.'))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-navy/40" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-sand/50 p-8 max-w-sm text-center">
        <p className="text-navy font-semibold mb-2">Siden ble ikke funnet</p>
        <p className="text-greige text-sm">{error}</p>
      </div>
    </div>
  )

  if (!data) return null

  const { lead, quotes, total_contacted } = data
  const pending = total_contacted - quotes.length
  const cheapest = quotes.length > 0 ? Math.min(...quotes.map(q => q.price)) : null

  return (
    <div className="min-h-screen bg-offwhite py-8 px-4">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="bg-navy rounded-2xl p-6 mb-5 text-white">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Velgtilbud</p>
          <h1 className="text-xl font-bold mb-1">Dine tilbud</h1>
          <p className="text-white/60 text-sm">
            Hei {lead.name} — {svcLabel(lead.service_type)}
            {lead.desired_date && ` · ${fmt(lead.desired_date)}`}
          </p>
        </div>

        {/* Status bar */}
        <div className="bg-white rounded-2xl border border-sand/50 p-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-sage" />
            <span className="font-semibold text-navy">{quotes.length} tilbud mottatt</span>
          </div>
          {pending > 0 && (
            <div className="flex items-center gap-2 text-sm text-greige">
              <Clock className="w-4 h-4" />
              {pending} venter fortsatt
            </div>
          )}
        </div>

        {/* No quotes yet */}
        {quotes.length === 0 && (
          <div className="bg-white rounded-2xl border border-sand/50 p-8 text-center">
            <Clock className="w-10 h-10 text-sand mx-auto mb-3" />
            <p className="font-semibold text-navy mb-1">Venter på tilbud</p>
            <p className="text-greige text-sm">
              Vi har kontaktet {total_contacted} selskaper. Tilbud vil dukke opp her så snart de er klare.
            </p>
            <p className="text-greige text-xs mt-4">Bokmerke denne siden — du trenger ikke logge inn.</p>
          </div>
        )}

        {/* Quote cards */}
        <div className="flex flex-col gap-4">
          {quotes.map((q, i) => {
            const isCheapest  = q.price === cheapest && quotes.length > 1
            const isChosen    = chosen === q.id

            return (
              <div key={q.id} className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden
                ${isChosen ? 'border-sage shadow-lg shadow-sage/10' : 'border-sand/50 hover:border-sand'}`}>

                {/* Card header */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-bold text-navy">{q.partners.name}</p>
                        {isCheapest && (
                          <span className="flex items-center gap-1 text-xs font-semibold bg-sage/10 text-sage px-2 py-0.5 rounded-full">
                            <Star className="w-3 h-3" /> Lavest pris
                          </span>
                        )}
                        {i === 0 && !isCheapest && (
                          <span className="text-xs font-semibold bg-navy/5 text-navy px-2 py-0.5 rounded-full">Tilbud #{i + 1}</span>
                        )}
                      </div>
                      {q.available_date && (
                        <p className="text-xs text-greige">Tilgjengelig: {fmt(q.available_date)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-navy">{q.price.toLocaleString('nb-NO')}</p>
                      <p className="text-xs text-greige">kr</p>
                    </div>
                  </div>

                  {q.message && (
                    <p className="text-sm text-greige leading-relaxed bg-offwhite rounded-xl p-3">{q.message}</p>
                  )}
                </div>

                {/* Action */}
                {!isChosen ? (
                  <div className="px-5 pb-5">
                    <button
                      onClick={() => setChosen(q.id)}
                      className="w-full bg-navy text-white font-bold py-3 rounded-xl hover:bg-navy/90 transition text-sm"
                    >
                      Velg dette tilbudet
                    </button>
                  </div>
                ) : (
                  <div className="bg-sage/5 border-t border-sage/20 p-5">
                    <p className="flex items-center gap-2 text-sage font-semibold text-sm mb-3">
                      <CheckCircle className="w-4 h-4" /> Du har valgt dette tilbudet
                    </p>
                    <p className="text-greige text-xs mb-4">Ta kontakt med {q.partners.name} for å bekrefte og avtale tidspunkt.</p>
                    <div className="flex gap-3">
                      <a href={`tel:${q.partners.phone}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-navy/20 text-sm font-semibold text-navy hover:bg-offwhite transition">
                        <Phone className="w-4 h-4" /> {q.partners.phone}
                      </a>
                      <a href={`mailto:${q.partners.email}`}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-navy/20 text-sm font-semibold text-navy hover:bg-offwhite transition">
                        <Mail className="w-4 h-4" /> E-post
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <p className="text-center text-xs text-greige mt-6">
          Velgtilbud.no — Helt gratis og uforpliktende
        </p>
      </div>
    </div>
  )
}
