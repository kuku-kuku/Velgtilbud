-- ============================================================
--  Velgtilbud — initial schema
-- ============================================================

-- Partners ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at    TIMESTAMPTZ DEFAULT now()             NOT NULL,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  -- 'cleaning' | 'moving' | 'both'
  service_types TEXT[]      NOT NULL DEFAULT '{}',
  city          TEXT        NOT NULL DEFAULT 'Trondheim',
  daily_limit   INTEGER     NOT NULL DEFAULT 10,
  monthly_limit INTEGER     NOT NULL DEFAULT 100,
  active        BOOLEAN     NOT NULL DEFAULT true
);

-- Leads ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id             UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at     TIMESTAMPTZ DEFAULT now()             NOT NULL,
  service_type   TEXT        NOT NULL,
  customer_type  TEXT,
  -- Contact
  name           TEXT        NOT NULL,
  phone          TEXT        NOT NULL,
  email          TEXT        NOT NULL,
  -- Cleaning address (also used as primary address)
  street         TEXT,
  street_no      TEXT,
  postal         TEXT,
  city           TEXT        DEFAULT 'Trondheim',
  -- Moving: from
  from_street    TEXT,
  from_no        TEXT,
  from_postal    TEXT,
  from_city      TEXT,
  from_floor     TEXT,
  from_elevator  BOOLEAN,
  -- Moving: to
  to_street      TEXT,
  to_no          TEXT,
  to_postal      TEXT,
  to_city        TEXT,
  to_floor       TEXT,
  to_elevator    BOOLEAN,
  -- Moving: misc
  park_a         TEXT,
  park_b         TEXT,
  size           TEXT,
  -- Cleaning
  prop_type      TEXT,
  floors         TEXT,
  whole_property BOOLEAN,
  area           TEXT,
  soverom        INTEGER,
  badwc          INTEGER,
  kjokken        INTEGER,
  stue           INTEGER,
  area_extras    TEXT[]      DEFAULT '{}',
  comments       TEXT,
  -- Date
  desired_date   DATE,
  flex           BOOLEAN     DEFAULT false,
  flex_range     TEXT
);

-- Lead distributions ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS lead_distributions (
  id           UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at   TIMESTAMPTZ DEFAULT now()           NOT NULL,
  lead_id      UUID        REFERENCES leads(id)    ON DELETE CASCADE,
  partner_id   UUID        REFERENCES partners(id) ON DELETE CASCADE,
  email_status TEXT        DEFAULT 'sent'
);

-- Index for fast daily/monthly limit queries
CREATE INDEX IF NOT EXISTS idx_dist_partner_created
  ON lead_distributions(partner_id, created_at);

-- ── Row Level Security ────────────────────────────────────
ALTER TABLE partners           ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads              ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_distributions ENABLE ROW LEVEL SECURITY;

-- Service role (Edge Functions) has full access
CREATE POLICY "service_role_partners"  ON partners           FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_leads"     ON leads              FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_dist"      ON lead_distributions FOR ALL USING (auth.role() = 'service_role');

-- Authenticated users (admin portal) can read + manage partners
CREATE POLICY "admin_read_partners"    ON partners           FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_write_partners"   ON partners           FOR ALL    USING (auth.role() = 'authenticated');
CREATE POLICY "admin_read_leads"       ON leads              FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "admin_read_dist"        ON lead_distributions FOR SELECT USING (auth.role() = 'authenticated');
