-- ============================================================
--  Velgtilbud — quotes schema
-- ============================================================

-- Add unique tokens to existing tables
ALTER TABLE leads              ADD COLUMN IF NOT EXISTS customer_token TEXT UNIQUE;
ALTER TABLE lead_distributions ADD COLUMN IF NOT EXISTS partner_token  TEXT UNIQUE;

-- Backfill any existing rows
UPDATE leads              SET customer_token = gen_random_uuid()::text WHERE customer_token IS NULL;
UPDATE lead_distributions SET partner_token  = gen_random_uuid()::text WHERE partner_token  IS NULL;

-- Quotes ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quotes (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at      TIMESTAMPTZ DEFAULT now() NOT NULL,
  lead_id         UUID        REFERENCES leads(id)              ON DELETE CASCADE,
  partner_id      UUID        REFERENCES partners(id)           ON DELETE CASCADE,
  distribution_id UUID        REFERENCES lead_distributions(id) ON DELETE CASCADE,
  price           INTEGER     NOT NULL,          -- NOK
  message         TEXT,
  available_date  DATE,
  status          TEXT        NOT NULL DEFAULT 'submitted'  -- submitted | accepted | declined
);

CREATE INDEX IF NOT EXISTS idx_quotes_lead ON quotes(lead_id);
CREATE INDEX IF NOT EXISTS idx_quotes_dist ON quotes(distribution_id);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "service_role_quotes" ON quotes FOR ALL     USING (auth.role() = 'service_role');
CREATE POLICY "admin_read_quotes"   ON quotes FOR SELECT  USING (auth.role() = 'authenticated');
CREATE POLICY "admin_write_quotes"  ON quotes FOR ALL     USING (auth.role() = 'authenticated');
