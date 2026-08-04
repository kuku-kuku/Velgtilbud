-- ============================================================
--  Velgtilbud — anti-fraud metadata on leads
-- ============================================================
-- Adds submitter IP, user agent, and explicit-consent capture.
-- Purpose: evidence in case a form submission is fraudulent, and
-- GDPR-compliant proof that the customer accepted data sharing
-- with partners.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS ip_address    INET,
  ADD COLUMN IF NOT EXISTS user_agent    TEXT,
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN     DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_text  TEXT,
  ADD COLUMN IF NOT EXISTS consent_at    TIMESTAMPTZ;

-- Index to make rate-limiting by IP cheap
CREATE INDEX IF NOT EXISTS idx_leads_ip_created
  ON leads(ip_address, created_at);
