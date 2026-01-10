-- Create analytics_visits table
CREATE TABLE IF NOT EXISTS public.analytics_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page TEXT NOT NULL,
    visitor_id TEXT, -- Anonymous session ID stored in localStorage
    country TEXT, -- From Cloudflare headers if available
    user_agent TEXT,
    screen_size TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.analytics_visits ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (record a visit)
CREATE POLICY "Enable insert for everyone" ON public.analytics_visits
    FOR INSERT
    WITH CHECK (true);

-- Policy: Only authenticated users (admins) can view analytics
CREATE POLICY "Enable select for authenticated only" ON public.analytics_visits
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_visits_created_at ON public.analytics_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_visits_page ON public.analytics_visits(page);
