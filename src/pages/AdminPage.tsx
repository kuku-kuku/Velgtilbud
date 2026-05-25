import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Partner, Lead, Distribution } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { LogOut, Plus, Pencil, X, Check, AlertCircle, ChevronRight, Phone, Mail, MapPin, Home, Trash2, Search, Users, TrendingUp, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Auth ──────────────────────────────────────────────────────────────────────

function LoginForm() {
  const [email, setEmail]   = useState('')
  const [pass,  setPass]    = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
    if (error) setError(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-sand/50 p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-navy mb-1">Velgtilbud Admin</h1>
        <p className="text-sm text-greige mb-6">Logg inn for å fortsette</p>
        <form onSubmit={login} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">E-post</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              className="w-full border border-sand/60 rounded-xl px-3 py-2.5 text-sm text-navy focus:outline-none focus:border-navy/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Passord</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" required
              className="w-full border border-sand/60 rounded-xl px-3 py-2.5 text-sm text-navy focus:outline-none focus:border-navy/40" />
          </div>
          {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
          <button disabled={loading}
            className="bg-navy text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-navy/90 transition disabled:opacity-60">
            {loading ? 'Logger inn…' : 'Logg inn'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

const SVC_LABELS: Record<string, string> = {
  rengjoring: 'Rengjøring',
  begge:      'Begge',
  flyttehjelp:'Flytting',
  cleaning:   'Rengjøring',
  moving:     'Flytting',
  both:       'Begge',
}

const SVC_COLORS: Record<string, string> = {
  rengjoring:  'bg-taupe/10 text-taupe',
  begge:       'bg-sage/10 text-sage',
  flyttehjelp: 'bg-navy/10 text-navy',
}

function Badge({ svc }: { svc: string }) {
  return (
    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', SVC_COLORS[svc] ?? 'bg-sand/30 text-greige')}>
      {SVC_LABELS[svc] ?? svc}
    </span>
  )
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('nb-NO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ── Partner modal ─────────────────────────────────────────────────────────────

const EMPTY_PARTNER: Omit<Partner, 'id' | 'created_at'> = {
  name: '', email: '', phone: '', service_types: [], city: 'Trondheim',
  daily_limit: 10, monthly_limit: 100, active: true,
}

function PartnerModal({ initial, onSave, onClose }: {
  initial?: Partner | null
  onSave: () => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Omit<Partner, 'id' | 'created_at'>>(
    initial ? { name: initial.name, email: initial.email, phone: initial.phone ?? '', service_types: initial.service_types, city: initial.city, daily_limit: initial.daily_limit, monthly_limit: initial.monthly_limit, active: initial.active }
            : { ...EMPTY_PARTNER }
  )
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState('')

  function toggleSvc(v: string) {
    setForm(f => ({
      ...f,
      service_types: f.service_types.includes(v)
        ? f.service_types.filter(s => s !== v)
        : [...f.service_types, v],
    }))
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    if (!form.service_types.length) { setError('Velg minst én tjenestetype'); return }
    setSaving(true); setError('')
    const payload = { ...form, phone: form.phone || null }
    const { error } = initial
      ? await supabase.from('partners').update(payload).eq('id', initial.id)
      : await supabase.from('partners').insert(payload)
    if (error) { setError(error.message); setSaving(false); return }
    onSave()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold text-navy">{initial ? 'Rediger partner' : 'Ny partner'}</h2>
          <button onClick={onClose} className="text-greige hover:text-navy"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={save} className="flex flex-col gap-3">
          {[
            { label: 'Navn',   key: 'name',  type: 'text',  required: true  },
            { label: 'E-post', key: 'email', type: 'email', required: true  },
            { label: 'Telefon',key: 'phone', type: 'tel',   required: false },
            { label: 'By',     key: 'city',  type: 'text',  required: true  },
          ].map(({ label, key, type, required }) => (
            <div key={key}>
              <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">{label}</label>
              <input
                value={(form as Record<string, unknown>)[key] as string}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                type={type} required={required}
                className="w-full border border-sand/60 rounded-xl px-3 py-2 text-sm text-navy focus:outline-none focus:border-navy/40"
              />
            </div>
          ))}

          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Tjenester</label>
            <div className="flex gap-2">
              {(['cleaning', 'moving', 'both'] as const).map(v => (
                <button key={v} type="button" onClick={() => toggleSvc(v)}
                  className={cn('flex-1 py-2 rounded-xl border text-xs font-semibold transition-all',
                    form.service_types.includes(v) ? 'bg-navy text-white border-transparent' : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                  )}>
                  {SVC_LABELS[v]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Maks per dag',   key: 'daily_limit'   },
              { label: 'Maks per måned', key: 'monthly_limit' },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">{label}</label>
                <input type="number" min={1}
                  value={(form as Record<string, unknown>)[key] as number}
                  onChange={e => setForm(f => ({ ...f, [key]: Number(e.target.value) }))}
                  className="w-full border border-sand/60 rounded-xl px-3 py-2 text-sm text-navy focus:outline-none focus:border-navy/40"
                />
              </div>
            ))}
          </div>

          {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}

          <div className="flex gap-2 mt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-sand/50 text-sm font-semibold text-greige hover:border-navy/30 hover:text-navy transition">
              Avbryt
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition disabled:opacity-60">
              {saving ? 'Lagrer…' : 'Lagre'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

function LeadModal({ lead, onClose, onDelete }: { lead: Lead; onClose: () => void; onDelete: (id: string) => void }) {
  const cleaning = lead.service_type !== 'flyttehjelp'
  const moving   = lead.service_type !== 'rengjoring'

  function row(label: string, value: string | number | boolean | null | undefined) {
    if (value === null || value === undefined || value === '') return null
    const display = typeof value === 'boolean' ? (value ? 'Ja' : 'Nei') : String(value)
    return (
      <div key={label} className="flex items-start gap-2 py-2 border-b border-sand/20 last:border-0">
        <span className="text-greige text-xs w-32 flex-shrink-0 pt-0.5">{label}</span>
        <span className="text-navy text-sm font-medium">{display}</span>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-sand/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge svc={lead.service_type} />
              {lead.customer_type && <span className="text-xs text-greige capitalize">{lead.customer_type}</span>}
            </div>
            <h2 className="text-lg font-bold text-navy">{lead.name}</h2>
            <p className="text-xs text-greige">{fmt(lead.created_at)}</p>
          </div>
          <button onClick={onClose} className="text-greige hover:text-navy p-1"><X className="w-5 h-5" /></button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Kontakt</p>
            <div className="bg-offwhite rounded-xl px-4">
              {row('Telefon', lead.phone)}
              {row('E-post', lead.email)}
              {row('Ønsket dato', lead.desired_date)}
              {lead.flex && row('Fleksibel', lead.flex_range ?? 'Ja')}
            </div>
          </div>

          {/* Cleaning */}
          {cleaning && (
            <div>
              <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Rengjøringsdetaljer</p>
              <div className="bg-offwhite rounded-xl px-4">
                {lead.street && row('Adresse', `${lead.street} ${lead.street_no ?? ''}, ${lead.postal}`)}
                {row('Boligtype', lead.prop_type)}
                {row('Etasjer', lead.floors)}
                {row('Areal', lead.area ? `${lead.area} kvm` : null)}
                {row('Hele boligen', lead.whole_property)}
                {row('Soverom', lead.soverom)}
                {row('Bad/WC', lead.badwc)}
                {row('Kjøkken', lead.kjokken)}
                {row('Stue', lead.stue)}
                {lead.area_extras?.length > 0 && row('Ekstra', lead.area_extras.join(', '))}
                {row('Kommentarer', lead.comments)}
              </div>
            </div>
          )}

          {/* Moving */}
          {moving && (
            <div>
              <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Flyttedetaljer</p>
              <div className="bg-offwhite rounded-xl px-4">
                {lead.from_street && row('Fra', `${lead.from_street} ${lead.from_no ?? ''}, ${lead.from_postal} ${lead.from_city ?? ''}`)}
                {row('Fra etasje', lead.from_floor)}
                {row('Heis (fra)', lead.from_elevator)}
                {lead.to_street && row('Til', `${lead.to_street} ${lead.to_no ?? ''}, ${lead.to_postal} ${lead.to_city ?? ''}`)}
                {row('Til etasje', lead.to_floor)}
                {row('Heis (til)', lead.to_elevator)}
                {row('Størrelse', lead.size ? `${lead.size} m²` : null)}
                {row('Parkering fra', lead.park_a ? `ca. ${lead.park_a} m` : null)}
                {row('Parkering til', lead.park_b ? `ca. ${lead.park_b} m` : null)}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="flex gap-3 pt-1">
            <a href={`tel:${lead.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand/50 text-sm font-semibold text-navy hover:bg-offwhite transition">
              <Phone className="w-4 h-4" /> Ring
            </a>
            <a href={`mailto:${lead.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand/50 text-sm font-semibold text-navy hover:bg-offwhite transition">
              <Mail className="w-4 h-4" /> E-post
            </a>
            <button
              onClick={() => {
                if (!confirm(`Slett lead fra ${lead.name}? Dette kan ikke angres.`)) return
                onDelete(lead.id)
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-red-500 hover:bg-red-50 transition">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SVC_FILTERS = [
  { value: 'all',         label: 'Alle'      },
  { value: 'rengjoring',  label: 'Rengjøring' },
  { value: 'flyttehjelp', label: 'Flytting'   },
  { value: 'begge',       label: 'Begge'      },
]

function LeadsTab() {
  const [leads, setLeads]       = useState<Lead[]>([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState<Lead | null>(null)
  const [search, setSearch]     = useState('')
  const [svcFilter, setSvcFilter] = useState('all')

  function load() {
    supabase.from('leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data ?? []); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  async function deleteLead(id: string) {
    await supabase.from('leads').delete().eq('id', id)
    setSelected(null)
    load()
  }

  const filtered = leads.filter(l => {
    const matchSvc = svcFilter === 'all' || l.service_type === svcFilter
    const q = search.toLowerCase()
    const matchSearch = !q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.phone.includes(q)
    return matchSvc && matchSearch
  })

  if (loading) return <Spinner />

  return (
    <>
      {/* Toolbar */}
      <div className="p-4 border-b border-sand/30 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-1">
          {SVC_FILTERS.map(f => (
            <button key={f.value} onClick={() => setSvcFilter(f.value)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold transition',
                svcFilter === f.value ? 'bg-navy text-white' : 'text-greige hover:text-navy hover:bg-sand/20')}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-greige" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Søk navn, e-post, tlf…"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-sand/50 text-sm text-navy placeholder-greige/60 focus:outline-none focus:border-navy/40 bg-white"
          />
        </div>
      </div>

      {/* Count */}
      <div className="px-4 py-2 border-b border-sand/20">
        <p className="text-xs text-greige">{filtered.length} {filtered.length === 1 ? 'lead' : 'leads'}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-semibold">Dato</th>
              <th className="text-left py-3 px-4 font-semibold">Tjeneste</th>
              <th className="text-left py-3 px-4 font-semibold">Navn</th>
              <th className="text-left py-3 px-4 font-semibold">Telefon</th>
              <th className="text-left py-3 px-4 font-semibold">Dato ønsket</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-greige text-sm">
                {leads.length === 0 ? 'Ingen leads ennå' : 'Ingen leads matcher søket'}
              </td></tr>
            )}
            {filtered.map(l => (
              <tr key={l.id}
                onClick={() => setSelected(l)}
                className="border-b border-sand/30 hover:bg-offwhite transition-colors cursor-pointer group">
                <td className="py-3 px-4 text-xs text-greige whitespace-nowrap">{fmt(l.created_at)}</td>
                <td className="py-3 px-4"><Badge svc={l.service_type} /></td>
                <td className="py-3 px-4">
                  <p className="font-medium text-navy">{l.name}</p>
                  <p className="text-xs text-greige">{l.email}</p>
                </td>
                <td className="py-3 px-4 text-greige">{l.phone}</td>
                <td className="py-3 px-4 text-greige">{l.desired_date ?? '—'}</td>
                <td className="py-3 px-4 text-greige group-hover:text-navy transition-colors">
                  <ChevronRight className="w-4 h-4 ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <LeadModal lead={selected} onClose={() => setSelected(null)} onDelete={deleteLead} />}
    </>
  )
}

function PartnersTab() {
  const [partners, setPartners]   = useState<Partner[]>([])
  const [loading, setLoading]     = useState(true)
  const [modal, setModal]         = useState<'new' | Partner | null>(null)
  const [usagemap, setUsagemap]   = useState<Record<string, { today: number; month: number }>>({})

  async function load() {
    const { data } = await supabase.from('partners').select('*').order('created_at')
    setPartners(data ?? [])
    setLoading(false)

    // Load today + month usage per partner
    const now   = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
    const month = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const map: Record<string, { today: number; month: number }> = {}

    await Promise.all((data ?? []).map(async (p) => {
      const [{ count: t }, { count: m }] = await Promise.all([
        supabase.from('lead_distributions').select('*', { count: 'exact', head: true }).eq('partner_id', p.id).gte('created_at', today),
        supabase.from('lead_distributions').select('*', { count: 'exact', head: true }).eq('partner_id', p.id).gte('created_at', month),
      ])
      map[p.id] = { today: t ?? 0, month: m ?? 0 }
    }))
    setUsagemap(map)
  }

  useEffect(() => { load() }, [])

  async function toggleActive(p: Partner) {
    await supabase.from('partners').update({ active: !p.active }).eq('id', p.id)
    load()
  }

  async function remove(p: Partner) {
    if (!confirm(`Slett ${p.name}? Dette kan ikke angres.`)) return
    await supabase.from('partners').delete().eq('id', p.id)
    load()
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className="flex justify-end px-4 pt-4 pb-2">
        <button onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-navy/90 transition">
          <Plus className="w-4 h-4" /> Ny partner
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-semibold">Navn</th>
              <th className="text-left py-3 px-4 font-semibold">Tjenester</th>
              <th className="text-left py-3 px-4 font-semibold">Grenser</th>
              <th className="text-left py-3 px-4 font-semibold">Bruk i dag / mnd</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-greige text-sm">Ingen partnere ennå</td></tr>
            )}
            {partners.map(p => {
              const usage = usagemap[p.id]
              return (
                <tr key={p.id} className="border-b border-sand/30 hover:bg-offwhite transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-semibold text-navy">{p.name}</p>
                    <p className="text-xs text-greige">{p.email}</p>
                    {p.phone && <p className="text-xs text-greige">{p.phone}</p>}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.service_types.map(s => <Badge key={s} svc={s} />)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-greige text-xs whitespace-nowrap">
                    {p.daily_limit}/dag · {p.monthly_limit}/mnd
                  </td>
                  <td className="py-3 px-4 text-xs">
                    {usage ? (
                      <span className={cn(usage.today >= p.daily_limit ? 'text-red-500' : 'text-navy')}>
                        {usage.today}/{p.daily_limit}
                      </span>
                    ) : '—'}
                    {' · '}
                    {usage ? (
                      <span className={cn(usage.month >= p.monthly_limit ? 'text-red-500' : 'text-navy')}>
                        {usage.month}/{p.monthly_limit}
                      </span>
                    ) : '—'}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(p)}
                      title={p.active ? 'Deaktiver' : 'Aktiver'}
                      className={cn(
                        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none',
                        p.active ? 'bg-sage' : 'bg-sand/60'
                      )}
                    >
                      <span className={cn(
                        'inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300',
                        p.active ? 'translate-x-6' : 'translate-x-1'
                      )} />
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModal(p)} className="text-greige hover:text-navy transition">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => remove(p)} className="text-greige hover:text-red-500 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {modal && (
        <PartnerModal
          initial={modal === 'new' ? null : modal}
          onSave={() => { setModal(null); load() }}
          onClose={() => setModal(null)}
        />
      )}
    </>
  )
}

function DistributionsTab() {
  const [rows, setRows]       = useState<Distribution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('lead_distributions')
      .select('*, leads(name, service_type), partners(name, email)')
      .order('created_at', { ascending: false })
      .limit(200)
      .then(({ data }) => { setRows((data as Distribution[]) ?? []); setLoading(false) })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
            <th className="text-left py-3 px-4 font-semibold">Tidspunkt</th>
            <th className="text-left py-3 px-4 font-semibold">Lead</th>
            <th className="text-left py-3 px-4 font-semibold">Partner</th>
            <th className="text-left py-3 px-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={4} className="py-12 text-center text-greige text-sm">Ingen distribusjoner ennå</td></tr>
          )}
          {rows.map(r => (
            <tr key={r.id} className="border-b border-sand/30 hover:bg-offwhite transition-colors">
              <td className="py-3 px-4 text-xs text-greige whitespace-nowrap">{fmt(r.created_at)}</td>
              <td className="py-3 px-4">
                <p className="font-medium text-navy">{r.leads?.name}</p>
                {r.leads?.service_type && <Badge svc={r.leads.service_type} />}
              </td>
              <td className="py-3 px-4">
                <p className="font-medium text-navy">{r.partners?.name}</p>
                <p className="text-xs text-greige">{r.partners?.email}</p>
              </td>
              <td className="py-3 px-4">
                {r.email_status === 'sent'
                  ? <span className="flex items-center gap-1 text-xs text-sage font-semibold"><Check className="w-3 h-3" />Sendt</span>
                  : <span className="flex items-center gap-1 text-xs text-red-500 font-semibold"><AlertCircle className="w-3 h-3" />Feilet</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatsBar() {
  const [stats, setStats] = useState({ leads: 0, partners: 0, thisMonth: 0, sent: 0 })

  useEffect(() => {
    const now       = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('partners').select('*', { count: 'exact', head: true }).eq('active', true),
      supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', monthStart),
      supabase.from('lead_distributions').select('*', { count: 'exact', head: true }).eq('email_status', 'sent'),
    ]).then(([l, p, m, s]) => {
      setStats({ leads: l.count ?? 0, partners: p.count ?? 0, thisMonth: m.count ?? 0, sent: s.count ?? 0 })
    })
  }, [])

  const cards = [
    { label: 'Totale leads',     value: stats.leads,     icon: TrendingUp },
    { label: 'Aktive partnere',  value: stats.partners,  icon: Users       },
    { label: 'Leads denne mnd',  value: stats.thisMonth, icon: Activity    },
    { label: 'E-poster sendt',   value: stats.sent,      icon: Check       },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map(c => (
        <div key={c.label} className="bg-white rounded-2xl border border-sand/50 p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-navy/5 flex items-center justify-center flex-shrink-0">
            <c.icon className="w-4 h-4 text-navy" />
          </div>
          <div>
            <p className="text-2xl font-bold text-navy leading-none">{c.value}</p>
            <p className="text-xs text-greige mt-0.5">{c.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function Spinner() {
  return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-navy/20 border-t-navy rounded-full animate-spin" /></div>
}

// ── Main admin shell ──────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [tab, setTab]         = useState<'leads' | 'partners' | 'distributions'>('leads')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return null          // loading
  if (session === null)      return <LoginForm /> // not authenticated

  const TABS = [
    { id: 'leads',         label: 'Leads'          },
    { id: 'partners',      label: 'Partnere'       },
    { id: 'distributions', label: 'Distribusjoner' },
  ] as const

  return (
    <div className="min-h-screen bg-offwhite">
      {/* Header */}
      <div className="bg-white border-b border-sand/50 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-navy">Velgtilbud Admin</h1>
          <p className="text-xs text-greige">{session.user.email}</p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="flex items-center gap-1.5 text-sm text-greige hover:text-navy transition"
        >
          <LogOut className="w-4 h-4" /> Logg ut
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-sand/50 px-6">
        <div className="flex gap-6">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'py-3 text-sm font-semibold border-b-2 transition-colors',
                tab === t.id
                  ? 'border-navy text-navy'
                  : 'border-transparent text-greige hover:text-navy'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <StatsBar />
        <div className="bg-white rounded-2xl border border-sand/50 overflow-hidden">
          {tab === 'leads'         && <LeadsTab />}
          {tab === 'partners'      && <PartnersTab />}
          {tab === 'distributions' && <DistributionsTab />}
        </div>
      </div>
    </div>
  )
}
