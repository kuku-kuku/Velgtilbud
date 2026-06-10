import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Partner, Lead, Distribution } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { LogOut, Plus, Pencil, X, Check, AlertCircle, ChevronRight, Phone, Mail, MapPin, Home, Trash2, Search, Users, TrendingUp, Activity, FileText, LayoutDashboard, Menu, Info } from 'lucide-react'
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
        <p className="text-sm text-greige mb-6">Sign in to continue</p>
        <form onSubmit={login} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              className="w-full border border-sand/60 rounded-xl px-3 py-2.5 text-sm text-navy focus:outline-none focus:border-navy/40" />
          </div>
          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Password</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" required
              className="w-full border border-sand/60 rounded-xl px-3 py-2.5 text-sm text-navy focus:outline-none focus:border-navy/40" />
          </div>
          {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
          <button disabled={loading}
            className="bg-navy text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-navy/90 transition disabled:opacity-60">
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

const SVC_LABELS: Record<string, string> = {
  rengjoring:  'Cleaning',
  begge:       'Both',
  flyttehjelp: 'Moving',
  cleaning:    'Cleaning',
  moving:      'Moving',
  both:        'Both',
}

const SVC_COLORS: Record<string, string> = {
  rengjoring:  'bg-taupe/10 text-taupe',
  begge:       'bg-sage/10 text-sage',
  flyttehjelp: 'bg-navy/10 text-navy',
  cleaning:    'bg-taupe/10 text-taupe',
  moving:      'bg-navy/10 text-navy',
  both:        'bg-sage/10 text-sage',
}

function Badge({ svc }: { svc: string }) {
  return (
    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', SVC_COLORS[svc] ?? 'bg-sand/30 text-greige')}>
      {SVC_LABELS[svc] ?? svc}
    </span>
  )
}

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function Spinner() {
  return <div className="flex justify-center py-16"><div className="w-6 h-6 border-2 border-navy/20 border-t-navy rounded-full animate-spin" /></div>
}

// ── Partner modal ─────────────────────────────────────────────────────────────

const TIER_LABELS: Record<string, string> = { budget: 'Budget', premium: 'Premium' }
const TIER_COLORS: Record<string, string> = {
  budget:  'bg-sand/40 text-greige',
  premium: 'bg-sage/10 text-sage',
}

const EMPTY_PARTNER: Omit<Partner, 'id' | 'created_at'> = {
  name: '', email: '', phone: '', service_types: [], city: 'Trøndelag',
  daily_limit: 10, monthly_limit: 100, active: true, tier: 'budget',
}

function PartnerModal({ initial, onSave, onClose }: {
  initial?: Partner | null
  onSave: () => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Omit<Partner, 'id' | 'created_at'>>(
    initial ? { name: initial.name, email: initial.email, phone: initial.phone ?? '', service_types: initial.service_types, city: initial.city, daily_limit: initial.daily_limit, monthly_limit: initial.monthly_limit, active: initial.active, tier: initial.tier ?? 'budget' }
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
    if (!form.service_types.length) { setError('Select at least one service type'); return }
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
          <h2 className="text-base font-bold text-navy">{initial ? 'Edit partner' : 'New partner'}</h2>
          <button onClick={onClose} className="text-greige hover:text-navy"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={save} className="flex flex-col gap-3">
          {[
            { label: 'Name',  key: 'name',  type: 'text',  required: true  },
            { label: 'Email', key: 'email', type: 'email', required: true  },
            { label: 'Phone', key: 'phone', type: 'tel',   required: false },
            { label: 'City',  key: 'city',  type: 'text',  required: true  },
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
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Services</label>
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

          <div>
            <label className="text-xs font-semibold text-greige uppercase tracking-wide block mb-1">Price tier</label>
            <div className="flex gap-2">
              {(['budget', 'premium'] as const).map(t => (
                <button key={t} type="button" onClick={() => setForm(f => ({ ...f, tier: t }))}
                  className={cn('flex-1 py-2 rounded-xl border text-xs font-semibold transition-all capitalize',
                    form.tier === t ? 'bg-navy text-white border-transparent' : 'bg-white text-navy border-sand/50 hover:border-navy/30'
                  )}>
                  {TIER_LABELS[t]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Daily limit',   key: 'daily_limit'   },
              { label: 'Monthly limit', key: 'monthly_limit' },
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
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Lead modal ────────────────────────────────────────────────────────────────

type QuoteRow = {
  id: string
  price: number
  message: string | null
  available_date: string | null
  status: string
  created_at: string
  partners: { name: string; phone: string | null; email: string } | null
}

type LeadWithCount = Lead & { quotes: { id: string }[] }

type DistRow = { id: string; email_status: string; created_at: string; partners: { name: string; email: string } | null }

function LeadModal({ lead, onClose, onDelete }: { lead: Lead; onClose: () => void; onDelete: (id: string) => void }) {
  const cleaning = lead.service_type !== 'flyttehjelp'
  const moving   = lead.service_type !== 'rengjoring'
  const [quotes, setQuotes]  = useState<QuoteRow[]>([])
  const [qLoading, setQLoad] = useState(true)
  const [dists, setDists]    = useState<DistRow[]>([])

  useEffect(() => {
    supabase
      .from('quotes')
      .select('id, price, message, available_date, status, created_at, partners(name, phone, email)')
      .eq('lead_id', lead.id)
      .order('price', { ascending: true })
      .then(({ data }) => { setQuotes((data as unknown as QuoteRow[]) ?? []); setQLoad(false) })
    supabase
      .from('lead_distributions')
      .select('id, email_status, created_at, partners(name, email)')
      .eq('lead_id', lead.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => setDists((data as unknown as DistRow[]) ?? []))
  }, [lead.id])

  function row(label: string, value: string | number | boolean | null | undefined) {
    if (value === null || value === undefined || value === '') return null
    const display = typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)
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
          <div>
            <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact</p>
            <div className="bg-offwhite rounded-xl px-4">
              {row('Phone', lead.phone)}
              {row('Email', lead.email)}
              {row('Desired date', lead.desired_date)}
              {lead.flex && row('Flexible', lead.flex_range ?? 'Yes')}
            </div>
          </div>

          {cleaning && (
            <div>
              <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><Home className="w-3.5 h-3.5" /> Cleaning details</p>
              <div className="bg-offwhite rounded-xl px-4">
                {lead.street && row('Address', `${lead.street} ${lead.street_no ?? ''}, ${lead.postal}`)}
                {row('Property type', lead.prop_type)}
                {row('Floors', lead.floors)}
                {row('Area', lead.area ? `${lead.area} m²` : null)}
                {row('Whole property', lead.whole_property)}
                {row('Bedrooms', lead.soverom)}
                {row('Bathrooms', lead.badwc)}
                {row('Kitchen', lead.kjokken)}
                {row('Living room', lead.stue)}
                {lead.area_extras?.length > 0 && row('Extras', lead.area_extras.join(', '))}
                {row('Comments', lead.comments)}
              </div>
            </div>
          )}

          {moving && (
            <div>
              <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Moving details</p>
              <div className="bg-offwhite rounded-xl px-4">
                {lead.from_street && row('From', `${lead.from_street} ${lead.from_no ?? ''}, ${lead.from_postal} ${lead.from_city ?? ''}`)}
                {row('From floor', lead.from_floor)}
                {row('Elevator (from)', lead.from_elevator)}
                {lead.to_street && row('To', `${lead.to_street} ${lead.to_no ?? ''}, ${lead.to_postal} ${lead.to_city ?? ''}`)}
                {row('To floor', lead.to_floor)}
                {row('Elevator (to)', lead.to_elevator)}
                {row('Size', lead.size ? `${lead.size} m²` : null)}
                {row('Parking (from)', lead.park_a ? `~${lead.park_a} m` : null)}
                {row('Parking (to)', lead.park_b ? `~${lead.park_b} m` : null)}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" /> Partners notified ({dists.length})
            </p>
            {dists.length === 0 ? (
              <div className="bg-offwhite rounded-xl p-4 flex items-center justify-between">
                <span className="text-sm text-greige">No partners notified</span>
                <div className="relative group/tip">
                  <Info className="w-4 h-4 text-greige/60 cursor-help" />
                  <div className="absolute right-0 bottom-6 w-64 bg-navy text-white text-xs rounded-xl p-3 leading-relaxed shadow-lg opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity z-10">
                    Possible reasons:<br />
                    • No active partners match this tier (budget/premium)<br />
                    • Partner hit their daily or monthly lead limit<br />
                    • No partner handles this service type
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {dists.map(d => (
                  <div key={d.id} className="flex items-center justify-between bg-offwhite rounded-xl px-4 py-2.5">
                    <div>
                      <p className="text-sm font-medium text-navy">{d.partners?.name ?? '—'}</p>
                      <p className="text-xs text-greige">{d.partners?.email}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${d.email_status === 'sent' ? 'bg-sage/10 text-sage' : 'bg-red-50 text-red-400'}`}>
                      {d.email_status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold text-greige uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Partner offers ({quotes.length})
            </p>
            {qLoading ? (
              <div className="flex justify-center py-4"><div className="w-4 h-4 border-2 border-navy/20 border-t-navy rounded-full animate-spin" /></div>
            ) : quotes.length === 0 ? (
              <div className="bg-offwhite rounded-xl p-4 text-center text-sm text-greige">No offers yet</div>
            ) : (
              <div className="flex flex-col gap-2">
                {quotes.map((q, i) => (
                  <div key={q.id} className={`rounded-xl border p-4 ${i === 0 ? 'border-sage/40 bg-sage/5' : 'border-sand/40 bg-offwhite'}`}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="font-semibold text-navy text-sm">{q.partners?.name ?? '—'}</p>
                        {q.available_date && <p className="text-xs text-greige">Available: {q.available_date}</p>}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-extrabold text-navy">{q.price.toLocaleString('nb-NO')} kr</p>
                        {i === 0 && quotes.length > 1 && <p className="text-xs text-sage font-semibold">Lowest</p>}
                      </div>
                    </div>
                    {q.message && <p className="text-xs text-greige mt-2 leading-relaxed">{q.message}</p>}
                    {q.partners && (
                      <div className="flex gap-2 mt-3">
                        {q.partners.phone && (
                          <a href={`tel:${q.partners.phone}`} className="flex items-center gap-1.5 text-xs text-navy border border-sand/50 rounded-lg px-2.5 py-1.5 hover:bg-white transition">
                            <Phone className="w-3 h-3" /> {q.partners.phone}
                          </a>
                        )}
                        <a href={`mailto:${q.partners.email}`} className="flex items-center gap-1.5 text-xs text-navy border border-sand/50 rounded-lg px-2.5 py-1.5 hover:bg-white transition">
                          <Mail className="w-3 h-3" /> Email
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <a href={`tel:${lead.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand/50 text-sm font-semibold text-navy hover:bg-offwhite transition">
              <Phone className="w-4 h-4" /> Call
            </a>
            <a href={`mailto:${lead.email}`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-sand/50 text-sm font-semibold text-navy hover:bg-offwhite transition">
              <Mail className="w-4 h-4" /> Email
            </a>
            <button
              onClick={() => {
                if (!confirm(`Delete lead from ${lead.name}? This cannot be undone.`)) return
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

// ── Leads tab ─────────────────────────────────────────────────────────────────

const SVC_FILTERS = [
  { value: 'all',         label: 'All'      },
  { value: 'rengjoring',  label: 'Cleaning' },
  { value: 'flyttehjelp', label: 'Moving'   },
  { value: 'begge',       label: 'Both'     },
]

function LeadsTab({ onLeadDeleted }: { onLeadDeleted: () => void }) {
  const [leads, setLeads]         = useState<LeadWithCount[]>([])
  const [loading, setLoading]     = useState(true)
  const [selected, setSelected]   = useState<Lead | null>(null)
  const [search, setSearch]       = useState('')
  const [svcFilter, setSvcFilter] = useState('all')

  function load() {
    supabase
      .from('leads')
      .select('*, quotes(id)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setLeads((data as LeadWithCount[]) ?? []); setLoading(false) })
  }

  useEffect(() => { load() }, [])

  async function deleteLead(id: string) {
    await supabase.from('quotes').delete().eq('lead_id', id)
    await supabase.from('lead_distributions').delete().eq('lead_id', id)
    const { error } = await supabase.from('leads').delete().eq('id', id)
    if (error) { alert(`Delete failed: ${error.message}`); return }
    setSelected(null)
    load()
    onLeadDeleted()
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
            placeholder="Search name, email, phone…"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-sand/50 text-sm text-navy placeholder-greige/60 focus:outline-none focus:border-navy/40 bg-white"
          />
        </div>
      </div>

      <div className="px-4 py-2 border-b border-sand/20">
        <p className="text-xs text-greige">{filtered.length} {filtered.length === 1 ? 'lead' : 'leads'}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Service</th>
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Phone</th>
              <th className="text-left py-3 px-4 font-semibold">Desired date</th>
              <th className="text-left py-3 px-4 font-semibold">Offers</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="py-12 text-center text-greige text-sm">
                {leads.length === 0 ? 'No leads yet' : 'No leads match the search'}
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
                <td className="py-3 px-4">
                  {l.quotes.length > 0
                    ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage bg-sage/10 px-2 py-0.5 rounded-full">{l.quotes.length} offer{l.quotes.length !== 1 ? 's' : ''}</span>
                    : <span className="text-xs text-greige/60">—</span>
                  }
                </td>
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

// ── Offers tab ────────────────────────────────────────────────────────────────

type OfferRow = {
  id: string
  price: number
  message: string | null
  available_date: string | null
  status: string
  created_at: string
  leads: { id: string; name: string; service_type: string; email: string; phone: string } | null
  partners: { name: string; phone: string | null; email: string } | null
}

function OffersTab() {
  const [offers, setOffers]   = useState<OfferRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')

  useEffect(() => {
    supabase
      .from('quotes')
      .select('id, price, message, available_date, status, created_at, leads(id, name, service_type, email, phone), partners(name, phone, email)')
      .order('created_at', { ascending: false })
      .then(({ data }) => { setOffers((data as unknown as OfferRow[]) ?? []); setLoading(false) })
  }, [])

  const filtered = offers.filter(o => {
    const q = search.toLowerCase()
    return !q
      || o.leads?.name.toLowerCase().includes(q)
      || o.partners?.name.toLowerCase().includes(q)
      || o.leads?.email.toLowerCase().includes(q)
  })

  if (loading) return <Spinner />

  return (
    <>
      <div className="p-4 border-b border-sand/30 flex items-center justify-between">
        <p className="text-xs text-greige">{filtered.length} {filtered.length === 1 ? 'offer' : 'offers'}</p>
        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-greige" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search lead or partner…"
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-sand/50 text-sm text-navy placeholder-greige/60 focus:outline-none focus:border-navy/40 bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-semibold">Submitted</th>
              <th className="text-left py-3 px-4 font-semibold">Lead</th>
              <th className="text-left py-3 px-4 font-semibold">Partner</th>
              <th className="text-left py-3 px-4 font-semibold">Price</th>
              <th className="text-left py-3 px-4 font-semibold">Available</th>
              <th className="text-left py-3 px-4 font-semibold">Message</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-greige text-sm">
                {offers.length === 0 ? 'No offers yet' : 'No offers match the search'}
              </td></tr>
            )}
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-sand/30 hover:bg-offwhite transition-colors">
                <td className="py-3 px-4 text-xs text-greige whitespace-nowrap">{fmt(o.created_at)}</td>
                <td className="py-3 px-4">
                  <p className="font-medium text-navy">{o.leads?.name ?? '—'}</p>
                  {o.leads?.service_type && <Badge svc={o.leads.service_type} />}
                </td>
                <td className="py-3 px-4">
                  <p className="font-medium text-navy">{o.partners?.name ?? '—'}</p>
                  <p className="text-xs text-greige">{o.partners?.email}</p>
                </td>
                <td className="py-3 px-4">
                  <p className="font-semibold text-navy whitespace-nowrap">{o.price.toLocaleString('nb-NO')} kr</p>
                </td>
                <td className="py-3 px-4 text-xs text-greige whitespace-nowrap">{o.available_date ?? '—'}</td>
                <td className="py-3 px-4 max-w-xs">
                  {o.message
                    ? <p className="text-xs text-greige truncate" title={o.message}>{o.message}</p>
                    : <span className="text-xs text-greige/50">—</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

// ── Partners tab ──────────────────────────────────────────────────────────────

function PartnersTab() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading]   = useState(true)
  const [modal, setModal]       = useState<'new' | Partner | null>(null)
  const [usagemap, setUsagemap] = useState<Record<string, { today: number; month: number }>>({})

  async function load() {
    const { data } = await supabase.from('partners').select('*').order('created_at')
    setPartners(data ?? [])
    setLoading(false)

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
    if (!confirm(`Delete ${p.name}? This cannot be undone.`)) return
    await supabase.from('partners').delete().eq('id', p.id)
    load()
  }

  if (loading) return <Spinner />

  return (
    <>
      <div className="flex justify-end px-4 pt-4 pb-2">
        <button onClick={() => setModal('new')}
          className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-navy/90 transition">
          <Plus className="w-4 h-4" /> New partner
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-semibold">Name</th>
              <th className="text-left py-3 px-4 font-semibold">Services</th>
              <th className="text-left py-3 px-4 font-semibold">Tier</th>
              <th className="text-left py-3 px-4 font-semibold">Limits</th>
              <th className="text-left py-3 px-4 font-semibold">Usage today / month</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody>
            {partners.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-greige text-sm">No partners yet</td></tr>
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
                  <td className="py-3 px-4">
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', TIER_COLORS[p.tier ?? 'budget'])}>
                      {TIER_LABELS[p.tier ?? 'budget']}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-greige text-xs whitespace-nowrap">
                    {p.daily_limit}/day · {p.monthly_limit}/month
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
                      title={p.active ? 'Deactivate' : 'Activate'}
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

// ── Distributions tab ─────────────────────────────────────────────────────────

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
            <th className="text-left py-3 px-4 font-semibold">Time</th>
            <th className="text-left py-3 px-4 font-semibold">Lead</th>
            <th className="text-left py-3 px-4 font-semibold">Partner</th>
            <th className="text-left py-3 px-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={4} className="py-12 text-center text-greige text-sm">No distributions yet</td></tr>
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
                  ? <span className="flex items-center gap-1 text-xs text-sage font-semibold"><Check className="w-3 h-3" />Sent</span>
                  : <span className="flex items-center gap-1 text-xs text-red-500 font-semibold"><AlertCircle className="w-3 h-3" />Failed</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Stats bar ─────────────────────────────────────────────────────────────────

function StatsBar() {
  const [stats, setStats] = useState({ leads: 0, partners: 0, thisMonth: 0, sent: 0 })

  useEffect(() => {
    const now        = new Date()
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
    { label: 'Total leads',      value: stats.leads,     icon: TrendingUp },
    { label: 'Active partners',  value: stats.partners,  icon: Users       },
    { label: 'Leads this month', value: stats.thisMonth, icon: Activity    },
    { label: 'Emails sent',      value: stats.sent,      icon: Check       },
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

// ── Main admin shell ──────────────────────────────────────────────────────────

type Tab = 'leads' | 'offers' | 'partners' | 'distributions'

const NAV_ITEMS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'leads',         label: 'Leads',         icon: LayoutDashboard },
  { id: 'offers',        label: 'Offers',         icon: FileText        },
  { id: 'partners',      label: 'Partners',       icon: Users           },
  { id: 'distributions', label: 'Distributions',  icon: Activity        },
]

export default function AdminPage() {
  const [session, setSession]     = useState<Session | null | undefined>(undefined)
  const [tab, setTab]             = useState<Tab>('leads')
  const [statsKey, setStatsKey]   = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) return null
  if (session === null)      return <LoginForm />

  return (
    <div className="flex h-screen bg-offwhite overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-sand/50 flex flex-col flex-shrink-0 transition-transform duration-300',
        'lg:relative lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="px-5 py-5 border-b border-sand/40 flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm font-bold text-navy">Velgtilbud</p>
            <p className="text-xs text-greige truncate">{session.user.email}</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-greige hover:text-navy p-1 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex-1 py-3 px-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false) }}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors w-full text-left',
                tab === item.id
                  ? 'bg-navy text-white'
                  : 'text-greige hover:text-navy hover:bg-sand/20'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-sand/40">
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-greige hover:text-navy hover:bg-sand/20 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-sand/30 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-greige hover:text-navy transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <p className="text-sm font-bold text-navy capitalize">{tab}</p>
        </div>

        <div className="p-4 lg:p-6">
          <StatsBar key={statsKey} />
          <div className="bg-white rounded-2xl border border-sand/50 overflow-hidden">
            {tab === 'leads'         && <LeadsTab onLeadDeleted={() => setStatsKey(k => k + 1)} />}
            {tab === 'offers'        && <OffersTab />}
            {tab === 'partners'      && <PartnersTab />}
            {tab === 'distributions' && <DistributionsTab />}
          </div>
        </div>
      </main>
    </div>
  )
}
