
-- Table to store site configuration
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initial data
INSERT INTO site_settings (key, value) VALUES 
('contact_phone', '+53 5 8746866'),
('contact_email', 'direccion@akamara.cu'),
('site_title', 'Akamara S.U.R.L.'),
('site_slogan', 'Inicio de la Creación')
ON CONFLICT (key) DO NOTHING;
