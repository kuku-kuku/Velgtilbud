import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle, Loader2, ChevronRight, Home, Truck, Phone, Mail } from 'lucide-react'

const API = import.meta.env.VITE_QUOTE_API_URL as string

type LeadInfo = {
  name: string
  phone: string
  email: string
  service_type: string
  customer_type: string | null
  desired_date: string | null
  flex: boolean
  flex_range: string | null
  prop_type: string | null
  floors: string | null
  area: string | null
  whole_property: boolean | null
  soverom: number | null
  badwc: number | null
  kjokken: number | null
  stue: number | null
  area_extras: string[]
  comments: string | null
  street: string | null
  street_no: string | null
  postal: string | null
  from_street: string | null; from_no: string | null; from_postal: string | null; from_city: string | null
  from_floor: string | null; from_elevator: boolean | null
  to_street: string | null; to_no: string | null; to_postal: string | null; to_city: string | null
  to_floor: string | null; to_elevator: boolean | null
  size: string | null; park_a: string | null; park_b: string | null
}

type QuoteData = {
  distribution_id: string
  partner: { id: string; name: string }
  lead: LeadInfo
  already_submitted: { price: number; message: string | null; available_date: string | null; created_at: string } | null
}

function DetailRow({ label, value }: { label: string; value: string | number | boolean | null | undefined }) {
  if (value === null || value === undefined || value === '') return null
  const display = typeof value === 'boolean' ? (value ? 'Ja' : 'Nei') : String(value)
  return (
    <div className="flex gap-3 py-2 border-b border-sand/20 last:border-0 text-sm">
      <span className="text-greige w-32 flex-shrink-0">{label}</span>
      <span className="text-navy font-medium">{display}</span>
    </div>
  )
}

export default function PartnerQuotePage() {
  const { token } = useParams<{ token: string }>()
  const [data, setData]       = useState<QuoteData | null>(null)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(true)

  // quote form state
  const [price, setPrice]     = useState('')
  const [message, setMessage] = useState('')
  const [date, setDate]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  // which path the partner chose
  const [path, setPath] = useState<'choose' | 'platform' | 'direct'>('choose')

  useEffect(() => {
    fetch(`${API}?type=partner&token=${token}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error)
        else {
          setData(d)
          // If already submitted, skip the choice screen
          if (d.already_submitted) setPath('platform')
        }
      })
      .catch(() => setError('Noe gikk galt. Prøv igjen.'))
      .finally(() => setLoading(false))
  }, [token])

  async function submitQuote(e: React.FormEvent) {
    e.preventDefault()
    if (!data) return
    if (!price || Number(price) <= 0) return

    setSubmitting(true)
    try {
      const res = await fetch(`${API}?type=partner&token=${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distribution_id: data.distribution_id,
          price:           Number(price),
          message:         message || null,
          available_date:  date || null,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Feil ved innsending')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Noe gikk galt')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Loading / error ───────────────────────────────────────────────────────

  if (loading) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center">
      <Loader2 className="w-6 h-6 animate-spin text-navy/40" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-sand/50 p-8 max-w-sm text-center">
        <p className="text-navy font-semibold mb-2">Lenken er ugyldig</p>
        <p className="text-greige text-sm">{error}</p>
      </div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-sand/50 p-8 max-w-sm text-center">
        <p className="text-navy font-semibold mb-2">Noe gikk galt</p>
        <p className="text-greige text-sm">Prøv å åpne lenken fra e-posten igjen.</p>
      </div>
    </div>
  )

  const { lead, partner } = data
  const cleaning = lead.service_type !== 'flyttehjelp'
  const moving   = lead.service_type !== 'rengjoring'

  // ── Already submitted ─────────────────────────────────────────────────────

  if (data.already_submitted || submitted) {
    const q = data.already_submitted
    const sentAt = q?.created_at ? new Date(q.created_at).toLocaleDateString('nb-NO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : null
    return (
      <div className="min-h-screen bg-offwhite py-8 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-navy rounded-2xl p-6 mb-5 text-white">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Velgtilbud</p>
            <h1 className="text-xl font-bold mb-0.5">Tilbud allerede sendt</h1>
            <p className="text-white/60 text-sm">Hei {partner.name}, du har allerede svart på denne forespørselen</p>
          </div>

          <div className="bg-white rounded-2xl border border-sand/50 p-5 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="font-bold text-navy text-sm">Tilbudet ditt er registrert</p>
                {sentAt && <p className="text-xs text-greige">Sendt {sentAt}</p>}
              </div>
            </div>

            {q && (
              <div className="bg-offwhite rounded-xl p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-greige">Pris</span>
                  <span className="font-extrabold text-navy text-lg">{q.price.toLocaleString('nb-NO')} kr</span>
                </div>
                {q.available_date && (
                  <div className="flex items-center justify-between border-t border-sand/30 pt-2">
                    <span className="text-xs text-greige">Tilgjengelig dato</span>
                    <span className="text-sm font-semibold text-navy">{q.available_date}</span>
                  </div>
                )}
                {q.message && (
                  <div className="border-t border-sand/30 pt-2">
                    <span className="text-xs text-greige block mb-1">Melding</span>
                    <p className="text-sm text-navy leading-relaxed">{q.message}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-greige">
            Kunden vil kontakte deg direkte hvis de velger ditt tilbud.
          </p>
          <p className="text-center text-xs text-greige mt-1">Velgtilbud.no</p>
        </div>
      </div>
    )
  }

  // ── Job details (shared across both paths) ────────────────────────────────

  const jobDetails = (
    <div className="bg-white rounded-2xl border border-sand/50 p-5 mb-5">
      <div className="flex items-center gap-2 mb-4">
        {cleaning && <div className="flex items-center gap-1.5 bg-taupe/10 text-taupe text-xs font-semibold px-3 py-1 rounded-full"><Home className="w-3 h-3" /> Rengjøring</div>}
        {moving   && <div className="flex items-center gap-1.5 bg-navy/10 text-navy text-xs font-semibold px-3 py-1 rounded-full"><Truck className="w-3 h-3" /> Flytting</div>}
      </div>

      {cleaning && (
        <>
          <DetailRow label="Adresse"      value={lead.street ? `${lead.street} ${lead.street_no ?? ''}, ${lead.postal}` : null} />
          <DetailRow label="Boligtype"    value={lead.prop_type} />
          <DetailRow label="Etasjer"      value={lead.floors} />
          <DetailRow label="Areal"        value={lead.area ? `${lead.area} kvm` : null} />
          <DetailRow label="Hele boligen" value={lead.whole_property} />
          <DetailRow label="Soverom"      value={lead.soverom} />
          <DetailRow label="Bad/WC"       value={lead.badwc} />
          <DetailRow label="Kjøkken"      value={lead.kjokken} />
          <DetailRow label="Stue"         value={lead.stue} />
          {lead.area_extras?.length > 0 && <DetailRow label="Ekstra" value={lead.area_extras.join(', ')} />}
        </>
      )}

      {moving && (
        <>
          {lead.from_street && <DetailRow label="Fra" value={`${lead.from_street} ${lead.from_no ?? ''}, ${lead.from_postal} ${lead.from_city ?? ''}`} />}
          <DetailRow label="Fra etasje"   value={lead.from_floor} />
          <DetailRow label="Heis (fra)"   value={lead.from_elevator} />
          {lead.to_street && <DetailRow label="Til" value={`${lead.to_street} ${lead.to_no ?? ''}, ${lead.to_postal} ${lead.to_city ?? ''}`} />}
          <DetailRow label="Til etasje"   value={lead.to_floor} />
          <DetailRow label="Heis (til)"   value={lead.to_elevator} />
          <DetailRow label="Størrelse"    value={lead.size ? `${lead.size} m²` : null} />
          <DetailRow label="Parkering"    value={lead.park_a ? `ca. ${lead.park_a} m` : null} />
        </>
      )}

      <DetailRow label="Ønsket dato" value={lead.desired_date} />
      <DetailRow label="Kommentarer" value={lead.comments} />
    </div>
  )

  // ── Choice screen ─────────────────────────────────────────────────────────

  if (path === 'choose') {
    return (
      <div className="min-h-screen bg-offwhite py-8 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-navy rounded-2xl p-6 mb-5 text-white">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Velgtilbud — Ny forespørsel</p>
            <h1 className="text-xl font-bold mb-0.5">Ny forespørsel</h1>
            <p className="text-white/60 text-sm">Hei {partner.name}, her er detaljer om forespørselen</p>
          </div>

          {jobDetails}

          <div className="bg-white rounded-2xl border border-sand/50 p-5">
            <h2 className="text-base font-bold text-navy mb-1">Hvordan vil du svare?</h2>
            <p className="text-sm text-greige mb-5">Velg den metoden som passer best for deg.</p>

            <div className="flex flex-col gap-3">
              {/* Option 1 — platform quote */}
              <button
                onClick={() => setPath('platform')}
                className="w-full text-left border-2 border-sand/50 hover:border-navy/30 rounded-2xl p-4 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-navy text-sm mb-1">Send tilbud via Velgtilbud</p>
                    <p className="text-xs text-greige leading-relaxed">
                      Fyll inn pris, tilgjengelig dato og en melding. Kunden ser tilbudet ditt på sin tilbudsside og kan sammenligne alle innkomne tilbud.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-greige group-hover:text-navy mt-0.5 flex-shrink-0 ml-3 transition-colors" />
                </div>
              </button>

              {/* Option 2 — direct contact */}
              <button
                onClick={() => setPath('direct')}
                className="w-full text-left border-2 border-sand/50 hover:border-navy/30 rounded-2xl p-4 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-navy text-sm mb-1">Ta kontakt direkte</p>
                    <p className="text-xs text-greige leading-relaxed">
                      Ring eller send tilbud på e-post direkte til kunden. Du avtaler jobben uten å gå gjennom plattformen.
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-greige group-hover:text-navy mt-0.5 flex-shrink-0 ml-3 transition-colors" />
                </div>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-greige mt-4">Velgtilbud.no — Trøndelags ledende markedsplass</p>
        </div>
      </div>
    )
  }

  // ── Direct contact ────────────────────────────────────────────────────────

  if (path === 'direct') {
    return (
      <div className="min-h-screen bg-offwhite py-8 px-4">
        <div className="max-w-xl mx-auto">
          <div className="bg-navy rounded-2xl p-6 mb-5 text-white">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Velgtilbud — Ny forespørsel</p>
            <h1 className="text-xl font-bold mb-0.5">Ta kontakt direkte</h1>
            <p className="text-white/60 text-sm">Hei {partner.name}, her er kundens kontaktinfo</p>
          </div>

          <div className="bg-white rounded-2xl border border-sand/50 p-5 mb-5">
            <p className="text-xs font-bold text-greige uppercase tracking-wider mb-4">Kontaktinformasjon</p>
            <p className="text-lg font-bold text-navy mb-4">{lead.name}</p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-3 bg-navy text-white font-semibold py-3.5 px-5 rounded-xl hover:bg-navy/90 transition"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{lead.phone}</span>
              </a>
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-3 border-2 border-sand/50 text-navy font-semibold py-3.5 px-5 rounded-xl hover:border-navy/30 transition"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>{lead.email}</span>
              </a>
            </div>
          </div>

          {jobDetails}

          <button
            onClick={() => setPath('choose')}
            className="w-full text-center text-xs text-greige hover:text-navy transition mt-1 py-2"
          >
            ← Tilbake til valg
          </button>

          <p className="text-center text-xs text-greige mt-3">Velgtilbud.no — Trøndelags ledende markedsplass</p>
        </div>
      </div>
    )
  }

  // ── Platform quote form ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-offwhite py-8 px-4">
      <div className="max-w-xl mx-auto">

        <div className="bg-navy rounded-2xl p-6 mb-5 text-white">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Velgtilbud — Ny forespørsel</p>
          <h1 className="text-xl font-bold mb-0.5">Gi ditt tilbud</h1>
          <p className="text-white/60 text-sm">Hei {partner.name}, her er detaljer om forespørselen</p>
        </div>

        {jobDetails}

        <form onSubmit={submitQuote} className="bg-white rounded-2xl border border-sand/50 p-5">
          <h2 className="text-base font-bold text-navy mb-4">Ditt tilbud</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Pris (kr) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  placeholder="f.eks. 4500"
                  className="w-full border border-sand/60 rounded-xl px-4 py-3 text-navy text-base focus:outline-none focus:border-navy/40 pr-28"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-greige text-sm font-medium">kr inkl. mva</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Tilgjengelig dato
              </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full border border-sand/60 rounded-xl px-4 py-3 text-navy text-base focus:outline-none focus:border-navy/40"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy/60 uppercase tracking-wider mb-1.5">
                Melding til kunden
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Beskriv hva som er inkludert i prisen, evt. forbehold, erfaring, etc."
                className="w-full border border-sand/60 rounded-xl px-4 py-3 text-navy text-sm focus:outline-none focus:border-navy/40 resize-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting || !price}
              className="flex items-center justify-center gap-2 bg-navy text-white font-bold py-3.5 rounded-xl hover:bg-navy/90 transition disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send tilbud <ChevronRight className="w-4 h-4" /></>}
            </button>
          </div>
        </form>

        <button
          onClick={() => setPath('choose')}
          className="w-full text-center text-xs text-greige hover:text-navy transition mt-3 py-2"
        >
          ← Tilbake til valg
        </button>

        <p className="text-center text-xs text-greige mt-2">Velgtilbud.no — Trøndelags ledende markedsplass</p>
      </div>
    </div>
  )
}
