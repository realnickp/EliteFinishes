-- ============================================================
-- ELITE FINISHES: CANVASSER PORTAL MIGRATION
-- Run this in your Supabase SQL editor AFTER migration_002_lead_management.sql
-- ============================================================

-- ============================================================
-- 1. CANVASSERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS canvassers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password_hash TEXT NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_canvassers_email_lower ON canvassers (lower(email));
CREATE INDEX IF NOT EXISTS idx_canvassers_active ON canvassers (active);

ALTER TABLE canvassers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role only canvassers" ON canvassers;
CREATE POLICY "Service role only canvassers" ON canvassers
  FOR ALL USING (false) WITH CHECK (false);

-- ============================================================
-- 2. LEADS: canvasser_id FK + photos JSONB
-- ============================================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS canvasser_id UUID REFERENCES canvassers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS photos JSONB DEFAULT '[]';

CREATE INDEX IF NOT EXISTS idx_leads_canvasser_id ON leads (canvasser_id);
CREATE INDEX IF NOT EXISTS idx_leads_appointment_date ON leads (appointment_date)
  WHERE appointment_scheduled = true;

-- ============================================================
-- 3. STORAGE: lead-photos bucket (public-read, service-role write)
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('lead-photos', 'lead-photos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read lead photos" ON storage.objects;
CREATE POLICY "Public read lead photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'lead-photos');

DROP POLICY IF EXISTS "Service role write lead photos" ON storage.objects;
CREATE POLICY "Service role write lead photos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'lead-photos' AND auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role delete lead photos" ON storage.objects;
CREATE POLICY "Service role delete lead photos" ON storage.objects
  FOR DELETE USING (bucket_id = 'lead-photos' AND auth.role() = 'service_role');
