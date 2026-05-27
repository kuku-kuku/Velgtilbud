// Velgtilbud — submit-lead Edge Function

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY       = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const FROM_EMAIL           = 'onboarding@resend.dev'
const SITE_URL             = Deno.env.get('SITE_URL') ?? 'https://velgtilbud.vercel.app'

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  try {
    const body = await req.json()
    const sb   = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

    // ── 1. Insert lead ────────────────────────────────────────
    const customerToken = crypto.randomUUID().replace(/-/g, '')

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
        cleaning_type:  body.cleaningType   || null,
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
        customer_token: customerToken,
      })
      .select()
      .single()

    if (leadErr) { console.error('leadErr:', JSON.stringify(leadErr)); throw leadErr }

    // ── 2. Round-robin tier assignment ────────────────────────
    // Count all leads including this one; odd = budget, even = premium.
    // Lead #1 → budget, #2 → premium, #3 → budget, #4 → premium …
    const { count: totalLeads } = await sb
      .from('leads')
      .select('*', { count: 'exact', head: true })

    const assignedTier: 'budget' | 'premium' =
      (totalLeads ?? 1) % 2 === 1 ? 'budget' : 'premium'

    // Persist the tier on the lead record for admin visibility
    await sb.from('leads').update({ budget_tier: assignedTier }).eq('id', lead.id)

    // ── 3. Determine matching service types ───────────────────
    const match =
      lead.service_type === 'begge'      ? ['cleaning', 'moving', 'both'] :
      lead.service_type === 'rengjoring' ? ['cleaning', 'both'] :
                                           ['moving',   'both']

    // ── 4. Fetch ALL active partners of the assigned tier ─────
    const { data: allPartners } = await sb
      .from('partners')
      .select('*')
      .eq('active', true)
      .eq('city', 'Trondheim')
      .eq('tier', assignedTier)

    const eligible: Record<string, unknown>[] = []

    if (allPartners?.length) {
      const now        = new Date()
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

      for (const p of allPartners) {
        // Must handle at least one of the requested service types
        if (!p.service_types.some((t: string) => match.includes(t))) continue

        // Must be within daily limit
        const { count: today } = await sb
          .from('lead_distributions')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', p.id)
          .gte('created_at', todayStart)
        if ((today ?? 0) >= p.daily_limit) continue

        // Must be within monthly limit
        const { count: month } = await sb
          .from('lead_distributions')
          .select('*', { count: 'exact', head: true })
          .eq('partner_id', p.id)
          .gte('created_at', monthStart)
        if ((month ?? 0) >= p.monthly_limit) continue

        eligible.push(p)
      }
    }

    // Every eligible partner of the assigned tier receives this lead
    const selected = eligible

    // ── 5. Send partner emails + record distributions ─────────
    await Promise.allSettled(
      selected.map(async (p) => {
        const partnerToken = crypto.randomUUID().replace(/-/g, '')
        const quoteLink    = `${SITE_URL}/tilbud/${partnerToken}`

        const res = await fetch('https://api.resend.com/emails', {
          method:  'POST',
          headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body:    JSON.stringify({
            from:    FROM_EMAIL,
            to:      p.email,
            subject: `Ny forespørsel: ${svcLabel(lead.service_type)} — ${lead.name}`,
            html:    buildPartnerEmail(lead, p, quoteLink),
          }),
        })

        if (!res.ok) {
          const errBody = await res.text()
          console.error(`Resend error for ${p.email}: ${res.status} ${errBody}`)
        }

        await sb.from('lead_distributions').insert({
          lead_id:       lead.id,
          partner_id:    p.id,
          email_status:  res.ok ? 'sent' : 'failed',
          partner_token: partnerToken,
        })
      })
    )

    // ── 6. Send customer confirmation email ───────────────────
    const customerLink = `${SITE_URL}/mine-tilbud/${customerToken}`
    await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        from:    FROM_EMAIL,
        to:      lead.email,
        subject: `Vi samler inn tilbud for deg — ${svcLabel(lead.service_type)}`,
        html:    buildCustomerEmail(lead, customerLink, selected.length),
      }),
    })

    return new Response(
      JSON.stringify({ success: true, lead_id: lead.id, sent_to: selected.length, tier: assignedTier }),
      { headers: { 'Content-Type': 'application/json', ...CORS } }
    )
  } catch (err) {
    console.error(err)
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
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

function buildPartnerEmail(lead: Record<string, unknown>, partner: Record<string, unknown>, quoteLink: string): string {
  const cleaning = lead.service_type !== 'flyttehjelp'
  const moving   = lead.service_type !== 'rengjoring'

  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:28px 20px;color:#333">
  <h2 style="color:#0E1D2D;margin:0 0 4px">Ny forespørsel fra Velgtilbud</h2>
  <p style="color:#888;margin:0 0 20px;font-size:14px">Hei ${partner.name}, du har mottatt en ny forespørsel. Gi ditt tilbud raskt for best sjanse!</p>

  ${section('Kontakt', [
    row('Tjeneste',    svcLabel(lead.service_type as string)),
    row('Kundegruppe', lead.customer_type),
    row('Navn',        lead.name),
    row('Telefon',     lead.phone),
    row('E-post',      lead.email),
    row('Ønsket dato', lead.desired_date),
  ].join(''))}

  ${cleaning ? section('Rengjøringsdetaljer', [
    row('Type rengjøring', lead.cleaning_type),
    row('Adresse',      lead.street ? `${lead.street} ${lead.street_no ?? ''}, ${lead.postal}` : null),
    row('Boligtype',    lead.prop_type),
    row('Etasjer',      lead.floors),
    row('Areal',        lead.area ? `${lead.area} kvm` : null),
    row('Hele boligen', lead.whole_property ? 'Ja' : 'Nei'),
    row('Soverom',      lead.soverom),
    row('Bad/WC',       lead.badwc),
    row('Kjøkken',      lead.kjokken),
    row('Stue',         lead.stue),
    row('Ekstra',       (lead.area_extras as string[])?.join(', ')),
    row('Kommentarer',  lead.comments),
  ].join('')) : ''}

  ${moving ? section('Flyttedetaljer', [
    row('Fra',           lead.from_street ? `${lead.from_street} ${lead.from_no ?? ''}, ${lead.from_postal} ${lead.from_city ?? ''}` : null),
    row('Fra etasje',    lead.from_floor),
    row('Heis (fra)',    lead.from_elevator != null ? (lead.from_elevator ? 'Ja' : 'Nei') : null),
    row('Til',           lead.to_street ? `${lead.to_street} ${lead.to_no ?? ''}, ${lead.to_postal} ${lead.to_city ?? ''}` : null),
    row('Til etasje',    lead.to_floor),
    row('Heis (til)',    lead.to_elevator != null ? (lead.to_elevator ? 'Ja' : 'Nei') : null),
    row('Størrelse',     lead.size ? `${lead.size} m²` : null),
    row('Parkering fra', lead.park_a ? `ca. ${lead.park_a} m` : null),
    row('Parkering til', lead.park_b ? `ca. ${lead.park_b} m` : null),
  ].join('')) : ''}

  <div style="margin:28px 0;text-align:center">
    <a href="${quoteLink}" style="display:inline-block;background:#0E1D2D;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
      Gi ditt tilbud →
    </a>
    <p style="font-size:11px;color:#bbb;margin-top:10px">Eller kopier lenken: ${quoteLink}</p>
  </div>

  <p style="font-size:11px;color:#bbb;margin-top:28px;border-top:1px solid #eee;padding-top:12px">
    Velgtilbud.no
  </p>
</body></html>`
}

function buildCustomerEmail(lead: Record<string, unknown>, _customerLink: string, partnerCount: number): string {
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:28px 20px;color:#333">
  <h2 style="color:#0E1D2D;margin:0 0 4px">Vi har mottatt din forespørsel!</h2>
  <p style="color:#555;margin:0 0 16px;font-size:14px">
    Hei ${lead.name}, takk for din forespørsel om <strong>${svcLabel(lead.service_type as string)}</strong>.
  </p>
  <p style="color:#555;font-size:14px;margin:0 0 16px">
    Din forespørsel er nå sendt til <strong>${partnerCount} godkjente selskaper</strong> i Trondheim.
    Du vil snart motta tilbud direkte fra dem — sammenlign og velg det beste for deg.
  </p>
  <p style="color:#888;font-size:13px;">Har du spørsmål? Svar på denne e-posten eller ring oss.</p>
  <p style="font-size:11px;color:#bbb;margin-top:28px;border-top:1px solid #eee;padding-top:12px">Velgtilbud.no — Trondheims ledende markedsplass</p>
</body></html>`
}
