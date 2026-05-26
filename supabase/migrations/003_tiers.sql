-- Partner price tier
ALTER TABLE partners
  ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'mid'
  CHECK (tier IN ('budget', 'mid', 'premium'));

-- Customer budget preference captured from the form
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS budget_tier TEXT
  CHECK (budget_tier IN ('budget', 'mid', 'premium'));
