// Velgtilbud — quote-api Edge Function
// Handles partner quote submission and customer quote viewing via tokens

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json', ...CORS } })

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  const sb  = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  const url = new URL(req.url)
  const type  = url.searchParams.get('type')   // 'partner' | 'customer'
  const token = url.searchParams.get('token')

  if (!type || !token) return json({ error: 'Missing type or token' }, 400)

  try {
    // ── PARTNER flows ─────────────────────────────────────
    if (type === 'partner') {

      // GET — load quote form data
      if (req.method === 'GET') {
        const { data: dist, error } = await sb
          .from('lead_distributions')
          .select('*, leads(*), partners(id, name, email, phone)')
          .eq('partner_token', token)
          .single()

        if (error || !dist) return json({ error: 'Ugyldig eller utløpt lenke' }, 404)

        // Check if already submitted
        const { data: existing } = await sb
          .from('quotes')
          .select('id, price, message, available_date, created_at')
          .eq('distribution_id', dist.id)
          .single()

        return json({
          distribution_id: dist.id,
          partner:         { id: dist.partners.id, name: dist.partners.name },
          lead: {
            service_type:  dist.leads.service_type,
            customer_type: dist.leads.customer_type,
            desired_date:  dist.leads.desired_date,
            flex:          dist.leads.flex,
            flex_range:    dist.leads.flex_range,
            // Cleaning fields
            prop_type:     dist.leads.prop_type,
            floors:        dist.leads.floors,
            area:          dist.leads.area,
            whole_property:dist.leads.whole_property,
            soverom:       dist.leads.soverom,
            badwc:         dist.leads.badwc,
            kjokken:       dist.leads.kjokken,
            stue:          dist.leads.stue,
            area_extras:   dist.leads.area_extras,
            comments:      dist.leads.comments,
            street:        dist.leads.street,
            street_no:     dist.leads.street_no,
            postal:        dist.leads.postal,
            // Moving fields
            from_street:   dist.leads.from_street,
            from_no:       dist.leads.from_no,
            from_postal:   dist.leads.from_postal,
            from_city:     dist.leads.from_city,
            from_floor:    dist.leads.from_floor,
            from_elevator: dist.leads.from_elevator,
            to_street:     dist.leads.to_street,
            to_no:         dist.leads.to_no,
            to_postal:     dist.leads.to_postal,
            to_city:       dist.leads.to_city,
            to_floor:      dist.leads.to_floor,
            to_elevator:   dist.leads.to_elevator,
            size:          dist.leads.size,
            park_a:        dist.leads.park_a,
            park_b:        dist.leads.park_b,
          },
          already_submitted: existing ?? null,
        })
      }

      // POST — submit quote
      if (req.method === 'POST') {
        const { distribution_id, price, message, available_date } = await req.json()

        // Verify token matches distribution
        const { data: dist, error } = await sb
          .from('lead_distributions')
          .select('id, lead_id, partner_id')
          .eq('partner_token', token)
          .eq('id', distribution_id)
          .single()

        if (error || !dist) return json({ error: 'Ugyldig token' }, 403)

        // Prevent duplicate submissions
        const { data: existing } = await sb
          .from('quotes')
          .select('id')
          .eq('distribution_id', dist.id)
          .single()

        if (existing) return json({ error: 'Du har allerede sendt et tilbud' }, 409)

        const { error: insertErr } = await sb.from('quotes').insert({
          lead_id:         dist.lead_id,
          partner_id:      dist.partner_id,
          distribution_id: dist.id,
          price:           Math.round(Number(price)),
          message:         message || null,
          available_date:  available_date || null,
          status:          'submitted',
        })

        if (insertErr) throw insertErr

        return json({ success: true })
      }
    }

    // ── CUSTOMER flow ─────────────────────────────────────
    if (type === 'customer' && req.method === 'GET') {
      const { data: lead, error } = await sb
        .from('leads')
        .select('id, service_type, name, desired_date, created_at')
        .eq('customer_token', token)
        .single()

      if (error || !lead) return json({ error: 'Ugyldig eller utløpt lenke' }, 404)

      // Get all submitted quotes for this lead with partner info
      const { data: quotes } = await sb
        .from('quotes')
        .select('id, price, message, available_date, status, created_at, partners(name, phone, email)')
        .eq('lead_id', lead.id)
        .order('price', { ascending: true })

      // How many partners were contacted
      const { count: totalContacted } = await sb
        .from('lead_distributions')
        .select('*', { count: 'exact', head: true })
        .eq('lead_id', lead.id)

      return json({
        lead: {
          service_type:    lead.service_type,
          name:            lead.name,
          desired_date:    lead.desired_date,
          created_at:      lead.created_at,
        },
        quotes:           quotes ?? [],
        total_contacted:  totalContacted ?? 0,
      })
    }

    return json({ error: 'Invalid request' }, 400)
  } catch (err) {
    console.error(err)
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    return json({ error: msg }, 500)
  }
})
