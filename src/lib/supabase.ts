import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL  as string
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, anon)

// ── Types ────────────────────────────────────────────────────────────────────

export type ServiceType = 'rengjoring' | 'begge' | 'flyttehjelp'

export interface Partner {
  id:            string
  created_at:    string
  name:          string
  email:         string
  phone:         string | null
  service_types: string[]   // 'cleaning' | 'moving' | 'both'
  city:          string
  daily_limit:   number
  monthly_limit: number
  active:        boolean
  tier:          'budget' | 'premium'
}

export interface Lead {
  id:             string
  created_at:     string
  service_type:   string
  customer_type:  string | null
  name:           string
  phone:          string
  email:          string
  street:         string | null
  street_no:      string | null
  postal:         string | null
  city:           string | null
  from_street:    string | null
  from_no:        string | null
  from_postal:    string | null
  from_city:      string | null
  from_floor:     string | null
  from_elevator:  boolean | null
  to_street:      string | null
  to_no:          string | null
  to_postal:      string | null
  to_city:        string | null
  to_floor:       string | null
  to_elevator:    boolean | null
  park_a:         string | null
  park_b:         string | null
  size:           string | null
  prop_type:      string | null
  floors:         string | null
  whole_property: boolean | null
  area:           string | null
  soverom:        number | null
  badwc:          number | null
  kjokken:        number | null
  stue:           number | null
  area_extras:    string[]
  comments:       string | null
  desired_date:   string | null
  flex:           boolean
  flex_range:     string | null
  budget_tier:    'budget' | 'premium' | null
  cleaning_type:  string | null
}

export interface Distribution {
  id:           string
  created_at:   string
  lead_id:      string
  partner_id:   string
  email_status: string
  leads?:       Pick<Lead, 'name' | 'service_type'>
  partners?:    Pick<Partner, 'name' | 'email'>
}
