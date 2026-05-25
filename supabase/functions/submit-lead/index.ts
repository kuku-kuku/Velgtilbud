// Velgtilbud — submit-lead Edge Function
// Inserts a lead, finds eligible partners, sends emails via Resend

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY      = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL        = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const FROM_EMAIL          = 'onboarding@resend.dev'

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  try {
    const body = await req.json()
    const sb   = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // ── 1. Insert lead ────────────────────────────────────
    const { data: lead, error: leadErr } = await sb
      .from('leads')
      .insert({
        service_type:   body.service,
        customer_type:  body.customerType   ?? null,
        name:           body.name,
        phone:          body.phone,
        email:          body.email,
        street:         body.fromStreet     || null,
        street_no:      body.fromNo         || null,
        postal:         body.fromPostal     || null,
        city:           'Trondheim',
        from_street:    body.fromStreet     || null,
        from_no:        body.fromNo         || null,
        from_postal:    body.fromPostal     || null,
        from_city:      body.fromCity       || null,
        from_floor:     body.fromFloor      || null,
        from_elevator:  body.fromElevator   ?? null,
        to_street:      body.toStreet       || null,
        to_no:          body.toNo           || null,
        to_postal:      body.toPostal       || null,
        to_city:        body.toCity         || null,
        to_floor:       body.toFloor        || null,
        to_elevator:    body.toElevator     ?? null,
        park_a:         body.parkA          || null,
        park_b:         body.parkB          || null,
        size:           body.size           || null,
        prop_type:      body.propType       || null,
        floors:         body.floors         || null,
        whole_property: body.wholeProperty  ?? null,
        area:           body.area           || null,
        soverom:        body.soverom        ?? null,
        badwc:          body.badwc          ?? null,
        kjokken:        body.kjokken        ?? null,
        stue:           body.stue           ?? null,
        area_extras:    body.areaExtras     || [],
        comments:       body.comments       || null,
        desired_date:   body.date           || null,
        flex:           body.flex           ?? false,
        flex_range:     body.flexRange      || null,
      })
      .select()
      .single()

    if (leadErr) { console.error('leadErr:', JSON.stringify(leadErr)); throw leadErr }

    // ── 2. Determine which service types to match ─────────
    const match =
      lead.service_type === 'begge'      ? ['cleaning', 'moving', 'both'] :
      lead.service_type === 'rengjoring' ? ['cleaning', 'both'] :
                                           ['moving', 'both']

    // ── 3. Get all active Trondheim partners ──────────────
    const { data: allPartners } = await sb
      .from('partners')
      .select('*')
      .eq('active', true)
      .eq('city', 'Trondheim')

    const eligible = []

    if (allPartners?.length) {
      const now        = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      for (const p of allPartners) {
        // Service type match
        if (!p.service_types.some((t: string) => match.includes(t))) continue

        // Daily limit
        const { count: today } = await sb
          .from('lead_distributions')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', p.id)
          .gte('created_at', todayStart)

        if ((today ?? 0) >= p.daily_limit) continue

        // Monthly limit
        const { count: month } = await sb
          .from('lead_distributions')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', p.id)
          .gte('created_at', monthStart)

        if ((month ?? 0) >= p.monthly_limit) continue

        eligible.push(p)
      }
    }

    // ── 4. Send emails + record distributions ─────────────
    await Promise.allSettled(
      eligible.map(async (p) => {
        const res = await fetch('https://api.resend.com/emails', {
          method:  'POST',
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            from:    FROM_EMAIL,
            to:      p.email,
            subject: `Ny lead: ${svcLabel(lead.service_type)} — ${lead.name}`,
            html:    buildEmail(lead, p),
          }),
        })

        await sb.from('lead_distributions').insert({
          lead_id:      lead.id,
          partner_id:   p.id,
          email_status: res.ok ? 'sent' : 'failed',
        })
      })
    )

    return new Response(
      JSON.stringify({ success: true, lead_id: lead.id, sent_to: eligible.length }),
      { headers: { 'Content-Type': 'application/json', ...CORS } }
    )
  } catch (err) {
    console.error(err)
    const msg = err instanceof Error
      ? err.message
      : JSON.stringify(err)
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } }
    )
  }
})

// ── Helpers ───────────────────────────────────────────────

function svcLabel(t: string) {
  if (t === 'rengjoring') return 'Rengjøring'
  if (t === 'begge')      return 'Flytting + Rengjøring'
  return 'Flytting'
}

function row(label: string, value: unknown) {
  if (!value && value !== 0) return ''
  return `<tr>
    <td style="padding:5px 12px;color:#888;font-size:13px;width:130px;white-space:nowrap">${label}</td>
    <td style="padding:5px 12px;font-size:13px;font-weight:600;color:#0E1D2D">${value}</td>
  </tr>`
}

function section(title: string, rows: string) {
  if (!rows.trim()) return ''
  return `
  <p style="font-weight:700;font-size:13px;color:#0E1D2D;margin:18px 0 4px">${title}</p>
  <table style="width:100%;border-collapse:collapse;background:#f9f8f6;border-radius:8px;overflow:hidden">
    ${rows}
  </table>`
}

function buildEmail(lead: Record<string, unknown>, partner: Record<string, unknown>): string {
  const cleaning = lead.service_type !== 'flyttehjelp'
  const moving   = lead.service_type !== 'rengjoring'

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:28px 20px;color:#333">
  <h2 style="color:#0E1D2D;margin:0 0 4px">Ny lead fra Velgtilbud</h2>
  <p style="color:#888;margin:0 0 20px;font-size:14px">Hei ${partner.name}, du har mottatt en ny forespørsel. Ta kontakt raskt for best sjanse!</p>

  ${section('Kontakt', [
    row('Tjeneste',    svcLabel(lead.service_type as string)),
    row('Kundegruppe', lead.customer_type),
    row('Navn',        lead.name),
    row('Telefon',     lead.phone),
    row('E-post',      lead.email),
    row('Ønsket dato', lead.desired_date),
  ].join(''))}

  ${cleaning ? section('Rengjøringsdetaljer', [
    row('Adresse',     lead.street ? `${lead.street} ${lead.street_no ?? ''}, ${lead.postal}` : null),
    row('Boligtype',   lead.prop_type),
    row('Etasjer',     lead.floors),
    row('Areal',       lead.area ? `${lead.area} kvm` : null),
    row('Hele boligen',lead.whole_property ? 'Ja' : 'Nei'),
    row('Soverom',     lead.soverom),
    row('Bad/WC',      lead.badwc),
    row('Kjøkken',     lead.kjokken),
    row('Stue',        lead.stue),
    row('Ekstra',      (lead.area_extras as string[])?.join(', ')),
    row('Kommentarer', lead.comments),
  ].join('')) : ''}

  ${moving ? section('Flyttedetaljer', [
    row('Fra',         lead.from_street ? `${lead.from_street} ${lead.from_no ?? ''}, ${lead.from_postal} ${lead.from_city ?? ''}` : null),
    row('Fra etasje',  lead.from_floor),
    row('Heis (fra)',  lead.from_elevator != null ? (lead.from_elevator ? 'Ja' : 'Nei') : null),
    row('Til',         lead.to_street ? `${lead.to_street} ${lead.to_no ?? ''}, ${lead.to_postal} ${lead.to_city ?? ''}` : null),
    row('Til etasje',  lead.to_floor),
    row('Heis (til)',  lead.to_elevator != null ? (lead.to_elevator ? 'Ja' : 'Nei') : null),
    row('Størrelse',   lead.size ? `${lead.size} m²` : null),
    row('Parkering fra', lead.park_a ? `ca. ${lead.park_a} m` : null),
    row('Parkering til', lead.park_b ? `ca. ${lead.park_b} m` : null),
  ].join('')) : ''}

  <p style="font-size:11px;color:#bbb;margin-top:28px;border-top:1px solid #eee;padding-top:12px">
    Denne leaden er sendt til opptil 5 partnere i samme kategori. Velgtilbud.no
  </p>
</body></html>`
}
