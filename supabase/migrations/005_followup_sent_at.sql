ALTER TABLE leads ADD COLUMN IF NOT EXISTS followup_sent_at timestamptz;
