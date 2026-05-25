import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Partner, Lead, Distribution } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'
import { LogOut, Plus, Pencil, ToggleLeft, ToggleRight, X, Check, AlertCircle } from 'lucide-react'
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

function LeadsTab() {
  const [leads, setLeads]     = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('leads').select('*').order('created_at', { ascending: false })
      .then(({ data }) => { setLeads(data ?? []); setLoading(false) })
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sand/50 text-xs text-greige uppercase tracking-wide">
            <th className="text-left py-3 px-4 font-semibold">Dato</th>
            <th className="text-left py-3 px-4 font-semibold">Tjeneste</th>
            <th className="text-left py-3 px-4 font-semibold">Navn</th>
            <th className="text-left py-3 px-4 font-semibold">Telefon</th>
            <th className="text-left py-3 px-4 font-semibold">E-post</th>
            <th className="text-left py-3 px-4 font-semibold">Dato ønsket</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 && (
            <tr><td colSpan={6} className="py-12 text-center text-greige text-sm">Ingen leads ennå</td></tr>
          )}
          {leads.map(l => (
            <tr key={l.id} className="border-b border-sand/30 hover:bg-offwhite transition-colors">
              <td className="py-3 px-4 text-xs text-greige whitespace-nowrap">{fmt(l.created_at)}</td>
              <td className="py-3 px-4"><Badge svc={l.service_type} /></td>
              <td className="py-3 px-4 font-medium text-navy">{l.name}</td>
              <td className="py-3 px-4 text-greige">{l.phone}</td>
              <td className="py-3 px-4 text-greige">{l.email}</td>
              <td className="py-3 px-4 text-greige">{l.desired_date ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
                    <button onClick={() => toggleActive(p)} title={p.active ? 'Deaktiver' : 'Aktiver'}>
                      {p.active
                        ? <ToggleRight className="w-6 h-6 text-sage" />
                        : <ToggleLeft  className="w-6 h-6 text-greige" />}
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
        <div className="bg-white rounded-2xl border border-sand/50 overflow-hidden">
          {tab === 'leads'         && <LeadsTab />}
          {tab === 'partners'      && <PartnersTab />}
          {tab === 'distributions' && <DistributionsTab />}
        </div>
      </div>
    </div>
  )
}
