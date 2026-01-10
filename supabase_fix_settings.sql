-- Fix for site_settings table missing error
-- 1. Create table if not exists with correct types
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy for Public Read Access (Anyone can read settings)
DROP POLICY IF EXISTS "Public settings are viewable by everyone" ON public.site_settings;
CREATE POLICY "Public settings are viewable by everyone" 
ON public.site_settings FOR SELECT 
TO public 
USING (true);

-- 4. Create Policy for Admin Update Access (Only authenticated users can update)
DROP POLICY IF EXISTS "Settings are updateable by authenticated users" ON public.site_settings;
CREATE POLICY "Settings are updateable by authenticated users" 
ON public.site_settings FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- 5. Create Policy for Admin Insert Access (Only authenticated users can insert)
DROP POLICY IF EXISTS "Settings are insertable by authenticated users" ON public.site_settings;
CREATE POLICY "Settings are insertable by authenticated users" 
ON public.site_settings FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- 6. Insert default data if missing (idempotent)
INSERT INTO public.site_settings (key, value) VALUES 
('contact_phone', '+53 5 8746866'),
('contact_email', 'info@akamara.cu'),
('site_title', 'Akamara S.U.R.L.'),
('site_slogan', 'Inicio de la Creación')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 7. Grant permissions
GRANT SELECT ON public.site_settings TO anon;
GRANT ALL ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
