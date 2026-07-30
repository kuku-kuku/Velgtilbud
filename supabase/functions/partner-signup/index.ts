// Velgtilbud — partner-signup Edge Function
// Sends partner application emails to Værnes Multiservice.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL     = 'post@velgtilbud.no'
const TO_EMAIL       = 'post@vaernesmultiservice.no'

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function esc(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: CORS })

  try {
    const body = await req.json()

    const required = ['company', 'contact', 'phone', 'email', 'city', 'services']
    for (const f of required) {
      if (!body[f] || typeof body[f] !== 'string' || !body[f].trim()) {
        return new Response(JSON.stringify({ error: `Missing field: ${f}` }),
          { status: 400, headers: { 'Content-Type': 'application/json', ...CORS } })
      }
    }

    const html = `
      <div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #0e1d2d;">
        <h2 style="margin: 0 0 16px;">Ny partnersøknad</h2>
        <p style="margin: 0 0 20px; color: #4a5468;">En bedrift har registrert seg via partnerskjemaet på velgtilbud.no.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #6b7280; width: 160px;">Selskapsnavn</td><td style="padding: 8px 0; font-weight: 600;">${esc(body.company)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Kontaktperson</td><td style="padding: 8px 0;">${esc(body.contact)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">Telefon</td><td style="padding: 8px 0;"><a href="tel:${esc(body.phone)}" style="color: #0e1d2d;">${esc(body.phone)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">E-post</td><td style="padding: 8px 0;"><a href="mailto:${esc(body.email)}" style="color: #0e1d2d;">${esc(body.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280;">By / område</td><td style="padding: 8px 0;">${esc(body.city)}</td></tr>
          <tr><td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Tjenester</td><td style="padding: 8px 0;">${esc(body.services)}</td></tr>
        </table>
      </div>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        from:     FROM_EMAIL,
        to:       TO_EMAIL,
        reply_to: body.email,
        subject:  `Ny partnersøknad — ${body.company}`,
        html,
      }),
    })

    if (!res.ok) {
      const errBody = await res.text()
      console.error(`Resend error: ${res.status} ${errBody}`)
      return new Response(JSON.stringify({ error: 'Email send failed' }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...CORS } })
    }

    return new Response(JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', ...CORS } })
  } catch (err) {
    console.error(err)
    const msg = err instanceof Error ? err.message : JSON.stringify(err)
    return new Response(JSON.stringify({ error: msg }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...CORS } })
  }
})
