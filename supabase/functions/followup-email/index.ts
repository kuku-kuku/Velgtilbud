import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY       = Deno.env.get('RESEND_API_KEY')!
const SUPABASE_URL         = Deno.env.get('SUPABASE_URL')!
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const FROM_EMAIL           = 'post@velgtilbud.no'
const SITE_URL             = Deno.env.get('SITE_URL') ?? 'https://velgtilbud.no'

serve(async () => {
  const sb  = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  const now = new Date()

  // Find leads created 11–13 hours ago that haven't received a follow-up yet
  const from = new Date(now.getTime() - 13 * 60 * 60 * 1000).toISOString()
  const to   = new Date(now.getTime() - 11 * 60 * 60 * 1000).toISOString()

  const { data: leads, error } = await sb
    .from('leads')
    .select('id, name, email, service_type, customer_token')
    .gte('created_at', from)
    .lte('created_at', to)
    .is('followup_sent_at', null)

  if (error) {
    console.error('Query error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  let sent = 0

  for (const lead of leads ?? []) {
    const customerLink = `${SITE_URL}/mine-tilbud/${lead.customer_token}`

    const svcLabel =
      lead.service_type === 'rengjoring' ? 'Rengjøring' :
      lead.service_type === 'begge'      ? 'Flytting + Rengjøring' : 'Flytting'

    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from:    FROM_EMAIL,
        to:      lead.email,
        subject: `Sjekk tilbudene dine — ${svcLabel}`,
        html: `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:28px 20px;color:#333">
  <h2 style="color:#0E1D2D;margin:0 0 4px">Tilbud er på vei, ${lead.name}!</h2>
  <p style="color:#555;font-size:14px;margin:0 0 16px">
    Det har gått litt tid siden du sendte inn din forespørsel om <strong>${svcLabel}</strong>.
    Selskaper er i gang med å sende inn tilbud — klikk nedenfor for å se hva som er kommet inn.
  </p>
  <div style="margin:24px 0;text-align:center">
    <a href="${customerLink}" style="display:inline-block;background:#0E1D2D;color:#fff;font-weight:700;font-size:15px;padding:14px 32px;border-radius:12px;text-decoration:none">
      Se dine tilbud →
    </a>
    <p style="font-size:11px;color:#bbb;margin-top:10px">Eller kopier lenken: ${customerLink}</p>
  </div>
  <p style="color:#888;font-size:13px;">Vi anbefaler at du følger med på både innboksen og spam-/søppelpostmappen den kommende tiden, slik at du ikke går glipp av viktig informasjon og tilbud.</p>
  <p style="font-size:11px;color:#bbb;margin-top:28px;border-top:1px solid #eee;padding-top:12px">Velgtilbud.no — Norges ledende markedsplass</p>
</body></html>`,
      }),
    })

    if (res.ok) {
      await sb.from('leads').update({ followup_sent_at: now.toISOString() }).eq('id', lead.id)
      sent++
    } else {
      const err = await res.text()
      console.error(`Follow-up failed for ${lead.email}: ${res.status} ${err}`)
    }
  }

  return new Response(JSON.stringify({ sent }), { status: 200 })
})
